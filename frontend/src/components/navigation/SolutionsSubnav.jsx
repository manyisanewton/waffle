import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { solutionFamilies } from '../../data/solutionsCatalog'

function getSubnavLinkClasses({ isActive }) {
  return [
    'inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-brand-green text-white shadow-[0_10px_26px_rgba(43,162,82,0.18)]'
      : 'border border-brand-border bg-white text-brand-ink hover:border-brand-green hover:text-brand-green',
  ].join(' ')
}

function SolutionsSubnav() {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isSolutionsIndex = location.pathname === '/solutions'
  const activeSolution = solutionFamilies.find(
    (solution) => `/solutions/${solution.slug}` === location.pathname,
  )
  const mobileLabel = activeSolution ? activeSolution.title : 'Solutions Overview'

  return (
    <div className="fixed inset-x-0 top-[92px] z-40 border-b border-brand-border/70 bg-brand-canvas/96 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <p className="truncate text-sm font-semibold text-brand-ink">
            {mobileLabel}
          </p>
          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-3.5 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            aria-expanded={isMobileOpen}
            aria-label="Toggle solution navigation"
          >
            {isMobileOpen ? 'Close' : 'Browse'}
          </button>
        </div>

        {isMobileOpen ? (
          <div className="mt-3 grid gap-2 lg:hidden">
            <NavLink
              to="/solutions"
              end
              className={getSubnavLinkClasses}
              onClick={() => setIsMobileOpen(false)}
            >
              {isSolutionsIndex ? 'All Solutions' : 'Solutions Overview'}
            </NavLink>

            {solutionFamilies.map((solution) => (
              <NavLink
                key={solution.slug}
                to={`/solutions/${solution.slug}`}
                className={getSubnavLinkClasses}
                onClick={() => setIsMobileOpen(false)}
              >
                {solution.title}
              </NavLink>
            ))}
          </div>
        ) : null}

        <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-2">
          <NavLink
            to="/solutions"
            end
            className={getSubnavLinkClasses}
          >
            {isSolutionsIndex ? 'All Solutions' : 'Solutions Overview'}
          </NavLink>

          {solutionFamilies.map((solution) => (
            <NavLink
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className={getSubnavLinkClasses}
            >
              {solution.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SolutionsSubnav
