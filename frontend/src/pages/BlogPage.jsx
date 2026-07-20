import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaFolderOpen,
  FaIndustry,
  FaPlay,
  FaTag,
  FaTint,
  FaTools,
} from 'react-icons/fa'
import Seo from '../components/seo/Seo'
import { getFallbackBlogPosts, loadBlogPosts } from '../lib/sanityBlogApi'

const POSTS_PER_PAGE = 6
const heroImage = '/images/water-treament.webp'

const categoryFilters = [
  { slug: 'all', label: 'All Articles', icon: FaBookOpen },
  { slug: 'buying-guides', label: 'Buying Guides', icon: FaFolderOpen },
  { slug: 'project-insights', label: 'Field Updates', icon: FaTools },
  { slug: 'water-treatment', label: 'Water Treatment', icon: FaTint },
  { slug: 'industry-insights', label: 'Industry Insights', icon: FaIndustry },
  { slug: 'product-guides', label: 'Product Guides', icon: FaTag },
]

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

function getVideoBlock(post) {
  return post.blocks.find((block) => block.type === 'video') || null
}

function getPostKind(post) {
  return post.postKind || post.categoryLabel || 'Article'
}

function categoryMatchesPost(categorySlug, post) {
  if (categorySlug === 'all') return true
  if (categorySlug === post.category) return true
  if (categorySlug === 'product-guides') return getPostKind(post).toLowerCase().includes('guide')
  if (categorySlug === 'industry-insights') {
    return post.tags?.some((tag) => /industry|commercial|institution|community/i.test(tag))
  }
  return false
}

