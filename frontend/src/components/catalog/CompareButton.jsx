import { useState } from 'react'
import useProductCompare from '../../hooks/useProductCompare'
import { trackEvent } from '../../lib/analytics'
import { MAX_COMPARE_ITEMS } from '../../lib/compareStore'

function CompareButton({
  productSlug,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
  compact = false,
}) {
  const [message, setMessage] = useState('')
  const { comparedCount, toggleComparedSlug, isCompared } = useProductCompare()
  const active = isCompared(productSlug)

  const resolvedClassName = [
    'inline-flex items-center justify-center rounded-full px-3 py-2 text-[0.88rem] font-semibold transition',
    active
      ? activeClassName || 'bg-brand-ink text-white hover:bg-brand-ink/88'
      : inactiveClassName ||
        'border border-brand-border bg-white text-brand-ink hover:border-brand-green hover:text-brand-green',
    className,
  ].join(' ')

  return (
    <div className={compact ? 'space-y-0' : 'space-y-2'}>
      <button
        type="button"
        onClick={() => {
          const result = toggleComparedSlug(productSlug)
          if (!result.ok && result.reason === 'limit') {
            setMessage(`Compare up to ${MAX_COMPARE_ITEMS} products at a time.`)
            return
          }

          if (result.reason === 'added') {
            setMessage('Added to compare.')
            trackEvent('compare_products', {
              compare_action: 'added',
              product_slug: productSlug,
            })
          } else if (result.reason === 'removed') {
            setMessage('Removed from compare.')
            trackEvent('compare_products', {
              compare_action: 'removed',
              product_slug: productSlug,
            })
          }
        }}
        className={resolvedClassName}
      >
        {active ? 'Remove Compare' : 'Compare'}
      </button>
      {!compact && message ? (
        <p className="text-xs leading-6 text-brand-muted">
          {message}
          {!active && comparedCount ? ` ${comparedCount} selected.` : ''}
        </p>
      ) : null}
    </div>
  )
}

export default CompareButton
