const storyPoints = [
  'Provide dependable water treatment, pumping, and borehole solutions through resilient engineering.',
  'Create long-term value across the full lifecycle of water and energy infrastructure systems.',
  'Drive practical innovation through solar integration, automation, and data-informed operations.',
]

const values = [
  {
    title: 'Expertise',
    text: 'Our technical teams combine field experience and system knowledge to deliver solutions that work in real operating conditions.',
  },
  {
    title: 'Execution',
    text: 'We focus on disciplined delivery, quality installation, and dependable performance from design through handover.',
  },
  {
    title: 'Innovation',
    text: 'We use smart controls, solar integration, and IoT-enabled visibility to improve efficiency and long-term reliability.',
  },
]

const impactStats = [
  { value: '500+', label: 'Treatment and pump system engagements supported' },
  { value: '1M+', label: 'People indirectly served by systems like the ones we help deliver' },
  { value: '1500+', label: 'Operational components, pumps, and related technical supply touchpoints' },
]

function AboutPage() {
  return (
    <div className="space-y-20 pb-8 lg:space-y-28">
      <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden bg-[linear-gradient(125deg,#101b8f_0%,#2149d8_44%,#3d7cff_100%)] px-4 py-24 text-center text-white sm:px-6 lg:-mt-12 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.12),transparent_18%),linear-gradient(135deg,transparent_0%,transparent_58%,rgba(255,255,255,0.08)_58%,rgba(255,255,255,0.08)_64%,transparent_64%)]" />
        <div className="absolute -bottom-16 left-[-6%] h-32 w-[58%] rotate-[-6deg] bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 right-[-8%] h-28 w-[46%] rotate-[7deg] bg-[#6aa2ff]/22 blur-xl" />
        <div className="relative">
          <p className="mx-auto max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            Learn more about the people, thinking, and engineering approach behind Vortexus Industrial Solutions.
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            About Us
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(176deg,transparent_0%,transparent_34%,#f5f4f2_35%,#f5f4f2_100%)]" />
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Our Story
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            A water and energy solutions company built for dependable industrial and community infrastructure.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-muted">
            Vortexus Industrial Solutions exists to solve practical water challenges with systems that are engineered,
            installable, maintainable, and scalable. We work across water treatment, borehole infrastructure,
            pump systems, solar pumping, and IoT-enabled control so clients can move from unreliable supply to
            stronger operational confidence.
          </p>

          <div className="mt-8 space-y-6">
            {storyPoints.map((point, index) => (
              <div key={point} className="border-t border-brand-border pt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(35,33,32,0.08)]">
            <img
              src="/hero-field-work.jpeg"
              alt="Field operations and water infrastructure work"
              className="h-[22rem] w-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="font-display text-3xl font-semibold text-brand-ink">
                Our Mission
              </h3>
              <p className="mt-3 text-sm leading-8 text-brand-muted">
                To deliver practical, efficient, and future-ready water and energy systems that improve reliability,
                reduce operational risk, and support long-term growth for our clients.
              </p>
            </div>
            <div>
              <h3 className="font-display text-3xl font-semibold text-brand-ink">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-8 text-brand-muted">
                To be a trusted regional leader in engineered water, pumping, solar, and smart infrastructure solutions
                across commercial, institutional, industrial, and community environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Core Values
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            The standards that shape how we work.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="border-t border-brand-border pt-6">
              <h3 className="font-display text-3xl font-semibold text-brand-ink">
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-8 text-brand-muted">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Infrastructure Expertise
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Covering the water value chain with practical engineering expertise.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted">
            We support projects involving treatment systems, borehole rehabilitation, pumping infrastructure,
            solar integration, and the wider operational ecosystem needed to keep water systems working.
            Our approach is shaped by technical know-how, site realities, and the need for dependable long-term outcomes.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {impactStats.map((stat) => (
              <div key={stat.value}>
                <p className="font-display text-4xl font-semibold text-brand-ink">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(35,33,32,0.08)]">
          <img
            src="/section-school-ro-plant.jpg"
            alt="Water treatment plant installation and process equipment"
            className="h-[30rem] w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Digital Capability
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            We build toward smarter water operations, not just physical installation.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted">
            Modern water infrastructure increasingly needs data, alerts, monitoring, and decision support.
            Vortexus combines field systems with digital thinking so clients can better track pump performance,
            system behavior, and maintenance needs over time.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted">
            That direction allows us to support operational visibility, reduce avoidable downtime, and create more
            efficient long-term management of water and pumping assets.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(35,33,32,0.08)]">
          <img
            src="/section-medical-water.jpg"
            alt="Industrial water pump and treatment equipment"
            className="h-[28rem] w-full object-cover"
          />
        </div>
      </section>
    </div>
  )
}

export default AboutPage
