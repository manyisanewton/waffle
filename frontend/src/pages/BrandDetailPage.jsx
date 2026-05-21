import { useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useParams, useSearchParams } from 'react-router-dom'
import Pagination from '../components/catalog/Pagination'
import CompareButton from '../components/catalog/CompareButton'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import Seo from '../components/seo/Seo'
import {
  buildBrandImageDescription,
  formatBrandImageName,
  getBrandBySlug,
  getBrandDescription,
  productMatchesBrand,
} from '../data/brandsCatalog'
import { industriesCatalog, productCategories } from '../data/productCatalog'
import { getCatalog } from '../lib/catalogApi'

const PAGE_SIZE = 24
const BRAND_IMAGE_PRODUCT_OVERRIDES = {
  '/danfos/Pressure switch, KP35.png': 'danfoss-pressure-switch-kp35',
  '/danfos/Pressure switch, KP36.png': 'danfoss-pressure-switch-kp36',
}
const hiddenCategoryFilterSlugs = new Set([
  'wastewater-treatment-equipment',
  'industrial-etp',
  'sewage-treatment-plants',
  'recycling-reuse-systems',
  'industry-specific-solutions',
  'sludge-handling-disposal',
])

function BrandDetailPage() {
  const { brandSlug } = useParams()
  const brand = getBrandBySlug(brandSlug)
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [leadModalConfig, setLeadModalConfig] = useState({
    isOpen: false,
    title: 'Request a Quotation',
    productInterest: '',
    serviceInterest: 'Product quotation',
  })
  const catalogProducts = getCatalog()

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, activeCategory, activeIndustry, brandSlug])

  const filterCategories = useMemo(
    () => productCategories.filter((category) => !hiddenCategoryFilterSlugs.has(category.slug)),
    [],
  )

  const brandMatchedProducts = useMemo(
    () => (brand ? catalogProducts.filter((product) => productMatchesBrand(product, brand)) : []),
    [brand, catalogProducts],
  )

  const brandGalleryImages = brand?.galleryImages?.slice(0, 10) || []

  const brandGalleryItems = useMemo(
    () =>
      brandGalleryImages.map((imagePath, index) => {
        const imageName = formatBrandImageName(imagePath)
        const overrideSlug = BRAND_IMAGE_PRODUCT_OVERRIDES[imagePath]
        const preferredBrandMatch =
          brandMatchedProducts.find(
            (product) =>
              product.image === imagePath &&
              (product.itemGroup || '').toLowerCase() === (brand?.name || '').toLowerCase(),
          ) ||
          brandMatchedProducts.find((product) => product.image === imagePath)

        return {
          imagePath,
          imageName,
          key: `${brand?.slug || 'brand'}-${index}-${imagePath}`,
          matchedProduct:
            preferredBrandMatch ||
            brandMatchedProducts.find((product) => product.slug === overrideSlug) ||
            catalogProducts.find((product) => product.image === imagePath) ||
            null,
        }
      }),
    [brand?.name, brand?.slug, brandGalleryImages, brandMatchedProducts, catalogProducts],
  )

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return brandMatchedProducts.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.categorySlug === activeCategory
      const matchesIndustry = activeIndustry === 'all' || product.industrySlugs.includes(activeIndustry)
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.subcategory.toLowerCase().includes(normalizedQuery) ||
        product.summary.toLowerCase().includes(normalizedQuery) ||
        (product.itemGroup || '').toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesIndustry && matchesQuery
    })
  }, [activeCategory, activeIndustry, brandMatchedProducts, query])

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE))
  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  if (!brand) {
    return <Navigate to="/products" replace />
  }

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo
        title={`${brand.name} Products`}
        description={getBrandDescription(brand)}
        canonicalPath={`/brands/${brand.slug}`}
        imagePath={brand.image}
      />

      <section className="space-y-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Products By Brand
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
            {brand.name} products in the current catalog.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-brand-muted">
            {getBrandDescription(brand)} Refine the visible results by category, industry, or product search, then move directly into item review or RFQ.
          </p>
        </div>

        <div className="grid gap-4 rounded-[1.9rem] border border-brand-border bg-white p-4 shadow-[0_18px_46px_rgba(35,33,32,0.05)] sm:p-5 lg:grid-cols-[1fr_0.8fr_0.8fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">Search products</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                const nextQuery = event.target.value
                setQuery(nextQuery)

                const nextParams = new URLSearchParams(searchParams)
                if (nextQuery.trim()) {
                  nextParams.set('q', nextQuery)
                } else {
                  nextParams.delete('q')
                }
                setSearchParams(nextParams, { replace: true })
              }}
              placeholder={`Search ${brand.name.toLowerCase()} products...`}
              className="h-12 w-full rounded-[1rem] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-green"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">Filter by category</span>
            <select
              value={activeCategory}
              onChange={(event) => setActiveCategory(event.target.value)}
              className="h-12 w-full rounded-[1rem] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition focus:border-brand-green"
            >
              <option value="all">All Categories</option>
              {filterCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">Filter by industry</span>
            <select
              value={activeIndustry}
              onChange={(event) => setActiveIndustry(event.target.value)}
              className="h-12 w-full rounded-[1rem] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition focus:border-brand-green"
            >
              <option value="all">All Industries</option>
              {industriesCatalog.map((industry) => (
                <option key={industry.slug} value={industry.slug}>
                  {industry.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {brandGalleryImages.length ? (
          <section className="space-y-5 rounded-[2rem] border border-brand-border bg-white p-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                  {brand.name} Brand Images
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-brand-ink sm:text-2xl lg:text-3xl">
                  Product visuals for {brand.name}.
                </h2>
              </div>
              <p className="text-sm leading-7 text-brand-muted">
                Showing up to {brandGalleryImages.length} images. More matching items are still available in the catalog below.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brandGalleryItems.map(({ imagePath, imageName, key, matchedProduct }, index) => {
                const displayName = matchedProduct?.name || imageName || `${brand.name} Product ${index + 1}`
                const detailsHref = matchedProduct
                  ? `/products/item/${matchedProduct.slug}`
                  : `/brands/${brand.slug}?q=${encodeURIComponent(displayName || brand.name)}#catalog-results`

                return (
                  <article
                    key={key}
                    className="overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-[0_12px_30px_rgba(35,33,32,0.05)]"
                  >
                    <img
                      src={imagePath}
                      alt={`${brand.name} ${imageName || `product ${index + 1}`}`}
                      className="h-48 w-full object-contain bg-white p-3"
                    />
                    <div className="space-y-2 border-t border-brand-border px-4 py-3">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-green">
                        {brand.name}
                      </p>
                      <h3 className="font-display text-[0.92rem] font-semibold leading-snug text-brand-ink sm:text-[0.98rem]">
                        {displayName}
                      </h3>
                      <p className="text-sm leading-6 text-brand-muted">
                        {buildBrandImageDescription(brand.name, displayName, matchedProduct)}
                      </p>
                      <div className="flex flex-wrap gap-2.5 pt-1">
                        <NavLink
                          to={detailsHref}
                          className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-3 py-2 text-[0.88rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                        >
                          {matchedProduct ? 'View Details' : 'Search Catalog'}
                        </NavLink>
                        <button
                          type="button"
                          onClick={() =>
                            setLeadModalConfig({
                              isOpen: true,
                              title: `Request Quote for ${displayName}`,
                              productInterest: displayName,
                              serviceInterest: brand.name,
                            })}
                          className="inline-flex items-center justify-center rounded-full bg-brand-green px-3 py-2 text-[0.88rem] font-semibold text-white transition hover:bg-brand-green-soft"
                        >
                          RFQ
                        </button>
                        {matchedProduct ? <CompareButton productSlug={matchedProduct.slug} compact /> : null}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ) : null}

        <div id="catalog-results" className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-7 text-brand-muted">
            Showing <span className="font-semibold text-brand-ink">{visibleProducts.length}</span> products for {brand.name}
            {activeCategory !== 'all'
              ? ` in ${productCategories.find((category) => category.slug === activeCategory)?.name}`
              : ''}
            {activeIndustry !== 'all'
              ? ` for ${industriesCatalog.find((industry) => industry.slug === activeIndustry)?.name}`
              : ''}
            .
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <NavLink
              to="/products"
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              Back to Products
            </NavLink>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <article
              key={product.slug}
              className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              <img
                src={product.image || '/place holder.jpg'}
                alt={product.name}
                className="h-52 w-full bg-white p-3 object-contain"
              />
              <div className="space-y-2 px-4 py-4">
                <div className="flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-green">
                  <span>{product.subcategory}</span>
                </div>
                <div>
                  <h3 className="font-display text-[1.02rem] leading-snug font-semibold text-brand-ink sm:text-[1.12rem] xl:text-[1.22rem]">
                    {product.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <NavLink
                    to={`/products/item/${product.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-3 py-2 text-[0.88rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                  >
                    View Details
                  </NavLink>
                  <button
                    type="button"
                    onClick={() =>
                      setLeadModalConfig({
                        isOpen: true,
                        title: `Request Quote for ${product.name}`,
                        productInterest: product.name,
                        serviceInterest: product.subcategory,
                      })}
                    className="inline-flex items-center justify-center rounded-full bg-brand-green px-3 py-2 text-[0.88rem] font-semibold text-white transition hover:bg-brand-green-soft"
                  >
                    RFQ
                  </button>
                  <CompareButton productSlug={product.slug} compact />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      <LeadCaptureModal
        isOpen={leadModalConfig.isOpen}
        onClose={() =>
          setLeadModalConfig((current) => ({
            ...current,
            isOpen: false,
          }))}
        title={leadModalConfig.title}
        landingPage={`/brands/${brand.slug}`}
        productInterest={leadModalConfig.productInterest}
        serviceInterest={leadModalConfig.serviceInterest}
      />
    </div>
  )
}

export default BrandDetailPage
