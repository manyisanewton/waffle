import { company } from './site/company'

export const footerGroups = [
  {
    title: 'Products',
    links: [
      { label: 'Filtration Systems', to: '/products/category/filtration-systems' },
      { label: 'RO Systems', to: '/products/category/reverse-osmosis-systems' },
      { label: 'Industrial Chemicals', to: '/products/category/water-treatment-chemicals' },
      { label: 'Pumps & Fluid Handling', to: '/products/category/pumps-fluid-handling' },
      { label: 'Monitoring & Instrumentation', to: '/products/category/monitoring-instrumentation' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Food & Beverage', to: '/industries/food-beverage' },
      { label: 'Pharmaceutical', to: '/industries/pharmaceutical' },
      { label: 'Textile', to: '/industries/textile' },
      { label: 'Mining', to: '/industries/mining' },
      { label: 'Power Plants', to: '/industries/power-plants' },
      { label: 'Agriculture & Irrigation', to: '/industries/agriculture-irrigation' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about-us' },
      { label: 'Contact Us', to: '/contact-us' },
      { label: 'Request a Quote', to: '/contact-us' },
    ],
  },
]

export const footerHighlights = [
  {
    title: 'Products',
    text: 'Pumps, membranes, chemicals, meters, controls, tanks, and more.',
  },
  {
    title: 'Industries',
    text: 'Products matched to food, pharma, textile, mining, power, and agriculture.',
  },
  {
    title: 'Quotations',
    text: 'Send your requirement and get the right product quote quickly.',
  },
]

export const socialLinks = [
  { label: 'Facebook', href: company.socialLinks.facebook, icon: 'facebook' },
  { label: 'Twitter', href: company.socialLinks.twitter, icon: 'twitter' },
  { label: 'TikTok', href: company.socialLinks.tiktok, icon: 'tiktok' },
  { label: 'Instagram', href: company.socialLinks.instagram, icon: 'instagram' },
  { label: 'LinkedIn', href: company.socialLinks.linkedin, icon: 'linkedin' },
  { label: 'WhatsApp', href: company.whatsapp, icon: 'whatsapp' },
]

export const contactItems = [
  { label: 'Nairobi, Kenya', icon: 'address' },
  { label: company.email, href: `mailto:${company.email}`, icon: 'email' },
  { label: company.phone, href: 'tel:+254700000000', icon: 'phone' },
  { label: company.tagline, icon: 'fax' },
]

export const officeLocations = [
  {
    label: 'Dar Es Salaam Rd, Nairobi',
    href: 'https://www.google.com/maps/search/?api=1&query=Dar%20Es%20Salaam%20Rd,%20Nairobi',
    embedSrc: 'https://www.google.com/maps?q=Dar%20Es%20Salaam%20Rd,%20Nairobi&z=15&output=embed',
  },
  {
    label: 'Cabanas, Mombasa Road, Nairobi',
    href: 'https://www.google.com/maps/search/?api=1&query=Cabanas,%20Mombasa%20Road,%20Nairobi',
    embedSrc: 'https://www.google.com/maps?q=Cabanas,%20Mombasa%20Road,%20Nairobi&z=15&output=embed',
  },
  {
    label: 'Mombasa',
    href: 'https://www.google.com/maps?q=-4.062417,39.665306',
    embedSrc: 'https://www.google.com/maps?q=-4.062417,39.665306&z=15&output=embed',
  },
]

export const footerMetaLinks = [
  { label: 'Products', to: '/products' },
  { label: 'Industries', to: '/industries' },
  { label: 'Contact', to: '/contact-us' },
]
