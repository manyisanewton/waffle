import { company } from '../../data/site/company'

function absoluteUrl(path = '') {
  if (!path) {
    return ''
  }

  return new URL(path, company.siteUrl).toString()
}

function safeJson(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function findSpecificationValue(specifications, labels) {
  const normalizedLabels = labels.map((label) => label.toLowerCase())
  const match = specifications.find((spec) => normalizedLabels.includes(spec.label.toLowerCase()))
  return match?.value || ''
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  )
}

export function ProductJsonLd({ product, category, specifications = [] }) {
  const productUrl = absoluteUrl(`/products/item/${product.slug}`)
  const imageUrl = absoluteUrl(product.image || '/place holder.jpg')
  const brandName = product.brand || product.itemGroup || company.name
  const sku = product.sku || findSpecificationValue(specifications, ['SKU'])
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.seoDescription || product.shortDescription || product.summary || product.description,
    image: imageUrl,
    url: productUrl,
    sku: sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    category: [category?.name, product.subcategory].filter(Boolean).join(' > '),
    additionalProperty: specifications.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  }

  return <JsonLd data={productSchema} />
}

export function BreadcrumbJsonLd({ items }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }

  return <JsonLd data={breadcrumbSchema} />
}
