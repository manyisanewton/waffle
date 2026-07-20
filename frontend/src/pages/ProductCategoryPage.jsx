import { useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import Pagination from '../components/catalog/Pagination'
import CompareButton from '../components/catalog/CompareButton'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import FullBleedHero from '../components/sections/FullBleedHero'
import FaqJsonLd from '../components/seo/FaqJsonLd'
import Seo from '../components/seo/Seo'
import { getCategoryBuyingGuide } from '../data/categoryBuyingGuides'
import { getCategoryBySlug } from '../data/productCatalog'
import { filterProductsByCategory, getCatalog } from '../lib/catalogApi'

const PAGE_SIZE = 24

function ProductCategoryPage() {
  const { categorySlug } = useParams()
  const category = getCategoryBySlug(categorySlug)
  const catalogProducts = getCatalog()
  const isSwimmingPoolCategory = categorySlug === 'swimming-pool-systems'
  const buyingGuide = getCategoryBuyingGuide(category)
  const resolvedCategorySlug = category ? category.slug : ''
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rfqProduct, setRfqProduct] = useState(null)

  const categoryProducts = resolvedCategorySlug
    ? filterProductsByCategory(catalogProducts, resolvedCategorySlug)
    : []
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = categoryProducts.filter((product) => {
    const matchesSubcategory =
      activeSubcategory === 'all' || product.subcategory === activeSubcategory

    const matchesQuery =
      normalizedQuery.length === 0 ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.summary.toLowerCase().includes(normalizedQuery) ||
      (product.itemGroup || '').toLowerCase().includes(normalizedQuery)

    return matchesSubcategory && matchesQuery
  })

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE))
  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  if (!category) {
    return <Navigate to="/products" replace />
  }

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo title={category.name} description={category.description} />
      <FaqJsonLd items={buyingGuide?.faqs || []} />
      <FullBleedHero
        eyebrow="Product Category"
        title={category.name}
        description={category.description}
        imageSrc={category.image}
        imageAlt={category.name}
        media={
          isSwimmingPoolCategory ? (
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : undefined
        }
        overlayClassName={isSwimmingPoolCategory ? '' : 'theme-hero-dark'}
        hideContent={isSwimmingPoolCategory}
        hideWaterline={isSwimmingPoolCategory}
      >
        <div className="flex flex-wrap gap-4 text-sm font-medium text-white/76">
          <p>{categoryProducts.length} products in this category</p>
          <p>{category.subcategories.length} subcategories</p>
        </div>
      </FullBleedHero>

      <section className="space-y-6">
        <div className="grid gap-4 rounded-[1.9rem] border border-brand-border bg-white p-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)] lg:grid-cols-[1.2fr_0.8fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">Search in category</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setCurrentPage(1)
              }}
              placeholder={`Search ${category.name.toLowerCase()}...`}
              className="h-12 w-full rounded-[1rem] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-green"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">Subcategory</span>
            <select
              value={activeSubcategory}
              onChange={(event) => {
                setActiveSubcategory(event.target.value)
                setCurrentPage(1)
              }}
              className="h-12 w-full rounded-[1rem] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition focus:border-brand-green"
            >
              <option value="all">All Subcategories</option>
              {category.subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-7 text-brand-muted">
            Showing <span className="font-semibold text-brand-ink">{visibleProducts.length}</span> products
            {activeSubcategory !== 'all' ? ` in ${activeSubcategory}` : ''}.
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {visibleProducts.length ? (
        <>
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
                      {product.subcategory}
                    </p>
                  </div>
                  <h2 className="font-display text-[1.06rem] leading-snug font-semibold text-brand-ink sm:text-[1.14rem] xl:text-[1.22rem]">
                    {product.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <NavLink
                      to={`/products/item/${product.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-3 py-2 text-[0.88rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                    >
                      View Details
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setRfqProduct(product)}
                      className="inline-flex items-center justify-center rounded-full bg-brand-green px-3 py-2 text-[0.88rem] font-semibold text-white transition hover:bg-brand-green-soft"
                    >
                      RFQ
                    </button>
                    <CompareButton productSlug={product.slug} compact />
                  </div>
                </div>
              </article>
            ))}
          </section>
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <section className="rounded-[1.9rem] border border-brand-border bg-white px-6 py-8 shadow-[0_18px_46px_rgba(35,33,32,0.05)] sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            No matching products
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
            Try a different search or request category guidance.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-muted">
            If the exact item is not visible yet, send an RFQ and describe the product family,
            application, or size you need.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <NavLink
              to="/products"
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              Browse All Categories
            </NavLink>
            <button
              type="button"
              onClick={() =>
                setRfqProduct({
                  name: category.name,
                  subcategory: category.name,
                })}
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Request Category RFQ
            </button>
          </div>
        </section>
      )}

      {buyingGuide ? (
        <section className="space-y-7">
          <div className="max-w-4xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-green">
              Buying guide
            </p>
            <h2 className="font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
              How to choose {category.name.toLowerCase()}
            </h2>
            <p className="text-base leading-8 text-brand-muted">
              {buyingGuide.intro}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                Selection checklist
              </h3>
              <ul className="mt-5 space-y-4">
                {buyingGuide.checkpoints.map((checkpoint) => (
                  <li key={checkpoint} className="flex gap-3 text-sm leading-7 text-brand-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                    <span>{checkpoint}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                Common applications
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {buyingGuide.applications.map((application) => (
                  <span
                    key={application}
                    className="rounded-full border border-brand-border bg-brand-canvas px-4 py-2 text-sm font-semibold text-brand-ink"
                  >
                    {application}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setRfqProduct({
                    name: `${category.name} selection support`,
                    subcategory: category.name,
                  })}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Ask for selection help
              </button>
            </article>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {buyingGuide.faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-[1.25rem] border border-brand-border bg-white px-5 py-4 shadow-[0_14px_34px_rgba(35,33,32,0.04)]"
              >
                <summary className="cursor-pointer list-none font-semibold text-brand-ink">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {item.question}
                    <span className="text-xl text-brand-green transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <LeadCaptureModal
        isOpen={Boolean(rfqProduct)}
        onClose={() => setRfqProduct(null)}
        title={rfqProduct ? `Request Quote for ${rfqProduct.name}` : 'Request a Quotation'}
        landingPage={`/products/category/${category.slug}`}
        productInterest={rfqProduct?.name || ''}
        serviceInterest={rfqProduct?.subcategory || category.name}
      />
    </div>
  )
}

export default ProductCategoryPage
