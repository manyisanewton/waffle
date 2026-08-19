import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { getPublicPrerenderRoutes } from '../src/prerender/routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(__dirname, '..')
const distDir = path.join(frontendRoot, 'dist')
const serverBundlePath = path.join(distDir, 'server', 'entry-server.js')
const serverBundle = await import(pathToFileURL(serverBundlePath).href)
const { render } = serverBundle
const blogApiUrl = (process.env.VITE_BLOG_API_URL || 'https://blog.vortexusindustrial.com').replace(/\/$/, '')

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Blog API returned ${response.status} for ${url}`)
  return response.json()
}

let blogPosts = []
const detailedPosts = new Map()

try {
  const payload = await fetchJson(`${blogApiUrl}/api/posts?per_page=50`)
  blogPosts = payload.posts || []
  await Promise.all(blogPosts.map(async (post) => {
    const detail = await fetchJson(`${blogApiUrl}/api/posts/${encodeURIComponent(post.slug)}`)
    detailedPosts.set(post.slug, detail.post)
  }))
} catch (error) {
  console.warn(`Blog prerendering skipped: ${error.message}`)
}

function withoutQuery(route) {
  return route.split('?')[0]
}

function getOutputPath(route) {
  const cleanRoute = withoutQuery(route)

  if (cleanRoute === '/') {
    return path.join(distDir, 'index.html')
  }

  return path.join(distDir, cleanRoute.replace(/^\//, ''), 'index.html')
}

function injectHead(template, headMarkup) {
  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/g, '')
  html = html.replace(/<meta\s+name="description"[^>]*>/, '')
  html = html.replace(/<link\s+rel="canonical"[^>]*>/, '')
  html = html.replace(/<meta\s+property="og:[^"]+"[^>]*>/g, '')
  html = html.replace(/<meta\s+name="twitter:[^"]+"[^>]*>/g, '')
  html = html.replace(/<meta\s+name="robots"[^>]*>/g, '')
  html = html.replace(/<meta\s+name="google-site-verification"[^>]*>/g, '')
  html = html.replace(/<meta\s+name="msvalidate\.01"[^>]*>/g, '')

  return html.replace('</head>', `${headMarkup}\n</head>`)
}

const baseTemplate = await readFile(path.join(distDir, 'index.html'), 'utf8')
const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`)
const routes = [...new Set([...getPublicPrerenderRoutes(), ...blogRoutes])]

for (const route of routes) {
  const slug = route.startsWith('/blog/') ? route.slice('/blog/'.length) : ''
  const blogData = route === '/blog'
    ? { posts: blogPosts }
    : slug
      ? { posts: blogPosts, post: detailedPosts.get(slug) || null }
      : null
  const { appHtml, head } = render(route, blogData)
  const preloadJson = blogData
    ? `<script>window.__VORTEXUS_BLOG_DATA__=${JSON.stringify(blogData).replaceAll('<', '\\u003c')}</script>`
    : ''
  const htmlWithHead = injectHead(baseTemplate, `${head}\n${preloadJson}`)
  const finalHtml = htmlWithHead.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  const outputPath = getOutputPath(route)

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, finalHtml, 'utf8')
}

await rm(path.join(distDir, 'server'), { recursive: true, force: true })
console.log(`Prerendered ${routes.length} public routes.`)
