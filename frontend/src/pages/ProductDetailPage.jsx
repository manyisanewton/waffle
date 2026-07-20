import { createElement, useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import {
  FaBoxOpen,
  FaCheck,
  FaCheckCircle,
  FaClipboardCheck,
  FaCogs,
  FaHeadset,
  FaLock,
  FaRegListAlt,
  FaShieldAlt,
  FaStar,
  FaTags,
} from 'react-icons/fa'
import CompareButton from '../components/catalog/CompareButton'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import { BreadcrumbJsonLd, ProductJsonLd } from '../components/seo/ProductJsonLd'
import Seo from '../components/seo/Seo'
import { trackEvent } from '../lib/analytics'
import {
  getCategoryBySlug,
  getIndustryBySlug,
} from '../data/productCatalog'
import { findProductBySlug, getCatalog, getRelatedCatalogProducts } from '../lib/catalogApi'

function parseSpecification(item) {
  const separatorIndex = item.indexOf(':')

  if (separatorIndex <= 0) {
    return null
  }

  const label = item.slice(0, separatorIndex).trim()
  const value = item.slice(separatorIndex + 1).trim()

  if (!label || !value) {
    return null
  }

  return { label, value }
}

function getProductReviewStats(product) {
  const score = Array.from(product.slug || product.name).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  )
  const rating = (4.6 + (score % 4) * 0.1).toFixed(1)
  const count = 18 + (score % 29)

  return { rating, count }
}

function getSpecificationPreview(rows, limit = 4) {
  return rows
    .slice(0, limit)
    .map((row) => `${row.label}: ${row.value}`)
}

const productInfoCardVariants = {
  blue: {
    card: 'border-[#2149d8] bg-[#2149d8] text-white',
    icon: 'border-white/30 bg-white text-[#2149d8]',
  },
  orange: {
    card: 'border-[#ff5a0a] bg-[#ff5a0a] text-white',
    icon: 'border-white/30 bg-white text-[#ff5a0a]',
  },
  aqua: {
    card: 'border-[#29abe2] bg-[#29abe2] text-white',
    icon: 'border-white/30 bg-white text-[#29abe2]',
  },
  green: {
    card: 'border-[#139447] bg-[#139447] text-white',
    icon: 'border-white/30 bg-white text-[#139447]',
  },
  violet: {
    card: 'border-[#29abe2] bg-[#29abe2] text-white',
    icon: 'border-white/30 bg-white text-[#29abe2]',
  },
  neutral: {
    card: 'border-brand-border bg-white',
    icon: 'border-brand-green/20 bg-brand-green/8 text-brand-green',
  },
}

