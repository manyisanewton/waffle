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
import { contactItems, footerGroups, socialLinks } from '../../data/footer'
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
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  google: '#DB4437',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  whatsapp: '#25D366',
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
    <footer className="mt-12 bg-[#ececec] text-brand-ink">
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
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5a0a] text-white shadow-[0_16px_36px_rgba(255,90,10,0.32)] transition hover:-translate-y-0.5 sm:h-16 sm:w-16"
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

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide text-brand-ink">
            {company.name}
          </h2>
          <div className="mt-3 h-0.5 w-12 bg-brand-green" />
          <p className="mt-6 max-w-sm text-sm leading-8 text-brand-muted">
            Water treatment, borehole systems, pump technology, solar-powered
            water solutions, and IoT-enabled pump monitoring for modern water
            infrastructure.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-bold uppercase tracking-wide text-brand-ink">
              {group.title}
            </h3>
            <div className="mt-3 h-0.5 w-12 bg-brand-green" />
            <ul className="mt-6 space-y-4">
              {group.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-brand-muted transition hover:text-brand-green"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide text-brand-ink">
            Contact
          </h3>
          <div className="mt-3 h-0.5 w-12 bg-brand-green" />
          <ul className="mt-6 space-y-4">
            {contactItems.map((item) => {
              const Icon = contactIcons[item.icon]

              return (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-1 text-brand-ink">
                    <Icon />
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm leading-7 text-brand-muted transition hover:text-brand-green"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm leading-7 text-brand-muted">
                      {item.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="bg-[#d6d6d6]">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-brand-muted sm:px-6 lg:px-8">
          <p>© 2026 Copyright: {company.name}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
