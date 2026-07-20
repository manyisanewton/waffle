export const blogCategories = [
  { slug: 'all', label: 'All Posts' },
  { slug: 'water-treatment', label: 'Water Treatment' },
  { slug: 'buying-guides', label: 'Buying Guides' },
  { slug: 'solar-boreholes', label: 'Solar & Boreholes' },
  { slug: 'pumps-pressure', label: 'Pumps & Pressure' },
  { slug: 'project-insights', label: 'Project Insights' },
]

const guideBlogPosts = [
  {
    slug: 'slim-vs-jumbo-filter-housings',
    title: 'Slim vs Jumbo Filter Housings: Which One Should You Choose?',
    excerpt:
      'Filter housing size affects flow, cartridge cost, maintenance frequency, and where the system can be installed. Here is how to choose between slim and jumbo housings.',
    category: 'buying-guides',
    categoryLabel: 'Buying Guides',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-07-19',
    readTime: '6 min read',
    coverImage: '/Filtration Systems/10 jumbo 34 Blue Filter Housing.png',
    heroImage: '/Filtration Systems/10 slim 34 Blue Filter Housing with Black Cap.png',
    featured: true,
    postKind: 'Buying Guide',
    tags: ['filter housings', 'slim filter housing', 'jumbo filter housing', 'water filtration'],
    seoDescription:
      'Compare slim and jumbo filter housings for domestic, whole-house, and commercial water filtration systems.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'Filter housings look simple, but choosing the wrong size can limit flow, increase cartridge changes, or make maintenance difficult. The most common choice is between slim 10 inch housings and jumbo 10 inch housings.',
      },
      {
        type: 'paragraph',
        content:
          'Slim housings usually take 2.5 inch diameter cartridges and work well for lower-flow point-of-use or small domestic systems. Jumbo housings usually take 4.5 inch diameter cartridges and are better when the system needs more flow or longer service life.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'When a slim housing makes sense',
      },
      {
        type: 'list',
        items: [
          'Kitchen, under-sink, small office, and light domestic filtration',
          'Lower daily water demand where compact installation space matters',
          'Applications using standard 10 inch sediment, carbon, ceramic, or specialty cartridges',
          'Systems where low cost and easy replacement are more important than high flow',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'When a jumbo housing is better',
      },
      {
        type: 'list',
        items: [
          'Whole-house or point-of-entry filtration',
          'Commercial pre-filtration before RO, UV, softeners, or pumps',
          'Sites with higher sediment load or higher flow requirement',
          'Installations where fewer cartridge changes and better dirt-holding capacity matter',
        ],
      },
      {
        type: 'quote',
        content:
          'Choose the housing around flow and maintenance, not only the cartridge height.',
      },
      {
        type: 'cta',
        title: 'Compare filter housings and cartridges',
        text:
          'Browse filtration systems or request help matching housing size, cartridge type, and flow requirement.',
        buttonLabel: 'View Filtration Systems',
        buttonHref: '/products/category/filtration-systems',
      },
    ],
  },
  {
    slug: 'choose-sediment-filter-borehole-municipal-water',
    title: 'How to Choose a Sediment Filter for Borehole or Municipal Water',
    excerpt:
      'Sediment filters protect pumps, carbon filters, UV systems, RO membranes, and taps from sand, rust, silt, and other suspended particles.',
    category: 'buying-guides',
    categoryLabel: 'Buying Guides',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-07-19',
    readTime: '7 min read',
    coverImage: '/Filtration Systems/10 5 Micron Slim Spun Sediment Filter.png',
    heroImage: '/images/products/filtration-systems/sand-media.webp',
    featured: true,
    postKind: 'Buying Guide',
    tags: ['sediment filter', 'borehole water', 'municipal water', '5 micron filter'],
    seoDescription:
      'Learn how to choose sediment filters for borehole and municipal water, including micron rating, flow, service life, and pretreatment use.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'Sediment filtration is normally the first protection stage in a water treatment system. It removes physical particles such as sand, silt, clay, rust, and pipe scale before those particles reach more sensitive equipment.',
      },
      {
        type: 'paragraph',
        content:
          'For borehole water, sediment filters protect downstream treatment from sand and fine suspended matter. For municipal water, they help catch rust and particles from aging pipe networks or storage tanks.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What micron rating means',
      },
      {
        type: 'paragraph',
        content:
          'Micron rating describes the approximate particle size a filter is designed to capture. A 5 micron sediment cartridge is commonly used when finer particle removal is needed before carbon filtration, UV disinfection, RO membranes, or domestic use.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Selection checklist',
      },
      {
        type: 'list',
        items: [
          'Confirm whether the problem is sand, rust, silt, clay, turbidity, or visible dirt',
          'Match cartridge height and diameter to the installed housing',
          'Check flow rate so the filter does not restrict supply',
          'Replace cartridges before pressure drop becomes severe',
          'Use stronger pretreatment where water carries heavy sand or high turbidity',
        ],
      },
      {
        type: 'cta',
        title: 'Need sediment protection for your water system?',
        text:
          'Vortexus supplies sediment cartridges, filter housings, and pretreatment products for domestic, commercial, and industrial water systems.',
        buttonLabel: 'Browse Sediment Filtration',
        buttonHref: '/products/category/filtration-systems',
      },
    ],
  },
  {
    slug: 'choose-water-meter-home-apartment-commercial',
    title: 'How to Choose a Water Meter for Homes, Apartments, and Commercial Use',
    excerpt:
      'A water meter should match pipe size, flow range, pressure, connection type, and the way consumption will be monitored or billed.',
    category: 'buying-guides',
    categoryLabel: 'Buying Guides',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-07-19',
    readTime: '6 min read',
    coverImage: '/water meters/25mm KMEI Water Meter – Accurate, Reliable Water Measurement.png',
    heroImage: '/water meters/50mm Flange-Type Water Meter – Accurate Bulk Water Measurement.png',
    featured: true,
    postKind: 'Buying Guide',
    tags: ['water meter', 'mechanical water meter', 'kmei water meter', 'commercial metering'],
    seoDescription:
      'Choose the right mechanical water meter by pipe size, flow rate, pressure, threaded or flanged connection, and usage application.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'Water meters are used for consumption monitoring, tenant billing, utility control, agriculture supply, commercial buildings, and community distribution. The right meter is not simply the biggest one available. It should match the normal flow range of the pipe it serves.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Start with pipe size and expected flow',
      },
      {
        type: 'paragraph',
        content:
          'Smaller meters such as 15mm and 20mm are commonly used for domestic, apartment, and small commercial applications. Larger meters such as 25mm, 40mm, and 50mm are used where the line carries higher flow for buildings, farms, institutions, or community water supply.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What to check before buying',
      },
      {
        type: 'list',
        items: [
          'Nominal size and connection type: threaded or flanged',
          'Maximum flow rate and normal operating flow',
          'Maximum operating pressure',
          'Mechanical register readability and installation position',
          'Whether the meter will serve one user, a building, a farm, or a bulk line',
        ],
      },
      {
        type: 'quote',
        content:
          'Good metering starts with correct sizing, not just installing a register on the pipe.',
      },
      {
        type: 'cta',
        title: 'Compare mechanical water meters',
        text:
          'Review domestic, commercial, and bulk water meter options for your pipe size and flow requirement.',
        buttonLabel: 'View Water Meters',
        buttonHref: '/products/category/water-meters',
      },
    ],
  },
  {
    slug: 'choose-uv-lamp-water-sterilizer',
    title: 'How to Choose a UV Lamp for a Water Sterilizer',
    excerpt:
      'UV lamp replacement depends on wattage, pin type, lamp length, flow rating, and compatibility with the sterilizer chamber.',
    category: 'buying-guides',
    categoryLabel: 'Buying Guides',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-07-19',
    readTime: '6 min read',
    coverImage: '/sterilizers/UV Lamp 2-Pin 30W for Water Sterilizer.png',
    heroImage: '/images/products/disinfection-systems/uv-lamp.jpg',
    featured: false,
    postKind: 'Buying Guide',
    tags: ['uv lamp', 'water sterilizer', 'uv disinfection', '2 pin uv lamp'],
    seoDescription:
      'Learn how to choose a UV replacement lamp for water sterilizers by wattage, pin type, flow rate, and system compatibility.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'A UV sterilizer depends on the lamp producing enough ultraviolet intensity as water passes through the chamber. When the lamp is old, mismatched, or underpowered for the flow rate, disinfection performance can drop even if the lamp still appears to be glowing.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Details to confirm before ordering',
      },
      {
        type: 'list',
        items: [
          'Lamp wattage, such as 6W, 16W, 25W, 30W, or 55W',
          'Pin type and connector format',
          'Lamp length and chamber compatibility',
          'System flow rate in gallons per minute or litres per hour',
          'Whether the quartz sleeve and ballast also need inspection or replacement',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why filtration before UV matters',
      },
      {
        type: 'paragraph',
        content:
          'UV works best when the water is already clear. Sediment, turbidity, and color can shield microorganisms from UV exposure. That is why UV is normally installed after sediment filtration and before final distribution.',
      },
      {
        type: 'cta',
        title: 'Find UV lamps and sterilizer parts',
        text:
          'Browse UV replacement lamps and water sterilizer parts, or ask for compatibility help using a photo of your existing lamp.',
        buttonLabel: 'View Sterilizers',
        buttonHref: '/products/category/sterilizers',
      },
    ],
  },
  {
    slug: 'choose-right-ro-system-water-quality',
    title: 'How to Choose the Right RO System for Your Water Quality',
    excerpt:
      'Reverse osmosis selection starts with a water analysis report, target water quality, daily volume, pretreatment plan, and membrane protection strategy.',
    category: 'water-treatment',
    categoryLabel: 'Water Treatment',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-07-19',
    readTime: '8 min read',
    coverImage: '/images/products/reverse-osmosis-systems/ro-skid.webp',
    heroImage: '/images/assets/img/projects/90cubic RO PLANT.webp',
    featured: false,
    postKind: 'Buying Guide',
    tags: ['reverse osmosis system', 'ro plant', 'ro membrane', 'water analysis'],
    seoDescription:
      'Choose the right reverse osmosis system by checking water analysis, flow demand, TDS, pretreatment, membranes, and application requirements.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'Reverse osmosis is one of the strongest treatment options for dissolved contaminants, but it should not be selected blindly. The right RO system depends on the source water quality and the water quality required after treatment.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Start with a water analysis report',
      },
      {
        type: 'paragraph',
        content:
          'A water analysis should show TDS, hardness, iron, manganese, turbidity, chlorine, pH, fluoride, and microbiological risk where relevant. These values determine membrane choice, pretreatment, chemical dosing, cleaning needs, and recovery expectations.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'RO selection checklist',
      },
      {
        type: 'list',
        items: [
          'Daily water volume and peak flow requirement',
          'Incoming TDS, hardness, iron, turbidity, and chlorine',
          'Required product-water quality for drinking, process, boiler, lab, or industrial use',
          'Pretreatment requirements such as sediment filtration, carbon, softening, or antiscalant dosing',
          'Membrane size, pressure vessel, pump pressure, controls, and cleaning access',
        ],
      },
      {
        type: 'quote',
        content:
          'RO performance is decided before the membrane: pretreatment and sizing protect the whole system.',
      },
      {
        type: 'cta',
        title: 'Plan an RO system around real water quality',
        text:
          'Share a water analysis report, application, and required daily volume so Vortexus can recommend the right RO direction.',
        buttonLabel: 'View RO Systems',
        buttonHref: '/products/category/reverse-osmosis-systems',
      },
    ],
  },
]

