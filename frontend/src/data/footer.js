import { company } from './site/company'

export const footerGroups = [
  {
    title: 'Products',
    links: [
      { label: 'MDBootstrap', to: '/services' },
      { label: 'MDWordPress', to: '/solutions' },
      { label: 'BrandFlow', to: '/projects' },
      { label: 'Bootstrap Angular', to: '/about-us' },
    ],
  },
  {
    title: 'Useful Links',
    links: [
      { label: 'Your Account', to: '/contact-us' },
      { label: 'Become an Affiliate', to: '/about-us' },
      { label: 'Shipping Rates', to: '/services' },
      { label: 'Help', to: '/contact-us' },
    ],
  },
]

export const socialLinks = [
  { label: 'Facebook', href: company.socialLinks.facebook, icon: 'facebook' },
  { label: 'Twitter', href: company.socialLinks.twitter, icon: 'twitter' },
  { label: 'Google', href: company.socialLinks.google, icon: 'google' },
  { label: 'Instagram', href: company.socialLinks.instagram, icon: 'instagram' },
  { label: 'LinkedIn', href: company.socialLinks.linkedin, icon: 'linkedin' },
  { label: 'WhatsApp', href: company.whatsapp, icon: 'whatsapp' },
]

export const contactItems = [
  { label: 'Nairobi, Kenya', icon: 'address' },
  { label: company.email, href: `mailto:${company.email}`, icon: 'email' },
  { label: company.phone, href: 'tel:+254700000000', icon: 'phone' },
  { label: 'Water, Energy & Automation', icon: 'fax' },
]
