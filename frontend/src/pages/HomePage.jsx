import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import Seo from '../components/seo/Seo'
import { industriesCatalog } from '../data/productCatalog'
import { brandsCatalog } from '../data/brandsCatalog'
import { getCatalog } from '../lib/catalogApi'
import { trackEvent } from '../lib/analytics'
import { company } from '../data/site/company'

const treatmentImage = '/homepage products (1).png'
const fieldImage = '/homepage products (2).png'
const thirdHeroImage = '/homepage products (3).png'
const fourthHeroImage = '/homepage products (4).png'
const fifthHeroImage = '/homepage products (5).png'
const socialPromoSlides = [
  '/adds/WhatsApp Image 2026-04-16 at 07.58.43.jpeg',
  '/adds/WhatsApp Image 2026-04-16 at 07.58.44.jpeg',
  '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (1).jpeg',
  '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (2).jpeg',
]

const heroSlides = [
  {
    src: treatmentImage,
    alt: 'Industrial water treatment equipment and product systems',
    fit: 'object-cover object-left sm:object-center',
    motion: 'zoom',
  },
  {
    src: fieldImage,
    alt: 'Field water infrastructure installation and product deployment',
    fit: 'object-cover object-right sm:object-center',
    motion: 'slide-right',
  },
  {
    src: thirdHeroImage,
    alt: 'Industrial water-treatment products and product-brand presentation',
    fit: 'object-cover object-right sm:object-center',
    motion: 'lift',
  },
  {
    src: fourthHeroImage,
    alt: 'Comprehensive industrial product solutions and applications',
    fit: 'object-cover object-center sm:object-center',
    motion: 'scale-soft',
  },
  {
    src: fifthHeroImage,
    alt: 'Advanced water technology and specialized equipment',
    fit: 'object-cover object-center sm:object-center',
    motion: 'slice',
  },
]

const heroSliceCount = 7