function BlogPage() {
  const [posts, setPosts] = useState(() => getFallbackBlogPosts())
  const [isLoading, setIsLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let isCancelled = false

    loadBlogPosts()
      .then((livePosts) => {
        if (isCancelled) {
          return
        }

        setPosts(livePosts)
        setIsLoading(false)
      })
      .catch(() => {
        if (!isCancelled) {
          setPosts(getFallbackBlogPosts())
          setIsLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [])

  const highlightPosts = useMemo(() => {
    const featured = posts.filter((post) => post.featured)
    return (featured.length ? featured : posts).slice(0, 4)
  }, [posts])

  const activeHighlight = highlightPosts[currentHighlightIndex] || highlightPosts[0] || null

  const filteredPosts = useMemo(
    () => posts.filter((post) => categoryMatchesPost(activeCategory, post)),
    [activeCategory, posts],
  )

  const videoPosts = useMemo(
    () => posts.filter((post) => getVideoBlock(post)).slice(0, 3),
    [posts],
  )

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const visiblePage = Math.min(currentPage, totalPages)

  const paginatedPosts = useMemo(() => {
    const startIndex = (visiblePage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [filteredPosts, visiblePage])

  useEffect(() => {
    if (!highlightPosts.length) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setCurrentHighlightIndex((current) => (current + 1) % highlightPosts.length)
    }, 7000)

    return () => window.clearInterval(interval)
  }, [highlightPosts.length])

  return (
    <div className="space-y-10 text-brand-ink lg:space-y-12">
      <Seo
        title="Blog"
        description="Vortexus buying guides, technical articles, field updates, and product education for water treatment, pumps, filtration, RO, meters, and sterilizers."
      />

      <section className="overflow-hidden rounded-[1.25rem] border border-brand-border bg-white shadow-[0_24px_70px_rgba(35,33,32,0.08)]">
        <div className="grid min-h-[430px] lg:grid-cols-[0.52fr_0.48fr]">
          <div className="relative overflow-hidden px-7 py-10 sm:px-10 lg:px-12 lg:py-16">
            <div className="absolute inset-y-0 right-[-18%] hidden w-[55%] rounded-l-[50%] bg-brand-surface lg:block" />
            <div className="relative max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-accent-blue)]">
                Vortexus Blog
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
                Practical water solutions and expert insights.
              </h1>
              <p className="mt-6 max-w-md text-base leading-8 text-brand-muted">
                Guides, field updates, and water-system advice for industries,
                businesses, and communities.
              </p>
              <a
                href="#latest-articles"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[var(--color-accent-blue)] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_38px_rgba(33,73,216,0.22)] transition hover:bg-[var(--color-accent-blue-hover)]"
              >
                Explore Articles
                <FaArrowRight />
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden">
            <img
              src={heroImage}
              alt="Clean water flowing over stones"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {activeHighlight ? (
        <section className="-mt-2 rounded-[1.25rem] border border-brand-border bg-white shadow-[0_24px_70px_rgba(35,33,32,0.08)] lg:mx-10">
          <div className="grid overflow-hidden rounded-[1.25rem] lg:grid-cols-[0.7fr_0.3fr]">
            <article className="px-7 py-8 sm:px-10">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-accent-blue)]">
                Featured Post
              </p>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-brand-ink">
                {activeHighlight.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-brand-muted">
                {activeHighlight.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-muted">
                <span className="inline-flex items-center gap-2">
                  <FaCalendarAlt className="text-[var(--color-accent-blue)]" />
                  {formatDate(activeHighlight.publishedAt)}
                </span>
                <span>{activeHighlight.readTime}</span>
                <span>{getPostKind(activeHighlight)}</span>
              </div>

              <NavLink
                to={`/blog/${activeHighlight.slug}`}
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[var(--color-accent-blue)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-accent-blue-hover)]"
              >
                Read Article
                <FaArrowRight />
              </NavLink>

              {highlightPosts.length > 1 ? (
                <div className="mt-8 flex flex-wrap gap-4">
                  {highlightPosts.map((post, index) => (
                    <button
                      key={post.slug}
                      type="button"
                      onClick={() => setCurrentHighlightIndex(index)}
                      className={[
                        'min-w-20 rounded-[1rem] border px-5 py-3 text-center text-xs font-bold transition',
                        currentHighlightIndex === index
                          ? 'border-[var(--color-accent-blue)] bg-white text-[var(--color-accent-blue)] shadow-[0_14px_34px_rgba(33,73,216,0.14)]'
                          : 'border-brand-border bg-white text-brand-muted hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]',
                      ].join(' ')}
                    >
                      <span className="block text-sm">{String(index + 1).padStart(2, '0')}</span>
                      <span className="mt-1 block uppercase tracking-[0.18em]">Story {index + 1}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </article>

            <NavLink to={`/blog/${activeHighlight.slug}`} className="min-h-[320px] bg-brand-surface">
              <img
                src={activeHighlight.coverImage}
                alt={activeHighlight.title}
                className="h-full w-full object-contain p-6"
              />
            </NavLink>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {categoryFilters.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.slug

          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => {
                setActiveCategory(category.slug)
                setCurrentPage(1)
              }}
              className={[
                'rounded-[1.15rem] border px-5 py-6 text-center shadow-[0_16px_38px_rgba(35,33,32,0.05)] transition hover:-translate-y-0.5',
                isActive
                  ? 'border-[var(--color-accent-blue)] bg-white text-[var(--color-accent-blue)]'
                  : 'border-brand-border bg-white text-brand-ink hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]',
              ].join(' ')}
            >
              <Icon className="mx-auto text-2xl" />
              <span className="mt-4 block text-sm font-bold">{category.label}</span>
            </button>
          )
        })}
      </section>

      {videoPosts.length ? (
        <section className="rounded-[1.25rem] border border-brand-border bg-white p-7 shadow-[0_20px_56px_rgba(35,33,32,0.06)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.24fr_0.76fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-accent-blue)]">
                Video Posts
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-brand-ink">
                From our editorial video channel.
              </h2>
              <NavLink
                to="/blog"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[var(--color-accent-blue)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-accent-blue-hover)]"
              >
                Watch All Videos
                <FaArrowRight />
              </NavLink>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {videoPosts.map((post) => {
                const videoBlock = getVideoBlock(post)

                return (
                  <NavLink
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="overflow-hidden rounded-[0.95rem] border border-brand-border bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(35,33,32,0.08)]"
                  >
                    <div className="relative h-40 overflow-hidden bg-brand-ink">
                      <img
                        src={videoBlock?.poster || post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 bg-brand-ink/18" />
                      <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-ink/82 text-white">
                        <FaPlay className="ml-1" />
                      </span>
                    </div>
                    <div className="space-y-2 px-4 py-4">
                      <h3 className="font-display text-lg font-semibold leading-snug text-brand-ink">
                        {post.title}
                      </h3>
                      <p className="text-xs font-semibold text-brand-muted">
                        {post.readTime} • {getPostKind(post)}
                      </p>
                    </div>
                  </NavLink>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section id="latest-articles" className="rounded-[1.25rem] border border-brand-border bg-white p-7 shadow-[0_20px_56px_rgba(35,33,32,0.06)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-accent-blue)]">
              Latest Articles
            </p>
            <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold leading-tight text-brand-ink">
              Latest guides and technical articles.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveCategory('all')
              setCurrentPage(1)
            }}
            className="inline-flex items-center gap-3 text-sm font-bold text-[var(--color-accent-blue)] transition hover:text-[var(--color-accent-blue-hover)]"
          >
            View all articles
            <FaArrowRight />
          </button>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginatedPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-[1rem] border border-brand-border bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(35,33,32,0.08)]"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-56 w-full bg-brand-surface object-cover"
              />
              <div className="space-y-4 px-5 py-5">
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-blue)]">
                  <span>{getPostKind(post)}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug text-brand-ink">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-7 text-brand-muted">
                  {post.excerpt}
                </p>
                <p className="text-sm font-medium text-brand-muted">
                  {formatDate(post.publishedAt)}
                </p>
                <NavLink
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-3 text-sm font-bold text-[var(--color-accent-blue)] transition hover:text-[var(--color-accent-blue-hover)]"
                >
                  Read More
                  <FaArrowRight />
                </NavLink>
              </div>
            </article>
          ))}
        </div>

        {!isLoading && paginatedPosts.length === 0 ? (
          <section className="mt-8 rounded-[1.25rem] border border-dashed border-brand-border bg-brand-surface px-6 py-10 text-center sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[var(--color-accent-blue)]">
              No Posts Found
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink">
              No published posts are available in this filter yet.
            </h2>
          </section>
        ) : null}

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={visiblePage === 1}
              className="rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={[
                  'h-11 min-w-11 rounded-full px-4 text-sm font-semibold transition',
                  visiblePage === page
                    ? 'bg-[var(--color-accent-blue)] text-white shadow-[0_12px_30px_rgba(33,73,216,0.22)]'
                    : 'border border-brand-border bg-white text-brand-ink hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]',
                ].join(' ')}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={visiblePage === totalPages}
              className="rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next
            </button>
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default BlogPage
