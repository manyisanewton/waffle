import catalogProductsData from '../data/generated/stock-products.json'
import catalogSummaryData from '../data/generated/catalog-summary.json'
import { brandsCatalog, productMatchesBrand } from '../data/brandsCatalog'

const catalogProducts = Array.isArray(catalogProductsData) ? catalogProductsData : []
const catalogSummary = catalogSummaryData || {
  totalProducts: catalogProducts.length,
  featuredProducts: [],
}

export function getCatalog() {
  return catalogProducts
}

export function getCatalogSummary() {
  return catalogSummary
}

export async function loadCatalog() {
  return catalogProducts
}

export async function loadCatalogSummary() {
  return catalogSummary
}

export function filterProductsByCategory(products, categorySlug) {
  return products.filter((product) => product.categorySlug === categorySlug)
}

export function filterProductsByIndustry(products, industrySlug) {
  return products.filter((product) => product.industrySlugs.includes(industrySlug))
}

export function findProductBySlug(products, productSlug) {
  return products.find((product) => product.slug === productSlug) || null
}

function getMatchingBrandSlugs(product) {
  return brandsCatalog
    .filter((brand) => productMatchesBrand(product, brand))
    .map((brand) => brand.slug)
}

function getSharedIndustryCount(product, candidate) {
  return candidate.industrySlugs.filter((slug) => product.industrySlugs.includes(slug)).length
}

function getNameTokenOverlap(product, candidate) {
  const baseTokens = new Set(
    (product.name || '')
      .toLowerCase()
      .split(/[^a-z0-9]+/i)
      .filter((token) => token.length >= 4),
  )

  if (!baseTokens.size) {
    return 0
  }

  return (candidate.name || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length >= 4 && baseTokens.has(token)).length
}

export function getRelatedCatalogProducts(products, product, limit = 4) {
  const productBrandSlugs = getMatchingBrandSlugs(product)

  return products
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => {
      const candidateBrandSlugs = getMatchingBrandSlugs(candidate)
      const sharedBrandCount = candidateBrandSlugs.filter((slug) =>
        productBrandSlugs.includes(slug),
      ).length
      const sharedIndustryCount = getSharedIndustryCount(product, candidate)
      const sameItemGroup =
        product.itemGroup &&
        candidate.itemGroup &&
        product.itemGroup.toLowerCase() === candidate.itemGroup.toLowerCase()

      const score =
        sharedBrandCount * 20 +
        (sameItemGroup ? 14 : 0) +
        (candidate.subcategory === product.subcategory ? 12 : 0) +
        (candidate.categorySlug === product.categorySlug ? 8 : 0) +
        sharedIndustryCount * 3 +
        Math.min(getNameTokenOverlap(product, candidate), 3)

      return { candidate, score }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.candidate.name.localeCompare(right.candidate.name))
    .map(({ candidate }) => candidate)
    .slice(0, limit)
}
