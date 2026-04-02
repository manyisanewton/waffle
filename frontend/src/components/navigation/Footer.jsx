import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaArrowUp,
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPrint,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import {
  contactItems,
  footerGroups,
  footerHighlights,
  footerMetaLinks,
  socialLinks,
} from '../../data/footer'
import { company } from '../../data/site/company'

const socialIcons = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  google: FaGoogle,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
}

const socialIconColors = {
  facebook: 'var(--color-social-facebook)',
  twitter: 'var(--color-social-twitter)',
  google: 'var(--color-social-google)',
  instagram: 'var(--color-social-instagram)',
  linkedin: 'var(--color-social-linkedin)',
  whatsapp: 'var(--color-social-whatsapp)',
}

const contactIcons = {
  address: FaMapMarkerAlt,
  email: MdEmail,
  phone: FaPhoneAlt,
  fax: FaPrint,
}

function Footer() {
  const [isSocialPanelOpen, setIsSocialPanelOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const updateBackToTopVisibility = () => {
      const pageHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight

      setShowBackToTop(pageHeight - viewportHeight > 24)
    }

    updateBackToTopVisibility()
    window.addEventListener('resize', updateBackToTopVisibility)

    return () => {
      window.removeEventListener('resize', updateBackToTopVisibility)
    }
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-12 bg-brand-ink text-white">
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <div
          className={[
            'overflow-hidden transition-all duration-300',
            isSocialPanelOpen
              ? 'max-h-[30rem] translate-y-0 opacity-100'
              : 'max-h-0 translate-y-4 opacity-0',
          ].join(' ')}
        >
          <div className="flex flex-col items-center gap-3 py-2 pr-2 sm:gap-4 sm:pr-3">
            {socialLinks.map((item, index) => {
              const Icon = socialIcons[item.icon]
              const iconColor = socialIconColors[item.icon]

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[1.55rem] transition-transform duration-300 hover:scale-115 sm:h-12 sm:w-12 sm:text-[1.7rem]"
                  style={{
                    color: iconColor,
                    opacity: isSocialPanelOpen ? 1 : 0,
                    transform: isSocialPanelOpen
                      ? 'translateY(0px) scale(1)'
                      : 'translateY(14px) scale(0.92)',
                    transitionDelay: isSocialPanelOpen ? `${index * 70}ms` : '0ms',
                    boxShadow:
                      '0 10px 24px rgba(35,33,32,0.14), 0 0 0 1px rgba(255,255,255,0.92)',
                  }}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          aria-label={isSocialPanelOpen ? 'Close social links' : 'Open social links'}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white transition hover:-translate-y-0.5 sm:h-16 sm:w-16"
          style={{
            backgroundColor: 'var(--color-accent-orange)',
            boxShadow: '0 16px 36px rgba(255, 90, 10, 0.32)',
          }}
          onClick={() => setIsSocialPanelOpen((open) => !open)}
        >
          <span className="material-symbols-outlined text-[1.8rem] text-white sm:text-[2rem]">
            forum
          </span>
        </button>

        {showBackToTop && (
          <button
            type="button"
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_12px_28px_rgba(43,162,82,0.24)] transition hover:bg-brand-green-soft"
            onClick={handleBackToTop}
          >
            <FaArrowUp />
          </button>
        )}
      </div>

      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
          <div>
            <img
              src={company.logoOnDark || company.logo}
              alt={`${company.name} logo`}
              className="h-14 w-auto object-contain sm:h-16"
            />
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/72">
              Vortexus Industrial Solutions supports water treatment systems,
              borehole infrastructure, pumps, solar water delivery, and related
              engineering support for clients who need clear, dependable execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NavLink
                to="/contact-us"
                className="rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Start a Project
              </NavLink>
              <NavLink
                to="/services"
                className="rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Services
              </NavLink>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {footerHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5 backdrop-blur"
              >
                <h3 className="font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 xl:grid-cols-[1.05fr_0.72fr_0.72fr_0.9fr] lg:px-8">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-white">
            Company Overview
          </h3>
          <div className="mt-3 h-0.5 w-12 bg-brand-green" />
          <p className="mt-6 max-w-sm text-sm leading-8 text-white/68">
            We build and support systems across treatment, pumping, boreholes,
            solar water delivery, and connected infrastructure for homes,
            institutions, commercial sites, and industrial operations.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-white">
              {group.title}
            </h3>
            <div className="mt-3 h-0.5 w-12 bg-brand-green" />
            <ul className="mt-6 space-y-4">
              {group.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="text-sm leading-7 text-white/68 transition hover:text-brand-green-muted"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-white">
            Contact
          </h3>
          <div className="mt-3 h-0.5 w-12 bg-brand-green" />
          <ul className="mt-6 space-y-4">
            {contactItems.map((item) => {
              const Icon = contactIcons[item.icon]

              return (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-1 text-brand-green-muted">
                    <Icon />
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm leading-7 text-white/68 transition hover:text-brand-green-muted"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm leading-7 text-white/68">
                      {item.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.icon]
              const iconColor = socialIconColors[item.icon]

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-lg transition hover:-translate-y-0.5"
                  style={{ color: iconColor }}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-white/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {footerMetaLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="transition hover:text-brand-green-muted"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
