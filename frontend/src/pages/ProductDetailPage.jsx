import { useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import CompareButton from '../components/catalog/CompareButton'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import Seo from '../components/seo/Seo'
import {
  getCategoryBySlug,
  getIndustryBySlug,
} from '../data/productCatalog'
import { findProductBySlug, getRelatedCatalogProducts, loadCatalog } from '../lib/catalogApi'

function ProductDetailPage() {
  const { productSlug } = useParams()
  const [catalogProducts, setCatalogProducts] = useState([])
  const [isRfqOpen, setIsRfqOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    loadCatalog()
      .then((products) => {
        if (isMounted) {
          setCatalogProducts(products)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const product = useMemo(
    () => findProductBySlug(catalogProducts, productSlug),
    [catalogProducts, productSlug],
  )

  if (!catalogProducts.length) {
    return <div className="py-24 text-sm text-brand-muted">Loading product...</div>
  }

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const category = getCategoryBySlug(product.categorySlug)
  const industries = product.industrySlugs
    .map((slug) => getIndustryBySlug(slug))
    .filter(Boolean)
  const relatedProducts = getRelatedCatalogProducts(catalogProducts, product, 4)

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo title={product.name} description={product.summary} />

      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-brand-muted">
          <NavLink to="/products" className="transition hover:text-brand-green">
            Products
          </NavLink>
          <span>/</span>
          <NavLink to={`/products/category/${product.categorySlug}`} className="transition hover:text-brand-green">
            {category?.name}
          </NavLink>
          <span>/</span>
          <span className="text-brand-ink">{product.name}</span>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-8">
        <div className="overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <img
            src={product.image || '/place holder.jpg'}
            alt={product.name}
            className="aspect-square w-full bg-white p-4 object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            {category?.name}
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-muted">
            {product.subcategory}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-brand-muted">
            {product.itemGroup}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-brand-muted">
            {product.description}
          </p>

          {industries.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <NavLink
                  key={industry.slug}
                  to={`/industries/${industry.slug}`}
                  className="rounded-full bg-brand-surface px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-green transition hover:bg-brand-green hover:text-white"
                >
                  {industry.name}
                </NavLink>
              ))}
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.specHighlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-brand-border bg-white px-4 py-4 text-sm leading-7 text-brand-muted"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => setIsRfqOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Request for Quotation
            </button>
            <NavLink
              to={`/request-quote?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categorySlug)}`}
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              Open RFQ Form
            </NavLink>
            <NavLink
              to={`/products/category/${product.categorySlug}`}
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              Back to Category
            </NavLink>
            <CompareButton productSlug={product.slug} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
            Product Summary
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-muted">{product.summary}</p>
        </div>
        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
            Applications
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
            {product.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
            Category
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-muted">{category?.name}</p>
          <p className="mt-2 text-sm leading-7 text-brand-muted">{product.subcategory}</p>
        </div>
        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
            Product Data
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-muted">
            {product.specHighlights.length} specification highlights
          </p>
          <p className="mt-2 text-sm leading-7 text-brand-muted">
            Stock-listed item with size or model often embedded directly in the product name
          </p>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="space-y-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Related Products
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
                Products often reviewed alongside this item.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <article
                key={relatedProduct.slug}
                className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
              >
                <img
                  src={relatedProduct.image || '/place holder.jpg'}
                  alt={relatedProduct.name}
                  className="h-48 w-full bg-white p-3 object-contain"
                />
                <div className="space-y-3 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                    {relatedProduct.subcategory}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-brand-ink">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm leading-7 text-brand-muted">{relatedProduct.summary}</p>
                  <NavLink
                    to={`/products/item/${relatedProduct.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                  >
                    View Product
                  </NavLink>
                  <CompareButton productSlug={relatedProduct.slug} compact />
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

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
