import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { company } from '../src/data/site/company.js'
import { getPublicPrerenderRoutes } from '../src/prerender/routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const siteUrl = company.siteUrl.replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function routeMeta(route) {
  if (route === '/') return { changefreq: 'weekly', priority: '1.0' }
  if (route === '/products') return { changefreq: 'weekly', priority: '0.9' }
  if (route.startsWith('/products/item/')) return { changefreq: 'monthly', priority: '0.8' }
  if (route.startsWith('/products/category/')) return { changefreq: 'weekly', priority: '0.8' }
  if (route.startsWith('/brands/')) return { changefreq: 'monthly', priority: '0.7' }
  if (route.startsWith('/industries/') || route.startsWith('/solutions/')) {
    return { changefreq: 'monthly', priority: '0.7' }
  }
  return { changefreq: 'monthly', priority: '0.6' }
}

const routes = [...new Set(getPublicPrerenderRoutes())].sort((a, b) => {
  if (a === '/') return -1
  if (b === '/') return 1
  return a.localeCompare(b)
})

const urls = routes
  .map((route) => {
    const { changefreq, priority } = routeMeta(route)
    const loc = `${siteUrl}${route === '/' ? '' : route}`
    return [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n')
  })
  .join('\n')

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  '</urlset>',
  '',
].join('\n')

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n')

mkdirSync(distDir, { recursive: true })
writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
writeFileSync(path.join(distDir, 'robots.txt'), robots)

console.log(`Generated sitemap.xml with ${routes.length} URLs`)
