const placeholderImage = '/place holder.jpg'

export const productCategories = [
  {
    slug: 'filtration-systems',
    name: 'Filtration Systems',
    icon: '⚗️',
    description:
      'Core filtration equipment for suspended solids removal, odor control, pretreatment, and membrane-based purification.',
    image: placeholderImage,
    subcategories: [
      'Sand Filters',
      'Activated Carbon Filters',
      'Cartridge Filters',
      'Bag Filters',
      'Disc Filters',
      'Microfiltration',
      'Ultrafiltration',
      'Nanofiltration',
      'Reverse Osmosis',
    ],
  },
  {
    slug: 'reverse-osmosis-systems',
    name: 'Reverse Osmosis (RO) Systems',
    icon: '🔬',
    description:
      'Industrial reverse osmosis systems, components, and support products for brackish and seawater applications.',
    image: placeholderImage,
    subcategories: [
      'RO Plants',
      'RO Membranes',
      'RO Pressure Vessels',
      'High-Pressure Pumps',
      'Antiscalants & RO Chemicals',
      'RO Controllers',
    ],
  },
  {
    slug: 'water-treatment-chemicals',
    name: 'Industrial Chemicals',
    icon: '🧴',
    description:
      'Chemical consumables for coagulation, flocculation, disinfection, pH balancing, corrosion control, and scale management.',
    image: placeholderImage,
    subcategories: [
      'Coagulants',
      'Flocculants',
      'Disinfectants',
      'pH Adjusters',
      'Biocides',
      'Corrosion Inhibitors',
      'Scale Inhibitors',
    ],
  },
  {
    slug: 'disinfection-systems',
    name: 'Disinfection Systems',
    icon: '🔦',
    description:
      'Systems designed to neutralize bacteria, viruses, and microbiological risk in water supply and treatment plants.',
    image: placeholderImage,
    subcategories: [
      'UV Sterilizers',
      'Chlorination Systems',
      'Ozone Generators',
      'Electrochlorination Systems',
    ],
  },
  {
    slug: 'pumps-fluid-handling',
    name: 'Pumps & Fluid Handling',
    icon: '⚙️',
    description:
      'Water-specific pumping, dosing, valve, and pipe solutions for treatment, transfer, pressurization, and wastewater handling.',
    image: placeholderImage,
    subcategories: [
      'Centrifugal Pumps',
      'Dosing Pumps',
      'Submersible Pumps',
      'Booster Pumps',
      'Sludge Pumps',
      'Valves',
      'Pipes',
    ],
  },
  {
    slug: 'wastewater-treatment-equipment',
    name: 'Wastewater Treatment Equipment',
    icon: '🧫',
    description:
      'Mechanical and biological wastewater equipment for aeration, clarification, dewatering, and process treatment.',
    image: placeholderImage,
    subcategories: [
      'Aeration Systems',
      'Clarifiers',
      'Filter Press',
      'Belt Press',
      'Centrifuge',
      'MBR Systems',
      'MBBR Systems',
      'SBR Systems',
    ],
  },
  {
    slug: 'industrial-etp',
    name: 'Industrial Effluent Treatment Plants',
    icon: '🌍',
    description:
      'Industrial effluent treatment systems for factories, oil and gas sites, textile processing, and heavy metal removal.',
    image: placeholderImage,
    subcategories: [
      'Complete ETP Systems',
      'Chemical Treatment Units',
      'Heavy Metal Removal Systems',
      'Oil & Gas Wastewater Systems',
      'Textile Effluent Systems',
    ],
  },
  {
    slug: 'sewage-treatment-plants',
    name: 'Sewage Treatment Plants',
    icon: '🏢',
    description:
      'Domestic wastewater systems and packaged sewage treatment units for buildings, institutions, and utilities.',
    image: placeholderImage,
    subcategories: [
      'Domestic Wastewater Systems',
      'Compact STP Units',
      'Packaged STP Plants',
      'Underground Treatment Systems',
    ],
  },
  {
    slug: 'desalination-systems',
    name: 'Desalination Systems',
    icon: '🔥',
    description:
      'Seawater and high-salinity treatment systems for industrial, utility, coastal, and remote water supply needs.',
    image: placeholderImage,
    subcategories: [
      'Seawater RO Plants',
      'Thermal Desalination',
      'Brine Management Systems',
    ],
  },
  {
    slug: 'monitoring-instrumentation',
    name: 'Monitoring & Instrumentation',
    icon: '📊',
    description:
      'Instrumentation and analyzers for water quality visibility, flow monitoring, pressure control, and digital plant oversight.',
    image: placeholderImage,
    subcategories: [
      'pH Meters',
      'TDS Meters',
      'Turbidity Meters',
      'Flow Meters',
      'Pressure Gauges',
      'Online Water Analyzers',
      'SCADA Monitoring Systems',
    ],
  },
  {
    slug: 'automation-control',
    name: 'Automation & Control',
    icon: '⚡',
    description:
      'Automation panels, PLCs, probes, and remote monitoring systems for treatment and pumping control.',
    image: placeholderImage,
    subcategories: [
      'PLC Systems',
      'Control Panels',
      'Sensors & Probes',
      'Remote Monitoring Systems',
    ],
  },
  {
    slug: 'storage-tanks',
    name: 'Storage & Tanks',
    icon: '🧱',
    description:
      'Chemical, water, pressure, and mixing tanks for safe storage, buffering, and process preparation.',
    image: placeholderImage,
    subcategories: [
      'Chemical Storage Tanks',
      'Water Storage Tanks',
      'Pressure Vessels',
      'Mixing Tanks',
    ],
  },
  {
    slug: 'spare-parts-components',
    name: 'Spare Parts & Components',
    icon: '🔧',
    description:
      'Critical replacement items and operating components for membrane systems, pumps, valves, and filtration equipment.',
    image: placeholderImage,
    subcategories: [
      'Membranes',
      'Filter Cartridges',
      'O-Rings & Seals',
      'Pump Spare Parts',
      'Valve Spare Parts',
    ],
  },
  {
    slug: 'recycling-reuse-systems',
    name: 'Recycling & Reuse Systems',
    icon: '🌱',
    description:
      'Greywater, industrial reuse, and zero-liquid-discharge systems for water recovery and reduced freshwater dependence.',
    image: placeholderImage,
    subcategories: [
      'Greywater Recycling Systems',
      'Industrial Water Reuse Plants',
      'Zero Liquid Discharge Systems',
    ],
  },
  {
    slug: 'sludge-handling-disposal',
    name: 'Sludge Handling & Disposal',
    icon: '🧯',
    description:
      'Sludge management systems covering pumping, thickening, drying, and final disposal support.',
    image: placeholderImage,
    subcategories: [
      'Sludge Dryers',
      'Sludge Pumps',
      'Sludge Thickening Systems',
      'Incineration Units',
    ],
  },
  {
    slug: 'industry-specific-solutions',
    name: 'Industry-Specific Solutions',
    icon: '🏭',
    description:
      'Application-focused product collections for food processing, pharma, textile, mining, power, and irrigation environments.',
    image: placeholderImage,
    subcategories: [
      'Food & Beverage Water Systems',
      'Pharmaceutical Water Systems',
      'Textile Industry Treatment',
      'Mining Water Treatment',
      'Power Plant Water Treatment',
      'Agriculture Irrigation Water Systems',
    ],
  },
]

