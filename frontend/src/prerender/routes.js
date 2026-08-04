import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { brandsCatalog } from '../data/brandsCatalog.js'
import { productCategories, industriesCatalog } from '../data/productCatalog.js'
import { solutionFamilies } from '../data/solutionsCatalog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const catalogProducts = JSON.parse(
  readFileSync(path.resolve(__dirname, '../data/generated/stock-products.json'), 'utf8'),
)

export function getPublicPrerenderRoutes() {
  const staticRoutes = [
    '/',
    '/about-us',
    '/products',
    '/compare',
    '/industries',
    '/faq',
    '/request-quote',
    '/services',
    '/solutions',
    '/contact-us',
    '/blog',
  ]

  const categoryRoutes = productCategories.map((category) => `/products/category/${category.slug}`)
  const brandRoutes = brandsCatalog.map((brand) => `/brands/${brand.slug}`)
  const productRoutes = catalogProducts.map((product) => `/products/item/${product.slug}`)
  const industryRoutes = industriesCatalog.map((industry) => `/industries/${industry.slug}`)
  const solutionRoutes = solutionFamilies.map((solution) => `/solutions/${solution.slug}`)
  return [
    ...staticRoutes,
    ...brandRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...industryRoutes,
    ...solutionRoutes,
  ]
}
