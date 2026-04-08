import {
  FaCheckCircle,
  FaGlobeAfrica,
  FaIndustry,
  FaSearchDollar,
  FaShippingFast,
  FaTools,
} from 'react-icons/fa'
import BlueAccentHero from '../components/sections/BlueAccentHero'
import Seo from '../components/seo/Seo'

const challenges = [
  'Lack of a central trusted marketplace for industrial products.',
  'Unreliable product quality leading to costly repairs.',
  'Slow, manual sourcing processes that delay operations.',
  'Logistics bottlenecks caused by poor coordination and customs handling.',
  'Lack of price and supplier transparency, making it difficult to make informed purchasing decisions.',
]

const solutions = [
  {
    title: 'Pre-vetted vendors',
    text: 'Every supplier is thoroughly checked for reliability, and each product is certified to ensure the highest standards.',
    icon: FaCheckCircle,
  },
  {
    title: 'Aggregated product catalog',
    text: 'A broad range of industrial products including pumps, valves, chemicals, spares, solar products, and more, all standardized for easy comparison.',
    icon: FaIndustry,
  },
  {
    title: 'Transparent pricing',
    text: 'Clear and comparable quotes, bulk pricing options, and visibility on supplier costs.',
    icon: FaSearchDollar,
  },
  {
    title: 'End-to-end procurement support',
    text: 'From sourcing and ordering to delivery and after-sales, every step is handled for smoother operations.',
    icon: FaTools,
  },
  {
    title: 'Logistics and import support',
    text: 'Shipping, customs, and delivery support that helps reduce delays and simplify procurement.',
    icon: FaShippingFast,
  },
]

function AboutPage() {
  return (
    <div className="space-y-16 pb-8 lg:space-y-22">
      <Seo
        title="About Us"
        description="Learn about Vortexus Industrial, its vision, procurement focus, and industrial product distribution across Kenya, Uganda, and Tanzania."
      />

      <BlueAccentHero
        eyebrow="About Vortexus Industrial"
        title="About Us"
        description="Industrial products, pumps, valves, spares, solar products, and procurement support built around speed, quality, and reliability."
      />

      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            About Vortexus Industrial
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            A dynamic distributor of industrial products and procurement support.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-brand-muted">
            Vortexus Industrial is a dynamic distributor of industrial products, spare parts,
            accessories, solar products, and industrial valves. We specialize in pumps and
            product lines used across industrial operations, offering quality products from
            top manufacturers.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-brand-muted">
            Our mission is to provide reliable and sustainable solutions for industries across
            Kenya, Uganda, and Tanzania.
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-brand-border bg-white px-6 py-6 shadow-[0_16px_38px_rgba(35,33,32,0.05)]">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-surface text-brand-green">
              <FaGlobeAfrica className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Our Vision
              </p>
              <p className="mt-4 text-base leading-8 text-brand-muted">
                To be the leading distributor of industrial solutions, offering a trusted
                marketplace where quality meets efficiency.
              </p>
              <p className="mt-4 text-base leading-8 text-brand-muted">
                We aim to simplify procurement processes and provide exceptional support,
                ensuring clients have access to the best industrial products with seamless logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Procurement Challenges
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Common challenges faced by procurement teams in Kenya.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map((item) => (
            <article
              key={item}
              className="rounded-[1.6rem] border border-brand-border bg-white px-5 py-5 shadow-[0_14px_34px_rgba(35,33,32,0.05)]"
            >
              <p className="text-sm leading-8 text-brand-muted">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Our Winning Solution
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Built to close the gaps in sourcing, pricing, and logistics.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className="rounded-[1.6rem] border border-brand-border bg-white px-5 py-5 shadow-[0_14px_34px_rgba(35,33,32,0.05)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface text-brand-green">
                  <Icon className="text-xl" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-brand-muted">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-[2rem] bg-brand-ink px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
        <p className="max-w-4xl text-lg leading-9 text-white/82">
          Vortexus Industrial is your go-to partner for industrial product distribution,
          offering a wide range of products designed to meet operational needs efficiently
          and affordably. Join us in simplifying your procurement processes.
        </p>
      </section>
    </div>
  )
}

export default AboutPage
