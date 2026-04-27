import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { enrichCatalogProducts, enrichCatalogSummary } from './catalog-enrichment.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(frontendRoot, 'public', 'catalog')
const targetDir = path.join(frontendRoot, 'src', 'data', 'generated')

await mkdir(targetDir, { recursive: true })

const sourceProducts = JSON.parse(
  await readFile(path.join(sourceDir, 'stock-products.json'), 'utf8'),
)
const sourceSummary = JSON.parse(
  await readFile(path.join(sourceDir, 'catalog-summary.json'), 'utf8'),
)

const enrichedProducts = enrichCatalogProducts(sourceProducts)
const enrichedSummary = enrichCatalogSummary(sourceSummary, enrichedProducts)

await writeFile(
  path.join(targetDir, 'stock-products.json'),
  JSON.stringify(enrichedProducts, null, 2),
)
await writeFile(
  path.join(targetDir, 'catalog-summary.json'),
  JSON.stringify(enrichedSummary, null, 2),
)

console.log('Catalog JSON synced into src/data/generated.')
