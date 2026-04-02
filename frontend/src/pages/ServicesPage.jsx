import { NavLink } from 'react-router-dom'
import FullBleedHero from '../components/sections/FullBleedHero'
import { company } from '../data/site/company'

const serviceGroups = [
  {
    id: 'water-treatment-systems',
    title: 'Water Treatment & Systems',
    icon: 'Water Quality',
    intro:
      'Treatment services designed to improve water quality, operational reliability, and long-term system performance across domestic, commercial, and industrial applications.',
    services: [
      {
        title: 'Reverse Osmosis Systems',
        text: 'Advanced RO systems for reducing dissolved salts, unwanted minerals, organics, and process-critical contaminants where high-purity water is required.',
        image: '/images/assets/img/products/200cubic-reverse-osmosis-unit.webp',
      },
      {
        title: 'UV Disinfection Systems',
        text: 'Chemical-free disinfection systems that neutralize bacteria and other microorganisms while preserving taste and odor quality.',
        image: '/images/uv/uv-systems-plant.jpeg',
      },
      {
        title: 'Water Softening Units',
        text: 'Softening systems that reduce hardness, protect equipment from scaling, and improve the efficiency of domestic and industrial water use.',
        image: '/images/1000-lph-domestic-water-softener-500x500.jpg',
      },
      {
        title: 'RO Consumables & Equipment',
        text: 'Membranes, vessels, housings, accessories, and related treatment components that keep RO systems performing reliably over time.',
        image: '/images/ro-membranes.jpg',
      },
      {
        title: 'UF Systems',
        text: 'Ultrafiltration systems for particulate and microorganism removal, ideal for pretreatment, polishing, and clean-water applications.',
        image: '/images/ultrafiltration.jpeg',
      },
      {
        title: 'Ion Exchange / Demineralizer Plants',
        text: 'Ion exchange and demineralization systems for hardness removal, process water conditioning, and higher purity industrial supply.',
        image: '/images/pumps/Ionenaustauschanlage.jpg',
      },
      {
        title: 'Chemical Dosing Pumps',
        text: 'Precision dosing systems for chlorine, antiscalants, cleaners, pH control, and other treatment chemicals that need stable and accurate injection.',
        image: '/images/Dosing-pump.png',
      },
    ],
  },
  {
    id: 'pumps-machinery',
    title: 'Pumps & Machinery',
    icon: 'Pump Systems',
    intro:
      'Pump services and machine supply focused on pressure control, water movement, borehole abstraction, wastewater handling, and efficient delivery in demanding operating environments.',
    services: [
      {
        title: 'Domestic Booster Pumps',
        text: 'Compact booster systems that improve household pressure and stabilize water delivery where supply pressure is inconsistent.',
        image: '/images/assets/img/products/domestic-booster-pump.jpg',
      },
      {
        title: 'Centrifugal Multistage Pumps',
        text: 'High-efficiency multistage pumps for boosting, transfer, treatment systems, and other applications requiring dependable head and flow.',
        image: '/images/pumps/Horizontal-booster-sets.jpg',
      },
      {
        title: 'Booster Sets',
        text: 'Integrated booster arrangements engineered for buildings, institutions, and process systems where controlled pressure is critical.',
        image: '/images/assets/img/pumps/Lowara-GHV30-vertical-booster.webp',
      },
      {
        title: 'Submersible Pumps',
        text: 'Submersible pumping solutions for boreholes and submerged-duty water supply applications that demand durability and reliable output.',
        image: '/images/pumps/submersiblepump.webp',
      },
      {
        title: 'Solar Water Pumps',
        text: 'Solar-driven pumping systems that reduce operating cost and improve resilience for irrigation, livestock, and community water supply.',
        image: '/images/assets/img/products/solar-pump-500x500.webp',
      },
      {
        title: 'Sewage Effluent Pumps',
        text: 'Heavy-duty effluent pumping solutions for wastewater transfer, site drainage support, and utility applications where dependable discharge is required.',
        image: '/images/assets/img/pumps/Submersible-Dewatering-Pumps.webp',
      },
      {
        title: 'Drainage Pumps',
        text: 'Drainage pumps for stormwater, flooding control, pits, and utility handling where fast, reliable removal of unwanted water matters.',
        image: '/images/assets/img/pumps/Submersible-Dewatering-Pumps.jpg',
      },
    ],
  },
]

const serviceStrengths = [
  {
    title: 'Practical System Matching',
    text: 'We align the service with the source water, demand, pressure conditions, and site realities instead of forcing generic products everywhere.',
  },
  {
    title: 'Technical Delivery Confidence',
    text: 'Clients can see that Vortexus covers both the treatment side and the mechanical side of water systems in a joined-up way.',
  },
  {
    title: 'Responsive Support',
    text: 'Our services are positioned not only around installation, but also around continuity, maintenance, and long-term operating reliability.',
  },
]

function ServicesPage() {
  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <FullBleedHero
        eyebrow="Service Capability"
        title="Services that help clients understand exactly what Vortexus can deliver."
        description={`${company.name} supports clients with treatment systems, pump machinery, borehole-related delivery, solar pumping integration, and technical equipment that solve real water and pressure problems. This page is designed to make that service strength clear.`}
        imageSrc="/images/assets/img/norwa/waterinfrastructure.webp"
        imageAlt="Water infrastructure and engineering systems"
        overlayClassName="theme-hero-dark"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <NavLink
            to="/contact-us"
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
          >
            Talk to Our Team
          </NavLink>
          <NavLink
            to="/solutions"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/12"
          >
            View Detailed Solutions
          </NavLink>
        </div>
      </FullBleedHero>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { value: '14', label: 'Defined service offers' },
          { value: '2', label: 'Core service groups' },
          { value: 'Water + Pumping', label: 'Primary delivery focus' },
          { value: 'Site to System', label: 'Execution coverage' },
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

      {serviceGroups.map((group) => (
        <section key={group.id} className="space-y-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              {group.icon}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
              {group.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {group.intro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {group.services.map((service) => (
              <article
                key={service.title}
                className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(35,33,32,0.08)]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-56 w-full object-cover"
                />
                <div className="space-y-3 px-5 py-5">
                  <h3 className="font-display text-2xl font-semibold text-brand-ink">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-7 text-brand-muted">
                    {service.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="grid gap-10 rounded-[2rem] bg-brand-surface px-6 py-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Why This Sells Confidence
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink">
            A service page should make the client feel certain, not confused.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-brand-muted">
            The strength of the services page is clarity. A customer should be
            able to identify their problem quickly, see the relevant service,
            and believe Vortexus has the technical depth to deliver it properly.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {serviceStrengths.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] bg-white px-5 py-5">
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-brand-muted">
                {item.text}
              </p>
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
              Let’s connect the right service to your water or pumping challenge.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
              Whether the need is treatment, pressure boosting, solar pumping,
              borehole support, or system equipment, this is where the customer
              should feel ready to start the conversation.
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
              to="/solutions"
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              Browse Solutions
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