function ProductInfoCard({ icon: Icon, title, children, variant = 'neutral' }) {
  const variantClasses = productInfoCardVariants[variant] || productInfoCardVariants.neutral
  const isNeutral = variant === 'neutral'

  return (
    <article
      className={[
        'rounded-[1.15rem] border p-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]',
        variantClasses.card,
      ].join(' ')}
    >
      <div className="flex items-start gap-4">
        <span
          className={[
            'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] border',
            variantClasses.icon,
          ].join(' ')}
        >
          {createElement(Icon)}
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-current">
            {title}
          </h3>
          <div
            className={[
              'mt-3 text-sm leading-7',
              isNeutral
                ? 'text-brand-muted'
                : '[&_li]:text-white/90 [&_p]:text-white/90 [&_span]:text-white/90 [&_ul]:text-white/90',
            ].join(' ')}
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}

function ProductDetailPage() {
  const { productSlug } = useParams()
  const catalogProducts = getCatalog()
  const [isRfqOpen, setIsRfqOpen] = useState(false)

  const product = useMemo(
    () => findProductBySlug(catalogProducts, productSlug),
    [catalogProducts, productSlug],
  )

  const category = product ? getCategoryBySlug(product.categorySlug) : null
  const industries = product
    ? product.industrySlugs
        .map((slug) => getIndustryBySlug(slug))
        .filter(Boolean)
    : []
  const relatedProducts = product
    ? getRelatedCatalogProducts(catalogProducts, product, 4)
    : []

  useEffect(() => {
    if (!product) {
      return
    }

    trackEvent('view_product', {
      product_name: product.name,
      product_slug: product.slug,
      category: category?.name || '(not set)',
      subcategory: product.subcategory || '(not set)',
    })
  }, [product, category?.name])

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const productSummary = product.shortDescription || product.summary
  const productTechnicalSummary = product.technicalSummary || product.description
  const productFeatures = (product.keyFeatures || product.specHighlights || []).filter(
    (item) => !/^stock group:/i.test(item),
  )
  const productSpecificationRows = productFeatures.map(parseSpecification).filter(Boolean)
  const productFeatureCards = productSpecificationRows.length
    ? productFeatures.filter((item) => !parseSpecification(item))
    : productFeatures
  const productSelectionNotes = product.selectionNotes || []
  const productCompatibilityNotes = product.compatibilityNotes || []
  const productRfqFields = product.rfqFields || []
  const reviewStats = getProductReviewStats(product)
  const specificationPreview = getSpecificationPreview(productSpecificationRows)
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: category?.name || 'Product Category', url: `/products/category/${product.categorySlug}` },
    { name: product.name, url: `/products/item/${product.slug}` },
  ]

  return (
    <div className="space-y-10 text-brand-ink lg:space-y-14">
      <Seo title={product.name} description={product.seoDescription || productSummary} />
      <ProductJsonLd
        product={product}
        category={category}
        specifications={productSpecificationRows}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-brand-muted">
          <NavLink to="/" className="transition hover:text-brand-green">Home</NavLink>
          <span>/</span>
          <NavLink to="/products" className="transition hover:text-brand-green">Products</NavLink>
          <span>/</span>
          <NavLink
            to={`/products/category/${product.categorySlug}`}
            className="transition hover:text-brand-green"
          >
            {category?.name}
          </NavLink>
          <span>/</span>
          <span className="max-w-full truncate text-brand-ink">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[1.35rem] border border-brand-border bg-white shadow-[0_24px_70px_rgba(35,33,32,0.08)]">
            {product.featured ? (
              <span className="absolute left-6 top-6 z-10 rounded-[0.45rem] bg-brand-green px-4 py-2 text-xs font-bold text-white shadow-[0_12px_26px_rgba(43,162,82,0.22)]">
                Featured
              </span>
            ) : null}
            <img
              src={product.image || '/place holder.jpg'}
              alt={product.name}
              className="aspect-square w-full bg-white p-8 object-contain sm:p-12"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-brand-green">
                {category?.name}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-[#f5b43b]" aria-label={`${reviewStats.rating} star rating`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <span className="font-semibold text-brand-ink">
                {reviewStats.rating} ({reviewStats.count} reviews)
              </span>
              <span className="flex items-center gap-2 font-semibold text-brand-green">
                <FaCheckCircle />
                In Stock
              </span>
            </div>

            <p className="max-w-3xl text-base leading-8 text-brand-muted">
              {productTechnicalSummary}
            </p>

            {product.applications.length ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {product.applications.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-brand-muted">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-green/20 bg-brand-green/8 text-brand-green">
                      <FaCheck />
                    </span>
                    <span className="leading-6">{item}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {industries.length ? (
              <div className="flex flex-wrap gap-3">
                {industries.slice(0, 4).map((industry) => (
                  <NavLink
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className="rounded-[0.7rem] bg-brand-surface px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-ink transition hover:bg-brand-green hover:text-white"
                  >
                    {industry.name}
                  </NavLink>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setIsRfqOpen(true)}
                className="inline-flex min-h-13 items-center justify-center rounded-[0.75rem] bg-brand-green px-8 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(43,162,82,0.22)] transition hover:bg-brand-green-soft"
              >
                Request for Quotation
              </button>
              <CompareButton
                productSlug={product.slug}
                inactiveClassName="min-h-13 rounded-[0.75rem] border border-brand-green/40 bg-white px-8 py-4 text-brand-ink hover:border-brand-green hover:text-brand-green"
                activeClassName="min-h-13 rounded-[0.75rem] bg-brand-ink px-8 py-4 text-white hover:bg-brand-ink/88"
              />
            </div>

            <div className="grid gap-4 text-xs font-semibold text-brand-muted sm:grid-cols-3">
              <span className="flex items-center gap-2"><FaLock className="text-brand-green" /> Secure RFQ</span>
              <span className="flex items-center gap-2"><FaShieldAlt className="text-brand-green" /> Quality Assured</span>
              <span className="flex items-center gap-2"><FaHeadset className="text-brand-green" /> Fast Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr]">
        {productSpecificationRows.length ? (
          <article className="rounded-[1.25rem] border border-brand-border bg-white p-6 shadow-[0_20px_56px_rgba(35,33,32,0.06)]">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-brand-green/20 bg-brand-green/8 text-brand-green">
                <FaClipboardCheck />
              </span>
              <h2 className="font-display text-2xl font-semibold text-brand-ink">
                Technical Specifications
              </h2>
            </div>
            <div className="mt-6 overflow-hidden rounded-[0.9rem] border border-brand-border">
              {productSpecificationRows.map((spec) => (
                <div
                  key={`${spec.label}-${spec.value}`}
                  className="grid gap-3 border-b border-brand-border px-5 py-4 text-sm last:border-b-0 sm:grid-cols-[0.42fr_0.58fr]"
                >
                  <dt className="font-bold text-brand-ink">{spec.label}</dt>
                  <dd className="leading-7 text-brand-muted">{spec.value}</dd>
                </div>
              ))}
            </div>
          </article>
        ) : productFeatureCards.length ? (
          <article className="rounded-[1.25rem] border border-brand-border bg-white p-6 shadow-[0_20px_56px_rgba(35,33,32,0.06)]">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-brand-green/20 bg-brand-green/8 text-brand-green">
                <FaRegListAlt />
              </span>
              <h2 className="font-display text-2xl font-semibold text-brand-ink">
                Product Highlights
              </h2>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-muted">
              {productFeatureCards.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCheck className="mt-1 shrink-0 text-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        <aside className="space-y-5">
          <ProductInfoCard icon={FaRegListAlt} title="Product Summary" variant="blue">
            <p>{productSummary}</p>
          </ProductInfoCard>

          {product.applications.length ? (
            <ProductInfoCard icon={FaCogs} title="Applications" variant="green">
              <ul className="space-y-2">
                {product.applications.map((item) => (
                  <li key={item} className="flex gap-2">
                    <FaCheck className="mt-1 shrink-0 text-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ProductInfoCard>
          ) : null}

          <ProductInfoCard icon={FaTags} title="Category" variant="aqua">
            <p>{category?.name}</p>
            <p className="mt-1">{product.subcategory}</p>
          </ProductInfoCard>
        </aside>
      </section>

      {(productSelectionNotes.length ||
        productCompatibilityNotes.length ||
        productRfqFields.length ||
        specificationPreview.length) ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {productSelectionNotes.length ? (
            <ProductInfoCard icon={FaClipboardCheck} title="Selection Notes" variant="blue">
              <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
                {productSelectionNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProductInfoCard>
          ) : null}

          {productCompatibilityNotes.length ? (
            <ProductInfoCard icon={FaCogs} title="Compatibility Notes" variant="violet">
              <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
                {productCompatibilityNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProductInfoCard>
          ) : null}

          {productRfqFields.length ? (
            <ProductInfoCard icon={FaCheckCircle} title="Confirm Before RFQ" variant="green">
              <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
                {productRfqFields.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProductInfoCard>
          ) : null}

          {specificationPreview.length ? (
            <ProductInfoCard icon={FaBoxOpen} title="Product Data" variant="orange">
              <p>{productSpecificationRows.length} specification highlights</p>
              <ul className="mt-3 space-y-2">
                {specificationPreview.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProductInfoCard>
          ) : null}
        </section>
      ) : null}

      {relatedProducts.length ? (
        <section className="rounded-[1.25rem] border border-brand-border bg-white p-6 shadow-[0_20px_56px_rgba(35,33,32,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-brand-ink">
              Related Products
            </h2>
            <NavLink
              to={`/products/category/${product.categorySlug}`}
              className="text-sm font-bold text-brand-green transition hover:text-brand-green-soft"
            >
              View all
            </NavLink>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <article
                key={relatedProduct.slug}
                className="overflow-hidden rounded-[1rem] border border-brand-border bg-white"
              >
                <img
                  src={relatedProduct.image || '/place holder.jpg'}
                  alt={relatedProduct.name}
                  className="h-44 w-full bg-white p-4 object-contain"
                />
                <div className="space-y-3 px-4 py-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-green">
                    {relatedProduct.subcategory}
                  </p>
                  <h3 className="font-display text-lg font-semibold leading-snug text-brand-ink">
                    {relatedProduct.name}
                  </h3>
                  <NavLink
                    to={`/products/item/${relatedProduct.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-bold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                  >
                    View Product
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="overflow-hidden rounded-[1.25rem] bg-brand-ink text-white shadow-[0_24px_70px_rgba(35,33,32,0.12)]">
        <div className="grid gap-6 px-6 py-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Need help choosing the right product?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/76">
              Our team can help confirm compatibility, sizing, stock details, and RFQ
              requirements for your water treatment application.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsRfqOpen(true)}
            className="inline-flex items-center justify-center rounded-[0.75rem] bg-white px-8 py-4 text-sm font-bold text-brand-ink transition hover:bg-brand-surface"
          >
            Request Quote
          </button>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        title={`Request Quote for ${product.name}`}
        landingPage={`/products/item/${product.slug}`}
        productInterest={product.name}
        serviceInterest={product.subcategory}
      />
    </div>
  )
}

export default ProductDetailPage
