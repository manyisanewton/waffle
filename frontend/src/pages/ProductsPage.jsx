import { useEffect, useMemo, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import Pagination from '../components/catalog/Pagination'
import CompareButton from '../components/catalog/CompareButton'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import Seo from '../components/seo/Seo'
import { getBrandBySlug, productMatchesBrand } from '../data/brandsCatalog'
import { industriesCatalog, productCategories } from '../data/productCatalog'
import { loadCatalog, loadCatalogSummary } from '../lib/catalogApi'

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

function formatBrandImageName(imagePath = '') {
  const fileName = imagePath.split('/').pop() || ''
  const baseName = fileName.replace(/\.[^.]+$/, '')

  return baseName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildBrandImageDescription(brandName, imageName) {
  return `${imageName} from the ${brandName} product range currently highlighted for brand browsing.`
}

function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [image, onClose])

  if (!image) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/82 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        Close
      </button>
      <div
        className="max-h-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="max-h-[82vh] w-full object-contain" />
      </div>
    </div>
  )
}

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [catalogProducts, setCatalogProducts] = useState([])
  const [catalogSummary, setCatalogSummary] = useState({
    totalProducts: 0,
    featuredProducts: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [leadModalConfig, setLeadModalConfig] = useState({
    isOpen: false,
    title: 'Request a Quotation',
    productInterest: '',
    serviceInterest: 'Product quotation',
  })
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    let isMounted = true

    Promise.all([loadCatalog(), loadCatalogSummary()])
      .then(([products, summary]) => {
        if (!isMounted) {
          return
        }
        setCatalogProducts(products)
        setCatalogSummary(summary)
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, activeCategory, activeIndustry, searchParams])

  const activeBrandSlug = searchParams.get('brand') || ''
  const activeBrand = getBrandBySlug(activeBrandSlug)
  const brandGalleryImages = activeBrand?.galleryImages?.slice(0, 10) || []
  const brandMatchedProducts = useMemo(
    () =>
      activeBrand
        ? catalogProducts.filter((product) => productMatchesBrand(product, activeBrand))
        : [],
    [activeBrand, catalogProducts],
  )
  const brandGalleryItems = useMemo(
    () =>
      brandGalleryImages.map((imagePath, index) => {
        const imageName = formatBrandImageName(imagePath)
        const overrideSlug = BRAND_IMAGE_PRODUCT_OVERRIDES[imagePath]

        return {
          imagePath,
          imageName,
          key: `${activeBrand?.slug || 'brand'}-${index}-${imagePath}`,
          matchedProduct:
            catalogProducts.find((product) => product.image === imagePath) ||
            brandMatchedProducts.find((product) => product.slug === overrideSlug) ||
            null,
        }
      }),
    [activeBrand?.slug, brandGalleryImages, brandMatchedProducts, catalogProducts],
  )
  const filterCategories = useMemo(
    () => productCategories.filter((category) => !hiddenCategoryFilterSlugs.has(category.slug)),
    [],
  )

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return catalogProducts.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.categorySlug === activeCategory
      const matchesIndustry =
        activeIndustry === 'all' || product.industrySlugs.includes(activeIndustry)
      const matchesBrand =
        !activeBrand || productMatchesBrand(product, activeBrand)

      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.subcategory.toLowerCase().includes(normalizedQuery) ||
        product.summary.toLowerCase().includes(normalizedQuery) ||
        (product.itemGroup || '').toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesIndustry && matchesBrand && matchesQuery
    })
  }, [activeBrand, activeCategory, activeIndustry, catalogProducts, query])

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE))
  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo
        title="Products"
        description="Browse Vortexus water-treatment products, pumps, chemicals, membranes, instruments, controls, tanks, and industrial water equipment by category or industry."
      />
      <section className="space-y-8">
        <div className="max-w-3xl">
          {activeBrand ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Products By Brand
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
                {activeBrand.name} products in the current catalog.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
                Showing stock-listed products whose names match the selected brand. You can refine the results further by category, industry, or product search.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Search The Catalog
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
                Find products by name, group, category, or application.
              </h2>
            </>
          )}
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
              placeholder="Search pump, membrane, valve, pressure switch..."
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

        {activeBrand && brandGalleryImages.length ? (
          <section className="space-y-5 rounded-[2rem] border border-brand-border bg-white p-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                  {activeBrand.name} Brand Images
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-brand-ink sm:text-2xl lg:text-3xl">
                  Product visuals for {activeBrand.name}.
                </h3>
              </div>
              <p className="text-sm leading-7 text-brand-muted">
                Showing up to {brandGalleryImages.length} images. More matching items are still available in the catalog below.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brandGalleryItems.map(({ imagePath, imageName, key, matchedProduct }, index) => (
                (() => {
                  const detailsHref = matchedProduct
                    ? `/products/item/${matchedProduct.slug}`
                    : `/products?brand=${activeBrand.slug}&q=${encodeURIComponent(
                        imageName || activeBrand.name,
                      )}#catalog-results`

                  return (
                <article
                  key={key}
                  className="overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-[0_12px_30px_rgba(35,33,32,0.05)]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImage({
                        src: imagePath,
                        alt: `${activeBrand.name} ${imageName || `product ${index + 1}`}`,
                      })}
                    className="group block w-full cursor-zoom-in"
                    aria-label={`Open larger view of ${imageName || `${activeBrand.name} product ${index + 1}`}`}
                  >
                    <img
                      src={imagePath}
                      alt={`${activeBrand.name} ${imageName || `product ${index + 1}`}`}
                      className="h-48 w-full object-contain bg-white p-3 transition duration-300 group-hover:scale-[1.02]"
                    />
                  </button>
                  <div className="space-y-2 border-t border-brand-border px-4 py-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-green">
                      {activeBrand.name}
                    </p>
                    <h4 className="font-display text-[0.98rem] font-semibold leading-snug text-brand-ink sm:text-base">
                      {imageName || `${activeBrand.name} Product ${index + 1}`}
                    </h4>
                    <p className="text-sm leading-6 text-brand-muted">
                      {buildBrandImageDescription(
                        activeBrand.name,
                        imageName || `Product ${index + 1}`,
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <NavLink
                        to={detailsHref}
                        className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-3.5 py-2 text-[0.95rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                      >
                        {matchedProduct ? 'View Details' : 'Browse Matches'}
                      </NavLink>
                      <button
                        type="button"
                        onClick={() =>
                          setLeadModalConfig({
                            isOpen: true,
                            title: `Request Quote for ${imageName || activeBrand.name}`,
                            productInterest: imageName || activeBrand.name,
                            serviceInterest: activeBrand.name,
                          })}
                        className="inline-flex items-center justify-center rounded-full bg-brand-green px-3.5 py-2 text-[0.95rem] font-semibold text-white transition hover:bg-brand-green-soft"
                      >
                        RFQ
                      </button>
                      {matchedProduct ? <CompareButton productSlug={matchedProduct.slug} compact /> : null}
                    </div>
                  </div>
                </article>
                  )
                })()
              ))}
            </div>
          </section>
        ) : null}

        <div id="catalog-results" className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-7 text-brand-muted">
            Showing <span className="font-semibold text-brand-ink">{visibleProducts.length}</span> products
            {activeBrand ? ` for ${activeBrand.name}` : ''}
            {activeCategory !== 'all'
              ? ` in ${productCategories.find((category) => category.slug === activeCategory)?.name}`
              : ''}
            {activeIndustry !== 'all'
              ? ` for ${industriesCatalog.find((industry) => industry.slug === activeIndustry)?.name}`
              : ''}
            .
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {activeBrand ? (
              <button
                type="button"
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams)
                  nextParams.delete('brand')
                  setSearchParams(nextParams, { replace: true })
                }}
                className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
              >
                Clear Brand
              </button>
            ) : null}
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
              <div className="space-y-2.5 px-4 py-4">
                <div className="flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-green">
                  <span>{product.subcategory}</span>
                </div>
                <div>
                  <h3 className="font-display text-[1.2rem] leading-tight font-semibold text-brand-ink sm:text-[1.35rem] xl:text-[1.55rem]">
                    {product.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <NavLink
                    to={`/products/item/${product.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-3.5 py-2 text-[0.95rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
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
                    className="inline-flex items-center justify-center rounded-full bg-brand-green px-3.5 py-2 text-[0.95rem] font-semibold text-white transition hover:bg-brand-green-soft"
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

      {!activeBrand ? (
      <section className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Featured Products
            </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
                Stock-led product highlights from the imported inventory.
              </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {catalogSummary.featuredProducts.slice(0, 8).map((product) => (
            <article
              key={product.slug}
              className="rounded-[1.6rem] border border-brand-border bg-brand-surface px-4 py-4"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
                {product.subcategory}
              </p>
              <h3 className="mt-2.5 font-display text-[1.1rem] leading-tight font-semibold text-brand-ink sm:text-[1.2rem] xl:text-[1.35rem]">
                {product.name}
              </h3>
              <NavLink
                to={`/products/item/${product.slug}`}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-3.5 py-2 text-[0.95rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
              >
                Open Product
              </NavLink>
              <div className="mt-3">
                <CompareButton productSlug={product.slug} compact />
              </div>
            </article>
          ))}
        </div>
      </section>
      ) : null}

      <LeadCaptureModal
        isOpen={leadModalConfig.isOpen}
        onClose={() => setLeadModalConfig((current) => ({ ...current, isOpen: false }))}
        title={leadModalConfig.title}
        landingPage="/products"
        productInterest={leadModalConfig.productInterest}
        serviceInterest={leadModalConfig.serviceInterest}
      />
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  )
}

export default ProductsPage
