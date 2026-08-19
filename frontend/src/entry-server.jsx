import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { SeoProvider } from './components/seo/SeoProvider'
import { AuthProvider } from './context/AuthContext'
import { webmasterVerification } from './data/site/webmaster'
import { setPrerenderBlogData } from './lib/blogApi'

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function render(url, blogData = null) {
  const seo = {}
  setPrerenderBlogData(blogData || {})

  const appHtml = renderToString(
    <SeoProvider
      value={{
        routePath: url,
        setSeo: (payload) => Object.assign(seo, payload),
      }}
    >
      <AuthProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </AuthProvider>
    </SeoProvider>,
  )

  const head = [
    seo.title ? `<title>${escapeHtml(seo.title)}</title>` : '',
    seo.description
      ? `<meta name="description" content="${escapeHtml(seo.description)}" />`
      : '',
    seo.canonicalUrl
      ? `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`
      : '',
    seo.title ? `<meta property="og:title" content="${escapeHtml(seo.title)}" />` : '',
    seo.description
      ? `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
      : '',
    seo.type ? `<meta property="og:type" content="${escapeHtml(seo.type)}" />` : '',
    seo.canonicalUrl
      ? `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`
      : '',
    seo.imageUrl
      ? `<meta property="og:image" content="${escapeHtml(seo.imageUrl)}" />`
      : '',
    seo.title ? `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />` : '',
    seo.description
      ? `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
      : '',
    seo.imageUrl
      ? `<meta name="twitter:image" content="${escapeHtml(seo.imageUrl)}" />`
      : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="robots" content="${escapeHtml(seo.robots || 'index,follow')}" />`,
    ...(Array.isArray(seo.structuredData) ? seo.structuredData : [seo.structuredData])
      .filter(Boolean)
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`),
    webmasterVerification.google
      ? `<meta name="google-site-verification" content="${escapeHtml(webmasterVerification.google)}" />`
      : '',
    webmasterVerification.bing
      ? `<meta name="msvalidate.01" content="${escapeHtml(webmasterVerification.bing)}" />`
      : '',
  ]
    .filter(Boolean)
    .join('\n')

  return {
    appHtml,
    head,
  }
}
