import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import {
  getCategoryBySlug,
  industriesCatalog,
  productCategories,
} from '../../data/productCatalog'
import { loadCatalog } from '../../lib/catalogApi'

function useDebouncedValue(value, delay = 220) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}

function GlobalProductSearch({ mobile = false, onNavigate, desktopWide = false }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [catalogProducts, setCatalogProducts] = useState([])
  const wrapperRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const debouncedQuery = useDebouncedValue(query)
  const normalizedQuery = debouncedQuery.trim().toLowerCase()

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setQuery('')
  }, [location.pathname])

  useEffect(() => {
    let isMounted = true
    loadCatalog()
      .then((products) => {
        if (isMounted) {
          setCatalogProducts(products)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const suggestions = useMemo(() => {
    if (!normalizedQuery) {
      return []
    }

    const productMatches = catalogProducts
      .map((product) => {
        const category = getCategoryBySlug(product.categorySlug)
        const haystack = [
          product.name,
          product.subcategory,
          product.summary,
          category?.name || '',
        ]
          .join(' ')
          .toLowerCase()

        let score = 0

        if (product.name.toLowerCase().startsWith(normalizedQuery)) {
          score += 5
        } else if (product.name.toLowerCase().includes(normalizedQuery)) {
          score += 4
        }

        if (product.subcategory.toLowerCase().includes(normalizedQuery)) {
          score += 2
        }

        if ((category?.name || '').toLowerCase().includes(normalizedQuery)) {
          score += 1
        }

        return haystack.includes(normalizedQuery)
          ? {
              type: 'product',
              product,
              categoryName: category?.name || 'Products',
              score,
            }
          : null
      })
      .filter(Boolean)

    const categoryMatches = productCategories
      .map((category) => {
        const haystack = [category.name, category.description, ...category.subcategories]
          .join(' ')
          .toLowerCase()

        let score = 0

        if (category.name.toLowerCase().startsWith(normalizedQuery)) {
          score += 5
        } else if (category.name.toLowerCase().includes(normalizedQuery)) {
          score += 4
        }

        if (haystack.includes(normalizedQuery)) {
          score += 1
        }

        return haystack.includes(normalizedQuery)
          ? {
              type: 'category',
              category,
              score,
            }
          : null
      })
      .filter(Boolean)

    const industryMatches = industriesCatalog
      .map((industry) => {
        const haystack = [industry.name, industry.description, ...industry.challenges]
          .join(' ')
          .toLowerCase()

        let score = 0

        if (industry.name.toLowerCase().startsWith(normalizedQuery)) {
          score += 5
        } else if (industry.name.toLowerCase().includes(normalizedQuery)) {
          score += 4
        }

        if (haystack.includes(normalizedQuery)) {
          score += 1
        }

        return haystack.includes(normalizedQuery)
          ? {
              type: 'industry',
              industry,
              score,
            }
          : null
      })
      .filter(Boolean)

    return [...productMatches, ...categoryMatches, ...industryMatches]
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score
        }

        const leftLabel =
          left.type === 'product'
            ? left.product.name
            : left.type === 'category'
              ? left.category.name
              : left.industry.name
        const rightLabel =
          right.type === 'product'
            ? right.product.name
            : right.type === 'category'
              ? right.category.name
              : right.industry.name

        return leftLabel.localeCompare(rightLabel)
      })
      .slice(0, 8)
  }, [catalogProducts, normalizedQuery])

  const handleOpenSuggestion = (suggestion) => {
    if (suggestion.type === 'product') {
      navigate(`/products/item/${suggestion.product.slug}`)
    }

    if (suggestion.type === 'category') {
      navigate(`/products/category/${suggestion.category.slug}`)
    }

    if (suggestion.type === 'industry') {
      navigate(`/industries/${suggestion.industry.slug}`)
    }

    onNavigate?.()
  }

  const handleOpenCatalog = () => {
    if (!normalizedQuery) {
      navigate('/products')
      onNavigate?.()
      return
    }

    navigate(`/products?q=${encodeURIComponent(query.trim())}`)
    onNavigate?.()
  }

  const showDropdown = isOpen && normalizedQuery.length > 0

  return (
    <div
      ref={wrapperRef}
      className={`relative ${mobile ? 'w-full' : desktopWide ? 'w-full' : 'w-[20rem] 2xl:w-[24rem]'}`}
    >
      <label className="relative block">
        <span className="sr-only">Search products</span>
        <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-brand-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleOpenCatalog()
            }
            if (event.key === 'Escape') {
              setIsOpen(false)
            }
          }}
          placeholder="Search products, pumps, membranes..."
          className={[
            'w-full border border-brand-border bg-white pl-9 pr-3.5 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-green',
            mobile
              ? 'h-11 rounded-full shadow-none'
              : desktopWide
                ? 'h-10 rounded-[0.9rem] shadow-[0_12px_28px_rgba(35,33,32,0.07)]'
                : 'h-11 rounded-full shadow-[0_12px_28px_rgba(35,33,32,0.06)]',
          ].join(' ')}
        />
      </label>

      {showDropdown ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[60] overflow-hidden rounded-[1.35rem] border border-brand-border bg-white shadow-[0_26px_70px_rgba(35,33,32,0.14)]">
          {suggestions.length ? (
            <div className="max-h-[24rem] overflow-y-auto py-2">
              {suggestions.map((suggestion) => {
                if (suggestion.type === 'product') {
                  return (
                    <button
                      key={`product-${suggestion.product.slug}`}
                      type="button"
                      onClick={() => handleOpenSuggestion(suggestion)}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-brand-surface"
                    >
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-green" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-brand-ink">
                          {suggestion.product.name}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-green">
                          {suggestion.product.subcategory}
                        </p>
                        <p className="mt-1 truncate text-xs text-brand-muted">
                          {suggestion.categoryName}
                        </p>
                      </div>
                    </button>
                  )
                }

                if (suggestion.type === 'category') {
                  return (
                    <button
                      key={`category-${suggestion.category.slug}`}
                      type="button"
                      onClick={() => handleOpenSuggestion(suggestion)}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-brand-surface"
                    >
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-green-soft" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-brand-ink">
                          {suggestion.category.name}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-green">
                          Category
                        </p>
                        <p className="mt-1 truncate text-xs text-brand-muted">
                          {suggestion.category.subcategories.length} subcategories
                        </p>
                      </div>
                    </button>
                  )
                }

                return (
                  <button
                    key={`industry-${suggestion.industry.slug}`}
                    type="button"
                    onClick={() => handleOpenSuggestion(suggestion)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-brand-surface"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-green-muted" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-brand-ink">
                        {suggestion.industry.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-green">
                        Industry
                      </p>
                      <p className="mt-1 truncate text-xs text-brand-muted">
                        {suggestion.industry.challenges.length} key needs
                      </p>
                    </div>
                  </button>
                )
              })}
              <div className="border-t border-brand-border px-4 py-3">
                <button
                  type="button"
                  onClick={handleOpenCatalog}
                  className="text-sm font-semibold text-brand-green transition hover:text-brand-green-soft"
                >
                  View all results for "{query.trim()}"
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-4">
              <p className="text-sm text-brand-muted">
                No matching products yet. Try a broader term or open the full catalog.
              </p>
              <button
                type="button"
                onClick={handleOpenCatalog}
                className="mt-3 text-sm font-semibold text-brand-green transition hover:text-brand-green-soft"
              >
                Open product catalog
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default GlobalProductSearch
