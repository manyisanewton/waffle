import { Outlet } from 'react-router-dom'
import Footer from '../navigation/Footer'
import Navbar from '../navigation/Navbar'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-brand-canvas text-brand-ink">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(47,143,120,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(43,162,82,0.18),transparent_24%)]" />
      <Navbar />
      <div className="flex min-h-screen flex-col pt-[92px]">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default SiteLayout