export const industriesCatalog = [
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    description:
      'Treatment, filtration, disinfection, and CIP-support products for process water, utility water, and rinse-water quality control.',
    image: '/industries images/Food & Beverage.jpg',
    challenges: [
      'Stable process-water quality',
      'Microbiological control',
      'Taste, odor, and color management',
      'Reliable instrumentation for line monitoring',
    ],
    categorySlugs: [
      'filtration-systems',
      'disinfection-systems',
      'monitoring-instrumentation',
    ],
  },
  {
    slug: 'pharmaceutical',
    name: 'Pharmaceutical',
    description:
      'Purified water and control equipment for plants where hygiene, process consistency, and high-quality monitoring are critical.',
    image: '/industries images/Pharmaceutical.jpg',
    challenges: [
      'Purified water preparation',
      'Validated instrumentation points',
      'Reliable membrane and disinfection stages',
      'Clean chemical storage and dosing control',
    ],
    categorySlugs: [
      'filtration-systems',
      'reverse-osmosis-systems',
      'disinfection-systems',
      'automation-control',
      'monitoring-instrumentation',
    ],
  },
  {
    slug: 'textile',
    name: 'Textile Industry',
    description:
      'Effluent control, chemical treatment, filtration, and reuse products for dyeing, rinsing, and water-intensive processing.',
    image: '/industries images/Water And Its Uses In Wet Processing - Textile Details.jpg',
    challenges: [
      'Color and COD reduction',
      'Effluent compliance support',
      'Chemical treatment control',
      'Water reuse opportunities',
    ],
    categorySlugs: [
      'industrial-etp',
      'water-treatment-chemicals',
      'wastewater-treatment-equipment',
      'recycling-reuse-systems',
    ],
  },
  {
    slug: 'mining',
    name: 'Mining',
    description:
      'Heavy-duty pumping, effluent treatment, dewatering, and rugged instrumentation for harsh mining environments.',
    image: '/industries images/Mining Dam, Mining Pit Wastewater Recycling Plant.jpg',
    challenges: [
      'Abrasion-resistant pumping',
      'Heavy metal management',
      'Sludge handling',
      'Remote site monitoring',
    ],
    categorySlugs: [
      'pumps-fluid-handling',
      'industrial-etp',
      'sludge-handling-disposal',
      'monitoring-instrumentation',
    ],
  },
  {
    slug: 'power-plants',
    name: 'Power Plants',
    description:
      'High-purity make-up water, instrumentation, pressure systems, and chemical control for utility-scale operations.',
    image: '/industries images/Power Plants  water products images (1).jpg',
    challenges: [
      'Demineralized water preparation',
      'High-pressure duty support',
      'Online conductivity and pH visibility',
      'Corrosion and scaling control',
    ],
    categorySlugs: [
      'reverse-osmosis-systems',
      'water-treatment-chemicals',
      'monitoring-instrumentation',
      'automation-control',
    ],
  },
  {
    slug: 'agriculture-irrigation',
    name: 'Agriculture & Irrigation',
    description:
      'Pumping, filtration, storage, and reuse systems designed for dependable agricultural water delivery and efficiency.',
    image: '/industries images/agriculture.jpg',
    challenges: [
      'Reliable abstraction and boosting',
      'Filter protection for drip systems',
      'Storage and balancing capacity',
      'Lower operating-cost water movement',
    ],
    categorySlugs: [
      'filtration-systems',
      'pumps-fluid-handling',
      'storage-tanks',
      'recycling-reuse-systems',
    ],
  },
]

export const featuredCategories = productCategories.slice(0, 6)

export function getCategoryBySlug(slug) {
  return productCategories.find((category) => category.slug === slug) || null
}

export function getIndustryBySlug(slug) {
  return industriesCatalog.find((industry) => industry.slug === slug) || null
}
