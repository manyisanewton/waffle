import { Navigate, NavLink, useParams } from 'react-router-dom'
import FullBleedHero from '../components/sections/FullBleedHero'
import { getProjectBySlug } from '../data/projectsCatalog'

function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="space-y-14 text-brand-ink lg:space-y-20">
      <FullBleedHero
        eyebrow="Project Detail"
        title={project.title}
        description={project.subtitle}
        imageSrc={project.heroImage}
        imageAlt={project.title}
        overlayClassName="theme-hero-dark-project-detail"
      >
        <p className="text-sm font-medium text-white/70">{project.location}</p>
      </FullBleedHero>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
            Challenge
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-muted">{project.challenge}</p>
        </div>
        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
            Solution
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-muted">{project.solution}</p>
        </div>
        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
            Outcome
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-muted">{project.outcome}</p>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Project Story
          </p>
          <h2 className="font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            A closer look at what this project achieved.
          </h2>
          <div className="space-y-4">
            {project.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-brand-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {project.gallery.map((image) => (
            <div
              key={image}
              className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              <img
                src={image}
                alt={project.title}
                className="h-72 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] bg-brand-ink px-6 py-10 text-white shadow-[0_24px_70px_rgba(35,33,32,0.12)] sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              Next Step
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Need a project like this delivered for your site or community?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
              Use this project as a reference point and start the conversation
              with Vortexus about your own water, pumping, or treatment challenge.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <NavLink
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              Back to Projects
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetailPage
