import { useEffect } from 'react'

const SITE_NAME = 'Vortexus'
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

function Seo({ title, description = DEFAULT_DESCRIPTION }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
  }, [title, description])

  return null
}

export default Seo
