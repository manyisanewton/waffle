import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { brandsCatalog, formatBrandImageName, productMatchesBrand } from '../../frontend/src/data/brandsCatalog.js'
import { industriesCatalog, productCategories } from '../../frontend/src/data/productCatalog.js'
import stockProducts from '../../frontend/src/data/generated/stock-products.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../data/catalog.json')

function compactText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function productUrl(slug) {
  return `/products/item/${slug}`
}

function categoryUrl(slug) {
  return `/products/category/${slug}`
}

function brandUrl(slug) {
  return `/brands/${slug}`
}

function industryUrl(slug) {
  return `/industries/${slug}`
}

function uniqueBy(items, keyFn) {
  const seen = new Set()
  return items.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const categoriesBySlug = Object.fromEntries(productCategories.map((category) => [category.slug, category]))
const industriesBySlug = Object.fromEntries(industriesCatalog.map((industry) => [industry.slug, industry]))

const products = stockProducts.map((product) => {
  const category = categoriesBySlug[product.categorySlug]

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.itemGroup || '',
    categorySlug: product.categorySlug,
    categoryName: category?.name || product.categorySlug,
    subcategory: product.subcategory || '',
    summary: compactText(product.shortDescription || product.summary || product.description),
    applications: product.applications || [],
    specHighlights: product.specHighlights || [],
    industrySlugs: product.industrySlugs || [],
    industryNames: (product.industrySlugs || []).map((slug) => industriesBySlug[slug]?.name || slug),
    image: product.image || '',
    rfqFields: product.rfqFields || [],
    searchText: compactText([
      product.name,
      product.itemGroup,
      category?.name,
      product.subcategory,
      product.summary,
      product.description,
      product.shortDescription,
      product.technicalSummary,
      product.selectionNotes,
      product.compatibilityNotes,
      ...(product.applications || []),
      ...(product.specHighlights || []),
      ...(product.keyFeatures || []),
      ...(product.rfqFields || []),
      ...(product.industrySlugs || []).map((slug) => industriesBySlug[slug]?.name || slug),
    ].filter(Boolean).join(' ')),
    url: productUrl(product.slug),
  }
})

const brands = brandsCatalog.map((brand) => {
  const matchedProducts = products.filter((product) => productMatchesBrand(product, brand))
  const galleryProducts = brand.galleryImages.map((imagePath) => ({
    slug: `${brand.slug}-${formatBrandImageName(imagePath).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    name: formatBrandImageName(imagePath),
    brand: brand.name,
    categorySlug: '',
    categoryName: '',
    subcategory: '',
    summary: `${formatBrandImageName(imagePath)} from the ${brand.name} range.`,
    applications: [],
    specHighlights: [`Brand: ${brand.name}`],
    industrySlugs: [],
    industryNames: [],
    image: imagePath,
    rfqFields: ['Product name or photo', 'Quantity required', 'Application or system'],
    searchText: compactText(`${brand.name} ${formatBrandImageName(imagePath)} ${brand.matchTerms.join(' ')}`),
    url: brandUrl(brand.slug),
    visualReferenceOnly: true,
  }))

  return {
    slug: brand.slug,
    name: brand.name,
    matchTerms: brand.matchTerms || [],
    image: brand.image,
    url: brandUrl(brand.slug),
    products: uniqueBy([...matchedProducts, ...galleryProducts], (product) => product.slug).slice(0, 40),
    searchText: compactText([
      brand.name,
      ...(brand.matchTerms || []),
      ...brand.galleryImages.map(formatBrandImageName),
      ...matchedProducts.map((product) => product.name),
    ].join(' ')),
  }
})

const categories = productCategories.map((category) => {
  const categoryProducts = products.filter((product) => product.categorySlug === category.slug)
  return {
    slug: category.slug,
    name: category.name,
    description: category.description,
    subcategories: category.subcategories,
    url: categoryUrl(category.slug),
    productCount: categoryProducts.length,
    products: categoryProducts.slice(0, 30),
    searchText: compactText([
      category.name,
      category.description,
      ...(category.subcategories || []),
      ...categoryProducts.map((product) => product.name),
    ].join(' ')),
  }
})

const industries = industriesCatalog.map((industry) => {
  const industryProducts = products.filter(
    (product) =>
      product.industrySlugs.includes(industry.slug) ||
      industry.categorySlugs.includes(product.categorySlug),
  )

  return {
    slug: industry.slug,
    name: industry.name,
    description: industry.description,
    challenges: industry.challenges,
    categorySlugs: industry.categorySlugs,
    categoryNames: industry.categorySlugs.map((slug) => categoriesBySlug[slug]?.name || slug),
    url: industryUrl(industry.slug),
    productCount: industryProducts.length,
    products: uniqueBy(industryProducts, (product) => product.slug).slice(0, 30),
    searchText: compactText([
      industry.name,
      industry.description,
      ...(industry.challenges || []),
      ...industry.categorySlugs.map((slug) => categoriesBySlug[slug]?.name || slug),
      ...industryProducts.map((product) => product.name),
    ].join(' ')),
  }
})

const catalog = {
  generatedAt: new Date().toISOString(),
  totalProducts: products.length,
  products,
  brands,
  categories,
  industries,
}

await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
console.log(`Wrote ${outputPath}`)
console.log(`Indexed ${products.length} products, ${brands.length} brands, ${categories.length} categories, ${industries.length} industries.`)
