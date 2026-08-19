import { useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { FaArrowRight, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa'
import BlogContentRenderer from '../components/blog/BlogContentRenderer'
import Seo from '../components/seo/Seo'
import { getFallbackBlogPostBySlug, loadBlogPostBySlug, resolveBlogRedirect } from '../lib/blogApi'
import { company } from '../data/site/company'

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
}

function headingId(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function BlogPostPage() {
  const { slug } = useParams()
  const initialPost = useMemo(() => getFallbackBlogPostBySlug(slug), [slug])
  const [post, setPost] = useState(initialPost)
  const [loadedSlug, setLoadedSlug] = useState(initialPost ? slug : null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    let cancelled = false
    loadBlogPostBySlug(slug)
      .then((result) => { if (!cancelled) setPost(result) })
      .catch(async () => {
        try {
          const redirect = await resolveBlogRedirect(`/blog/${slug}`)
          if (!cancelled && redirect?.destination) window.location.replace(redirect.destination)
        } catch {
          if (!cancelled) setPost(null)
        }
      })
      .finally(() => { if (!cancelled) setLoadedSlug(slug) })
    return () => { cancelled = true }
  }, [slug])

  const headings = useMemo(() => (post?.blocks || [])
    .filter((block) => block.type === 'heading')
    .map((block) => ({ id: headingId(block.content), label: block.content, level: block.level })), [post])

  const schemas = useMemo(() => {
    if (!post) return []
    const url = `${company.siteUrl.replace(/\/$/, '')}/blog/${post.slug}`
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        image: post.ogImage || post.heroImage || post.coverImage,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: { '@type': 'Person', name: post.author },
        publisher: { '@type': 'Organization', name: 'Vortexus Industrial Excellence', logo: { '@type': 'ImageObject', url: new URL(company.logo, company.siteUrl).toString() } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: company.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${company.siteUrl.replace(/\/$/, '')}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ]
  }, [post])

  if (loadedSlug !== slug) return <div className="mx-auto max-w-3xl py-24 text-center text-brand-muted">Loading article…</div>
  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        canonicalPath={post.canonicalUrl || `/blog/${post.slug}`}
        imagePath={post.ogImage || post.heroImage || post.coverImage}
        type="article"
        includeSiteName={!post.seoTitle}
        robots={post.robotsIndex === false ? 'noindex,follow' : 'index,follow'}
        structuredData={schemas}
      />

      <article className="relative w-screen [margin-left:calc(50%-50vw)] bg-white pb-8 text-brand-ink">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pt-8 sm:px-8 sm:pt-14 lg:grid-cols-[270px_minmax(0,760px)] lg:items-start lg:justify-start lg:gap-16">
          {headings.length ? (
            <nav className="order-2 hidden border-l-2 border-brand-blue pl-6 lg:sticky lg:top-40 lg:order-1 lg:block lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto" aria-label="Table of contents">
              <p className="font-display text-2xl font-semibold">In this article</p>
              <ol className="mt-6 space-y-4 text-[0.95rem] leading-6 text-brand-muted">
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 3 ? 'pl-5' : ''}>
                    <a href={`#${heading.id}`} className="block transition hover:translate-x-1 hover:text-brand-blue">
                      {heading.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : <div className="hidden lg:block" />}

          <div className="order-1 min-w-0 lg:order-2">
            <header>
              <nav className="text-sm text-brand-muted" aria-label="Breadcrumb">
                <NavLink to="/" className="hover:text-brand-blue">Home</NavLink> / <NavLink to="/blog" className="hover:text-brand-blue">Blog</NavLink> / <span>{post.categoryLabel}</span>
              </nav>
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.28em] text-brand-blue">{post.categoryLabel || 'Article'}</p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">{post.title}</h1>
              <p className="mt-6 text-lg leading-8 text-brand-muted">{post.excerpt}</p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-brand-border pt-5 text-sm text-brand-muted">
                <span className="inline-flex items-center gap-2"><FaCalendarAlt /> {formatDate(post.publishedAt)}</span>
                <span className="inline-flex items-center gap-2"><FaClock /> {post.readTime}</span>
                <span className="inline-flex items-center gap-2"><FaUser /> {post.author}</span>
              </div>
            </header>

            {post.heroImage ? (
              <div className="mt-10 flex w-full max-w-full items-center justify-center overflow-hidden bg-white">
                <img src={post.heroImage} alt={post.title} className="h-auto max-h-[440px] max-w-full object-contain" />
              </div>
            ) : null}

            <div className="blog-article-body mt-14">
              <BlogContentRenderer blocks={post.blocks} onImageClick={setSelectedImage} />
            </div>

            <footer className="mt-16 border-t border-brand-border pt-8">
              <p className="font-display text-2xl font-semibold">Need help choosing the right equipment?</p>
              <p className="mt-3 leading-7 text-brand-muted">Talk to the Vortexus team about your water treatment, pool, pumping or solar project.</p>
              <NavLink to="/request-quote" className="mt-6 inline-flex items-center gap-2 font-bold text-brand-blue">Request a quote <FaArrowRight /></NavLink>
            </footer>
          </div>
        </div>
      </article>

      {selectedImage ? (
        <button type="button" className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 p-5" onClick={() => setSelectedImage(null)} aria-label="Close image">
          <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[90vh] max-w-[95vw] object-contain" />
        </button>
      ) : null}
    </>
  )
}

export default BlogPostPage
