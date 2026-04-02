import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FullBleedHero from '../components/sections/FullBleedHero'
import {
  projectFilters,
  projectMetrics,
  projects,
} from '../data/projectsCatalog'

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects
    }

    return projects.filter((project) => project.tags.includes(activeFilter))
  }, [activeFilter])

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <FullBleedHero
        eyebrow="Project Portfolio"
        title="Our impactful projects across treatment, pumping, solar, and community water delivery."
        description="This page gives clients proof, not just promises. It shows the type of systems Vortexus has delivered, the environments we can operate in, and the practical outcomes our projects are built to achieve."
        imageSrc="/images/assets/img/projects/project banner.webp"
        imageAlt="Water projects and delivery portfolio"
        overlayClassName="theme-hero-dark-project"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {projectMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 text-center shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <p className="text-4xl font-semibold text-brand-green">{metric.value}</p>
            <p className="mt-2 text-sm leading-7 text-brand-muted">{metric.label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Filter The Portfolio
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Browse projects by solution type and delivery theme.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {projectFilters.map((filter) => (
            <button
              key={filter.slug}
              type="button"
              onClick={() => setActiveFilter(filter.slug)}
              className={[
                'rounded-full px-5 py-3 text-sm font-semibold transition',
                activeFilter === filter.slug
                  ? 'bg-brand-green text-white shadow-[0_14px_34px_rgba(43,162,82,0.22)]'
                  : 'border border-brand-border bg-white text-brand-ink hover:border-brand-green hover:text-brand-green',
              ].join(' ')}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_20px_52px_rgba(35,33,32,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_62px_rgba(35,33,32,0.09)]"
            >
              <img
                src={project.cardImage}
                alt={project.title}
                className="h-60 w-full object-cover"
              />
              <div className="space-y-4 px-5 py-5">
                <span className="inline-flex rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                  {project.tagLabel}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-brand-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-brand-ink/80">
                    {project.subtitle}
                  </p>
                </div>
                <p className="text-sm leading-7 text-brand-muted">{project.summary}</p>
                <p className="text-sm font-medium text-brand-muted">
                  {project.location}
                </p>
                <NavLink
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                >
                  View Project
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
