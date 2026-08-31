import { useEffect } from 'react'
import { company } from '../../data/site/company'
import { localBusinessSchema } from '../../data/site/localBusinessSchema'
import { webmasterVerification } from '../../data/site/webmaster'
import { useSeoContext } from './SeoProvider'

const SITE_NAME = 'Vortexus Industrial Excellence'
const DEFAULT_DESCRIPTION =
  'Vortexus Industrial Excellence supplies industrial water-treatment products, pumps, filtration systems, chemicals, instrumentation, tanks, and RFQ-ready equipment from world-leading brands.'

function upsertMeta(attr, key, content) {
  if (!content) {
    return
  }

  let element = document.head.querySelector(`meta[${attr}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) {
    return
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function buildCanonicalUrl(pathname = '/') {
  if (/^https?:\/\//i.test(pathname)) {
    return pathname
  }
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`

  return new URL(normalizedPath, company.siteUrl).toString()
}

function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '',
  imagePath = company.logo,
  type = 'website',
  includeSiteName = true,
  robots = 'index,follow',
  structuredData = [],
}) {
  const seoContext = useSeoContext()
  const fullTitle = title
    ? includeSiteName
      ? `${title} | ${SITE_NAME}`
      : title
    : SITE_NAME
  const routePath = canonicalPath || seoContext?.routePath || '/'
  const canonicalUrl = buildCanonicalUrl(routePath)
  const imageUrl = imagePath ? new URL(imagePath, company.siteUrl).toString() : ''
  const routeSchemas = Array.isArray(structuredData) ? structuredData : [structuredData]
  const schemas = [localBusinessSchema, ...routeSchemas].filter(Boolean)

  if (seoContext?.setSeo) {
    seoContext.setSeo({
      title: fullTitle,
      description,
      canonicalUrl,
      imageUrl,
      siteName: SITE_NAME,
      type,
      robots,
      structuredData: schemas,
    })
  }

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'google-site-verification', webmasterVerification.google)
    upsertMeta('name', 'msvalidate.01', webmasterVerification.bing)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertLink('canonical', canonicalUrl)
    document.querySelectorAll('script[data-vortexus-structured-data]').forEach((node) => node.remove())
    schemas.filter(Boolean).forEach((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.vortexusStructuredData = 'true'
      script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c')
      document.head.appendChild(script)
    })
  }, [canonicalUrl, description, fullTitle, imageUrl, robots, schemas, type])

  return null
}

export default Seo
