import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import Seo from '../components/seo/Seo'
import { industriesCatalog } from '../data/productCatalog'
import { brandsCatalog } from '../data/brandsCatalog'
import { loadCatalog, loadCatalogSummary } from '../lib/catalogApi'
import { company } from '../data/site/company'

const treatmentImage = '/homepage products (1).png'
const fieldImage = '/homepage products (2).png'
const heroSlides = [
  {
    src: treatmentImage,
    alt: 'Industrial water treatment equipment and product systems',
    fit: 'object-cover object-center',
  },
  {
    src: fieldImage,
    alt: 'Field water infrastructure installation and product deployment',
    fit: 'object-cover object-center',
  },
]
const animatedHeroSlides = [...heroSlides, heroSlides[0]]

function HomePage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [catalogProducts, setCatalogProducts] = useState([])
  const [catalogSummary, setCatalogSummary] = useState({
    totalProducts: 0,
    featuredProducts: [],
  })

  useEffect(() => {
    let isMounted = true

    Promise.all([loadCatalog(), loadCatalogSummary()])
      .then(([products, summary]) => {
        if (isMounted) {
          setCatalogProducts(products)
          setCatalogSummary(summary)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const spotlightProducts = [
    catalogProducts.find((product) => product.name === 'CNP CHL 8-50 1PH/220V/2.2KW SS304'),
    catalogProducts.find((product) => product.name === 'Membrane FilmTec BW30 PRO-4040'),
    catalogProducts.find((product) => product.name === 'Water meter 20E 3/4'),
    catalogProducts.find((product) => product.name === 'RO SKID 1000LPH'),
  ].filter(Boolean)

  const renderProductCard = (product) => (
    <article
      key={product.slug}
      className="overflow-hidden rounded-[1.65rem] border border-brand-border bg-white shadow-[0_16px_38px_rgba(35,33,32,0.05)]"
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
        <div>
          <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-brand-ink">
            {product.name}
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <NavLink
            to={`/products/item/${product.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
          >
            View Product
          </NavLink>
          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
          >
            RFQ
          </button>
        </div>
      </div>
    </article>
  )

  return (
    <div className="space-y-16 pb-8 lg:space-y-22">
      <Seo
        title="Industrial Water Treatment Products"
        description={`${company.name} is building a product-focused catalog for water treatment equipment, RO systems, chemicals, pumps, instrumentation, automation, tanks, and industrial water process applications.`}
      />
      <section className="relative left-1/2 mt-0 h-[500px] w-screen -translate-x-1/2 overflow-hidden bg-brand-ink">
        <div className="absolute inset-0">
          <div
            className="hero-bg-track flex h-full"
            style={{ width: `${animatedHeroSlides.length * 100}%` }}
          >
            {animatedHeroSlides.map((slide, index) => (
              <img
                key={`${slide.src}-${index}`}
                src={slide.src}
                alt={slide.alt}
                className={`h-full shrink-0 ${slide.fit}`}
                style={{ width: `${100 / animatedHeroSlides.length}%` }}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[500px] w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="absolute bottom-[5px] left-[5px]">
            <NavLink
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-brand-green-soft px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green"
            >
              Explore Products
            </NavLink>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Industry-Leading Brands
          </p>
        </div>

        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {brandsCatalog.map((brand) => (
              <NavLink
                key={brand.name}
                to={`/products?brand=${encodeURIComponent(brand.slug)}`}
                className="flex min-h-[70px] items-center justify-center px-3 py-3 transition hover:-translate-y-0.5"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-12 w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </NavLink>
            ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Featured Products
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
              Featured products ready for quotation.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
              Pumps, membranes, meters, RO units, and essential product lines in one place.
            </p>
          </div>
          <NavLink
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
          >
            Browse Products
          </NavLink>
        </div>

        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {spotlightProducts.map(renderProductCard)}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {catalogSummary.featuredProducts.slice(0, 4).map(renderProductCard)}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Industries
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Products for every industry.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {industriesCatalog.map((industry) => (
            <NavLink
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              {industry.name}
            </NavLink>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] bg-brand-ink px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              Ready To Talk?
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
              Tell us what you need.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Share your requirement and we will help you find the right product.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Request a Quote
            </button>
            <NavLink
              to="/products"
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse Products
            </NavLink>
          </div>
        </div>
      </section>
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Request a Quotation"
        landingPage="/"
        serviceInterest="General product inquiry"
      />
    </div>
  )
}

export default HomePage
