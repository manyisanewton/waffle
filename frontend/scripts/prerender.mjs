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

  return html.replace('</head>', `${headMarkup}\n</head>`)
}

const baseTemplate = await readFile(path.join(distDir, 'index.html'), 'utf8')
const routes = [...new Set(getPublicPrerenderRoutes())]

for (const route of routes) {
  const { appHtml, head } = render(route)
  const htmlWithHead = injectHead(baseTemplate, head)
  const finalHtml = htmlWithHead.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  const outputPath = getOutputPath(route)

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, finalHtml, 'utf8')
}

await rm(path.join(distDir, 'server'), { recursive: true, force: true })
console.log(`Prerendered ${routes.length} public routes.`)
