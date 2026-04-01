import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps/dist/index.es.js'
import geoData from 'world-atlas/countries-110m.json'
import { offices as officeLocations } from '../data/mock/offices'

function ContactPage() {
  return (
    <div className="text-brand-ink">
      <section className="relative left-1/2 w-screen -translate-x-1/2 -mt-8 overflow-hidden bg-[linear-gradient(125deg,#101b8f_0%,#2149d8_44%,#3d7cff_100%)] px-4 py-24 text-center text-white sm:px-6 lg:-mt-12 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.12),transparent_18%),linear-gradient(135deg,transparent_0%,transparent_58%,rgba(255,255,255,0.08)_58%,rgba(255,255,255,0.08)_64%,transparent_64%)]" />
        <div className="absolute -bottom-16 left-[-6%] h-32 w-[58%] rotate-[-6deg] bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 right-[-8%] h-28 w-[46%] rotate-[7deg] bg-[#6aa2ff]/22 blur-xl" />
        <div className="relative">
          <p className="mx-auto max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            Speak with our team about projects, partnerships, regional support,
            and worldwide delivery.
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(176deg,transparent_0%,transparent_34%,#f5f4f2_35%,#f5f4f2_100%)]" />
      </section>

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
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[#2f6df6]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-brand-ink">
                Last Name
              </span>
              <input
                type="text"
                placeholder="Last Name"
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[#2f6df6]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">
              Email <span className="text-[#2f6df6]">*</span>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[#2f6df6]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">
              Phone Number <span className="text-[#2f6df6]">*</span>
            </span>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[#2f6df6]"
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
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[#2f6df6]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-brand-ink">
                Position
              </span>
              <input
                type="text"
                placeholder="e.g Customer Service"
                className="h-12 w-full rounded-[10px] border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[#2f6df6]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-ink">
              Your Message <span className="text-[#2f6df6]">*</span>
            </span>
            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full rounded-[10px] border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-[#2f6df6]"
            />
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-[#2f6df6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a56d9]"
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
                          fill: '#e8ebf0',
                          stroke: '#ffffff',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        hover: {
                          fill: '#dfe4ec',
                          stroke: '#ffffff',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#dfe4ec',
                          stroke: '#ffffff',
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
                        fill="rgba(255,90,10,0.12)"
                        className={index % 2 === 0 ? 'animate-pulse' : ''}
                      />
                      <circle r="4.5" fill="#ff5a0a" />
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
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#2f6df6]">
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
