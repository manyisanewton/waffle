import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { company } from '../data/site/company'
import { solutionFamilies } from '../data/solutionsCatalog'

const categoryGroups = [
  {
    title: 'Water Access & Delivery',
    text: 'Boreholes, pumps, and solar-driven water movement systems for daily operational reliability.',
    slugs: ['borehole-solutions', 'water-pumps', 'solar-solutions'],
  },
  {
    title: 'Treatment & Purification',
    text: 'Domestic, commercial, and industrial treatment systems built around actual water quality and output needs.',
    slugs: [
      'domestic-water-treatment',
      'commercial-industrial-water-treatment',
      'chemicals-media',
    ],
  },
]

function SolutionsPage() {
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    if (!lightboxImage) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxImage(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxImage])

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-20">
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-brand-ink text-white">
        <button
          type="button"
          onClick={() =>
            setLightboxImage({
              src: '/images/assets/img/projects/project banner.webp',
              alt: 'Water and energy project infrastructure',
            })
          }
          className="absolute inset-0 block h-full w-full cursor-zoom-in overflow-hidden"
          aria-label="Open larger view of water and energy project infrastructure"
        >
          <img
            src="/images/assets/img/projects/project banner.webp"
            alt="Water and energy project infrastructure"
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
          />
        </button>
        <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(20,23,21,0.84)_0%,rgba(20,23,21,0.66)_42%,rgba(20,23,21,0.52)_100%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              Solution Platform
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Water, pumping, treatment, and energy systems organized for real-world delivery.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
              {company.name} supports clients with integrated solution families,
              from borehole performance and pump systems to domestic treatment,
              industrial purification, chemicals, media, and solar-powered water infrastructure.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { value: '6', label: 'Solution families' },
          { value: 'Field + Plant', label: 'Delivery coverage' },
          { value: 'Residential to Industrial', label: 'Application span' },
          { value: 'Water + Energy + Automation', label: 'Integrated capability' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <p className="text-3xl font-semibold text-brand-green">{item.value}</p>
            <p className="mt-2 text-sm leading-7 text-brand-muted">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            How The System Is Organized
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            One structured solutions platform, not disconnected pages.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            Each family below is built to handle deeper technical content without
            losing clarity on mobile or desktop. The platform stays expandable as
            Vortexus adds more solution areas, products, and project references.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {categoryGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[2rem] border border-brand-border bg-brand-surface px-6 py-6"
            >
              <h3 className="font-display text-3xl font-semibold text-brand-ink">
                {group.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-brand-muted">
                {group.text}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.slugs.map((slug) => {
                  const family = solutionFamilies.find((item) => item.slug === slug)

                  return (
                    <NavLink
                      key={slug}
                      to={`/solutions/${slug}`}
                      className="rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                    >
                      {family?.title}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Solution Families
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Explore each solution in detail.
          </h2>
        </div>

        <div className="space-y-6">
          {solutionFamilies.map((solution, index) => (
            <article
              key={solution.slug}
              className="grid overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-[0_24px_70px_rgba(35,33,32,0.06)] lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div
                className={[
                  'order-2 flex flex-col justify-between px-6 py-7 sm:px-8',
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2',
                ].join(' ')}
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                    {solution.category}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
                    {solution.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
                    {solution.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {solution.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-ink"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <NavLink
                    to={`/solutions/${solution.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                  >
                    View Solution
                  </NavLink>
                </div>
              </div>

              <div
                className={[
                  'order-1 min-h-[18rem]',
                  index % 2 === 0 ? 'lg:order-2' : 'lg:order-1',
                ].join(' ')}
              >
                <button
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: solution.image,
                      alt: solution.title,
                    })
                  }
                  className="block h-full w-full cursor-zoom-in overflow-hidden"
                  aria-label={`Open larger view of ${solution.title}`}
                >
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {lightboxImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/82 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Close
          </button>
          <div
            className="max-h-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-h-[82vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SolutionsPage
