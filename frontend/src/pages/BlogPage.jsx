import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import FullBleedHero from '../components/sections/FullBleedHero'
import { loadBlogPosts } from '../lib/sanityBlogApi'

const POSTS_PER_PAGE = 6

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

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let isCancelled = false

    setIsLoading(true)

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
          setPosts([])
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

  const videoPosts = useMemo(
    () => posts.filter((post) => getVideoBlock(post)).slice(0, 3),
    [posts],
  )

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    return posts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [currentPage, posts])

  useEffect(() => {
    if (!highlightPosts.length) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setCurrentHighlightIndex((current) => (current + 1) % highlightPosts.length)
    }, 6500)

    return () => window.clearInterval(interval)
  }, [highlightPosts.length])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo
        title="Blog"
        description="Live product updates, technical articles, and field posts published from the Vortexus Sanity editorial channel."
      />

      <FullBleedHero
        eyebrow="Vortexus Blog"
        title="Live articles, field updates, and product publishing."
        description="This page pulls published blog content directly from the Vortexus editorial channel for product communication, buyer education, and technical updates."
        imageSrc={activeHighlight?.heroImage || '/images/placeholder-product.webp'}
        imageAlt={activeHighlight?.title || 'Vortexus blog'}
        overlayClassName="theme-hero-dark-strong"
      >
        {activeHighlight ? (
          <div className="flex flex-wrap gap-3">
            <NavLink
              to={`/blog/${activeHighlight.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Read Highlight
            </NavLink>
          </div>
        ) : null}
      </FullBleedHero>

      {activeHighlight ? (
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <article className="space-y-5 rounded-[2rem] border border-brand-border bg-white px-6 py-6 shadow-[0_20px_56px_rgba(35,33,32,0.06)] sm:px-8 sm:py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Highlight Post
            </p>
            <h2 className="font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
              {activeHighlight.title}
            </h2>
            <p className="text-base leading-8 text-brand-muted">
              {activeHighlight.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-brand-muted">
              <span>{formatDate(activeHighlight.publishedAt)}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
              <span>{activeHighlight.readTime}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
              <span>{activeHighlight.postKind}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <NavLink
                to={`/blog/${activeHighlight.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Open Article
              </NavLink>
            </div>

            {highlightPosts.length > 1 ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {highlightPosts.map((post, index) => (
                  <button
                    key={post.slug}
                    type="button"
                    onClick={() => setCurrentHighlightIndex(index)}
                    className={[
                      'rounded-full px-4 py-2 text-left text-xs font-semibold uppercase tracking-[0.24em] transition',
                      currentHighlightIndex === index
                        ? 'bg-brand-green text-white shadow-[0_14px_34px_rgba(43,162,82,0.22)]'
                        : 'border border-brand-border bg-white text-brand-muted hover:border-brand-green hover:text-brand-green',
                    ].join(' ')}
                  >
                    Story {index + 1}
                  </button>
                ))}
              </div>
            ) : null}
          </article>

          <NavLink
            to={`/blog/${activeHighlight.slug}`}
            className="overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-[0_20px_56px_rgba(35,33,32,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_62px_rgba(35,33,32,0.09)]"
          >
            <img
              src={activeHighlight.coverImage}
              alt={activeHighlight.title}
              className="h-72 w-full object-cover sm:h-96"
            />
          </NavLink>
        </section>
      ) : null}

      {videoPosts.length ? (
        <section className="space-y-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Video Posts
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
              Posts with video from the editorial channel.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {videoPosts.map((post) => {
              const videoBlock = getVideoBlock(post)

              return (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-[1.85rem] border border-brand-border bg-white shadow-[0_20px_52px_rgba(35,33,32,0.06)]"
                >
                  <div className="relative overflow-hidden bg-brand-ink">
                    {videoBlock?.poster ? (
                      <img
                        src={videoBlock.poster}
                        alt={post.title}
                        className="h-64 w-full object-cover opacity-92"
                      />
                    ) : (
                      <div className="h-64 w-full bg-brand-ink" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/82 via-brand-ink/24 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green-muted">
                        {post.postKind}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 px-5 py-5">
                    <p className="text-sm leading-7 text-brand-muted">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-brand-muted">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                      <span>{post.readTime}</span>
                    </div>
                    <NavLink
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-brand-border px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                    >
                      Open Post
                    </NavLink>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className="space-y-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Latest Posts
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
              Published articles from Sanity.
            </h2>
          </div>

          <div className="rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-medium text-brand-muted shadow-[0_12px_30px_rgba(35,33,32,0.04)]">
            {posts.length} posts
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginatedPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-[1.8rem] border border-brand-border bg-white shadow-[0_20px_52px_rgba(35,33,32,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_62px_rgba(35,33,32,0.09)]"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-60 w-full object-cover"
              />
              <div className="space-y-4 px-5 py-5">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                  <span>{post.postKind}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-brand-ink">
                  {post.title}
                </h3>
                <p className="text-sm leading-7 text-brand-muted">{post.excerpt}</p>
                <p className="text-sm font-medium text-brand-muted">
                  {formatDate(post.publishedAt)}
                </p>
                <NavLink
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                >
                  Read More
                </NavLink>
              </div>
            </article>
          ))}
        </section>

        {!isLoading && paginatedPosts.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-brand-border bg-white px-6 py-10 text-center sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              No Posts Found
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink">
              No published Sanity posts are available yet.
            </h2>
          </section>
        ) : null}

        {totalPages > 1 ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-45"
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
                  currentPage === page
                    ? 'bg-brand-green text-white shadow-[0_12px_30px_rgba(43,162,82,0.22)]'
                    : 'border border-brand-border bg-white text-brand-ink hover:border-brand-green hover:text-brand-green',
                ].join(' ')}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-45"
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
