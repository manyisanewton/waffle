import { useEffect, useMemo, useState } from 'react'
import { FaTimes, FaWhatsapp } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { getEligiblePromoAds } from '../../data/promoAds'
import { trackEvent } from '../../lib/analytics'
import { company } from '../../data/site/company'

const DISMISS_KEY = 'vortexus-promo-dismissed-until'
const LAST_AD_KEY = 'vortexus-promo-last-ad'
const SHOWN_KEY_PREFIX = 'vortexus-promo-shown'
const DISMISS_DURATION_MS = 1000 * 60 * 30
const SHOW_DELAY_MS = 900
const SCROLL_RATIO = 0.22

function pickPromoAd(pathname, ads) {
  if (!ads.length) {
    return null
  }

  const lastSeen = window.localStorage.getItem(LAST_AD_KEY)
  const pool = ads.filter((item) => item.id !== lastSeen)
  const candidates = pool.length ? pool : ads
  const selected = candidates[Math.floor(Math.random() * candidates.length)]

  window.localStorage.setItem(LAST_AD_KEY, selected.id)
  return selected
}

function ScrollPromoAd() {
  const location = useLocation()
  const [selectedAd, setSelectedAd] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const eligibleAds = useMemo(
    () => getEligiblePromoAds(location.pathname),
    [location.pathname],
  )

  useEffect(() => {
    setIsVisible(false)

    if (typeof window === 'undefined') {
      return undefined
    }

    if (import.meta.env.DEV) {
      window.localStorage.removeItem(DISMISS_KEY)
      window.localStorage.removeItem(LAST_AD_KEY)
      Object.keys(window.sessionStorage)
        .filter((key) => key.startsWith(SHOWN_KEY_PREFIX))
        .forEach((key) => window.sessionStorage.removeItem(key))
    }

    const dismissedUntil = Number(window.localStorage.getItem(DISMISS_KEY) || '0')
    const shownKey = `${SHOWN_KEY_PREFIX}:${location.pathname}`
    const alreadyShown = window.sessionStorage.getItem(shownKey) === 'true'

    if (dismissedUntil > Date.now() || alreadyShown || !eligibleAds.length) {
      return undefined
    }

    const ad = pickPromoAd(location.pathname, eligibleAds)
    if (!ad) {
      return undefined
    }

    setSelectedAd(ad)

    let timeoutId = null
    let didSchedule = false

    const maybeShow = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) {
        return
      }

      const ratio = window.scrollY / maxScroll
      if (ratio < SCROLL_RATIO || didSchedule) {
        return
      }

      didSchedule = true
      timeoutId = window.setTimeout(() => {
        setIsVisible(true)
        window.sessionStorage.setItem(shownKey, 'true')
        trackEvent('promo_ad_view', {
          ad_id: ad.id,
          page_path: location.pathname,
        })
      }, SHOW_DELAY_MS)
    }

    window.addEventListener('scroll', maybeShow, { passive: true })
    maybeShow()

    return () => {
      window.removeEventListener('scroll', maybeShow)
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [eligibleAds, location.pathname])

  if (!selectedAd || !isVisible) {
    return null
  }

  const requestQuoteHref = `/request-quote?promo=${encodeURIComponent(selectedAd.id)}&page=${encodeURIComponent(location.pathname)}`

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION_MS))
    }
    setIsVisible(false)
    trackEvent('promo_ad_close', {
      ad_id: selectedAd.id,
      page_path: location.pathname,
    })
  }

  return (
    <aside className="pointer-events-none fixed inset-0 z-40 flex items-start justify-center px-4 pb-6 pt-[11.5rem] sm:px-6 sm:pb-8 sm:pt-[12.5rem] xl:pt-[13.5rem]">
      <div className="absolute inset-0 bg-slate-800/38 backdrop-blur-[8px]" />
      <div className="pointer-events-auto relative flex max-h-[calc(100vh-13rem)] w-full max-w-[min(82vw,440px)] flex-col overflow-hidden rounded-[1.9rem] border border-brand-border bg-white shadow-[0_26px_80px_rgba(35,33,32,0.24)] sm:max-h-[calc(100vh-14rem)] xl:max-h-[calc(100vh-15rem)]">
        <div className="relative shrink-0 bg-white">
          <img
            src={selectedAd.image}
            alt={selectedAd.alt}
            className="max-h-[58vh] w-full object-contain bg-white sm:max-h-[49vh] xl:max-h-[46vh]"
          />
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/72"
            aria-label="Close promotion"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto px-4 py-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand-green">
            Featured Promotion
          </p>
          <div className="flex flex-wrap gap-2.5">
            <NavLink
              to={requestQuoteHref}
              onClick={() =>
                trackEvent('promo_ad_cta', {
                  ad_id: selectedAd.id,
                  page_path: location.pathname,
                  cta_type: 'request_quote',
                })}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Request Quote
            </NavLink>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent('promo_ad_cta', {
                  ad_id: selectedAd.id,
                  page_path: location.pathname,
                  cta_type: 'whatsapp',
                })}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-border bg-white px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
            >
              <FaWhatsapp className="text-base text-[var(--color-social-whatsapp)]" />
              Talk on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ScrollPromoAd
