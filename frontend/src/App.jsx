import { Navigate, Route, Routes } from 'react-router-dom'
import GoogleAnalyticsTracker from './components/analytics/GoogleAnalyticsTracker'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminLayout from './components/layout/AdminLayout'
import RouteScrollManager from './components/layout/RouteScrollManager'
import SiteLayout from './components/layout/SiteLayout'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import BrandDetailPage from './pages/BrandDetailPage'
import ContactPage from './pages/ContactPage'
import CompareProductsPage from './pages/CompareProductsPage'
import FaqPage from './pages/FaqPage'
import HomePage from './pages/HomePage'
import IndustriesPage from './pages/IndustriesPage'
import IndustryDetailPage from './pages/IndustryDetailPage'
import NewsPage from './pages/NewsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'
import RequestQuotePage from './pages/RequestQuotePage'
import ServicesPage from './pages/ServicesPage'
import SolutionDetailPage from './pages/SolutionDetailPage'
import SolutionsPage from './pages/SolutionsPage'

function App() {
  return (
    <>
      <GoogleAnalyticsTracker />
      <RouteScrollManager />
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route
            path="admin/dashboard"
            element={(
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            )}
          />
        </Route>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="brands/:brandSlug" element={<BrandDetailPage />} />
          <Route path="products/category/:categorySlug" element={<ProductCategoryPage />} />
          <Route path="products/item/:productSlug" element={<ProductDetailPage />} />
          <Route path="compare" element={<CompareProductsPage />} />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="industries/:industrySlug" element={<IndustryDetailPage />} />
          <Route path="request-quote" element={<RequestQuotePage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
