import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps/dist/index.es.js'
import geoData from 'world-atlas/countries-110m.json'
import { offices as officeLocations } from '../data/mock/offices'
import BlueAccentHero from '../components/sections/BlueAccentHero'

function ContactPage() {
  return (
    <div className="text-brand-ink">
      <BlueAccentHero
        eyebrow="Contact Vortexus"
        title="Contact Us"
        description="Speak with our team about projects, partnerships, regional support, and worldwide delivery."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
            Questions?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-brand-muted">
            Tell us about your company, your need, and how you would like us to
            reach you. We kept the layout straightforward, with the form placed
            directly on the page rather than inside cards.
          </p>
        </div>

        <form className="mt-12 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-brand-ink">
                First Name
              </span>
              <input
                type="text"
                placeholder="First Name"
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[var(--color-accent-blue-highlight)]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-brand-ink">
                Last Name
              </span>
              <input
                type="text"
                placeholder="Last Name"
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[var(--color-accent-blue-highlight)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">
              Email <span className="text-[var(--color-accent-blue-highlight)]">*</span>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[var(--color-accent-blue-highlight)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">
              Phone Number <span className="text-[var(--color-accent-blue-highlight)]">*</span>
            </span>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[var(--color-accent-blue-highlight)]"
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-brand-ink">
                Company Name
              </span>
              <input
                type="text"
                placeholder="e.g Waffle Group"
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[var(--color-accent-blue-highlight)]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-brand-ink">
                Position
              </span>
              <input
                type="text"
                placeholder="e.g Customer Service"
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[var(--color-accent-blue-highlight)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">
              Your Message <span className="text-[var(--color-accent-blue-highlight)]">*</span>
            </span>
            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full rounded-[10px] border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[var(--color-accent-blue-highlight)]"
            />
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-[var(--color-accent-blue-highlight)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-blue-hover)]"
            >
              Contact Us
            </button>
          </div>
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
            Our Operations
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-brand-muted">
            We are working worldwide, supporting regional teams and cross-border
            projects from East Africa, Southern Africa, the Indian Ocean, and
            remote delivery hubs. Our operations are designed to serve clients
            wherever they are.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-5xl">
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 165 }}
              className="w-full"
              aria-label="World map showing global operations"
            >
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: 'var(--color-map-land)',
                          stroke: 'var(--color-map-stroke)',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        hover: {
                          fill: 'var(--color-map-land-hover)',
                          stroke: 'var(--color-map-stroke)',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: 'var(--color-map-land-hover)',
                          stroke: 'var(--color-map-stroke)',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {officeLocations
                .filter((office) => office.coordinates)
                .map((office, index) => (
                  <Marker key={office.country} coordinates={office.coordinates}>
                    <g>
                      <circle
                        r="13"
                        fill="var(--color-marker-ring)"
                        className={index % 2 === 0 ? 'animate-pulse' : ''}
                      />
                      <circle r="4.5" fill="var(--color-marker-solid)" />
                    </g>
                  </Marker>
                ))}
            </ComposableMap>
            <div className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.4em] text-brand-muted/60">
              Worldwide Delivery Network
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {officeLocations.map((office) => (
            <div key={office.country} className="border-t border-brand-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent-blue-highlight)]">
                {office.country}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-brand-ink">
                {office.company}
              </h3>
              <p className="mt-4 text-sm leading-8 text-brand-muted">
                {office.address}
              </p>
              <p className="mt-2 text-sm leading-8 text-brand-muted">
                {office.phone}
              </p>
              <p className="mt-2 text-sm leading-8 text-brand-muted">
                {office.email}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ContactPage
