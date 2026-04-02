import { NavLink } from 'react-router-dom'
import { projects } from '../data/projectsCatalog'
import { company } from '../data/site/company'
import { solutionFamilies } from '../data/solutionsCatalog'

const treatmentImage = '/section-medical-water.jpg'
const fieldImage = '/hero-field-work.jpeg'
const processImage = '/section-school-ro-plant.jpg'
const supportImage = '/section-tap-water.jpg'
const heroSlides = [
  {
    src: treatmentImage,
    alt: 'Water treatment system installation',
    position: 'object-center',
  },
  {
    src: fieldImage,
    alt: 'Water infrastructure field work',
    position: 'object-center',
  },
  {
    src: '/images/assets/img/projects/90cubic RO PLANT.webp',
    alt: 'Commercial reverse osmosis plant and treatment system',
    position: 'object-center',
  },
  {
    src: '/images/assets/img/projects/solar projects/somalia.jpg',
    alt: 'Solar-powered community water pumping infrastructure',
    position: 'object-center',
  },
  {
    src: '/images/assets/img/borehole/boreholeequipping.webp',
    alt: 'Borehole equipping and water delivery infrastructure',
    position: 'object-center',
  },
]

const industries = [
  'Commercial Buildings',
  'Manufacturing Plants',
  'Agriculture & Irrigation',
  'Institutions & Schools',
  'Residential Developments',
  'Community Water Projects',
]

const homepageMetrics = [
  { value: '6', label: 'Structured solution families' },
  { value: '182', label: 'Projects delivered in 2025' },
  { value: 'Solar + Water', label: 'Integrated execution focus' },
  { value: 'Field to Plant', label: 'Delivery coverage' },
]

const servicePillars = [
  {
    title: 'Water Treatment',
    text: 'Domestic, commercial, and industrial treatment systems built around actual source-water conditions.',
    image: '/images/assets/img/projects/90cubic RO PLANT.webp',
  },
  {
    title: 'Boreholes & Pumping',
    text: 'Borehole equipping, rehabilitation, pressure systems, and dependable water movement for real operating conditions.',
    image: '/images/assets/img/borehole/boreholeequipping.webp',
  },
  {
    title: 'Solar Water Infrastructure',
    text: 'Solar pumping and energy-aware water delivery systems that reduce cost and improve resilience.',
    image: '/images/assets/img/projects/solar projects/somalia.jpg',
  },
]

const featuredProjects = projects.slice(0, 3)

const strengths = [
  {
    metric: '01',
    title: 'Integrated Water Systems',
    text: 'From source and pumping to treatment, storage, controls, and performance support.',
  },
  {
    metric: '02',
    title: 'Energy-Conscious Delivery',
    text: 'Solar pumping, efficient system design, and practical operating-cost reduction.',
  },
  {
    metric: '03',
    title: 'Smart Monitoring',
    text: 'IoT-enabled pump visibility, alerts, reporting, and operational control.',
  },
]

const processSteps = [
  {
    title: 'Assess',
    text: 'We understand the site, water demand, energy context, and technical risks.',
  },
  {
    title: 'Design',
    text: 'We size and specify a solution that fits operational reality, not generic assumptions.',
  },
  {
    title: 'Deliver',
    text: 'We implement systems with clear commissioning, testing, and handover steps.',
  },
  {
    title: 'Support',
    text: 'We help maintain performance through monitoring, servicing, and system improvement.',
  },
]

