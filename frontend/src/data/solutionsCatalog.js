const fallbackImage = '/section-medical-water.jpg'

export const solutionFamilies = [
  {
    slug: 'borehole-solutions',
    title: 'Borehole Solutions',
    category: 'Water Access',
    summary:
      'Solarization, equipping, rehabilitation, and pumping systems built for community, institutional, agricultural, and private borehole projects.',
    image: '/images/assets/img/borehole/boreholeequipping.webp',
    highlights: ['Solar-ready systems', 'Pump rehabilitation', 'Community delivery'],
  },
  {
    slug: 'domestic-water-treatment',
    title: 'Domestic Water Treatment',
    category: 'Home Water Quality',
    summary:
      'Household purification systems for municipal and borehole water, including staged filtration, domestic RO, accessories, and fittings.',
    image: '/images/assets/img/domestic/under-sink-ro.jpg',
    highlights: ['Tap and borehole options', 'Domestic RO systems', 'Accessory catalog'],
  },
  {
    slug: 'commercial-industrial-water-treatment',
    title: 'Commercial & Industrial Water Treatment',
    category: 'Treatment Plants',
    summary:
      'Purification plants, softeners, filtration systems, and core accessories for process, commercial, institutional, and industrial water treatment.',
    image: '/images/assets/img/norwa/metal-wine-storage-tanks-winery.webp',
    highlights: ['RO and demin', 'UF and UV systems', 'Plant accessories'],
  },
  {
    slug: 'chemicals-media',
    title: 'Chemicals & Media',
    category: 'Treatment Inputs',
    summary:
      'Technical catalog of disinfectants, treatment chemicals, media, vessels, storage tanks, and chemical dosing solutions.',
    image: '/images/water-treatment-chemicals-media.jpg',
    highlights: ['Treatment chemicals', 'Filter media', 'Dosing systems'],
  },
  {
    slug: 'water-pumps',
    title: 'Water Pumps',
    category: 'Pump Systems',
    summary:
      'Booster, circulator, multi-stage, and submersible pumps with pressure accessories and RO control panels for dependable water movement.',
    image: '/images/pumps/Horizontal-booster-sets.jpg',
    highlights: ['Booster systems', 'Submersible pumps', 'Pressure accessories'],
  },
  {
    slug: 'solar-solutions',
    title: 'Solar Solutions',
    category: 'Energy Systems',
    summary:
      'Solar pumping, panels, and structures that reduce operating cost and improve resilient water access in remote and utility-sensitive sites.',
    image: '/images/assets/img/projects/Norwa Africa Solar.jpg',
    highlights: ['Solar pumping', 'PV modules', 'Mounting structures'],
  },
]

