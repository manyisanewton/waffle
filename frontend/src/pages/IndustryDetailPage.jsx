import { useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import Pagination from '../components/catalog/Pagination'
import CompareButton from '../components/catalog/CompareButton'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import FullBleedHero from '../components/sections/FullBleedHero'
import Seo from '../components/seo/Seo'
import { getCategoryBySlug, getIndustryBySlug } from '../data/productCatalog'
import { filterProductsByIndustry, loadCatalog } from '../lib/catalogApi'

const PAGE_SIZE = 24

function IndustryDetailPage() {
  const { industrySlug } = useParams()
  const industry = getIndustryBySlug(industrySlug)
  const [catalogProducts, setCatalogProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rfqTitle, setRfqTitle] = useState('')

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

  if (!industry) {
    return <Navigate to="/industries" replace />
  }

  const industryProducts = filterProductsByIndustry(catalogProducts, industry.slug)
  const recommendedCategories = industry.categorySlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter(Boolean)
  const totalPages = Math.max(1, Math.ceil(industryProducts.length / PAGE_SIZE))
  const paginatedProducts = industryProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo title={industry.name} description={industry.description} />
      <FullBleedHero
        eyebrow="Industry Focus"
        title={industry.name}
        description={industry.description}
        imageSrc={industry.image}
        imageAlt={industry.name}
        overlayClassName="theme-hero-dark"
      >
        <div className="flex flex-wrap gap-4 text-sm font-medium text-white/76">
          <p>{industryProducts.length} matching products</p>
          <p>{recommendedCategories.length} recommended categories</p>
        </div>
      </FullBleedHero>

      <section className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Typical Needs
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
            Product groups commonly reviewed in this industry.
          </h2>
          <ul className="mt-6 space-y-4">
            {industry.challenges.map((challenge) => (
              <li key={challenge} className="flex gap-3 text-sm leading-7 text-brand-muted">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {recommendedCategories.map((category) => (
            <article
              key={category.slug}
              className="rounded-[1.7rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                {category.icon} Category
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-brand-ink">
                {category.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-brand-muted">{category.description}</p>
              <NavLink
                to={`/products/category/${category.slug}`}
                className="mt-5 inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
              >
                Open Category
              </NavLink>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Matching Products
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
              Relevant product options for {industry.name.toLowerCase()}.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setRfqTitle(`Request Quote for ${industry.name}`)}
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
          >
            Request Industry RFQ
          </button>
        </div>

        <div className="flex justify-end">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
                  {product.subcategory}
                </p>
                <h3 className="font-display text-[1.55rem] leading-tight font-semibold text-brand-ink">
                  {product.name}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <NavLink
                    to={`/products/item/${product.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-3.5 py-2 text-[0.95rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                  >
                    View Product
                  </NavLink>
                  <NavLink
                    to={`/request-quote?industry=${encodeURIComponent(industry.slug)}&product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categorySlug)}`}
                    className="inline-flex items-center justify-center rounded-full bg-brand-green px-3.5 py-2 text-[0.95rem] font-semibold text-white transition hover:bg-brand-green-soft"
                  >
                    RFQ
                  </NavLink>
                  <CompareButton productSlug={product.slug} compact />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-end">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </section>

      <LeadCaptureModal
        isOpen={Boolean(rfqTitle)}
        onClose={() => setRfqTitle('')}
        title={rfqTitle || 'Request a Quotation'}
        landingPage={`/industries/${industry.slug}`}
        serviceInterest={industry.name}
      />
    </div>
  )
}

export default IndustryDetailPage