function HomePage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [currentSocialPromoSlide, setCurrentSocialPromoSlide] = useState(0)
  const [isFirstBrandRowPaused, setIsFirstBrandRowPaused] = useState(false)
  const [isSecondBrandRowPaused, setIsSecondBrandRowPaused] = useState(false)
  const catalogProducts = getCatalog()
  const firstBrandRow = brandsCatalog.filter((_, index) => index % 2 === 0)
  const secondBrandRow = brandsCatalog.filter((_, index) => index % 2 !== 0)
  const marqueeFirstRow = [...firstBrandRow, ...firstBrandRow]
  const marqueeSecondRow = [...secondBrandRow, ...secondBrandRow]
  const facebookEmbedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    company.socialLinks.facebook,
  )}&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSocialPromoSlide((current) =>
        current === socialPromoSlides.length - 1 ? 0 : current + 1,
      )
    }, 4200)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const spotlightProducts = [
    catalogProducts.find((product) => product.name === 'CNP Vertical Inline Centrifugal Pump'),
    catalogProducts.find((product) => product.name === 'CNP Blue Cast Iron End-Suction Centrifugal Pump'),
    catalogProducts.find((product) => product.name === 'CNP Vertical Multistage Centrifugal Pump'),
    catalogProducts.find((product) => product.name === 'CNP Stainless Steel Horizontal Centrifugal Pump'),
  ].filter(Boolean)

  const featuredQuotationProducts = [
    catalogProducts.find(
      (product) => product.name === 'Self-Priming Stainless Steel Multistage Centrifugal',
    ),
    catalogProducts.find(
      (product) => product.name === 'Domestic RO Water Purifier with IC controller',
    ),
    catalogProducts.find(
      (product) => product.name === 'Lowara Kreiselpumpe ähnlich Typ CO35005A',
    ),
    catalogProducts.find((product) => product.name === 'Chlorine 65% 45kgs'),
  ].filter(Boolean)

  const poolFeaturedProducts = [
    catalogProducts.find((product) => product.name === 'Pool Air Blower 220V 1PH'),
    catalogProducts.find((product) => product.name === 'Fiberglass Sand Filter Combo'),
    catalogProducts.find((product) => product.name === 'Top Mount Plastic Filter'),
    catalogProducts.find((product) => product.name === 'Cartridge Filter Pump Combo'),
  ].filter(Boolean)

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
      <div className="space-y-3 px-4 py-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-green">
          {product.subcategory}
        </p>
        <div>
          <h3 className="font-display text-[1.08rem] font-semibold leading-snug text-brand-ink sm:text-[1.16rem] lg:text-[1.26rem]">
            {product.name}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <NavLink
            to={`/products/item/${product.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2.5 text-[0.88rem] font-semibold text-white transition hover:bg-brand-green-soft"
          >
            View Product
          </NavLink>
          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-4 py-2.5 text-[0.88rem] font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
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
        title="Water Treatment, swimming Pool & Solar Equipment Supplier Kenya"
        includeSiteName={false}
        description="Vortexus supplies water treatment, swimming pool & solar equipment in Kenya. RO systems, pumps, filtration, chemicals & solar solutions. Get a quote."
      />
      <style>
        {`
          @keyframes homepage-brand-marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }

          @keyframes homepage-brand-marquee-reverse {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }

          .home-hero-slide {
            opacity: 0;
            transition:
              opacity 1100ms ease,
              transform 1300ms cubic-bezier(0.22, 1, 0.36, 1),
              filter 1100ms ease;
            will-change: opacity, transform, filter;
          }

          .home-hero-slide.is-active {
            opacity: 1;
            filter: saturate(1.02) contrast(1.01);
          }

          .home-hero-slide--zoom {
            transform: scale(1.045);
          }

          .home-hero-slide--zoom.is-active {
            transform: scale(1);
          }

          .home-hero-slide--slide-right {
            transform: translate3d(4.5%, 0, 0) scale(1.025);
          }

          .home-hero-slide--slide-right.is-active {
            transform: translate3d(0, 0, 0) scale(1);
          }

          .home-hero-slide--lift {
            transform: translate3d(0, 5%, 0) scale(1.025);
          }

          .home-hero-slide--lift.is-active {
            transform: translate3d(0, 0, 0) scale(1);
          }

          .home-hero-slide--scale-soft {
            transform: scale(0.985);
          }

          .home-hero-slide--scale-soft.is-active {
            transform: scale(1);
          }

          .home-hero-slide--slide-left {
            transform: translate3d(-4.5%, 0, 0) scale(1.025);
          }

          .home-hero-slide--slide-left.is-active {
            transform: translate3d(0, 0, 0) scale(1);
          }

          .home-hero-slide--slice {
            transform: scale(1.015);
          }

          .home-hero-slide--slice.is-active {
            transform: scale(1);
          }

          .home-hero-slide-image {
            transition: opacity 500ms ease;
          }

          .home-hero-slide--slice .home-hero-slide-image {
            opacity: 0;
            transition-delay: 720ms;
          }

          .home-hero-slide--slice.is-active .home-hero-slide-image {
            opacity: 1;
          }

          .home-hero-slice {
            bottom: 0;
            opacity: 0;
            top: 0;
            transform: translate3d(0, var(--slice-offset), 0) scale(1.025);
            transition:
              opacity 620ms ease,
              transform 880ms cubic-bezier(0.22, 1, 0.36, 1);
            transition-delay: calc(var(--slice-index) * 82ms);
          }

          .home-hero-slide--slice.is-active .home-hero-slice {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          @media (prefers-reduced-motion: reduce) {
            .home-hero-slide {
              transition: opacity 300ms ease;
              transform: none !important;
            }

            .home-hero-slice {
              display: none;
            }
          }
        `}
      </style>
      <section className="relative left-1/2 mt-0 w-screen -translate-x-1/2 bg-white">
        <div className="mx-auto w-full max-w-[1800px] px-0 sm:px-4 lg:px-6">
          <div className="relative overflow-hidden bg-white aspect-[16/8.4] sm:aspect-[16/6.9] lg:aspect-[16/5.5]">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentHeroSlide

              return (
                <div
                  key={slide.src}
                  role="img"
                  aria-label={slide.alt}
                  className={[
                    'home-hero-slide absolute inset-0 h-full w-full bg-white',
                    `home-hero-slide--${slide.motion}`,
                    isActive ? 'is-active' : '',
                  ].join(' ')}
                >
                  <img
                    src={slide.src}
                    alt=""
                    aria-hidden="true"
                    className={[
                      'home-hero-slide-image absolute inset-0 h-full w-full bg-white',
                      slide.fit,
                    ].join(' ')}
                  />
                  {slide.motion === 'slice'
                    ? Array.from({ length: heroSliceCount }, (_, sliceIndex) => (
                        <span
                          key={`${slide.src}-slice-${sliceIndex}`}
                          aria-hidden="true"
                          className="home-hero-slice absolute bg-cover bg-center"
                          style={{
                            left: `${(sliceIndex / heroSliceCount) * 100}%`,
                            width: `${100 / heroSliceCount}%`,
                            backgroundImage: `url("${slide.src}")`,
                            backgroundSize: `${heroSliceCount * 100}% 100%`,
                            backgroundPosition: `${(sliceIndex / (heroSliceCount - 1)) * 100}% center`,
                            '--slice-index': sliceIndex,
                            '--slice-offset': sliceIndex % 2 === 0 ? '-7%' : '7%',
                          }}
                        />
                      ))
                    : null}
                </div>
              )
            })}

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

      <section className="space-y-6">
        <div>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Industry-Leading Brands
          </p>
        </div>

        <div className="space-y-5">
          <div className="group relative overflow-hidden py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white via-white/94 to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white via-white/94 to-transparent sm:w-20" />
            <div
              className="flex w-max items-center gap-10 px-2 sm:gap-14"
              onMouseEnter={() => setIsFirstBrandRowPaused(true)}
              onMouseLeave={() => setIsFirstBrandRowPaused(false)}
              style={{
                animation: 'homepage-brand-marquee 34s linear infinite',
                animationPlayState: isFirstBrandRowPaused ? 'paused' : 'running',
              }}
            >
              {marqueeFirstRow.map((brand, index) => (
                <NavLink
                  key={`row-1-${brand.slug}-${index}`}
                  to={`/brands/${brand.slug}`}
                  onClick={() =>
                    trackEvent('view_brand_products', {
                      brand_name: brand.name,
                      brand_slug: brand.slug,
                    })}
                  className="flex h-16 min-w-[140px] items-center justify-center transition hover:-translate-y-0.5 sm:h-20 sm:min-w-[180px] lg:h-24 lg:min-w-[210px]"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-11 w-auto max-w-[150px] object-contain sm:max-h-14 sm:max-w-[190px] lg:max-h-16 lg:max-w-[220px]"
                    loading="lazy"
                  />
                </NavLink>
              ))}
            </div>
          </div>

          <div className="group relative overflow-hidden py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white via-white/94 to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white via-white/94 to-transparent sm:w-20" />
            <div
              className="flex w-max items-center gap-10 px-2 sm:gap-14"
              onMouseEnter={() => setIsSecondBrandRowPaused(true)}
              onMouseLeave={() => setIsSecondBrandRowPaused(false)}
              style={{
                animation: 'homepage-brand-marquee-reverse 36s linear infinite',
                animationPlayState: isSecondBrandRowPaused ? 'paused' : 'running',
              }}
            >
              {marqueeSecondRow.map((brand, index) => (
                <NavLink
                  key={`row-2-${brand.slug}-${index}`}
                  to={`/brands/${brand.slug}`}
                  onClick={() =>
                    trackEvent('view_brand_products', {
                      brand_name: brand.name,
                      brand_slug: brand.slug,
                    })}
                  className="flex h-16 min-w-[140px] items-center justify-center transition hover:-translate-y-0.5 sm:h-20 sm:min-w-[180px] lg:h-24 lg:min-w-[210px]"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-11 w-auto max-w-[150px] object-contain sm:max-h-14 sm:max-w-[190px] lg:max-h-16 lg:max-w-[220px]"
                    loading="lazy"
                  />
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
           
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
              Featured products
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
            {featuredQuotationProducts.map(renderProductCard)}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {poolFeaturedProducts.map(renderProductCard)}
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

      <section className="space-y-8">
        <div className="grid gap-8 rounded-[2rem] border border-brand-border bg-white px-6 py-8 shadow-[0_18px_45px_rgba(35,33,32,0.08)] lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-10">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Facebook Updates
              </p>
              <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold leading-tight text-brand-ink sm:text-[2.5rem]">
                Product updates and current offers.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-brand-muted sm:text-base">
                Follow the Vortexus page and review active promotions in one place.
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-slate-50 shadow-[0_12px_30px_rgba(35,33,32,0.08)]">
              <div className="border-b border-brand-border bg-slate-100 px-5 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                  Current Promotions
                </p>
              </div>
              <div className="relative aspect-[4/4.35] bg-white sm:aspect-[4/4.05] lg:aspect-[4/4.2]">
                {socialPromoSlides.map((slide, index) => (
                  <img
                    key={slide}
                    src={slide}
                    alt={`Vortexus promotion ${index + 1}`}
                    className={[
                      'absolute inset-0 h-full w-full object-contain bg-white transition-all duration-700',
                      index === currentSocialPromoSlide
                        ? 'translate-x-0 opacity-100'
                        : index < currentSocialPromoSlide
                          ? '-translate-x-full opacity-0'
                          : 'translate-x-full opacity-0',
                    ].join(' ')}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={company.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Open Facebook Page
              </a>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
              >
                Request a Quote
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-slate-50 shadow-[0_12px_30px_rgba(35,33,32,0.08)]">
            <div className="border-b border-brand-border bg-slate-100 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                Vortexus Facebook Feed
              </p>
            </div>
            <div className="min-h-[720px] bg-white">
              <iframe
                title="Vortexus Facebook page"
                src={facebookEmbedUrl}
                width="100%"
                height="720"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            </div>
          </div>
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
