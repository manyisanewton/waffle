import { useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import BlogContentRenderer from '../components/blog/BlogContentRenderer'
import FullBleedHero from '../components/sections/FullBleedHero'
import { getBlogPostBySlug, getRelatedBlogPosts } from '../data/blogPosts'

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)
  const [selectedImage, setSelectedImage] = useState(null)

  const contentHeadings = useMemo(
    () =>
      post
        ? post.blocks
            .filter((block) => block.type === 'heading')
            .map((block) => ({
              id: block.content
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, ''),
              label: block.content,
            }))
        : [],
    [post],
  )

  const relatedPosts = useMemo(
    () => (post ? getRelatedBlogPosts(post, 3) : []),
    [post],
  )

  useEffect(() => {
    if (!selectedImage) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <>
      <div className="space-y-14 text-brand-ink lg:space-y-20">
        <FullBleedHero
          eyebrow={post.categoryLabel}
          title={post.title}
          description={post.excerpt}
          imageSrc={post.heroImage}
          imageAlt={post.title}
          overlayClassName="theme-hero-dark-strong"
        >
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span>{post.author}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>{post.readTime}</span>
          </div>
        </FullBleedHero>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.3fr)] lg:items-start">
          <article className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <NavLink
                to="/blog"
                className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
              >
                Back to Blog
              </NavLink>
              <span className="rounded-full bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-green">
                {post.categoryLabel}
              </span>
            </div>

            <BlogContentRenderer
              blocks={post.blocks}
              onImageClick={setSelectedImage}
            />
          </article>

          <aside className="space-y-5 lg:sticky lg:top-[108px]">
            {contentHeadings.length > 0 ? (
              <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                  On This Page
                </p>
                <nav className="mt-5 space-y-3">
                  {contentHeadings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="block text-sm font-medium leading-7 text-brand-muted transition hover:text-brand-green"
                    >
                      {heading.label}
                    </a>
                  ))}
                </nav>
              </div>
            ) : null}

            <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Article Details
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-brand-muted">
                <p>
                  <span className="font-semibold text-brand-ink">Author:</span>{' '}
                  {post.author}
                </p>
                <p>
                  <span className="font-semibold text-brand-ink">Published:</span>{' '}
                  {formatDate(post.publishedAt)}
                </p>
                <p>
                  <span className="font-semibold text-brand-ink">Read time:</span>{' '}
                  {post.readTime}
                </p>
                <div>
                  <p className="font-semibold text-brand-ink">Tags:</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-brand-surface px-5 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Next Reading
              </p>
              <div className="mt-5 space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <NavLink
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="block overflow-hidden rounded-[1.25rem] border border-brand-border bg-white transition hover:border-brand-green"
                  >
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="h-32 w-full object-cover"
                    />
                    <div className="px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                        {relatedPost.categoryLabel}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-semibold text-brand-ink">
                        {relatedPost.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-brand-muted">
                        {relatedPost.readTime}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="overflow-hidden rounded-[2rem] bg-brand-ink px-6 py-10 text-white shadow-[0_24px_70px_rgba(35,33,32,0.12)] sm:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
                Continue Exploring
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Looking for practical water, pumping, and infrastructure insight?
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
                Browse more articles or move straight into the solutions and project
                pages if you want to see how the ideas are applied in delivery.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <NavLink
                to="/blog"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Back to Blog
              </NavLink>
              <NavLink
                to="/solutions"
                className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Browse Solutions
              </NavLink>
            </div>
          </div>
        </section>
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-brand-ink/88 px-4 py-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/12 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-ink/78 text-xl font-semibold text-white transition hover:bg-brand-ink"
              aria-label="Close image"
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[82vh] w-full object-contain bg-brand-ink/3"
            />
            {selectedImage.caption ? (
              <div className="border-t border-brand-border px-5 py-4 text-sm leading-7 text-brand-muted">
                {selectedImage.caption}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default BlogPostPage
