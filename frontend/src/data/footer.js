import { company } from './site/company'

export const footerGroups = [
  {
    title: 'Solutions',
    links: [
      { label: 'Borehole Solutions', to: '/solutions/borehole-solutions' },
      { label: 'Domestic Water Treatment', to: '/solutions/domestic-water-treatment' },
      {
        label: 'Commercial & Industrial Treatment',
        to: '/solutions/commercial-industrial-water-treatment',
      },
      { label: 'Chemicals & Media', to: '/solutions/chemicals-media' },
      { label: 'Water Pumps', to: '/solutions/water-pumps' },
      { label: 'Solar Solutions', to: '/solutions/solar-solutions' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Water Treatment & Systems', to: '/services' },
      { label: 'Pumps & Machinery', to: '/services' },
      { label: 'Maintenance & Support', to: '/services' },
      { label: 'Talk to an Engineer', to: '/contact-us' },
      { label: 'Request a Project Consultation', to: '/contact-us' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about-us' },
      { label: 'Projects', to: '/projects' },
      { label: 'News', to: '/news' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact Us', to: '/contact-us' },
    ],
  },
]

export const footerHighlights = [
  {
    title: 'Integrated Delivery',
    text: 'Water treatment, boreholes, pumps, solar systems, and controls aligned into one technical offering.',
  },
  {
    title: 'Field to Plant',
    text: 'Support for domestic, commercial, industrial, agricultural, and community water applications.',
  },
  {
    title: 'Practical Support',
    text: 'Designed to help clients move from assessment and design into implementation and long-term system reliability.',
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
  { label: company.tagline, icon: 'fax' },
]

export const footerMetaLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact-us' },
]
