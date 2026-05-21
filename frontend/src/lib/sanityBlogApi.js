const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'pxbfeggb'
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'
const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2025-02-19'

const SANITY_QUERY_ENDPOINT = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
const DEFAULT_AUTHOR = 'Vortexus Editorial Team'
const DEFAULT_POST_IMAGE = '/images/placeholder-product.webp'

let cachedPosts = null
let postsPromise = null

const SANITY_POST_PROJECTION = `{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  isHighlight,
  metaTitle,
  metaDescription,
  videoUrl,
  mainImage{
    asset->{
      url,
      metadata{
        dimensions{
          width,
          height,
          aspectRatio
        }
      }
    }
  },
  ogImage{
    asset->{
      url
    }
  },
  videoFile{
    asset->{
      url
    }
  },
  body[]{
    ...,
    asset->{
      url,
      metadata{
        dimensions{
          width,
          height,
          aspectRatio
        }
      }
    }
  }
}`

function formatCategoryLabel(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function normalizeWhitespace(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractPortableText(block) {
  if (!block || !Array.isArray(block.children)) {
    return ''
  }

  return normalizeWhitespace(
    block.children
      .map((child) => child.text || '')
      .join(' '),
  )
}

function isDirectVideoUrl(url) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url || '')
}

function estimateReadTime(text) {
  const wordCount = normalizeWhitespace(text).split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(wordCount / 200))} min read`
}

function normalizeBodyBlocks(rawBody = []) {
  const blocks = []
  let activeList = null

  const flushList = () => {
    if (activeList && activeList.items.length) {
      blocks.push(activeList)
    }
    activeList = null
  }

  rawBody.forEach((item) => {
    if (item?._type === 'block') {
      const content = extractPortableText(item)
      const style = item.style || 'normal'

      if (item.listItem) {
        if (!activeList) {
          activeList = { type: 'list', items: [] }
        }

        if (content) {
          activeList.items.push(content)
        }
        return
      }

      flushList()

      if (!content) {
        return
      }

      if (/^h[2-6]$/i.test(style)) {
        blocks.push({
          type: 'heading',
          level: Number(style.slice(1)) || 2,
          content,
        })
        return
      }

      if (style === 'blockquote') {
        blocks.push({
          type: 'quote',
          content,
        })
        return
      }

      blocks.push({
        type: 'paragraph',
        content,
      })
      return
    }

    flushList()

    if (item?._type === 'image' && item.asset?.url) {
      blocks.push({
        type: 'image',
        src: item.asset.url,
        alt: item.alt || item.caption || 'Blog image',
        caption: item.caption || '',
      })
    }
  })

  flushList()
  return blocks
}

function normalizeSanityPost(rawPost) {
  const contentBlocks = normalizeBodyBlocks(rawPost.body)
  const bodyText = contentBlocks
    .filter((block) => block.type === 'paragraph' || block.type === 'heading' || block.type === 'quote')
    .map((block) => block.content)
    .join(' ')

  const videoSource = rawPost.videoFile?.asset?.url || rawPost.videoUrl
  const postKind = videoSource && isDirectVideoUrl(videoSource)
    ? 'Video Post'
    : rawPost.isHighlight
      ? 'Featured Post'
      : 'Article'

  if (videoSource && isDirectVideoUrl(videoSource)) {
    contentBlocks.push({
      type: 'video',
      src: videoSource,
      poster: rawPost.mainImage?.asset?.url || DEFAULT_POST_IMAGE,
      caption: 'Video attached to this article.',
    })
  }

  return {
    slug: rawPost.slug,
    title: rawPost.metaTitle || rawPost.title,
    excerpt: rawPost.excerpt || 'Read the latest update from Vortexus Industrial Excellence.',
    category: 'blog',
    categoryLabel: 'Blog',
    author: DEFAULT_AUTHOR,
    publishedAt: rawPost.publishedAt || new Date().toISOString(),
    readTime: estimateReadTime(`${rawPost.title || ''} ${rawPost.excerpt || ''} ${bodyText}`),
    coverImage: rawPost.mainImage?.asset?.url || rawPost.ogImage?.asset?.url || DEFAULT_POST_IMAGE,
    heroImage: rawPost.ogImage?.asset?.url || rawPost.mainImage?.asset?.url || DEFAULT_POST_IMAGE,
    featured: Boolean(rawPost.isHighlight),
    tags: [],
    postKind,
    seoDescription: rawPost.metaDescription || rawPost.excerpt || 'Read the latest Vortexus article.',
    blocks: contentBlocks.length
      ? contentBlocks
      : [
          {
            type: 'paragraph',
            content:
              rawPost.excerpt || 'This article is available in the Vortexus editorial library.',
          },
        ],
  }
}

async function fetchSanityQuery(query) {
  const response = await fetch(`${SANITY_QUERY_ENDPOINT}?query=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}.`)
  }

  const payload = await response.json()
  return Array.isArray(payload.result) ? payload.result : payload.result || null
}

async function fetchSanityPosts() {
  const query = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) ${SANITY_POST_PROJECTION}`
  const result = await fetchSanityQuery(query)

  return Array.isArray(result)
    ? result
        .map(normalizeSanityPost)
        .filter((post) => post.slug && post.title)
    : []
}

export function getFallbackBlogPosts() {
  return []
}

export function getFallbackBlogPostBySlug(slug) {
  return null
}

export function getBlogCategories(posts) {
  return [
    {
      slug: 'all',
      label: 'All Posts',
      count: posts.length,
    },
  ]
}

export function getRelatedBlogPosts(posts, post, limit = 3) {
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTitleTokens = normalizeWhitespace(post.title)
        .toLowerCase()
        .split(/[^a-z0-9]+/i)
        .filter((token) => token.length >= 5)
        .filter((token) => candidate.title.toLowerCase().includes(token)).length

      const sharedBodyTokens = normalizeWhitespace(
        post.blocks
          .filter((block) => block.type === 'paragraph' || block.type === 'heading')
          .map((block) => block.content)
          .join(' '),
      )
        .toLowerCase()
        .split(/[^a-z0-9]+/i)
        .filter((token) => token.length >= 7)
        .filter((token) =>
          normalizeWhitespace(candidate.excerpt).toLowerCase().includes(token) ||
          normalizeWhitespace(candidate.title).toLowerCase().includes(token),
        ).length

      const score =
        (candidate.featured ? 2 : 0) +
        Math.min(sharedTitleTokens, 4) * 3 +
        Math.min(sharedBodyTokens, 4)

      return { candidate, score }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.candidate.title.localeCompare(right.candidate.title))
    .map(({ candidate }) => candidate)
    .slice(0, limit)
}

export async function loadBlogPosts() {
  if (cachedPosts) {
    return cachedPosts
  }

  if (!postsPromise) {
    postsPromise = fetchSanityPosts()
      .then((posts) => {
        cachedPosts = posts
        return cachedPosts
      })
      .catch(() => {
        cachedPosts = []
        return cachedPosts
      })
  }

  return postsPromise
}

export async function loadBlogPostBySlug(slug) {
  const posts = await loadBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}
