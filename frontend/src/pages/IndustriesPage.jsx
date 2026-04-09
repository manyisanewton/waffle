import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FullBleedHero from '../components/sections/FullBleedHero'
import Seo from '../components/seo/Seo'
import { industriesCatalog } from '../data/productCatalog'
import { loadCatalogSummary } from '../lib/catalogApi'

function IndustriesPage() {
  const [catalogSummary, setCatalogSummary] = useState({ industryCounts: {} })

  useEffect(() => {
    let isMounted = true
    loadCatalogSummary()
      .then((summary) => {
        if (isMounted) {
          setCatalogSummary(summary)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <Seo
        title="Industries"
        description="Browse Vortexus product categories and RFQ-ready equipment by industry application, including food and beverage, pharmaceutical, textile, mining, power, and irrigation."
      />
      <FullBleedHero
        eyebrow="Industry Applications"
        title="Find the right products by industry, not only by equipment type."
        description="Industrial buyers often begin with the process challenge, not the exact item code. These industry pages connect application needs to the relevant product families, equipment, chemicals, controls, and RFQ paths."
        imageSrc="/images/assets/img/norwa/waterinfrastructure.webp"
        imageAlt="Industry-focused industrial water product selection"
        overlayClassName="theme-hero-dark"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {industriesCatalog.map((industry) => (
          <article
            key={industry.slug}
            className="overflow-hidden rounded-[1.85rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <img src={industry.image} alt={industry.name} className="h-52 w-full object-cover" />
            <div className="space-y-4 px-5 py-5">
              <h2 className="font-display text-2xl font-semibold text-brand-ink sm:text-3xl">
                {industry.name}
              </h2>
              <p className="text-sm leading-7 text-brand-muted">{industry.description}</p>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                <span>{industry.categorySlugs.length} categories</span>
                <span>{catalogSummary.industryCounts?.[industry.slug] || 0} products</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {industry.challenges.slice(0, 3).map((challenge) => (
                  <span
                    key={challenge}
                    className="rounded-full bg-brand-surface px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-green sm:text-[0.68rem]"
                  >
                    {challenge}
                  </span>
                ))}
              </div>
              <NavLink
                to={`/industries/${industry.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Explore Industry
              </NavLink>
            </div>
          </article>
        ))}
      </section>

    </div>
  )
}

export default IndustriesPage
