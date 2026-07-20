const categoryGuideContent = {
  'filtration-systems': {
    intro:
      'Choose filtration equipment by starting with the contaminant load, particle size, flow rate, and the equipment that must be protected downstream. Sediment filters, housings, carbon cartridges, sand media, and membrane pretreatment products each solve a different stage of the water treatment process.',
    checkpoints: [
      'Confirm the water source and the main problem: sand, silt, rust, odor, chlorine, color, turbidity, or membrane fouling.',
      'Match cartridge diameter and height to the housing size before purchasing replacement filters.',
      'Check flow rate, pressure rating, service life, and potable-water compatibility for the installation.',
      'Use sediment filtration before carbon, UV, RO membranes, pumps, and valves to reduce wear and clogging.',
    ],
    applications: [
      'Domestic and commercial pre-filtration',
      'RO plant pretreatment',
      'Borehole and municipal water polishing',
      'Food, beverage, irrigation, and light industrial water systems',
    ],
    faqs: [
      {
        question: 'What is the difference between slim and jumbo filter housings?',
        answer:
          'Slim housings usually take 2.5 inch diameter cartridges and suit lower-flow domestic or point-of-use systems. Jumbo housings usually take 4.5 inch cartridges and are better for higher-flow whole-house or commercial pre-filtration.',
      },
      {
        question: 'When should I use a 5 micron sediment filter?',
        answer:
          'A 5 micron sediment filter is suitable when you need finer removal of sand, rust, silt, and suspended particles before carbon filters, UV sterilizers, RO membranes, or pumps.',
      },
    ],
  },
  'reverse-osmosis-systems': {
    intro:
      'Reverse osmosis systems are selected around water analysis, recovery target, membrane type, pretreatment, pressure, and the final water quality required. The right RO setup protects membranes from scaling, fouling, chlorine damage, and poor operating pressure.',
    checkpoints: [
      'Start with a water analysis report showing TDS, hardness, iron, chlorine, turbidity, pH, and microbiological risk.',
      'Match membrane size, pressure vessel, pump, and flow target to the required daily production.',
      'Plan pretreatment, antiscalant dosing, sediment filtration, and carbon filtration before the RO stage.',
      'Confirm whether the application requires brackish water RO, seawater RO, domestic RO, or industrial high-purity treatment.',
    ],
    applications: [
      'Drinking water production',
      'Industrial process water',
      'Boiler and cooling make-up water',
      'Desalination and high-TDS reduction',
    ],
    faqs: [
      {
        question: 'Do I need water testing before choosing an RO system?',
        answer:
          'Yes. RO sizing and membrane selection should be based on water analysis because TDS, hardness, iron, chlorine, and turbidity affect performance and membrane life.',
      },
      {
        question: 'What protects RO membranes from damage?',
        answer:
          'Good pretreatment protects RO membranes. This can include sediment filtration, activated carbon, softening or antiscalant dosing, pressure control, and correct cleaning procedures.',
      },
    ],
  },
  'water-treatment-chemicals': {
    intro:
      'Industrial water treatment chemicals should be selected by water chemistry, treatment objective, system material compatibility, dosing method, and safety handling requirements. The right chemical program improves treatment stability and protects equipment from scale, corrosion, biological growth, and poor pH control.',
    checkpoints: [
      'Identify the target issue: pH correction, disinfection, coagulation, scale control, corrosion control, membrane cleaning, or resin regeneration.',
      'Confirm chemical concentration, dosing rate, contact time, and compatibility with tanks, pumps, valves, and pipework.',
      'Use test results and plant operating data before changing chemical programs.',
      'Keep safety data sheets, storage requirements, and operator handling procedures available on site.',
    ],
    applications: [
      'RO pretreatment and membrane cleaning',
      'Cooling and boiler water support',
      'Wastewater coagulation and flocculation',
      'Pool, domestic, and industrial disinfection',
    ],
    faqs: [
      {
        question: 'Can one chemical solve all water treatment problems?',
        answer:
          'No. Chemicals are selected for specific issues such as scaling, pH correction, disinfection, or coagulation. A water analysis helps determine the right product and dose.',
      },
      {
        question: 'Why is chemical dosing control important?',
        answer:
          'Accurate dosing improves treatment results, reduces waste, protects equipment, and helps avoid under-dosing or over-dosing in the system.',
      },
    ],
  },
  'pumps-fluid-handling': {
    intro:
      'Pump selection depends on flow, head, water quality, suction condition, voltage, duty cycle, and pipework. A pump should be chosen for the actual duty point, not only by horsepower or pipe size.',
    checkpoints: [
      'Confirm flow rate, required pressure or head, suction lift, delivery distance, and elevation change.',
      'Check whether the fluid is clean water, wastewater, chemical solution, sludge, seawater, or abrasive process water.',
      'Match voltage, phase, control method, and protection devices to the site power supply.',
      'Consider accessories such as pressure switches, controllers, non-return valves, strainers, and pressure tanks.',
    ],
    applications: [
      'Water transfer and pressure boosting',
      'Borehole and submersible pumping',
      'Dosing and chemical feed',
      'Industrial process and wastewater handling',
    ],
    faqs: [
      {
        question: 'What information is needed to size a pump?',
        answer:
          'Useful details include flow rate, head or pressure, suction condition, pipe size, power supply, fluid type, and whether the pump will run continuously or intermittently.',
      },
      {
        question: 'Why should pump duty point matter?',
        answer:
          'The duty point shows whether the pump can deliver the required flow at the required pressure. Choosing without the duty point can cause poor pressure, overheating, or short pump life.',
      },
    ],
  },
  'water-meters': {
    intro:
      'Water meters are selected by pipe size, maximum flow, pressure, connection type, reading requirement, and installation environment. Correct sizing helps keep readings accurate across daily consumption patterns.',
    checkpoints: [
      'Match the nominal size to the pipework and expected flow range.',
      'Confirm pressure rating, connection type, and whether the meter is threaded or flanged.',
      'Choose smaller domestic meters for homes and apartments, and larger flanged meters for bulk commercial or community supply.',
      'Install with the correct flow direction and enough straight pipe where required by the meter type.',
    ],
    applications: [
      'Residential and apartment metering',
      'Commercial water billing',
      'Institutional monitoring',
      'Agricultural and community water distribution',
    ],
    faqs: [
      {
        question: 'How do I choose between 15mm, 20mm, 25mm, 40mm, and 50mm meters?',
        answer:
          'Choose by pipe size and expected flow. Smaller threaded meters suit homes and small premises, while larger meters such as 40mm and 50mm suit higher-flow commercial, agricultural, or community supply lines.',
      },
      {
        question: 'What does maximum reading mean on a mechanical water meter?',
        answer:
          'Maximum reading is the highest volume the register can display before it rolls over. It does not replace flow and pressure checks when selecting the meter.',
      },
    ],
  },
  sterilizers: {
    intro:
      'UV sterilizer lamps are replacement parts for ultraviolet disinfection systems. Select the lamp by wattage, pin type, sterilizer model, flow capacity, and replacement interval to keep the UV stage effective.',
    checkpoints: [
      'Confirm wattage, pin format, lamp length, and compatibility with the existing UV chamber.',
      'Match the lamp capacity to the system flow rate so water receives enough UV exposure.',
      'Replace lamps on schedule because visible light does not guarantee effective UV intensity.',
      'Use UV after filtration, because sediment and turbidity can reduce disinfection performance.',
    ],
    applications: [
      'Domestic drinking water polishing',
      'RO system post-treatment',
      'Light commercial water disinfection',
      'Microbiological control after filtration',
    ],
    faqs: [
      {
        question: 'Can a UV lamp work properly without filtration?',
        answer:
          'UV works best after filtration. Suspended solids and cloudy water can shield microorganisms from UV exposure and reduce disinfection performance.',
      },
      {
        question: 'How do I choose the correct UV replacement lamp?',
        answer:
          'Match the existing sterilizer model, wattage, pin type, lamp length, and flow rating. If those details are unclear, share a photo of the old lamp and chamber label before ordering.',
      },
    ],
  },
  'automation-control': {
    intro:
      'Automation and control products should be selected around the process they protect: pump operation, pressure control, RO sequencing, tank level, dosing, alarms, and remote monitoring. Good control improves reliability and reduces operator guesswork.',
    checkpoints: [
      'Define the equipment being controlled: pump, RO plant, dosing system, tank, valve, or full treatment process.',
      'Confirm sensor type, signal, power supply, relay outputs, enclosure rating, and communication requirements.',
      'Plan protection features such as dry-run, overload, low pressure, high pressure, and emergency stop logic.',
      'Keep wiring, control panel space, and maintenance access clear from the start.',
    ],
    applications: [
      'Pump control and protection',
      'RO plant automation',
      'Level and pressure monitoring',
      'Industrial process control panels',
    ],
    faqs: [
      {
        question: 'What makes a control panel reliable?',
        answer:
          'A reliable control panel has correctly rated components, clear wiring, proper protection devices, clean labeling, and logic matched to the operating process.',
      },
      {
        question: 'Can automation reduce water system downtime?',
        answer:
          'Yes. Automation can shut equipment down during unsafe conditions, trigger alarms early, and reduce manual errors in repeated operating sequences.',
      },
    ],
  },
  'storage-tanks': {
    intro:
      'Tank selection depends on stored liquid, capacity, installation space, chemical compatibility, pressure requirement, fittings, and maintenance access. The correct tank supports stable storage, dosing, buffering, and process continuity.',
    checkpoints: [
      'Confirm the stored liquid, concentration, temperature, and whether potable-water approval is required.',
      'Select capacity based on peak demand, refill frequency, process buffer, and available space.',
      'Check fittings, vents, level indicators, mixers, bunding, and access points before installation.',
      'Use pressure vessels and pressure tanks only within their rated pressure and application limits.',
    ],
    applications: [
      'Water storage and balancing',
      'Chemical dosing preparation',
      'Brine and softener systems',
      'Pressure buffering and process tanks',
    ],
    faqs: [
      {
        question: 'How do I size a water storage tank?',
        answer:
          'Sizing depends on daily demand, refill rate, peak usage, reserve requirement, and available installation space.',
      },
      {
        question: 'Can the same tank store any chemical?',
        answer:
          'No. Tank material must be compatible with the chemical concentration and temperature. Chemical storage should also consider fittings, ventilation, bunding, and safety handling.',
      },
    ],
  },
}

export function getCategoryBuyingGuide(category) {
  if (!category) return null

  return (
    categoryGuideContent[category.slug] || {
      intro: `${category.name} should be selected by application, capacity, compatibility, operating conditions, and the maintenance needs of the site. Review the product details and confirm the required duty before requesting a quotation.`,
      checkpoints: [
        `Confirm the exact ${category.name.toLowerCase()} application and operating environment.`,
        'Check dimensions, capacity, pressure, flow, voltage, material compatibility, and available installation space where relevant.',
        'Match the selected product to the water source, industry requirement, and downstream equipment.',
        'Share site conditions and photos when requesting a quote so the team can recommend the correct option.',
      ],
      applications: category.subcategories.slice(0, 4),
      faqs: [
        {
          question: `How do I choose the right ${category.name.toLowerCase()}?`,
          answer:
            'Start with the application, flow or capacity, operating pressure, material compatibility, installation space, and maintenance requirements. These details help narrow the correct product quickly.',
        },
        {
          question: `Can Vortexus help compare ${category.name.toLowerCase()} options?`,
          answer:
            'Yes. Share the required duty, site conditions, preferred brand, and any existing equipment details so the team can compare suitable products for your application.',
        },
      ],
    }
  )
}
