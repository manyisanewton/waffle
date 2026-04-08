import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FullBleedHero from '../components/sections/FullBleedHero'
import Seo from '../components/seo/Seo'
import useProductCompare from '../hooks/useProductCompare'
import { getCategoryBySlug, getIndustryBySlug } from '../data/productCatalog'
import { loadCatalog } from '../lib/catalogApi'

const comparisonRows = [
  { label: 'Category', key: 'category' },
  { label: 'Subcategory', key: 'subcategory' },
  { label: 'Stock Group', key: 'itemGroup' },
  { label: 'Summary', key: 'summary' },
  { label: 'Applications', key: 'applications' },
  { label: 'Spec Highlights', key: 'specHighlights' },
  { label: 'Industries', key: 'industries' },
]

function renderList(items) {
  if (!items || !items.length) {
    return <span className="text-brand-muted">Not specified</span>
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="leading-7 text-brand-muted">
          {item}
        </li>
      ))}
    </ul>
  )
}

function CompareProductsPage() {
  const [catalogProducts, setCatalogProducts] = useState([])
  const { comparedSlugs, comparedCount, removeComparedSlug, clearComparedSlugs } = useProductCompare()

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

  const comparedProducts = useMemo(
    () =>
      comparedSlugs
        .map((slug) => catalogProducts.find((product) => product.slug === slug))
        .filter(Boolean),
    [catalogProducts, comparedSlugs],
  )

  const comparisonData = comparedProducts.map((product) => {
    const category = getCategoryBySlug(product.categorySlug)
    const industries = product.industrySlugs
      .map((slug) => getIndustryBySlug(slug))
      .filter(Boolean)
      .map((industry) => industry.name)

    return {
      ...product,
      category: category?.name || product.categorySlug,
      industries,
    }
  })

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo
        title="Compare Products"
        description="Compare water-treatment products side by side by category, stock group, applications, specification highlights, and industry fit."
      />
      <FullBleedHero
        eyebrow="Product Comparison"
        title="Review shortlisted products side by side before you move to RFQ."
        description="Use the compare view to review category fit, stock group, applications, and specification highlights across multiple items. This is designed for technical buyers who need a cleaner shortlisting workflow."
        imageSrc="/images/products/reverse-osmosis-systems/ro-skid.webp"
        imageAlt="Compare industrial water treatment products"
        overlayClassName="theme-hero-dark"
      >
        <div className="flex flex-wrap gap-4 text-sm font-medium text-white/76">
          <p>{comparedCount} products selected</p>
          <p>Up to 4 products at once</p>
        </div>
      </FullBleedHero>

      {!comparedProducts.length ? (
        <section className="rounded-[1.9rem] border border-brand-border bg-white px-6 py-8 shadow-[0_18px_46px_rgba(35,33,32,0.05)] sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            No products selected
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
            Start by adding products to compare from the catalog.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-muted">
            Use compare buttons on product cards or product detail pages. Once added, the items
            will stay here until you remove them or clear the list.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <NavLink
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Browse Products
            </NavLink>
            <NavLink
              to="/industries"
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              Browse Industries
            </NavLink>
          </div>
        </section>
      ) : (
        <>
          <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Shortlist
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
                Compare product fit, application, and spec detail.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={clearComparedSlugs}
                className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
              >
                Clear Compare
              </button>
              <NavLink
                to="/request-quote"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Request Quote
              </NavLink>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {comparisonData.map((product) => (
              <article
                key={product.slug}
                className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
              >
                <img
                  src={product.image || '/place holder.jpg'}
                  alt={product.name}
                  className="h-52 w-full bg-white p-3 object-contain"
                />
                <div className="space-y-4 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                    {product.subcategory}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-brand-ink">
                    {product.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-muted">
                    {product.itemGroup}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <NavLink
                      to={`/products/item/${product.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                    >
                      View Product
                    </NavLink>
                    <NavLink
                      to={`/request-quote?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categorySlug)}`}
                      className="inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                    >
                      RFQ
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => removeComparedSlug(product.slug)}
                      className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="overflow-hidden rounded-[1.9rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 border-b border-r border-brand-border bg-brand-surface px-5 py-4 text-left text-sm font-semibold text-brand-ink">
                      Comparison Field
                    </th>
                    {comparisonData.map((product) => (
                      <th
                        key={product.slug}
                        className="min-w-[260px] border-b border-brand-border bg-brand-surface px-5 py-4 text-left text-sm font-semibold text-brand-ink"
                      >
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.key}>
                      <td className="sticky left-0 z-[1] border-b border-r border-brand-border bg-white px-5 py-4 text-sm font-semibold text-brand-ink">
                        {row.label}
                      </td>
                      {comparisonData.map((product) => (
                        <td
                          key={`${row.key}-${product.slug}`}
                          className="border-b border-brand-border px-5 py-4 align-top text-sm"
                        >
                          {row.key === 'applications' && renderList(product.applications)}
                          {row.key === 'specHighlights' && renderList(product.specHighlights)}
                          {row.key === 'industries' && renderList(product.industries)}
                          {row.key === 'category' && (
                            <NavLink
                              to={`/products/category/${product.categorySlug}`}
                              className="font-medium text-brand-ink transition hover:text-brand-green"
                            >
                              {product.category}
                            </NavLink>
                          )}
                          {!['applications', 'specHighlights', 'industries', 'category'].includes(row.key) && (
                            <span className="leading-7 text-brand-muted">{product[row.key]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 z-[1] border-r border-brand-border bg-white px-5 py-4 text-sm font-semibold text-brand-ink">
                      Actions
                    </td>
                    {comparisonData.map((product) => (
                      <td key={`actions-${product.slug}`} className="px-5 py-4">
                        <div className="flex flex-col gap-3">
                          <NavLink
                            to={`/products/item/${product.slug}`}
                            className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                          >
                            View Product
                          </NavLink>
                          <NavLink
                            to={`/request-quote?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categorySlug)}`}
                            className="inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                          >
                            Request Quote
                          </NavLink>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default CompareProductsPage
