import { Outlet, useLocation } from 'react-router-dom'
import ScrollPromoAd from '../ads/ScrollPromoAd'
import WebsiteChatbot from '../chatbot/WebsiteChatbot'
import Footer from '../navigation/Footer'
import Navbar from '../navigation/Navbar'
import SolutionsSubnav from '../navigation/SolutionsSubnav'
import ScrollRevealManager from './ScrollRevealManager'

function SiteLayout() {
  const location = useLocation()
  const isSolutionsRoute =
    location.pathname === '/solutions' || location.pathname.startsWith('/solutions/')
  const isBlogRoute = location.pathname === '/blog' || location.pathname.startsWith('/blog/')

  return (
    <div className="min-h-screen overflow-x-clip bg-brand-canvas text-brand-ink">
      <ScrollRevealManager />
      <ScrollPromoAd />
      <div className="theme-layout-glow absolute inset-x-0 top-0 -z-10 h-[28rem]" />
      <Navbar />
      {isSolutionsRoute ? <SolutionsSubnav /> : null}
      <div
        className={`flex min-h-screen flex-col ${
          isSolutionsRoute
            ? 'pt-[120px] sm:pt-[128px] lg:pt-[140px]'
            : isBlogRoute
              ? 'pt-[60px] sm:pt-[68px] xl:pt-[148px]'
            : 'pt-[88px] sm:pt-[96px] xl:pt-[148px]'
        }`}
      >
        <main className={`mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 ${isBlogRoute ? 'pb-0' : 'pb-16 lg:pb-24'}`}>
          <Outlet />
        </main>
        <Footer flush={isBlogRoute} />
      </div>
      <WebsiteChatbot />
    </div>
  )
}

export default SiteLayout
