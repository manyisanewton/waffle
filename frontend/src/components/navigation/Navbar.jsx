import { useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FaBalanceScale, FaChevronDown, FaPhoneAlt, FaSearch } from 'react-icons/fa'
import GlobalProductSearch from './GlobalProductSearch'
import useProductCompare from '../../hooks/useProductCompare'
import { industriesCatalog, productCategories } from '../../data/productCatalog'
import { navigationItems } from '../../data/navigation'
import { company } from '../../data/site/company'

const productExpertPhone = '0794582560'
const hiddenProductDropdownSlugs = new Set([
  'wastewater-treatment-equipment',
  'industrial-etp',
  'sewage-treatment-plants',
  'recycling-reuse-systems',
])

function getLinkClasses({ isActive }) {
  return [
    'rounded-full px-3 py-1.5 text-sm font-medium transition xl:px-4',
    isActive
      ? 'bg-brand-green text-white shadow-[0_10px_30px_rgba(43,162,82,0.22)]'
      : 'text-brand-muted hover:bg-white hover:text-brand-ink',
  ].join(' ')
}

function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false)
  const { comparedCount } = useProductCompare()
  const productsCloseTimerRef = useRef(null)
  const industriesCloseTimerRef = useRef(null)
  const dropdownProductCategories = useMemo(
    () => productCategories.filter((category) => !hiddenProductDropdownSlugs.has(category.slug)),
    [],
  )
  const productColumns = useMemo(() => {
    const itemsPerColumn = Math.ceil(dropdownProductCategories.length / 4)
    return Array.from({ length: 4 }, (_, index) =>
      dropdownProductCategories.slice(index * itemsPerColumn, (index + 1) * itemsPerColumn),
    )
  }, [dropdownProductCategories])
  const industryColumns = useMemo(() => {
    const itemsPerColumn = Math.ceil(industriesCatalog.length / 3)
    return Array.from({ length: 3 }, (_, index) =>
      industriesCatalog.slice(index * itemsPerColumn, (index + 1) * itemsPerColumn),
    )
  }, [])

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setIsProductsOpen(false)
    setIsIndustriesOpen(false)
    setIsMobileProductsOpen(false)
    setIsMobileIndustriesOpen(false)
  }

  const cancelProductsClose = () => {
    if (productsCloseTimerRef.current) {
      window.clearTimeout(productsCloseTimerRef.current)
      productsCloseTimerRef.current = null
    }
  }

  const scheduleProductsClose = () => {
    cancelProductsClose()
    productsCloseTimerRef.current = window.setTimeout(() => {
      setIsProductsOpen(false)
      productsCloseTimerRef.current = null
    }, 220)
  }

  const cancelIndustriesClose = () => {
    if (industriesCloseTimerRef.current) {
      window.clearTimeout(industriesCloseTimerRef.current)
      industriesCloseTimerRef.current = null
    }
  }

  const scheduleIndustriesClose = () => {
    cancelIndustriesClose()
    industriesCloseTimerRef.current = window.setTimeout(() => {
      setIsIndustriesOpen(false)
      industriesCloseTimerRef.current = null
    }, 220)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-border/70 bg-brand-canvas/92 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8 2xl:px-10 xl:pb-2 xl:pt-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-left"
          onClick={handleCloseMenu}
        >
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="h-12 w-auto object-contain sm:h-14"
          />
        </NavLink>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 xl:flex">
          <nav className="flex items-center gap-1">
            {navigationItems.map((item) =>
              item.label === 'Products' ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelProductsClose()
                    setIsProductsOpen(true)
                  }}
                  onMouseLeave={scheduleProductsClose}
                >
                  <div
                    className={[
                      'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition xl:px-4',
                      location.pathname.startsWith('/products')
                        ? 'bg-brand-green text-white shadow-[0_10px_30px_rgba(43,162,82,0.22)]'
                        : 'text-brand-muted hover:bg-white hover:text-brand-ink',
                    ].join(' ')}
                  >
                    <NavLink
                      to={item.to}
                      className="outline-none"
                      onClick={handleCloseMenu}
                    >
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => {
                        cancelProductsClose()
                        setIsProductsOpen((current) => !current)
                      }}
                      className="inline-flex items-center justify-center outline-none"
                      aria-expanded={isProductsOpen}
                      aria-haspopup="true"
                      aria-label="Toggle product categories"
                    >
                      <FaChevronDown
                        className={[
                          'text-[0.7rem] transition',
                          isProductsOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    </button>
                  </div>

                  {isProductsOpen ? (
                    <>
                      <div
                        className="fixed left-1/2 top-[6.9rem] z-40 h-5 w-[min(1320px,calc(100vw-2.5rem))] -translate-x-1/2"
                        onMouseEnter={cancelProductsClose}
                        onMouseLeave={scheduleProductsClose}
                      />
                      <div
                        className="fixed left-1/2 top-[7.3rem] z-50 w-[min(1320px,calc(100vw-2.5rem))] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-[0_30px_80px_rgba(35,33,32,0.16)]"
                        onMouseEnter={cancelProductsClose}
                        onMouseLeave={scheduleProductsClose}
                      >
                      <div className="grid gap-x-8 gap-y-4 px-7 py-6 xl:grid-cols-4">
                        {productColumns.map((column, index) => (
                          <div key={`product-column-${index}`} className="space-y-2.5">
                            {column.map((category) => (
                              <NavLink
                                key={category.slug}
                                to={`/products/category/${category.slug}`}
                                className="block rounded-[1rem] px-3 py-2.5 transition hover:bg-brand-surface"
                                onClick={handleCloseMenu}
                              >
                                <p className="text-[0.98rem] font-semibold leading-6 text-brand-ink">
                                  {category.name}
                                </p>
                                <p className="mt-0.5 text-xs leading-5 text-brand-muted">
                                  {category.subcategories.slice(0, 2).join(' · ')}
                                </p>
                              </NavLink>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-brand-border bg-brand-ink px-7 py-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm leading-7 text-white/74">
                            Open the full catalog or jump straight into a technical product family.
                          </p>
                          <NavLink
                            to="/products"
                            className="inline-flex items-center justify-center rounded-full border border-brand-green/40 bg-brand-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                            onClick={handleCloseMenu}
                          >
                            All Products
                          </NavLink>
                        </div>
                      </div>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : item.label === 'Industries' ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelIndustriesClose()
                    setIsIndustriesOpen(true)
                  }}
                  onMouseLeave={scheduleIndustriesClose}
                >
                  <div
                    className={[
                      'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition xl:px-4',
                      location.pathname.startsWith('/industries')
                        ? 'bg-brand-green text-white shadow-[0_10px_30px_rgba(43,162,82,0.22)]'
                        : 'text-brand-muted hover:bg-white hover:text-brand-ink',
                    ].join(' ')}
                  >
                    <NavLink
                      to={item.to}
                      className="outline-none"
                      onClick={handleCloseMenu}
                    >
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => {
                        cancelIndustriesClose()
                        setIsIndustriesOpen((current) => !current)
                      }}
                      className="inline-flex items-center justify-center outline-none"
                      aria-expanded={isIndustriesOpen}
                      aria-haspopup="true"
                      aria-label="Toggle industries"
                    >
                      <FaChevronDown
                        className={[
                          'text-[0.7rem] transition',
                          isIndustriesOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    </button>
                  </div>

                  {isIndustriesOpen ? (
                    <>
                      <div
                        className="fixed left-1/2 top-[6.9rem] z-40 h-5 w-[min(1100px,calc(100vw-2.5rem))] -translate-x-1/2"
                        onMouseEnter={cancelIndustriesClose}
                        onMouseLeave={scheduleIndustriesClose}
                      />
                      <div
                        className="fixed left-1/2 top-[7.3rem] z-50 w-[min(1100px,calc(100vw-2.5rem))] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-[0_30px_80px_rgba(35,33,32,0.16)]"
                        onMouseEnter={cancelIndustriesClose}
                        onMouseLeave={scheduleIndustriesClose}
                      >
                        <div className="grid gap-x-8 gap-y-4 px-7 py-6 xl:grid-cols-3">
                          {industryColumns.map((column, index) => (
                            <div key={`industry-column-${index}`} className="space-y-2.5">
                              {column.map((industry) => (
                                <NavLink
                                  key={industry.slug}
                                  to={`/industries/${industry.slug}`}
                                  className="block rounded-[1rem] px-3 py-2.5 transition hover:bg-brand-surface"
                                  onClick={handleCloseMenu}
                                >
                                  <p className="text-[0.98rem] font-semibold leading-6 text-brand-ink">
                                    {industry.name}
                                  </p>
                                  <p className="mt-0.5 text-xs leading-5 text-brand-muted">
                                    {industry.description}
                                  </p>
                                </NavLink>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-brand-border bg-brand-ink px-7 py-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm leading-7 text-white/74">
                              Open the full industry index or jump straight into an application-specific page.
                            </p>
                            <NavLink
                              to="/industries"
                              className="inline-flex items-center justify-center rounded-full border border-brand-green/40 bg-brand-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                              onClick={handleCloseMenu}
                            >
                              All Industries
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : (
                <NavLink key={item.label} to={item.to} className={getLinkClasses}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
          <NavLink
            to="/compare"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-3.5 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
          >
            <FaBalanceScale className="text-sm" />
            <span>Compare</span>
            {comparedCount ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-green px-1.5 text-[0.7rem] font-semibold text-white">
                {comparedCount}
              </span>
            ) : null}
          </NavLink>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            aria-expanded={isSearchOpen}
            aria-label="Open product search"
            onClick={() => {
              setIsSearchOpen((open) => !open)
              setIsMenuOpen(false)
            }}
          >
            <FaSearch className="text-sm" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => {
              setIsMenuOpen((open) => !open)
              setIsSearchOpen(false)
            }}
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div className="hidden bg-transparent px-4 pb-3 pt-2 sm:px-6 lg:px-8 2xl:px-10 xl:block">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <GlobalProductSearch desktopWide />
          </div>
          <a
            href={`tel:${productExpertPhone.replace(/[^\d+]/g, '')}`}
            className="inline-flex min-w-[14.5rem] items-center gap-2 rounded-[0.9rem] bg-brand-ink px-3 py-2 text-white transition hover:bg-brand-ink/92"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white">
              <FaPhoneAlt className="text-[0.8rem]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white/72">
                Request Product Expert
              </span>
              <span className="mt-0.5 block text-[0.92rem] font-semibold text-white">
                {productExpertPhone}
              </span>
            </span>
          </a>
          <NavLink
            to="/request-quote"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-brand-green/20 bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
          >
            Request Quote
          </NavLink>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-brand-border bg-brand-surface px-4 py-4 sm:px-6 lg:px-8 xl:hidden">
          <GlobalProductSearch mobile onNavigate={handleCloseMenu} />
        </div>
      )}

      {isMenuOpen && (
        <div className="border-t border-brand-border bg-brand-surface xl:hidden">
          <nav className="flex flex-col px-4 py-4 sm:px-6 lg:px-8">
            {navigationItems.map((item) =>
              item.label === 'Products' ? (
                <div key={item.label} className="space-y-3">
                  <button
                    type="button"
                    className={[
                      'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition',
                      location.pathname.startsWith('/products') || isMobileProductsOpen
                        ? 'bg-brand-green text-white'
                        : 'text-brand-muted hover:bg-white hover:text-brand-ink',
                    ].join(' ')}
                    onClick={() => setIsMobileProductsOpen((open) => !open)}
                    aria-expanded={isMobileProductsOpen}
                  >
                    <span>Products</span>
                    <FaChevronDown
                      className={[
                        'text-[0.7rem] transition',
                        isMobileProductsOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                  {isMobileProductsOpen ? (
                    <div className="rounded-[1.5rem] border border-brand-border bg-white p-3">
                      <NavLink
                        to="/products"
                        className="block rounded-xl bg-brand-surface px-4 py-3 text-sm font-semibold text-brand-ink"
                        onClick={handleCloseMenu}
                      >
                        All Products
                      </NavLink>
                      <div className="mt-3 grid max-h-[52vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                        {dropdownProductCategories.map((category) => (
                          <NavLink
                            key={category.slug}
                            to={`/products/category/${category.slug}`}
                            className="rounded-xl px-4 py-3 text-sm text-brand-muted transition hover:bg-brand-surface hover:text-brand-ink"
                            onClick={handleCloseMenu}
                          >
                            {category.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : item.label === 'Industries' ? (
                <div key={item.label} className="space-y-3">
                  <button
                    type="button"
                    className={[
                      'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition',
                      location.pathname.startsWith('/industries') || isMobileIndustriesOpen
                        ? 'bg-brand-green text-white'
                        : 'text-brand-muted hover:bg-white hover:text-brand-ink',
                    ].join(' ')}
                    onClick={() => setIsMobileIndustriesOpen((open) => !open)}
                    aria-expanded={isMobileIndustriesOpen}
                  >
                    <span>Industries</span>
                    <FaChevronDown
                      className={[
                        'text-[0.7rem] transition',
                        isMobileIndustriesOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                  {isMobileIndustriesOpen ? (
                    <div className="rounded-[1.5rem] border border-brand-border bg-white p-3">
                      <NavLink
                        to="/industries"
                        className="block rounded-xl bg-brand-surface px-4 py-3 text-sm font-semibold text-brand-ink"
                        onClick={handleCloseMenu}
                      >
                        All Industries
                      </NavLink>
                      <div className="mt-3 grid max-h-[52vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                        {industriesCatalog.map((industry) => (
                          <NavLink
                            key={industry.slug}
                            to={`/industries/${industry.slug}`}
                            className="rounded-xl px-4 py-3 text-sm text-brand-muted transition hover:bg-brand-surface hover:text-brand-ink"
                            onClick={handleCloseMenu}
                          >
                            {industry.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
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
              ),
            )}
            <NavLink
              to="/compare"
              className="rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm font-medium text-brand-muted transition hover:border-brand-green hover:text-brand-ink"
              onClick={handleCloseMenu}
            >
              Compare {comparedCount ? `(${comparedCount})` : ''}
            </NavLink>
            <NavLink
              to="/request-quote"
              className="mt-3 rounded-2xl bg-brand-green px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              onClick={handleCloseMenu}
            >
              Request Quote
            </NavLink>
            <a
              href={`tel:${productExpertPhone.replace(/[^\d+]/g, '')}`}
              className="mt-3 rounded-2xl border border-brand-border bg-white px-4 py-3 text-center text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
              onClick={handleCloseMenu}
            >
              Product Expert: {productExpertPhone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
