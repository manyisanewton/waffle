import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { company } from '../../data/site/company'

function getLinkClasses({ isActive }) {
  return [
    'rounded-full px-3 py-2 text-sm font-medium transition xl:px-4',
    isActive
      ? 'bg-brand-green text-white shadow-[0_10px_30px_rgba(43,162,82,0.22)]'
      : 'text-brand-muted hover:bg-white hover:text-brand-ink',
  ].join(' ')
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleCloseMenu = () => setIsMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-border/70 bg-brand-canvas/92 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8 2xl:px-10">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-left"
          onClick={handleCloseMenu}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-lg font-semibold text-white shadow-[0_12px_32px_rgba(43,162,82,0.25)]">
            VI
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-semibold tracking-[0.16em] text-brand-ink">
              {company.shortName.toUpperCase()}
            </span>
            <span className="hidden text-xs uppercase tracking-[0.28em] text-brand-muted sm:block">
              {company.tagline}
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 xl:flex">
          {navigationItems.map((item) => (
            <NavLink key={item.label} to={item.to} className={getLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:block">
          <NavLink
            to="/contact-us"
            className="rounded-full border border-brand-green/20 bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
          >
            Start a Project
          </NavLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-ink transition hover:border-brand-green hover:text-brand-green xl:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-brand-border bg-brand-surface xl:hidden">
          <nav className="flex flex-col px-4 py-4 sm:px-6 lg:px-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-2xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-brand-green text-white'
                      : 'text-brand-muted hover:bg-white hover:text-brand-ink',
                  ].join(' ')
                }
                onClick={handleCloseMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact-us"
              className="mt-3 rounded-2xl bg-brand-green px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              onClick={handleCloseMenu}
            >
              Start a Project
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
