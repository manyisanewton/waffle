const API_BASE_URL = (import.meta.env.VITE_BLOG_API_URL || 'https://blog.vortexusindustrial.com').replace(/\/$/, '')
const DEFAULT_AUTHOR = 'Vortexus Editorial Team'
const DEFAULT_POST_IMAGE = '/images/water-treament.webp'

let cachedPosts = null
let postsPromise = null

function absoluteMediaUrl(value) {
  if (!value) return ''
  if (/^https?:\/\//i.test(value)) return value
  return `${API_BASE_URL}${value.startsWith('/') ? '' : '/'}${value}`
}

function mediaVariant(media, preferred, fallback = DEFAULT_POST_IMAGE) {
  const urls = media?.urls || {}
  return absoluteMediaUrl(urls[preferred] || urls.hero || urls.card || fallback)
}

function plainText(value) {
  if (typeof document !== 'undefined') {
    const element = document.createElement('div')
    element.innerHTML = String(value || '')
    return element.textContent || ''
  }
  return String(value || '').replace(/<[^>]*>/g, ' ')
}

function estimateReadTime(blocks) {
  const text = blocks
    .map((block) => block.html || block.content || block.text || (block.items || []).join(' '))
    .join(' ')
  const words = plainText(text).trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function normalizeBlock(block, media = {}) {
  if (block.type === 'paragraph') return { ...block, content: plainText(block.html), html: block.html || '' }
  if (block.type === 'heading') return { ...block, content: block.text || '' }
  if (block.type === 'quote') return { ...block, content: block.text || '' }
  if (block.type === 'image') {
    const asset = media[String(block.media_id)]
    return {
      ...block,
      src: mediaVariant(asset, block.layout === 'wide' ? 'hero' : 'card'),
      alt: block.alt || asset?.alt_text || '',
      caption: block.caption || asset?.caption || '',
    }
  }
  if (block.type === 'video') return { ...block, src: block.url || '' }
  if (block.type === 'cta') {
    return {
      ...block,
      buttonLabel: block.button_label || 'Learn more',
      buttonHref: block.button_url || '/contact-us',
      openInNewTab: Boolean(block.open_in_new_tab),
      nofollow: Boolean(block.nofollow),
      sponsored: Boolean(block.sponsored),
    }
  }
  return block
}

function normalizeApiPost(raw, includeContent = false) {
  const blocks = includeContent ? (raw.content || []).map((block) => normalizeBlock(block, raw.media)) : []
  return {
    slug: raw.slug,
    title: raw.title,
    seoTitle: raw.seo_title || '',
    excerpt: raw.excerpt || 'Read the latest update from Vortexus Industrial Excellence.',
    category: raw.category?.slug || 'blog',
    categoryLabel: raw.category?.name || 'Blog',
    author: raw.author?.name || DEFAULT_AUTHOR,
    publishedAt: raw.published_at || raw.created_at,
    updatedAt: raw.updated_at || raw.published_at || raw.created_at,
    readTime: estimateReadTime(blocks.length ? blocks : [{ content: raw.excerpt }]),
    coverImage: mediaVariant(raw.featured_image, 'card'),
    heroImage: mediaVariant(raw.featured_image, 'hero'),
    ogImage: mediaVariant(raw.og_image || raw.featured_image, 'social'),
    featured: Boolean(raw.is_featured),
    tags: (raw.tags || []).map((tag) => tag.name),
    postKind: raw.category?.name || 'Article',
    seoDescription: raw.meta_description || raw.excerpt || '',
    canonicalUrl: raw.canonical_url || '',
    robotsIndex: raw.robots_index !== false,
    focusKeyword: raw.focus_keyword || '',
    blocks,
  }
}

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Blog API request failed (${response.status}).`)
  return response.json()
}

export function getFallbackBlogPosts() {
  return []
}

export function getFallbackBlogPostBySlug(slug) {
  return getFallbackBlogPosts().find((post) => post.slug === slug) || null
}

export function getBlogCategories(posts) {
  const counts = new Map()
  posts.forEach((post) => counts.set(post.category, (counts.get(post.category) || 0) + 1))
  return [{ slug: 'all', label: 'All Posts', count: posts.length }, ...[...counts].map(([slug, count]) => ({
    slug,
    label: posts.find((post) => post.category === slug)?.categoryLabel || slug,
    count,
  }))]
}

export function getRelatedBlogPosts(posts, post, limit = 3) {
  const tags = new Set(post.tags || [])
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: (candidate.category === post.category ? 5 : 0) +
        (candidate.tags || []).filter((tag) => tags.has(tag)).length * 3 +
        (candidate.featured ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || new Date(b.candidate.publishedAt) - new Date(a.candidate.publishedAt))
    .map(({ candidate }) => candidate)
    .slice(0, limit)
}

export async function loadBlogPosts({ force = false } = {}) {
  if (cachedPosts && !force) return cachedPosts
  if (!postsPromise || force) {
    postsPromise = request('/api/posts?per_page=50')
      .then(({ posts }) => {
        cachedPosts = posts.map((post) => normalizeApiPost(post))
        return cachedPosts
      })
      .catch((error) => {
        cachedPosts = getFallbackBlogPosts()
        console.warn('The live blog API is unavailable.', error)
        return cachedPosts
      })
      .finally(() => { postsPromise = null })
  }
  return postsPromise
}

export async function loadBlogPostBySlug(slug) {
  try {
    const { post } = await request(`/api/posts/${encodeURIComponent(slug)}`)
    return normalizeApiPost(post, true)
  } catch (error) {
    const fallback = getFallbackBlogPostBySlug(slug)
    if (fallback) return fallback
    throw error
  }
}

export async function resolveBlogRedirect(path) {
  const { redirect } = await request(`/api/redirects/resolve?path=${encodeURIComponent(path)}`)
  return redirect
}
