import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import Seo from '../components/seo/Seo'
import { industriesCatalog } from '../data/productCatalog'
import { brandsCatalog } from '../data/brandsCatalog'
import { loadCatalog, loadCatalogSummary } from '../lib/catalogApi'
import { company } from '../data/site/company'

const treatmentImage = '/homepage products (1).png'
const fieldImage = '/homepage products (2).png'
const thirdHeroImage = '/homepage products (3).png'
const heroSlides = [
  {
    src: treatmentImage,
    alt: 'Industrial water treatment equipment and product systems',
    fit: 'object-contain object-center',
  },
  {
    src: fieldImage,
    alt: 'Field water infrastructure installation and product deployment',
    fit: 'object-contain object-center',
  },
  {
    src: thirdHeroImage,
    alt: 'Industrial water-treatment products and product-brand presentation',
    fit: 'object-contain object-center',
  },
]

function HomePage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentHeroSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1,
      )
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const spotlightProducts = [
    catalogProducts.find((product) => product.name === 'CNP CHL 8-50 1PH/220V/2.2KW SS304'),
    catalogProducts.find((product) => product.name === 'Membrane FilmTec BW30 PRO-4040'),
    catalogProducts.find((product) => product.name === 'Water meter 20E 3/4'),
    catalogProducts.find((product) => product.name === 'RO SKID 1000LPH'),
  ].filter(Boolean)

  const activeHeroSlide = heroSlides[currentHeroSlide] || heroSlides[0]

  const goToPreviousHeroSlide = () => {
    setCurrentHeroSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    )
  }

  const goToNextHeroSlide = () => {
    setCurrentHeroSlide((current) =>
      current === heroSlides.length - 1 ? 0 : current + 1,
    )
  }

  const renderProductCard = (product) => (
    <article
      key={product.slug}
      className="overflow-hidden rounded-[1.65rem] border border-brand-border bg-white shadow-[0_16px_38px_rgba(35,33,32,0.05)]"
    >
      <img
        src={product.image || '/place holder.jpg'}
        alt={product.name}
        className="h-44 w-full bg-white p-3 object-contain sm:h-52"
      />
      <div className="space-y-4 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
          {product.subcategory}
        </p>
        <div>
          <h3 className="font-display text-[1.28rem] font-semibold leading-tight text-brand-ink sm:text-[1.45rem] lg:text-[1.7rem]">
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
      <section className="relative left-1/2 mt-0 w-screen -translate-x-1/2 bg-white">
        <div className="mx-auto w-full max-w-[1800px] px-0 sm:px-4 lg:px-6">
          <div className="relative overflow-hidden bg-white aspect-[16/8] sm:aspect-[16/6.6] lg:aspect-[16/5.2]">
            <img
              src={activeHeroSlide.src}
              alt={activeHeroSlide.alt}
              className={`absolute inset-0 h-full w-full bg-white ${activeHeroSlide.fit}`}
            />

            <button
              type="button"
              onClick={goToPreviousHeroSlide}
              aria-label="Show previous homepage image"
              className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white transition hover:text-white/80 sm:left-4 sm:h-12 sm:w-12"
            >
              <FaChevronLeft className="text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-5xl" />
            </button>

            <button
              type="button"
              onClick={goToNextHeroSlide}
              aria-label="Show next homepage image"
              className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white transition hover:text-white/80 sm:right-4 sm:h-12 sm:w-12"
            >
              <FaChevronRight className="text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-5xl" />
            </button>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-5 sm:right-5">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrentHeroSlide(index)}
                aria-label={`Show homepage image ${index + 1}`}
                className={[
                  'h-2.5 rounded-full transition',
                  currentHeroSlide === index
                    ? 'w-8 bg-white'
                    : 'w-2.5 bg-white/55 hover:bg-white/80',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Industry-Leading Brands
          </p>
        </div>

        <div className="grid grid-cols-2 items-center gap-x-5 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {brandsCatalog.map((brand) => (
              <NavLink
                key={brand.name}
                to={`/products?brand=${encodeURIComponent(brand.slug)}`}
                className="flex min-h-[56px] items-center justify-center px-2 py-2 transition hover:-translate-y-0.5 sm:min-h-[70px] sm:px-3 sm:py-3"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-9 w-auto max-w-full object-contain sm:max-h-12"
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
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
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
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
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
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
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