function HomePage() {
  return (
    <div className="space-y-16 pb-8 lg:space-y-22">
      <section className="relative left-1/2 -mt-8 min-h-[38rem] w-screen -translate-x-1/2 overflow-hidden bg-brand-ink lg:-mt-12 lg:min-h-[44rem]">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`hero-bg-slide absolute inset-0 h-full w-full object-cover ${slide.position}`}
              style={{
                animationDelay: `${index * 6}s`,
              }}
            />
          ))}
          <div className="theme-home-hero-overlay absolute inset-0" />
          <div className="theme-home-hero-radial absolute inset-0" />
        </div>

        <div className="relative mx-auto flex min-h-[38rem] w-full max-w-7xl items-center px-6 py-10 sm:px-8 lg:min-h-[44rem] lg:px-10 lg:py-14">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-brand-green-muted">
              {company.tagline}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] font-semibold tracking-tight text-white drop-shadow-[0_14px_30px_rgba(0,0,0,0.28)] sm:text-6xl lg:text-7xl">
              Water and energy systems engineered for performance, reliability, and scale.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/86 drop-shadow-[0_10px_26px_rgba(0,0,0,0.22)] sm:text-lg">
              {company.name} delivers water treatment, borehole systems, pumping,
              solar-powered water infrastructure, and IoT-enabled monitoring for
              clients who need dependable technical execution.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NavLink
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Request a Consultation
              </NavLink>
              <NavLink
                to="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/24 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Explore Solutions
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homepageMetrics.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.5rem] border border-brand-border bg-white px-5 py-5 shadow-[0_14px_34px_rgba(35,33,32,0.05)]"
            >
              <p className="text-3xl font-semibold text-brand-green">{item.value}</p>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Core technical capability across treatment, pumping, boreholes, and solar delivery.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted">
            Vortexus is structured to help clients move from water problems to working systems.
            The focus is not on isolated products. The focus is on matching the right engineering
            response to the actual site, source, and performance need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <NavLink
              to="/solutions"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Browse Solution Families
            </NavLink>
            <NavLink
              to="/services"
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              View Services
            </NavLink>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {servicePillars.map((pillar) => (
            <article
              key={pillar.title}
              className="overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-[0_14px_34px_rgba(35,33,32,0.05)]"
            >
              <img
                src={pillar.image}
                alt={pillar.title}
                className="h-44 w-full object-cover"
              />
              <div className="px-5 py-5">
                <h3 className="font-display text-xl font-semibold text-brand-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{pillar.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Solution Families
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
              What clients can explore from the homepage at a glance.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
              Each area below opens into a deeper page, but the homepage should already
              show the breadth of the company in a way that feels structured and credible.
            </p>
          </div>
          <NavLink
            to="/solutions"
            className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
          >
            View All Solutions
          </NavLink>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutionFamilies.map((solution) => (
            <article
              key={solution.slug}
              className="overflow-hidden rounded-[1.65rem] border border-brand-border bg-white shadow-[0_16px_38px_rgba(35,33,32,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(35,33,32,0.08)]"
            >
              <img
                src={solution.image}
                alt={solution.title}
                className="h-52 w-full object-cover"
              />
              <div className="space-y-4 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                  {solution.category}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-brand-ink">
                    {solution.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {solution.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {solution.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-brand-surface px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-green"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <NavLink
                  to={`/solutions/${solution.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                >
                  Explore
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.85rem] bg-brand-surface px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Why Vortexus
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
              A practical engineering approach that clients can trust.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {strengths.map((item) => (
              <div key={item.metric}>
                <p className="text-2xl font-semibold text-brand-green">{item.metric}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Industries We Support
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Solutions that adapt to site conditions, sector needs, and growth plans.
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-ink"
              >
                {industry}
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-[1.7rem] bg-brand-surface shadow-[0_16px_40px_rgba(35,33,32,0.07)] aspect-[4/5] sm:aspect-[1.15/1] lg:max-w-[20rem]">
            <img
              src={supportImage}
              alt="Water pump infrastructure and support work"
              className="h-full w-full object-contain p-2 sm:p-3"
            />
            <div className="theme-image-overlay-field absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/72">
                Field Deployment
              </p>
              <p className="mt-3 max-w-md text-lg font-semibold sm:text-xl">
                Designed for commercial, agricultural, institutional, and community systems.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_14px_34px_rgba(35,33,32,0.05)] sm:px-6 sm:py-6">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            What Clients Need
          </p>
          <div className="mt-4 space-y-4">
            {[
              {
                title: 'Clean Water Systems',
                summary:
                  'Treatment and delivery systems designed to improve water quality, safety, and operational reliability.',
              },
              {
                title: 'Sustainable Pumping',
                summary:
                  'Pump systems integrated with efficient power design, solar options, and smarter control methods.',
              },
              {
                title: 'Smart Operations',
                summary:
                  'Connected pump and water infrastructure with monitoring, alerts, analytics, and maintenance visibility.',
              },
            ].map((solution) => (
              <div key={solution.title} className="border-b border-brand-border pb-4 last:border-b-0">
                <h3 className="font-display text-xl font-semibold text-brand-ink sm:text-2xl">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-brand-muted">
                  {solution.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Project References
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
              Proof that the company can move from concept to delivered systems.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
              Project references help customers believe the service promise. They show
              treatment, solar pumping, and infrastructure capability in real environments.
            </p>
          </div>
          <NavLink
            to="/projects"
            className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
          >
            View Projects
          </NavLink>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-[1.65rem] border border-brand-border bg-white shadow-[0_16px_38px_rgba(35,33,32,0.05)]"
            >
              <img
                src={project.cardImage}
                alt={project.title}
                className="h-52 w-full object-cover"
              />
              <div className="space-y-4 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                  {project.tagLabel}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-brand-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-brand-ink/80">
                    {project.location}
                  </p>
                </div>
                <p className="text-sm leading-7 text-brand-muted">{project.summary}</p>
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

      <section>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            How We Work
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Clear process. Technical depth. Better delivery confidence.
          </h2>
        </div>
        <div className="relative mt-8 overflow-hidden rounded-[1.8rem] bg-brand-surface shadow-[0_18px_46px_rgba(35,33,32,0.08)] aspect-[5/4] lg:aspect-[2.45/1]">
          <img
            src={processImage}
            alt="Water operations and process workflow"
            className="h-full w-full object-contain p-2 sm:p-3"
          />
          <div className="theme-process-overlay absolute inset-0" />
          <div className="theme-process-radial absolute left-0 top-0 h-full w-full" />
          <div className="absolute left-5 top-5 max-w-lg text-white sm:left-7 sm:top-7">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              Engineering Process
            </p>
            <p className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
              Every project moves from assessment to support with technical clarity and measurable performance in mind.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="rounded-[1.35rem] border border-brand-border bg-white px-5 py-5 shadow-[0_12px_28px_rgba(35,33,32,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-green">
                Step {index + 1}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-brand-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-brand-muted">{step.text}</p>
            </div>
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
              Let’s design a system that solves your water, pumping, solar, or monitoring challenge properly.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Use the site as a sales tool: clear positioning, strong technical credibility,
              and direct conversion into consultation and quote requests.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <NavLink
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Talk to Our Team
            </NavLink>
            <NavLink
              to="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Projects
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
