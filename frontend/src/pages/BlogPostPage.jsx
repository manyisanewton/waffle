import { useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTag,
  FaTint,
  FaTwitter,
  FaUser,
  FaWhatsapp,
} from 'react-icons/fa'
import BlogContentRenderer from '../components/blog/BlogContentRenderer'
import Seo from '../components/seo/Seo'
import {
  getRelatedBlogPosts,
  getFallbackBlogPostBySlug,
  getFallbackBlogPosts,
  loadBlogPostBySlug,
  loadBlogPosts,
} from '../lib/sanityBlogApi'
import { company } from '../data/site/company'

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

function getPostKind(post) {
  return post.postKind || post.categoryLabel || 'Article'
}

function getArticleUrl(post) {
  return `${company.siteUrl.replace(/\/$/, '')}/blog/${post.slug}`
}

function getShareLinks(post) {
  const articleUrl = encodeURIComponent(getArticleUrl(post))
  const title = encodeURIComponent(post.title)

  return [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
      icon: FaFacebookF,
      className: 'bg-[#1877f2]',
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${articleUrl}&text=${title}`,
      icon: FaTwitter,
      className: 'bg-black',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`,
      icon: FaLinkedinIn,
      className: 'bg-[#0a66c2]',
    },
    {
      label: 'Instagram',
      href: company.socialLinks.instagram,
      icon: FaInstagram,
      className: 'bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${title}%20${articleUrl}`,
      icon: FaWhatsapp,
      className: 'bg-[#25d366]',
    },
  ]
}

