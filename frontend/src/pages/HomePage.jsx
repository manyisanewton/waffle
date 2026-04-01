import { NavLink } from 'react-router-dom'
import { company } from '../data/site/company'
import { services } from '../data/mock/services'
import { solutions } from '../data/mock/solutions'

const treatmentImage = '/section-medical-water.jpg'
const fieldImage = '/hero-field-work.jpeg'
const processImage = '/section-school-ro-plant.jpg'
const supportImage = '/section-tap-water.jpg'

const industries = [
  'Commercial Buildings',
  'Manufacturing Plants',
  'Agriculture & Irrigation',
  'Institutions & Schools',
  'Residential Developments',
  'Community Water Projects',
]

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
    <div className="space-y-20 pb-8 lg:space-y-28">
      <section className="relative left-1/2 -mt-8 min-h-[38rem] w-screen -translate-x-1/2 overflow-hidden bg-brand-ink lg:-mt-12 lg:min-h-[44rem]">
        <div className="absolute inset-0">
          <img
            src={treatmentImage}
            alt="Water treatment system installation"
            className="hero-bg-slide absolute inset-0 h-full w-full object-cover"
          />
          <img
            src={fieldImage}
            alt="Water infrastructure field work"
            className="hero-bg-slide hero-bg-slide-delay absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(20,23,21,0.78)_0%,rgba(20,23,21,0.62)_28%,rgba(20,23,21,0.36)_54%,rgba(20,23,21,0.58)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(43,162,82,0.14),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(43,162,82,0.08),transparent_22%)]" />
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

      <section className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_0.62fr] lg:items-center">
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              What We Deliver
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
              Core solution areas designed for real operational use.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-muted">
              We position Vortexus as a technical partner that handles the full
              journey from clean water quality and pumping to solar performance and smart control.
            </p>
          </div>

          <div className="relative min-h-[20rem] overflow-hidden rounded-[1.9rem] shadow-[0_18px_50px_rgba(35,33,32,0.08)] lg:min-h-[24rem]">
            <img
              src={treatmentImage}
              alt="Water treatment equipment and filtration system"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,23,21,0.08)_0%,rgba(20,23,21,0.5)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/72">
                Treatment Systems
              </p>
              <p className="mt-3 max-w-md text-2xl font-semibold">
                Built to improve water quality, safety, and operational stability.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-[0_16px_42px_rgba(35,33,32,0.05)]"
            >
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-brand-muted">
                {service.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-brand-surface px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Why Vortexus
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink">
              A practical engineering approach that clients can trust.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {strengths.map((item) => (
              <div key={item.metric}>
                <p className="text-3xl font-semibold text-brand-green">{item.metric}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="space-y-8">
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
                className="rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-medium text-brand-ink"
              >
                {industry}
              </div>
            ))}
          </div>
          <div className="relative min-h-[18rem] overflow-hidden rounded-[1.9rem] shadow-[0_18px_50px_rgba(35,33,32,0.08)] lg:min-h-[22rem]">
            <img
              src={supportImage}
              alt="Water pump infrastructure and support work"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,23,21,0.08)_0%,rgba(20,23,21,0.54)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/72">
                Field Deployment
              </p>
              <p className="mt-3 max-w-md text-2xl font-semibold">
                Designed for commercial, agricultural, institutional, and community systems.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            What Clients Need
          </p>
          <div className="mt-5 space-y-5">
            {solutions.map((solution) => (
              <div key={solution.title} className="border-b border-brand-border pb-5 last:border-b-0">
                <h3 className="font-display text-2xl font-semibold text-brand-ink">
                  {solution.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  {solution.summary}
                </p>
              </div>
            ))}
          </div>
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
        <div className="relative mt-10 min-h-[18rem] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(35,33,32,0.08)] lg:min-h-[28rem]">
          <img
            src={processImage}
            alt="Water operations and process workflow"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,23,21,0.74)_0%,rgba(20,23,21,0.38)_46%,rgba(20,23,21,0.68)_100%)]" />
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_left_center,rgba(43,162,82,0.16),transparent_24%)]" />
          <div className="absolute left-6 top-6 max-w-xl text-white sm:left-8 sm:top-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              Engineering Process
            </p>
            <p className="mt-4 text-3xl font-semibold leading-tight">
              Every project moves from assessment to support with technical clarity and measurable performance in mind.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="border-t border-brand-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-green">
                Step {index + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-brand-ink">
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