export const blogPosts = [
  ...guideBlogPosts,
  {
    slug: 'reverse-osmosis-for-saline-and-fluoride-water',
    title: 'How Reverse Osmosis Solves Salinity and Fluoride Challenges for Communities and Developments',
    excerpt:
      'Reverse osmosis becomes the right answer when a water source looks abundant but still fails the safety test. Here is where it fits, what it removes, and why it matters for long-term reliability.',
    category: 'water-treatment',
    categoryLabel: 'Water Treatment',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-03-20',
    readTime: '7 min read',
    coverImage: '/images/assets/img/projects/90cubic RO PLANT.webp',
    heroImage: '/images/assets/img/projects/90cubic RO PLANT.webp',
    featured: true,
    tags: ['reverse osmosis', 'fluoride removal', 'saline water', 'community water'],
    seoDescription:
      'Learn how reverse osmosis systems help communities, apartments, and institutions treat saline and fluoride-affected water safely and reliably.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'In many parts of East Africa, the challenge is not only finding water. The bigger challenge is turning what is available into water that is safe, stable, and acceptable for daily use. Boreholes can produce strong volumes while still carrying salinity, fluoride, taste issues, and mineral loads that make the source unsuitable without treatment.',
      },
      {
        type: 'paragraph',
        content:
          'That is where reverse osmosis becomes one of the most effective treatment approaches. It gives property owners, institutions, and communities a way to reduce dissolved contaminants and supply water that meets a much higher standard for drinking and household use.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What reverse osmosis is actually doing',
      },
      {
        type: 'paragraph',
        content:
          'An RO system pushes water through a semi-permeable membrane designed to reject a high percentage of dissolved salts, fluoride, metals, and other unwanted constituents. The result is a much cleaner permeate stream and a concentrate stream that carries the rejected load away from the usable water.',
      },
      {
        type: 'list',
        items: [
          'Reduces salinity where borehole water tastes salty or damages plumbing fixtures',
          'Helps control fluoride where long-term exposure creates serious health concerns',
          'Improves taste and general acceptability for residential and institutional users',
          'Supports reliable treatment when paired with the right pretreatment and monitoring',
        ],
      },
      {
        type: 'image',
        src: '/images/assets/img/projects/40,000flouridetreatmentplant.jpeg',
        alt: 'Fluoride treatment installation and plant assembly',
        caption: 'High-recovery treatment systems need the right pretreatment, controls, and operating discipline to remain reliable.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Where this matters most',
      },
      {
        type: 'paragraph',
        content:
          'RO is especially useful for residential compounds, commercial properties, institutions, and community projects where the incoming source is available but chemically unsuitable. In those situations, the real question is not whether water exists. The real question is whether the water is fit for consistent human use at the point of delivery.',
      },
      {
        type: 'quote',
        content:
          'A good treatment plant does not only improve the water. It improves confidence in the source.',
      },
      {
        type: 'paragraph',
        content:
          'This is why system sizing, membrane selection, pretreatment, recovery targets, and operator visibility all matter. A weak design may produce water for a short period. A strong design keeps delivering under real conditions.',
      },
      {
        type: 'cta',
        title: 'Need help assessing a saline or fluoride-affected source?',
        text:
          'Vortexus can help match the treatment train to the actual water quality challenge instead of oversimplifying the solution.',
        buttonLabel: 'Talk to Our Team',
        buttonHref: '/contact-us',
      },
    ],
  },
  {
    slug: 'why-solar-water-pumping-keeps-winning-in-off-grid-sites',
    title: 'Why Solar Water Pumping Keeps Winning on Off-Grid and High-Cost Borehole Sites',
    excerpt:
      'Fuel dependency, unstable power, and remote locations make conventional pumping expensive. Solar pumping changes that equation when the design is done properly.',
    category: 'solar-boreholes',
    categoryLabel: 'Solar & Boreholes',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-03-14',
    readTime: '6 min read',
    coverImage: '/images/assets/img/projects/solar projects/somalia.jpg',
    heroImage: '/images/assets/img/projects/solar projects/taveta.jpg',
    featured: true,
    tags: ['solar pumping', 'borehole systems', 'off-grid water', 'community water'],
    seoDescription:
      'See why solar-powered borehole pumping is becoming a strong choice for remote sites, communities, farms, and institutions.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'For many off-grid water sites, the pump is not the only issue. The larger issue is the cost and instability of running the pump every day. Where diesel, grid outages, or transport constraints affect operations, a solar-powered pumping system can remove a major part of the operating burden.',
      },
      {
        type: 'paragraph',
        content:
          'That is why solar pumping continues to grow across community, agricultural, and institutional water projects. It reduces energy cost, cuts fuel logistics, and gives remote sites a better chance of consistent daily supply.',
      },
      {
        type: 'image',
        src: '/images/assets/img/projects/solar projects/somalia.jpg',
        alt: 'Solar-powered water pumping installation in Somaliland',
        caption: 'A well-designed solar pumping system can turn an underused borehole into a dependable community asset.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why clients choose it',
      },
      {
        type: 'list',
        items: [
          'Lower recurring energy cost compared with fuel-powered abstraction',
          'Better suitability for remote and off-grid operation',
          'Reduced operational interruptions from power instability',
          'Cleaner long-term energy profile for public, NGO, and CSR projects',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Solar pumping is not only about putting panels near a borehole. The system has to be matched properly to borehole depth, discharge requirement, storage arrangement, pumping window, and site demand profile. That technical matching is what determines whether the project becomes dependable or disappointing.',
      },
      {
        type: 'video',
        src: '/images/assets/video/norwavideo.mp4',
        poster: '/images/assets/video/poster.webp',
        caption: 'Project footage helps show the context, scale, and installation reality behind field delivery.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Where solar pumping is strongest',
      },
      {
        type: 'paragraph',
        content:
          'It performs especially well where the source is sound, daytime pumping is acceptable, and water can be stored for controlled distribution. In these cases, storage becomes part of the energy strategy, not just a civil component.',
      },
      {
        type: 'cta',
        title: 'Planning a solar borehole project?',
        text:
          'Use the site conditions, demand profile, and source details to shape the pumping design from the beginning.',
        buttonLabel: 'View Borehole Solutions',
        buttonHref: '/solutions/borehole-solutions',
      },
    ],
  },
  {
    slug: 'choosing-between-uv-uf-and-ro',
    title: 'Choosing Between UV, UF, and RO Without Confusing the Water Problem',
    excerpt:
      'UV, UF, and RO are often discussed together, but they do very different jobs. The right decision starts with understanding the contaminant type, not the equipment name.',
    category: 'water-treatment',
    categoryLabel: 'Water Treatment',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-03-08',
    readTime: '8 min read',
    coverImage: '/images/assets/img/watersolutions/4-stage-uv-system.jpg',
    heroImage: '/images/water-treament.webp',
    featured: false,
    tags: ['uv systems', 'uf systems', 'reverse osmosis', 'water treatment selection'],
    seoDescription:
      'Understand the practical difference between UV, ultrafiltration, and reverse osmosis when selecting a treatment system.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'A common mistake in water treatment is treating all purification technologies as if they solve the same problem. They do not. UV, UF, and RO each address different risk profiles, and choosing well depends on the actual source-water challenge.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'UV: disinfection without chemical dosing',
      },
      {
        type: 'paragraph',
        content:
          'UV systems are used where the main concern is microbiological contamination. They do not remove salinity, hardness, or dissolved minerals. Their strength is neutralizing bacteria and similar organisms when the upstream water quality is already physically suitable for UV exposure.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'UF: fine physical separation',
      },
      {
        type: 'paragraph',
        content:
          'Ultrafiltration is useful for suspended solids, turbidity reduction, and microorganism control through membrane-based separation. It is often a strong choice for pretreatment or for cases where dissolved salts are not the main issue.',
      },
      {
        type: 'image',
        src: '/images/assets/img/watersolutions/under-sink-ro.jpg',
        alt: 'Domestic and compact treatment systems',
        caption: 'Different treatment technologies fit different risk profiles and use cases.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'RO: dissolved contaminant reduction',
      },
      {
        type: 'paragraph',
        content:
          'RO enters when the water problem includes dissolved salts, fluoride, conductivity, or other contaminants that UV and UF will not solve on their own. It is generally the more intensive solution, but also the correct one for certain sources.',
      },
      {
        type: 'list',
        items: [
          'Choose UV when the main risk is microbiological and the water is already visually clean',
          'Choose UF when fine suspended matter and microorganism removal are central',
          'Choose RO when dissolved contaminants are the real problem',
          'Combine technologies when the source demands a treatment train rather than one device',
        ],
      },
      {
        type: 'quote',
        content:
          'The best technology is not the most advanced one. It is the one that directly matches the water problem.',
      },
      {
        type: 'cta',
        title: 'Need help matching technology to source water?',
        text:
          'Vortexus can build the treatment train around your actual quality data and application requirements.',
        buttonLabel: 'Explore Water Treatment',
        buttonHref: '/solutions/commercial-industrial-water-treatment',
      },
    ],
  },
  {
    slug: 'pressure-boosting-for-homes-buildings-and-sites',
    title: 'What Reliable Pressure Boosting Looks Like in Homes, Buildings, and Utility Sites',
    excerpt:
      'Low pressure is more than an inconvenience. It affects usability, system confidence, and service continuity. This is what a better pressure strategy looks like.',
    category: 'pumps-pressure',
    categoryLabel: 'Pumps & Pressure',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-02-28',
    readTime: '5 min read',
    coverImage: '/images/assets/img/products/domestic-booster-pump.jpg',
    heroImage: '/images/pumps/Horizontal-booster-sets.jpg',
    featured: false,
    tags: ['booster pumps', 'pressure systems', 'multistage pumps', 'water delivery'],
    seoDescription:
      'See how domestic booster pumps, multistage pumps, and booster sets improve water delivery confidence across different applications.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'Clients often describe pressure issues as a comfort problem, but the effect is wider than that. Pressure affects whether taps, showers, upper floors, treatment skids, and process systems perform the way users expect. Once pressure becomes inconsistent, confidence in the whole water system drops.',
      },
      {
        type: 'paragraph',
        content:
          'A good boosting solution starts by understanding whether the challenge is household-level, building-wide, or process-related. That determines whether the right answer is a compact domestic booster, a multistage pump, or a complete booster set with control logic.',
      },
      {
        type: 'image',
        src: '/images/pumps/Pressure-tank.jpg',
        alt: 'Pressure tank used in water pressure systems',
        caption: 'Pressure management is rarely about the pump alone. Tanks, controls, and switching matter too.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Key components behind stable delivery',
      },
      {
        type: 'list',
        items: [
          'Pump selection that matches flow, head, and duty profile',
          'Pressure tanks to reduce cycling and stabilize operation',
          'Controllers and switches that protect the system from unstable behavior',
          'Proper installation layout to reduce avoidable strain and inefficiency',
        ],
      },
      {
        type: 'paragraph',
        content:
          'When the design is right, the result feels simple to the end user. Water arrives at the right pressure, the system behaves predictably, and operating interruptions reduce. That simplicity is usually the sign of good engineering behind the scenes.',
      },
      {
        type: 'cta',
        title: 'Looking at a low-pressure or boosting problem?',
        text:
          'Start with the site conditions, demand profile, and building layout, then match the right pressure equipment to it.',
        buttonLabel: 'View Water Pumps',
        buttonHref: '/solutions/water-pumps',
      },
    ],
  },
  {
    slug: 'from-project-delivery-to-long-term-water-confidence',
    title: 'From Project Delivery to Long-Term Water Confidence: What Clients Really Remember',
    excerpt:
      'A completed installation is not the whole story. What clients remember is whether the system kept working, kept delivering, and kept making sense after handover.',
    category: 'project-insights',
    categoryLabel: 'Project Insights',
    author: 'Vortexus Editorial Team',
    publishedAt: '2026-02-18',
    readTime: '6 min read',
    coverImage: '/images/assets/img/projects/project banner.webp',
    heroImage: '/images/assets/img/projects/IMG_5890.webp',
    featured: false,
    tags: ['project delivery', 'operations', 'maintenance', 'client confidence'],
    seoDescription:
      'Why strong engineering projects are remembered for long-term system confidence, not only the installation milestone.',
    blocks: [
      {
        type: 'paragraph',
        content:
          'A project can look impressive on commissioning day and still disappoint a client months later. The difference usually comes down to whether the delivered system was realistic for the operating environment, the water quality, and the people who will run it after handover.',
      },
      {
        type: 'paragraph',
        content:
          'That is why strong water and pumping projects are not only designed to be installed. They are designed to remain understandable, maintainable, and dependable in daily use.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What clients actually remember',
      },
      {
        type: 'list',
        items: [
          'Whether the promised performance was achieved consistently',
          'Whether downtime stayed under control',
          'Whether maintenance remained practical and visible',
          'Whether the project solved the original pain point instead of creating a new one',
        ],
      },
      {
        type: 'image',
        src: '/images/assets/img/projects/WATERKIOSK.webp',
        alt: 'Water kiosk and community delivery infrastructure',
        caption: 'A strong project should keep making sense after the installation team has left the site.',
      },
      {
        type: 'paragraph',
        content:
          'For communities, that can mean reliable access. For residential developments, it can mean safe water at the tap. For institutions, it can mean operational continuity without constant firefighting. The visible equipment matters, but the long-term confidence matters more.',
      },
      {
        type: 'quote',
        content:
          'Clients rarely celebrate complexity. They celebrate systems that keep doing their job.',
      },
      {
        type: 'cta',
        title: 'See how Vortexus presents delivered work',
        text:
          'Browse the live project portfolio to see how our systems are framed around challenge, response, and outcome.',
        buttonLabel: 'Browse Projects',
        buttonHref: '/projects',
      },
    ],
  },
]

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedBlogPosts(post, limit = 3) {
  return blogPosts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        (candidate.category === post.category ||
          candidate.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, limit)
}