function BlogPostPage() {
  const { slug } = useParams()
  const [posts, setPosts] = useState(() => getFallbackBlogPosts())
  const [post, setPost] = useState(() => getFallbackBlogPostBySlug(slug))
  const [isLoading, setIsLoading] = useState(() => !getFallbackBlogPostBySlug(slug))
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    let isCancelled = false

    Promise.all([loadBlogPosts(), loadBlogPostBySlug(slug)])
      .then(([livePosts, livePost]) => {
        if (isCancelled) {
          return
        }

        setPosts(livePosts)
        setPost(livePost)
        setIsLoading(false)
      })
      .catch(() => {
        if (!isCancelled) {
          setPosts([])
          setPost(null)
          setIsLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [slug])

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
    () => (post ? getRelatedBlogPosts(posts, post, 3) : []),
    [posts, post],
  )

  const sidebarPosts = useMemo(() => {
    if (!post) {
      return []
    }

    const preferredPosts = relatedPosts.length ? relatedPosts : posts
    return preferredPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 3)
  }, [post, posts, relatedPosts])

  const relatedTopics = useMemo(() => {
    if (!post) {
      return []
    }

    const topics = [post.categoryLabel, ...(post.tags || [])].filter(Boolean)
    return [...new Set(topics)].slice(0, 4)
  }, [post])

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

  if (isLoading && !post) {
    return (
      <div className="space-y-10 text-brand-ink">
        <Seo title="Loading Article" description="Loading the requested blog article." />
        <section className="overflow-hidden rounded-[2rem] border border-brand-border bg-white px-6 py-14 shadow-[0_18px_46px_rgba(35,33,32,0.05)] sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Loading Article
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Retrieving the requested post.
          </h1>
        </section>
      </div>
    )
  }

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <>
      <Seo title={post.title} description={post.seoDescription || post.excerpt} />
      <div className="space-y-12 text-brand-ink lg:space-y-16">
        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-brand-ink text-white">
          <img
            src={post.heroImage || post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/92 via-brand-ink/72 to-brand-ink/25" />
          <div className="relative mx-auto min-h-[520px] max-w-7xl px-6 py-20 sm:px-8 lg:flex lg:items-center lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-brand-blue px-3 py-1 text-xs font-extrabold uppercase tracking-[0.22em] text-white">
                {getPostKind(post)}
              </span>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/88 sm:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/90">
                <span className="inline-flex items-center gap-2">
                  <FaCalendarAlt className="text-brand-blue" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaClock className="text-brand-blue" />
                  {post.readTime}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-3 py-1.5 text-xs text-white">
                  <FaTag />
                  {post.categoryLabel || getPostKind(post)}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 rounded-2xl bg-white px-3 py-4 text-center text-brand-ink shadow-[0_18px_46px_rgba(0,0,0,0.18)] xl:block">
            <p className="text-xs font-bold">Share</p>
            <div className="mt-3 space-y-2">
              {getShareLinks(post).map((shareLink) => {
                const ShareIcon = shareLink.icon
                return (
                  <a
                    key={shareLink.label}
                    href={shareLink.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Share on ${shareLink.label}`}
                    className={`${shareLink.className} flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:-translate-y-0.5`}
                  >
                    <ShareIcon />
                  </a>
                )
              })}
            </div>
          </div>

          <svg
            className="absolute bottom-[-1px] left-0 h-14 w-full text-white"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 54L80 47C160 40 320 26 480 34C640 42 800 72 960 65C1120 58 1280 16 1360 10L1440 4V90H0V54Z"
              fill="currentColor"
            />
            <path
              d="M0 50L80 43C160 36 320 22 480 30C640 38 800 68 960 61C1120 54 1280 12 1360 6L1440 0"
              fill="none"
              stroke="#0d7ce8"
              strokeWidth="7"
            />
          </svg>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.3fr)] lg:items-start">
          <article className="space-y-8">
            {contentHeadings.length > 0 ? (
              <div className="rounded-xl border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.06)]">
                <h2 className="font-display text-lg font-semibold text-brand-ink">
                  In this article:
                </h2>
                <nav className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-brand-muted">
                  {contentHeadings.slice(0, 6).map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="inline-flex items-center gap-2 transition hover:text-brand-blue"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                      {heading.label}
                    </a>
                  ))}
                </nav>
              </div>
            ) : null}

            {contentHeadings.length > 0 ? (
              <div className="rounded-2xl bg-gradient-to-br from-brand-blue/10 to-white px-5 py-5">
                <div className="space-y-2">
                  {contentHeadings.slice(0, 6).map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-brand-ink transition hover:bg-white hover:text-brand-blue"
                    >
                      <span className="inline-flex items-center gap-3">
                        <FaTint className="text-brand-blue" />
                        {heading.label}
                      </span>
                      <FaChevronRight className="text-xs text-brand-blue" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="blog-article-body rounded-[1.5rem] bg-white">
              <BlogContentRenderer blocks={post.blocks} onImageClick={setSelectedImage} />
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-brand-blue/12 to-white px-6 py-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-brand-blue text-xl text-white">
                  <FaTint />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-brand-ink">
                    Have a water challenge?
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-brand-muted">
                    Let&apos;s build a lasting solution together.
                  </p>
                </div>
              </div>
              <NavLink
                to="/request-quote"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-[#075eb8] sm:mt-0"
              >
                Request a Quote
                <FaArrowRight />
              </NavLink>
            </div>
          </article>

          <aside className="space-y-7 lg:sticky lg:top-[108px]">
            <div className="rounded-2xl border border-brand-border bg-white px-6 py-6 shadow-[0_18px_46px_rgba(35,33,32,0.06)]">
              <span className="block h-1 w-10 rounded-full bg-brand-blue" />
              <h2 className="mt-5 font-display text-xl font-semibold text-brand-ink">
                About This Article
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">
                This article is part of our practical guidance for water systems,
                product selection, and field-ready project planning.
              </p>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex gap-3">
                  <FaTag className="mt-1 text-brand-blue" />
                  <div>
                    <dt className="font-bold text-brand-ink">Category</dt>
                    <dd className="text-brand-muted">{post.categoryLabel || getPostKind(post)}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FaClock className="mt-1 text-brand-blue" />
                  <div>
                    <dt className="font-bold text-brand-ink">Reading Time</dt>
                    <dd className="text-brand-muted">{post.readTime}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FaCalendarAlt className="mt-1 text-brand-blue" />
                  <div>
                    <dt className="font-bold text-brand-ink">Published</dt>
                    <dd className="text-brand-muted">{formatDate(post.publishedAt)}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FaUser className="mt-1 text-brand-blue" />
                  <div>
                    <dt className="font-bold text-brand-ink">Author</dt>
                    <dd className="text-brand-muted">{post.author}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {relatedTopics.length > 0 ? (
              <div className="rounded-2xl border border-brand-border bg-white px-6 py-6 shadow-[0_18px_46px_rgba(35,33,32,0.06)]">
                <span className="block h-1 w-10 rounded-full bg-brand-blue" />
                <h2 className="mt-5 font-display text-xl font-semibold text-brand-ink">
                  Related Topics
                </h2>
                <div className="mt-5 space-y-3">
                  {relatedTopics.map((topic) => (
                    <span
                      key={topic}
                      className="flex items-center gap-3 text-sm font-medium text-brand-muted"
                    >
                      <FaChevronRight className="text-xs text-brand-blue" />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {sidebarPosts.length > 0 ? (
              <div className="rounded-2xl border border-brand-border bg-white px-6 py-6 shadow-[0_18px_46px_rgba(35,33,32,0.06)]">
                <span className="block h-1 w-10 rounded-full bg-brand-blue" />
                <h2 className="mt-5 font-display text-xl font-semibold text-brand-ink">
                  Popular Posts
                </h2>
                <div className="mt-5 space-y-4">
                  {sidebarPosts.map((relatedPost) => (
                    <NavLink
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="grid grid-cols-[80px_1fr] gap-3 rounded-xl transition hover:text-brand-blue"
                    >
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <span>
                        <span className="block text-sm font-bold leading-5 text-brand-ink">
                          {relatedPost.title}
                        </span>
                        <span className="mt-2 block text-xs font-semibold text-brand-muted">
                          {formatDate(relatedPost.publishedAt)}
                        </span>
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="overflow-hidden rounded-2xl bg-brand-ink text-white shadow-[0_18px_46px_rgba(35,33,32,0.12)]">
              <div className="bg-[url('/images/water-treament.webp')] bg-cover bg-center px-6 py-7">
                <h2 className="font-display text-xl font-semibold text-white">
                  Stay Updated
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  Get the latest articles, updates, and water-system insights.
                </p>
                <form className="mt-5 space-y-3">
                  <label className="sr-only" htmlFor="blog-email">
                    Email address
                  </label>
                  <input
                    id="blog-email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-white/20 bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-[#075eb8]"
                  >
                    <FaEnvelope />
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </section>

        <section className="overflow-hidden rounded-2xl bg-brand-ink px-6 py-8 text-white shadow-[0_20px_56px_rgba(35,33,32,0.12)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-9">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-brand-blue text-xl">
              <FaCheckCircle />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-white">
                Need help with your water project?
              </h2>
              <p className="mt-1 text-sm text-white/76">
                Our experts are ready to help you find the right solution.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-0">
            <NavLink
              to="/request-quote"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-brand-ink transition hover:bg-brand-surface"
            >
              Request a Quote
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact Us
            </NavLink>
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