export const solutionsBySlug = {
  'borehole-solutions': {
    slug: 'borehole-solutions',
    eyebrow: 'Solution Family',
    title: 'Borehole Solutions',
    description:
      'From borehole equipping and pump installation to solarization and rehabilitation, Vortexus builds systems that keep water flowing reliably in demanding field conditions.',
    heroImage: '/images/assets/img/borehole/boreholeequipping.webp',
    quickStats: [
      { value: '60+', label: 'Solar water projects delivered' },
      { value: '50+', label: 'Boreholes equipped and upgraded' },
      { value: '10+', label: 'Communities impacted through borehole work' },
      { value: '25,000+', label: 'Households reached by project outcomes' },
    ],
    nav: [
      { id: 'overview', label: 'Overview' },
      { id: 'solarization', label: 'Solarization' },
      { id: 'equipping', label: 'Equipping' },
      { id: 'rehabilitation', label: 'Rehabilitation' },
      { id: 'pumps', label: 'Borehole Pumps' },
      { id: 'gallery', label: 'Project Gallery' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Keeping boreholes functional, efficient, and field-ready.',
        lead:
          'We support both new and existing boreholes with pumping systems, solar integration, control equipment, rehabilitation work, and site-specific technical support.',
        layout: 'split',
        image: '/images/assets/img/borehole/borehole.webp',
        imageAlt: 'Borehole site and pumping installation',
        items: [
          'Borehole solarization for community, irrigation, and livestock supply.',
          'Professional equipping with drop pipes, junction boxes, covers, adaptors, controllers, and accessories.',
          'Pump lifting, lowering, maintenance, flushing, and diagnostics for rehabilitation programs.',
        ],
      },
      {
        id: 'solarization',
        title: 'Borehole Solarization',
        lead:
          'Solar-powered boreholes reduce power dependency and lower operating cost while maintaining reliable water access.',
        layout: 'split',
        image: '/images/assets/img/borehole/solartower.webp',
        imageAlt: 'Solarized borehole tower structure',
        cards: [
          { title: 'Easy installation', text: 'Structures and pumping systems configured for practical field deployment.' },
          { title: 'No power bills', text: 'Solar pumping helps reduce operating cost in off-grid and utility-sensitive locations.' },
          { title: 'Low maintenance', text: 'System layouts are selected for long service intervals and straightforward upkeep.' },
          { title: 'No operator required', text: 'Automated control reduces manual intervention for daily water delivery.' },
        ],
      },
      {
        id: 'equipping',
        title: 'Borehole Equipping',
        lead:
          'We supply the essential set-up components that make a borehole safe, serviceable, and operationally complete.',
        layout: 'gallery',
        metrics: [
          { value: '200+', label: 'Smart meters installed' },
          { value: '50+', label: 'Boreholes equipped' },
          { value: '300+', label: 'Borehole products supplied' },
        ],
        gallery: [
          { src: '/images/assets/img/borehole/boreholeequipping.webp', title: 'Complete equipping' },
          { src: '/images/assets/img/borehole/boreholecover.webp', title: 'Borehole covers' },
          { src: '/images/assets/img/borehole/smartmeter.webp', title: 'Smart metering' },
          { src: '/images/assets/img/borehole/pumpcontroller.webp', title: 'Pump controllers' },
        ],
        body:
          'Our borehole equipping scope covers UPVC drop pipes, covers, junction boxes, adaptor sets, electrodes, control panels, pump controllers, and the accessories needed to commission a dependable installation.',
      },
      {
        id: 'rehabilitation',
        title: 'Borehole Rehabilitation',
        lead:
          'Rehabilitation work restores yield, improves reliability, and helps extend the life of existing pumping infrastructure.',
        layout: 'split',
        image: '/images/assets/img/borehole/pumplowering.webp',
        imageAlt: 'Borehole pump lowering and rehabilitation work',
        items: [
          'Borehole pump installation and replacement.',
          'Submersible pump lifting and lowering with safe handling procedures.',
          'Routine maintenance, flushing, and performance restoration.',
          'Camera inspection and diagnostics for targeted intervention.',
        ],
        gallery: [
          { src: '/images/assets/img/borehole/somaliasubmersiblepump.webp', title: 'Submersible pump work' },
          { src: '/images/assets/img/borehole/norwacommnity.webp', title: 'Community systems' },
          { src: '/images/assets/img/borehole/boreholepumplowering.webp', title: 'Pump lifting and lowering' },
        ],
      },
      {
        id: 'pumps',
        title: 'Borehole Pump Range',
        lead:
          'We support borehole pumping with field-proven pump technologies and control accessories selected around head, flow, and reliability targets.',
        layout: 'products',
        products: [
          {
            title: 'DNA Pumps',
            text: 'Versatile pumps suited for shallow wells, tanks, and reservoir transfer where maintenance access matters.',
            image: '/images/assets/img/norwa/dna.webp',
          },
          {
            title: 'Submersible Pumps',
            text: 'Deep-well pumping for boreholes and other submerged installations with stable flow at significant depth.',
            image: '/images/assets/img/pumps/Submersible-Dewatering-Pumps.webp',
          },
          {
            title: 'Solar Borehole Pumps',
            text: 'Purpose-fit pumping options for rural supply, livestock, irrigation, and distributed water systems.',
            image: '/images/assets/img/pumps/Lowara-GHV30-vertical-booster.webp',
          },
          {
            title: 'Pump Controllers',
            text: 'Pressure-based start-stop and protection control for dependable borehole system operation.',
            image: '/images/assets/img/pumps/pumpcontrollers.webp',
          },
        ],
      },
      {
        id: 'gallery',
        title: 'Selected Borehole Project References',
        layout: 'gallery',
        gallery: [
          { src: '/images/assets/img/borehole/westlandborehole.webp', title: 'Apartment borehole installation' },
          { src: '/images/assets/img/borehole/boreholeequipping.webp', title: 'Estate equipping project' },
          { src: '/images/assets/img/projects/nakurusolarization.webp', title: 'Water kiosk solarization' },
          { src: '/images/assets/img/projects/recirculationpump.webp', title: 'Recirculation pump installation' },
        ],
      },
    ],
    cta: {
      title: 'Need help selecting the right borehole setup?',
      text: 'Talk to our engineering team about solarization, pump sizing, rehabilitation planning, or full equipping scopes.',
      primaryLabel: 'Talk to an Engineer',
      primaryTo: '/contact-us',
    },
  },
  'domestic-water-treatment': {
    slug: 'domestic-water-treatment',
    eyebrow: 'Solution Family',
    title: 'Domestic Water Treatment',
    description:
      'Home water systems for municipal and borehole supply, designed to improve safety, taste, clarity, and long-term household reliability.',
    heroImage: '/images/assets/img/domestic/under-sink-ro.jpg',
    quickStats: [
      { value: '5', label: 'Tap-water system variants' },
      { value: '2', label: 'Domestic RO borehole options' },
      { value: '5', label: 'Filter categories covered' },
      { value: '15+', label: 'RO fittings and accessories listed' },
    ],
    nav: [
      { id: 'overview', label: 'Overview' },
      { id: 'tap-water', label: 'Tap Water' },
      { id: 'borehole-water', label: 'Borehole Water' },
      { id: 'accessories', label: 'Accessories' },
      { id: 'fittings', label: 'RO Fittings' },
    ],
    sections: [
      {
        id: 'overview',
        title: "Your family's water quality starts with the right treatment strategy.",
        lead:
          'Whether the source is municipal or private borehole supply, we configure purification systems around the actual contaminants, the required output, and the day-to-day convenience expected in a home environment.',
        layout: 'split',
        image: '/images/assets/img/domestic/5-Stage-Commercial-Steel-Shelf-Direct-Drinking-Reverse-Osmosis-Water-Purifier.jpg',
        imageAlt: 'Domestic reverse osmosis purification system',
        items: [
          'Tap-water filtration for sediment, chlorine, taste, and odor control.',
          'Domestic RO for borehole and well water with staged purification.',
          'Replacement filters, UV parts, fittings, storage tanks, and service accessories.',
        ],
      },
      {
        id: 'tap-water',
        title: 'Municipal and Tap Water Purification',
        lead:
          'From compact under-sink units to whole-house systems, these configurations improve everyday water quality without overcomplicating maintenance.',
        layout: 'products',
        products: [
          {
            title: 'Single Stage Filtration',
            text: 'Compact filtration using sediment or carbon options for first-level improvement of tap water quality.',
            image: '/images/assets/img/domestic/Single-Stage-Small-Size-10-Inch-Standard-Water-Filter.png',
          },
          {
            title: 'Double Stage Filtration',
            text: 'A staged combination of sediment and carbon filtration for stronger removal of particles, chlorine, and odor.',
            image: '/images/assets/img/domestic/Double-Stage-Small-Size-10-Inch-Standard-Water-Filter.png',
          },
          {
            title: 'Triple Stage Filtration',
            text: 'Three-stage purification for more complete treatment of suspended matter, chlorine, and taste issues.',
            image: '/images/assets/img/domestic/3-Stage-Home-Pure-Water-Filter-with-Blue-Clear-Housing.jpg',
          },
          {
            title: 'Triple Stage with UV',
            text: 'Adds UV sterilization to a staged filtration layout for microbiological safety without chemical dosing.',
            image: '/images/assets/img/domestic/4-Stage-Ultraviolet-Sterilizer-Plus-Traditional-Water-Purifier.png',
          },
          {
            title: 'Whole-House RO Purification',
            text: 'A higher-purity domestic system using RO membrane treatment with optional polishing and UV stages.',
            image: '/images/assets/img/domestic/under-sink-ro.jpg',
          },
        ],
      },
      {
        id: 'borehole-water',
        title: 'Borehole and Well Water Purification',
        lead:
          'For groundwater sources, we move beyond simple cartridge filtration and use reverse osmosis-based configurations that can handle dissolved contaminants as well as physical impurities.',
        layout: 'products',
        products: [
          {
            title: 'Under-Sink RO Unit (100 GPD)',
            text: 'A compact domestic RO system with sediment, carbon, membrane, storage, polishing, and optional UV stages.',
            image: '/images/assets/img/domestic/under-sink-ro.jpg',
          },
          {
            title: 'Whole-House RO Purifier (400 GPD)',
            text: 'A larger domestic solution for full-home borehole water purification with higher output and integrated monitoring.',
            image: '/images/assets/img/domestic/5-Stage-Commercial-Steel-Shelf-Direct-Drinking-Reverse-Osmosis-Water-Purifier.jpg',
          },
        ],
      },
      {
        id: 'accessories',
        title: 'Domestic Filters and Accessories',
        lead:
          'We support domestic systems with replacement filters across sediment, bacteria, carbon, hardness, and iron-removal applications.',
        layout: 'tables',
        tables: [
          {
            title: 'Sediment Filters',
            columns: ['Type', 'Size', 'Max Flow Rate (LPH)', 'Micron Rating'],
            rows: [
              ['Wound/Spun Polypropylene', '10"', '500 - 1,000', '0.5, 1, 5, 10+'],
              ['Wound/Spun Polypropylene', '20"', '1,000', '1, 5, 10+'],
              ['Wound/Spun Polypropylene', '30"', '3,000', '0.5, 1, 5+'],
              ['Wound/Spun Jumbo', '20"', '3,000 - 6,000', '0.5, 1, 5, 10+'],
            ],
          },
          {
            title: 'Bacteria and Sediment',
            columns: ['Type', 'Size', 'Max Flow Rate (LPH)', 'Micron Rating'],
            rows: [
              ['Pleated Polypropylene', '10"', '500', '0.22, 0.45+'],
              ['Pleated Polypropylene', '20"', '1,000', '0.22, 0.45+'],
              ['Ceramic', '10"', '500', '0.9'],
            ],
          },
          {
            title: 'Chemical and Odor Carbon Filters',
            columns: ['Type', 'Size', 'Max Flow Rate (LPH)', 'Micron Rating'],
            rows: [
              ['GAC (Slim)', '10" / 20"', '500 / 1000', '5'],
              ['GAC (Jumbo)', '10" / 20"', '1500 / 3000', '5'],
              ['CTO (Slim)', '10" / 20"', '500 / 1000', '5'],
              ['CTO (Jumbo)', '10" / 20"', '1500 / 3000', '5'],
            ],
          },
        ],
      },
      {
        id: 'fittings',
        title: 'Domestic RO Fittings and UV Components',
        lead:
          'A complete range of fittings, UV parts, tubing, taps, and storage accessories to support installation, servicing, and replacement work.',
        layout: 'products',
        products: [
          { title: 'UV Adaptor', text: 'Power and interface accessory for UV purifier assemblies.', image: '/images/uv/adaptor-uv.jpg' },
          { title: 'UV Sleeve', text: 'Quartz sleeve component for protecting and supporting UV lamps.', image: '/images/uv/sleeve-uv.jpg' },
          { title: 'UV Chamber', text: 'UV treatment chamber for domestic sterilization systems.', image: '/images/uv/UV-chamber.jpg' },
          { title: 'UV Lamp', text: 'Replacement UV lamp for domestic purification systems.', image: '/images/uv/Ultraviolet-Sterilizer-UV-for-Killing-Bacteria-lamps.jpg' },
          { title: 'Storage Tank', text: 'Domestic RO storage tank for purified-water reserve.', image: '/images/Domestic/3-Gallon-Plastic-Tank-for-Water-Purification.jpg' },
          { title: 'Filter Housing Wrench', text: 'Tooling for service and replacement of domestic housings.', image: '/images/Domestic/Wrench.jpg' },
          { title: 'Brackets and Clamps', text: 'Mounting and securing accessories for neat system installation.', image: '/images/Domestic/brackets_mounting_home_ro_filters.jpg' },
          { title: 'Faucet and Fittings', text: 'Tubing, taps, connectors, valves, and adaptors for domestic RO layouts.', image: '/images/Domestic/faucet-tap.jpg' },
        ],
      },
    ],
    cta: {
      title: 'Ready to improve water quality at home?',
      text: 'Speak to our team about household filtration, domestic RO, accessory replacement, or a full borehole-water treatment recommendation.',
      primaryLabel: 'Get in Touch',
      primaryTo: '/contact-us',
    },
  },
  'commercial-industrial-water-treatment': {
    slug: 'commercial-industrial-water-treatment',
    eyebrow: 'Solution Family',
    title: 'Commercial & Industrial Water Treatment',
    description:
      'Purification plants, process filtration, softening, and system accessories for commercial buildings, institutions, manufacturing lines, and utility-scale water treatment scopes.',
    heroImage: '/images/assets/img/norwa/metal-wine-storage-tanks-winery.webp',
    quickStats: [
      { value: '3', label: 'Core purification stages highlighted' },
      { value: '5', label: 'Hardness classes referenced' },
      { value: '4', label: 'Accessory groups covered' },
      { value: '24/7', label: 'Operational reliability focus' },
    ],
    nav: [
      { id: 'overview', label: 'Overview' },
      { id: 'plants', label: 'Plants & Systems' },
      { id: 'softeners', label: 'Water Softeners' },
      { id: 'filtration', label: 'Filtration Units' },
      { id: 'accessories', label: 'Accessories' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Treatment systems built around process stability and water quality compliance.',
        lead:
          'This solution family covers purification plants, reverse osmosis, demineralization, softening, UV and UF systems, plus the supporting components required to keep installations dependable in active commercial and industrial environments.',
        layout: 'split',
        image: '/images/water-treament.webp',
        imageAlt: 'Industrial water treatment plant',
        items: [
          'Purification plants for potable, process, and inline treatment needs.',
          'Water softening systems for hardness control and equipment protection.',
          'Filtration and accessory packages for RO, UF, and UV treatment trains.',
        ],
      },
      {
        id: 'plants',
        title: 'Water Purification Plants and Systems',
        lead:
          'Our treatment trains are configured around the raw water characteristics, the required output standard, and the specific application, whether that is bottled water, process supply, or distributed utility water.',
        layout: 'split',
        image: '/images/water-treament.webp',
        imageAlt: 'Water purification plant system',
        items: [
          'Reverse Osmosis for dissolved salts, nitrates, pesticides, metals, and advanced purification requirements.',
          'Ion Exchange and Demineralization for softening, process demineralization, and ultrapure water streams.',
          'General purpose purification for surface water, suspended solids, and bacteriological risk reduction.',
        ],
      },
      {
        id: 'softeners',
        title: 'Water Softeners',
        lead:
          'Softening systems remove calcium and magnesium to prevent scale formation and protect boilers, process equipment, and distribution systems.',
        layout: 'tables',
        body:
          'A standard softener architecture includes the mineral tank, automatic control valve, and brine tank. Meter-based regeneration helps maintain performance while reducing waste.',
        tables: [
          {
            title: 'Water Hardness Classification',
            columns: ['Classification', 'mg/L or ppm', 'Grains per gallon (gpg)'],
            rows: [
              ['Soft', '0 - 17', '0 - 1.0'],
              ['Slightly hard', '17 - 60', '1.0 - 3.5'],
              ['Moderately hard', '60 - 120', '3.5 - 7.0'],
              ['Hard', '120 - 180', '7.0 - 10.5'],
              ['Very hard', '180 & over', '10.5 & over'],
            ],
          },
        ],
      },
      {
        id: 'filtration',
        title: 'Ultrafiltration and UV Systems',
        lead:
          'These technologies support desalination pretreatment, wastewater reclamation, and potable water production without forcing a single-treatment approach onto every application.',
        layout: 'products',
        products: [
          {
            title: 'Ultrafiltration (UF)',
            text: 'Pressure-driven membrane separation for particulate removal and pretreatment before advanced purification stages.',
            image: '/images/153f668aa256436fe2f3b2d9a3073561 (1).jpg',
          },
          {
            title: 'UV Purification',
            text: 'Microbiological disinfection using germicidal UV without adding taste, odor, or residual chemicals.',
            image: '/images/uv/uv-systems-plant.jpeg',
          },
        ],
      },
      {
        id: 'accessories',
        title: 'System Accessories and Components',
        lead:
          'We complete plant builds and service scopes with membranes, vessels, filter housings, chemical tanks, and treatment chemicals.',
        layout: 'products',
        products: [
          { title: 'RO Membranes', text: '4-inch and 8-inch membrane options for low-pressure, ultra-low-pressure, brackish, and seawater duty.', image: '/images/Low-Pressure-Industrial-RO-Membrane-4040.jpg' },
          { title: 'Membrane Vessels', text: 'Pressure vessels for membrane housing across common RO plant configurations.', image: '/images/vessels.JPG' },
          { title: 'Filter Housings', text: 'Slim and jumbo housing options for cartridge filtration stages.', image: '/images/jumbo.JPG' },
          { title: 'Chemical Tanks', text: 'Storage tanks for dosing chemicals and plant utility arrangements.', image: '/images/chemical tank.JPG' },
          { title: 'RO Chemicals', text: 'Antiscalants and cleaning chemicals that support membrane performance and cleaning cycles.', image: '/images/antisclants.JPG' },
        ],
      },
    ],
    cta: {
      title: 'Need a commercial or industrial treatment configuration?',
      text: 'Talk to us about plant sizing, process treatment stages, softening, pre-treatment, or accessory selection for your system.',
      primaryLabel: 'Request a Consultation',
      primaryTo: '/contact-us',
    },
  },
  'chemicals-media': {
    slug: 'chemicals-media',
    eyebrow: 'Solution Family',
    title: 'Chemicals & Media',
    description:
      'A structured treatment catalog covering chemicals, media, vessels, tanks, and dosing equipment used across water treatment, RO pretreatment, and chemical injection systems.',
    heroImage: '/images/water-treatment-chemicals-media.jpg',
    quickStats: [
      { value: '6', label: 'Chemical categories' },
      { value: '4', label: 'Filtration media groups' },
      { value: '3', label: 'Accessory families' },
      { value: '2', label: 'Chemical dosing groups' },
    ],
    nav: [
      { id: 'chemicals', label: 'Chemicals' },
      { id: 'media', label: 'Filtration Media' },
      { id: 'accessories', label: 'Accessories' },
      { id: 'dosing', label: 'Chemical Dosers' },
    ],
    sections: [
      {
        id: 'chemicals',
        title: 'Treatment Chemicals',
        lead:
          'Specialty chemicals for disinfection, pH control, membrane cleaning, coagulation, and antiscalant dosing across potable, process, and RO applications.',
        layout: 'groups',
        groups: [
          {
            title: 'Disinfectants',
            body:
              'Includes Chlorine 65, sodium hypochlorite variants, and sodium metabisulphite for disinfection, dechlorination, and membrane preservation.',
            images: [
              '/images/assets/img/chemicals/chlorine _65.webp',
              '/images/assets/img/chemicals/chlorine90.webp',
              '/images/assets/chemicals/Milliard 5lbs Baking Soda _ Sodium Bicarbonate USP - 5 Pound Bulk Resealable Bag.jpg',
            ],
          },
          {
            title: 'Softening and pH Control',
            body:
              'pH Minus, pH Plus, industrial salt, and caustic soda for hardness management, alkalinity adjustment, and resin regeneration.',
            images: [
              '/images/assets/img/chemicals/phplus.webp',
              '/images/assets/img/chemicals/salt.webp',
              '/images/assets/chemicals/20220622094300_IMG_2976.webp',
            ],
          },
          {
            title: 'Descaling and Membrane Cleaning',
            body:
              'Citric acid, Descolont, Kleen MCT formulations, and related cleaning chemistries for inorganic scale, organics, and fouling removal.',
            images: [
              '/images/assets/chemicals/20220622094225_IMG_2974.webp',
              '/images/assets/chemicals/20220622094300_IMG_2976.webp',
            ],
          },
          {
            title: 'Coagulation and Flocculation',
            body:
              'Alum, PAC, and Genefloc-type products for turbidity reduction, floc formation, and improved pre-filtration performance.',
          },
          {
            title: 'Antiscalants',
            body:
              'Low-silica and high-silica antiscalants for RO and NF systems, including hyperdisperse-type options for mixed scaling conditions.',
            images: [
              '/images/assets/img/chemicals/20220622094335_IMG_2977.JPG',
              '/images/assets/img/chemicals/antiscalant_low.webp',
            ],
          },
          {
            title: 'Genesys and Genesol Range',
            body:
              'Specialized low-pH and high-pH cleaners, biocidal cleaners, and antiscalants for targeted membrane cleaning and protection strategies.',
          },
        ],
      },
      {
        id: 'media',
        title: 'Filtration Media',
        lead:
          'Media selection is matched to iron removal, softening, organic reduction, or sediment polishing requirements.',
        layout: 'groups',
        groups: [
          {
            title: 'Iron and Manganese Removal',
            body:
              'DMI-65, Katalox Light, Greensand, and Birm media for catalytic oxidation and removal of dissolved iron and manganese.',
            images: ['/images/assets/chemicals/Pre-treament-media-for-water.webp'],
          },
          {
            title: 'Water Softening Media',
            body:
              'Cation and anion exchange resins for hardness reduction and ion-selective treatment trains.',
            images: [
              '/images/assets/chemicals/20211026113554_IMG_0506 (1).webp',
              '/images/assets/chemicals/Resin Cation Softener - 1 sak 25 Liter.webp',
            ],
          },
          {
            title: 'Organic and Chloride Removal',
            body:
              'Catalytic granular activated carbon for organics, chlorine residuals, taste and odor, and hydrocarbon-sensitive streams.',
            images: [
              '/images/assets/img/norwa/20211026122345_IMG_0556.webp',
              '/images/assets/img/norwa/WhatsApp Image 2021-10-27 at 1.54.33 PM.webp',
            ],
          },
          {
            title: 'Sediment Removal',
            body:
              'Silica sand and glass media for turbidity reduction, suspended solids removal, and multimedia filtration.',
            images: [
              '/images/assets/img/norwa/sand media D.webp',
              '/images/assets/img/norwa/WhatsApp Image 2021-10-27 at 1.54.33 PM.webp',
            ],
          },
        ],
      },
      {
        id: 'accessories',
        title: 'Accessories',
        lead:
          'Structural vessels and storage tanks complete treatment skids and support safe chemical handling and media containment.',
        layout: 'products',
        products: [
          { title: 'FRP Tanks', text: 'Pressure vessels for softeners, multimedia filters, carbon filters, and specialty media installations.', image: '/images/frp/frp-tank.png' },
          { title: 'Chemical Tanks', text: 'Storage tanks for chlorine, antiscalants, coagulants, and membrane cleaning chemicals.', image: '/images/brine-tank/Chemical-tank.webp' },
          { title: 'Brine Tanks', text: 'Salt and brine solution tanks for automatic regeneration of softener systems.', image: '/images/brine-tank/pe-brine-tank.png' },
        ],
      },
      {
        id: 'dosing',
        title: 'Chemical Dosers',
        lead:
          'Accurate, stable chemical injection equipment for disinfection, pretreatment, cleaning, and process control.',
        layout: 'products',
        products: [
          { title: 'Dosing Pumps', text: 'Solenoid and motor-driven pumps for stable metering with simple control interfaces and efficient operation.', image: '/images/DOSINGPUMP.webp' },
          { title: 'Dosing Skids', text: 'Grouped dosing arrangements for multi-chemical plant applications.', image: '/images/Dosing-pump.png' },
          { title: 'Programming and Control', text: 'Pump interfaces and display systems for process-specific chemical dosing management.', image: '/images/assets/chemicals/20211026173815_IMG_0687.JPG' },
          { title: 'Klorman Inline Disinfection', text: 'Point-of-use inline chlorination using compacted calcium hypochlorite cartridges.', image: '/images/Chemicals/Klormann.jpg' },
        ],
      },
    ],
    cta: {
      title: 'Need help selecting chemicals, media, or dosing equipment?',
      text: 'Share your feed water profile, plant type, or dosing challenge and we will help you specify the right treatment inputs.',
      primaryLabel: 'Talk to an Engineer',
      primaryTo: '/contact-us',
    },
  },
  'water-pumps': {
    slug: 'water-pumps',
    eyebrow: 'Solution Family',
    title: 'Water Pumps',
    description:
      'Reliable pump systems and control accessories for pressure boosting, circulation, borehole supply, and RO process applications.',
    heroImage: '/images/pumps/Ionenaustauschanlage.jpg',
    quickStats: [
      { value: '4', label: 'Core pump categories' },
      { value: '5', label: 'Accessory groups' },
      { value: '330 m', label: 'Heads referenced for multi-stage duty' },
      { value: '24/7', label: 'Continuous-duty design intent' },
    ],
    nav: [
      { id: 'pump-categories', label: 'Pump Categories' },
      { id: 'pressure-accessories', label: 'Pressure Accessories' },
      { id: 'ro-controls', label: 'RO Control Panels' },
    ],
    sections: [
      {
        id: 'pump-categories',
        title: 'Pump Categories',
        lead:
          'The range covers domestic, commercial, industrial, and borehole pumping applications, with product selection driven by head, flow, duty cycle, and installation environment.',
        layout: 'products',
        products: [
          { title: 'Booster Pumps', text: 'Self-priming centrifugal boosters for water treatment systems, HVAC, supply systems, and industrial boosting.', image: '/images/assets/img/products/domestic-booster-pump.jpg' },
          { title: 'Circulator Pumps', text: 'Circulation pumps for heating loops and domestic hot-water systems with variable-flow suitability.', image: '/images/pumps/SpaNet 750W Circulation Pump.jpeg' },
          { title: 'Multi-Stage Pumps', text: 'Vertical and horizontal multistage pumps for boosting, irrigation, transfer, and process water movement.', image: '/images/pumps/Horizontal-booster-sets.jpg' },
          { title: 'Submersible Pumps', text: 'Borehole and submerged-duty pumps for dependable deep-water supply and flexible installation orientation.', image: '/images/pumps/submersiblepump.webp' },
        ],
      },
      {
        id: 'pressure-accessories',
        title: 'Pressure and Pumping Accessories',
        lead:
          'Pressure management and protection accessories help stabilize systems, protect pumps, and simplify automatic operation.',
        layout: 'products',
        products: [
          { title: 'Pressure Tanks', text: 'Membrane tanks for surge absorption, pressure stabilization, and reduced pump cycling.', image: '/images/pumps/VAREM-800x600-1.jpg' },
          { title: 'Pressure Controllers', text: 'Automatic pressure-based operation with dry-run protection and low-flow stop logic.', image: '/images/pumps/Brio-Pump-Controller.jpg' },
          { title: 'Pressure Switches', text: 'Shock-resistant, adjustable pressure switches for reliable control of water systems.', image: '/images/pumps/Danfoss-KP36-Pressure-Switch.png' },
          { title: 'Pressure Gauges', text: 'Pressure indication across common operating ranges for gas and liquid media.', image: '/images/pumps/pressure-gauge-20bar.jpg' },
        ],
      },
      {
        id: 'ro-controls',
        title: 'RO Control Panels',
        lead:
          'Panels and controllers support automated flushing, status indication, high and low pressure protection, and level-based logic for RO operations.',
        layout: 'products',
        products: [
          { title: '250 - 500 LPH Panels', text: 'Compact RO panel solutions for smaller process and utility systems.', image: '/images/pumps/control-panel-500.webp' },
          { title: '1000 - 2000 LPH Panels', text: 'Expanded control architecture for higher-throughput RO plants.', image: '/images/pumps/control-panel.png' },
          { title: 'ROC 2315 Controller', text: 'Dedicated RO controller for process visibility and plant logic execution.', image: '/images/pumps/ROC-2315.webp' },
        ],
      },
    ],
    cta: {
      title: 'Need help selecting pumps or pressure accessories?',
      text: 'Share your head, flow, application, and installation context, and we will guide you toward the right pumping package.',
      primaryLabel: 'Request Pump Guidance',
      primaryTo: '/contact-us',
    },
  },
  'solar-solutions': {
    slug: 'solar-solutions',
    eyebrow: 'Solution Family',
    title: 'Solar Solutions',
    description:
      'Solar pumping and supporting power components designed to expand water access, reduce energy cost, and support remote or utility-sensitive operations.',
    heroImage: '/images/assets/img/projects/Norwa Africa Solar.jpg',
    quickStats: [
      { value: '3', label: 'Primary solar product groups' },
      { value: 'AC/DC', label: 'Pump drive options' },
      { value: 'Low', label: 'Maintenance profile' },
      { value: 'Custom', label: 'Mounting design options' },
    ],
    nav: [
      { id: 'overview', label: 'Overview' },
      { id: 'products', label: 'Product Groups' },
      { id: 'applications', label: 'Applications' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Solar systems built around dependable water delivery.',
        lead:
          'Solar pumping is one of the strongest ways to reduce operating cost and increase resilience in remote, agricultural, and distributed water infrastructure projects.',
        layout: 'split',
        image: '/images/assets/img/norwa/solar_waterpump.jpg',
        imageAlt: 'Solar powered water pumping system',
        items: [
          'Solar pumping for irrigation, livestock, and community water supply.',
          'Panel and mounting systems for rooftop, ground, and elevated layouts.',
          'Lower power dependency for sites exposed to unstable utility supply.',
        ],
      },
      {
        id: 'products',
        title: 'Solar Product Groups',
        lead:
          'We combine solar pumping equipment with PV modules and structures that match site terrain, energy demand, and deployment approach.',
        layout: 'products',
        products: [
          { title: 'Solar Water Pumping Systems', text: 'High-efficiency solar pumping for irrigation, livestock, and community supply, with AC and DC options.', image: '/images/assets/img/norwa/solar_waterpump.jpg' },
          { title: 'Solar Panels', text: 'Durable photovoltaic panels for residential, commercial, and agricultural duty.', image: '/images/assets/img/norwa/solar_panel.jpg' },
          { title: 'Solar Structures', text: 'Corrosion-resistant mounting systems for rooftop, ground, and elevated deployments.', image: '/images/assets/img/norwa/solar_structures.jpg' },
        ],
      },
      {
        id: 'applications',
        title: 'Where Solar Delivers the Most Value',
        lead:
          'Solar solutions are particularly effective where pumping is essential but grid power is expensive, unstable, or unavailable.',
        layout: 'cards',
        cards: [
          { title: 'Irrigation', text: 'Reliable field water delivery for agriculture without relying on fuel-heavy pumping.' },
          { title: 'Livestock Watering', text: 'Distributed pumping in ranching and pastoral contexts where remote reliability matters.' },
          { title: 'Community Supply', text: 'Shared water schemes with lower operating cost and better resilience.' },
          { title: 'Institutional Sites', text: 'Schools, health facilities, and campuses seeking cleaner energy for pumping needs.' },
        ],
      },
    ],
    cta: {
      title: 'Planning a solar pumping or water-energy project?',
      text: 'Talk to our team about solar pumping layouts, panel sizing, structures, and deployment strategy for your site.',
      primaryLabel: 'Enquire Now',
      primaryTo: '/contact-us',
    },
  },
}

export function getSolutionBySlug(slug) {
  return solutionsBySlug[slug] || null
}

export function resolveSolutionImage(path) {
  return path || fallbackImage
}
