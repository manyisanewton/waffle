import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa'
import Seo from '../components/seo/Seo'
import { getFallbackBlogPosts, loadBlogPosts } from '../lib/blogApi'

const POSTS_PER_PAGE = 9

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

function BlogPage() {
  const [posts, setPosts] = useState(() => getFallbackBlogPosts())
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let isCancelled = false

    loadBlogPosts().then((livePosts) => {
      if (!isCancelled) {
        setPosts(livePosts)
        setIsLoading(false)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [])

  const categories = useMemo(() => {
    const categoryMap = new Map()
    posts.forEach((post) => {
      if (post.category) categoryMap.set(post.category, post.categoryLabel || post.category)
    })
    return [{ slug: 'all', label: 'All articles' }, ...[...categoryMap].map(([slug, label]) => ({ slug, label }))]
  }, [posts])

  const filteredPosts = useMemo(
    () => activeCategory === 'all' ? posts : posts.filter((post) => post.category === activeCategory),
    [activeCategory, posts],
  )

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const visiblePage = Math.min(currentPage, totalPages)
  const paginatedPosts = filteredPosts.slice(
    (visiblePage - 1) * POSTS_PER_PAGE,
    visiblePage * POSTS_PER_PAGE,
  )

  return (
    <div className="text-brand-ink">
      <Seo
        title="Blog"
        description="Practical water treatment, swimming pool, pumps, filtration and solar equipment articles from Vortexus Kenya."
      />

      {categories.length > 1 ? (
        <nav aria-label="Blog categories" className="flex gap-2 overflow-x-auto py-6">
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => {
                setActiveCategory(category.slug)
                setCurrentPage(1)
              }}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category.slug
                  ? 'bg-[var(--color-accent-blue)] text-white'
                  : 'border border-brand-border bg-white text-brand-muted hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </nav>
      ) : <div className="h-7" />}

      {isLoading ? (
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading articles">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-brand-border bg-white">
              <div className="h-44 bg-brand-surface" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-28 rounded bg-brand-surface" />
                <div className="h-7 w-4/5 rounded bg-brand-surface" />
                <div className="h-4 w-full rounded bg-brand-surface" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && paginatedPosts.length ? (
        <section className="grid gap-7 md:grid-cols-2 xl:grid-cols-3" aria-label="Published articles">
          {paginatedPosts.map((post) => (
            <article key={post.slug} className="group overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_12px_34px_rgba(35,33,32,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(35,33,32,0.11)]">
              <NavLink to={`/blog/${post.slug}`} className="block overflow-hidden bg-brand-surface">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-44 w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                />
              </NavLink>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent-blue)]">
                  <span>{post.categoryLabel || 'Article'}</span>
                  <span className="h-1 w-1 rounded-full bg-brand-border" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-3 line-clamp-2 font-display text-xl font-semibold leading-snug">
                  <NavLink to={`/blog/${post.slug}`} className="transition hover:text-[var(--color-accent-blue)]">
                    {post.title}
                  </NavLink>
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-brand-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-brand-border pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-brand-muted">
                    <FaCalendarAlt className="text-[var(--color-accent-blue)]" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <NavLink to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-accent-blue)]">
                    Read <FaArrowRight className="transition group-hover:translate-x-1" />
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {!isLoading && !paginatedPosts.length ? (
        <section className="rounded-2xl border border-dashed border-brand-border bg-white px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold">No articles in this category yet.</h2>
          <p className="mt-2 text-brand-muted">Choose another category or publish a new article.</p>
        </section>
      ) : null}

      {totalPages > 1 ? (
        <nav aria-label="Blog pages" className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} type="button" onClick={() => setCurrentPage(page)} className={`h-11 min-w-11 rounded-full px-4 text-sm font-semibold ${visiblePage === page ? 'bg-[var(--color-accent-blue)] text-white' : 'border border-brand-border bg-white text-brand-muted'}`}>
              {page}
            </button>
          ))}
        </nav>
      ) : null}
    </div>
  )
}

export default BlogPage
