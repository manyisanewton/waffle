const promoAds = [
  {
    id: 'promo-ad-1',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.43.jpeg',
    alt: 'Vortexus featured promotional artwork 1',
  },
  {
    id: 'promo-ad-2',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.44.jpeg',
    alt: 'Vortexus featured promotional artwork 2',
  },
  {
    id: 'promo-ad-3',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (1).jpeg',
    alt: 'Vortexus featured promotional artwork 3',
  },
  {
    id: 'promo-ad-4',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (2).jpeg',
    alt: 'Vortexus featured promotional artwork 4',
  },
  {
    id: 'promo-ad-5',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (3).jpeg',
    alt: 'Vortexus featured promotional artwork 5',
  },
  {
    id: 'promo-ad-6',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (4).jpeg',
    alt: 'Vortexus featured promotional artwork 6',
  },
  {
    id: 'promo-ad-7',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (5).jpeg',
    alt: 'Vortexus featured promotional artwork 7',
  },
  {
    id: 'promo-ad-8',
    image: '/adds/WhatsApp Image 2026-04-16 at 07.58.44 (6).jpeg',
    alt: 'Vortexus featured promotional artwork 8',
  },
]

function getPromoPageType(pathname = '/') {
  if (pathname === '/') {
    return 'home'
  }

  if (pathname.startsWith('/products/item/')) {
    return 'product-detail'
  }

  if (pathname.startsWith('/products/category/')) {
    return 'product-category'
  }

  if (pathname.startsWith('/products')) {
    return 'products'
  }

  if (pathname.startsWith('/industries/')) {
    return 'industry-detail'
  }

  if (pathname.startsWith('/industries')) {
    return 'industries'
  }

  if (pathname.startsWith('/about-us')) {
    return 'about'
  }

  if (pathname.startsWith('/contact-us')) {
    return 'contact'
  }

  return 'general'
}

function getEligiblePromoAds(pathname = '/') {
  const pageType = getPromoPageType(pathname)

  if (pageType === 'general') {
    return promoAds.slice(0, 4)
  }

  return promoAds
}

export { getEligiblePromoAds, getPromoPageType, promoAds }
