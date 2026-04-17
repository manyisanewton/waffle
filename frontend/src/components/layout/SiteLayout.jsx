import { Outlet, useLocation } from 'react-router-dom'
import ScrollPromoAd from '../ads/ScrollPromoAd'
import Footer from '../navigation/Footer'
import Navbar from '../navigation/Navbar'
import SolutionsSubnav from '../navigation/SolutionsSubnav'
import ScrollRevealManager from './ScrollRevealManager'

function SiteLayout() {
  const location = useLocation()
  const isSolutionsRoute =
    location.pathname === '/solutions' || location.pathname.startsWith('/solutions/')

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-canvas text-brand-ink">
      <ScrollRevealManager />
      <ScrollPromoAd />
      <div className="theme-layout-glow absolute inset-x-0 top-0 -z-10 h-[28rem]" />
      <Navbar />
      {isSolutionsRoute ? <SolutionsSubnav /> : null}
      <div
        className={`flex min-h-screen flex-col ${
          isSolutionsRoute
            ? 'pt-[120px] sm:pt-[128px] lg:pt-[140px]'
            : 'pt-[88px] sm:pt-[96px] xl:pt-[148px]'
        }`}
      >
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default SiteLayout
