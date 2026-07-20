const BRAND_LABELS = [
  'Atlas',
  'Auxin',
  'CNP',
  'Certikin',
  'DNA',
  'Dupont',
  'Filmtec',
  'Grundfos',
  'Hidrotek',
  'Hydramem',
  'Jacobi',
  'Keensen',
  'LEO',
  'Lowara',
  'Ruxin',
  'SEKO',
  'Taptec',
  'Vontron',
  'Xylem',
]

function normalizeSpaces(value = '') {
  return value.replace(/\s+/g, ' ').trim()
}

function detectBrand(product) {
  const combined = `${product.name} ${product.itemGroup || ''}`

  for (const brand of BRAND_LABELS) {
    const pattern = new RegExp(`\\b${brand}\\b`, 'i')
    if (pattern.test(combined)) {
      return brand
    }
  }

  if ((product.itemGroup || '').startsWith('Wt-')) {
    return ''
  }

  return product.itemGroup || ''
}

function detectRoFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()

  if (
    /membrane|4040|8040|2540|100gpd|bw\/lp|sw30|ulp|nanofiltration|nf\b|desalination ro|tap water ro|ro vontron/.test(
      name,
    )
  ) {
    return 'membrane'
  }

  if (/controller|panel|mp 204|flow sensor/.test(name)) {
    return 'controller'
  }

  if (/skid|ro system|system\b/.test(name)) {
    return 'plant'
  }

  if (/vacuum breaker|disc filter|needle valve/.test(name)) {
    return 'accessory'
  }

  return 'component'
}

function detectWaterDuty(product) {
  const name = normalizeSpaces(product.name).toLowerCase()

  if (/nanofiltration|nf\b/.test(name)) {
    return 'nanofiltration'
  }

  if (/sea water|seawater|sw30|desalination/.test(name)) {
    return 'seawater'
  }

  if (/ultra-low|ulp|low pressure|lp\b/.test(name)) {
    return 'low-pressure'
  }

  if (/100gpd|domestic|tap water/.test(name)) {
    return 'domestic'
  }

  return 'brackish'
}

function buildRoApplications(family, duty) {
  if (family === 'plant') {
    return [
      'Industrial purified-water production',
      'Packaged RO skid review and replacement planning',
      'Quotation support for new treatment installations',
    ]
  }

  if (family === 'controller') {
    return [
      'RO system control and protection',
      'Instrumentation or panel replacement review',
      'Process monitoring and equipment coordination',
    ]
  }

  if (family === 'accessory') {
    return [
      'RO skid line integration',
      'Pretreatment and piping support',
      'Replacement of in-line accessories on treatment systems',
    ]
  }

  if (duty === 'seawater') {
    return [
      'Seawater reverse osmosis duty',
      'High-salinity membrane replacement planning',
      'Desalination skid sourcing and technical review',
    ]
  }

  if (duty === 'low-pressure') {
    return [
      'Low-pressure RO membrane replacement',
      'Energy-conscious RO operation',
      'Commercial and industrial filtration skids',
    ]
  }

  if (duty === 'domestic') {
    return [
      'Tap-water and light commercial purification',
      'Compact RO membrane replacement',
      'Small-system refurbishment and quotation review',
    ]
  }

  if (duty === 'nanofiltration') {
    return [
      'Nanofiltration process review',
      'Selective dissolved-solids reduction',
      'Industrial membrane replacement planning',
    ]
  }

  return [
    'Brackish-water RO systems',
    'Industrial membrane replacement',
    'New skid build and retrofit support',
  ]
}

function buildRoFeatures(product, family, duty, brand) {
  const features = []

  if (brand) {
    features.push(`Brand: ${brand}`)
  }

  if (family === 'plant') {
    features.push('Product family: RO plant or packaged skid')
  } else if (family === 'controller') {
    features.push('Product family: RO control or protection component')
  } else if (family === 'accessory') {
    features.push('Product family: RO line accessory')
  } else {
    features.push('Product family: RO membrane element')
  }

  if (duty === 'seawater') {
    features.push('Duty profile: seawater or high-salinity service')
  } else if (duty === 'low-pressure') {
    features.push('Duty profile: low-pressure operation')
  } else if (duty === 'domestic') {
    features.push('Duty profile: domestic or tap-water purification')
  } else if (duty === 'nanofiltration') {
    features.push('Duty profile: nanofiltration service')
  } else if (family === 'membrane') {
    features.push('Duty profile: brackish-water reverse osmosis')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildRoSelectionNotes(family, duty) {
  if (family === 'plant') {
    return [
      'Confirm feed-water analysis before quoting a complete RO unit or skid.',
      'Check required permeate flow, operating hours, and pretreatment arrangement.',
      'Verify power supply, available footprint, and reject-water handling requirements.',
    ]
  }

  if (family === 'controller') {
    return [
      'Confirm control logic, sensor input type, and electrical compatibility before replacement.',
      'Check whether the item is part of a new panel build or a direct replacement on an existing skid.',
      'Where model history is unclear, share a nameplate or panel photo during RFQ.',
    ]
  }

  if (family === 'accessory') {
    return [
      'Confirm line size, pressure rating, and installation point before ordering.',
      'Check whether the accessory is for pretreatment, membrane skid piping, or instrumentation support.',
      'A photo of the installed part helps verify compatibility faster.',
    ]
  }

  if (duty === 'seawater') {
    return [
      'Confirm whether the membrane is for seawater duty rather than standard brackish-water service.',
      'Check vessel size, pressure requirements, and recovery target before RFQ.',
      'Feed salinity and pretreatment quality should be reviewed before replacement.',
    ]
  }

  if (duty === 'domestic') {
    return [
      'Confirm the membrane size and daily production requirement before ordering.',
      'Check whether the replacement is for a compact domestic unit or a light commercial purifier.',
      'Share the old membrane code if the existing system is already installed.',
    ]
  }

  return [
    'Confirm membrane size, element type, and feed-water duty before ordering.',
    'Check whether the membrane is replacing an existing unit or being selected for a new skid.',
    'Water analysis and target permeate quality help avoid selecting the wrong membrane class.',
  ]
}

function buildRoCompatibilityNotes(family, duty) {
  if (family === 'plant') {
    return [
      'System compatibility depends on pretreatment quality, pump duty, controls, and available utilities.',
      'RO skids should be matched to site flow requirement, reject strategy, and cleaning arrangement.',
    ]
  }

  if (family === 'controller') {
    return [
      'Compatibility should be checked against panel architecture, sensor signals, and site voltage.',
      'Do not assume physical similarity means direct control compatibility.',
    ]
  }

  if (family === 'accessory') {
    return [
      'Compatibility depends on pipe size, connection standard, pressure class, and skid layout.',
      'Accessory replacements should be verified against the existing installation photo or drawing.',
    ]
  }

  if (duty === 'nanofiltration') {
    return [
      'NF elements should be matched carefully to the intended selective separation duty.',
      'Do not replace an RO element with NF unless the process requirement is confirmed.',
    ]
  }

  return [
    'Membrane compatibility depends on element size, vessel fit, feed-water profile, and operating pressure.',
    'Where the exact model history is unclear, use the old code or vessel configuration to confirm fit before RFQ.',
  ]
}

function buildRoRfqFields(family) {
  if (family === 'plant') {
    return [
      'Source water type and latest water analysis',
      'Required permeate flow rate',
      'Power supply and installation location',
      'Whether this is a new skid, expansion, or replacement',
    ]
  }

  if (family === 'controller') {
    return [
      'Existing model or panel photo',
      'Voltage and phase',
      'Signal type or sensor pairing',
      'Whether the item is new-build or replacement',
    ]
  }

  if (family === 'accessory') {
    return [
      'Pipe size or connection size',
      'Pressure class if known',
      'Installed location on the skid',
      'Photo of the existing part where available',
    ]
  }

  return [
    'Existing membrane code or model reference',
    'Element size such as 4040, 8040, or 2540 where known',
    'Feed-water type and target output',
    'Whether the item is for replacement or a new system build',
  ]
}

function buildRoText(product) {
  const name = normalizeSpaces(product.name)
  const brand = detectBrand(product)
  const family = detectRoFamily(product)
  const duty = detectWaterDuty(product)

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''

  if (family === 'plant') {
    shortDescription = `${name} is listed as an RO plant or skid component for industrial water-treatment buyers reviewing complete reverse osmosis packages, skid upgrades, or packaged production units.`
    technicalSummary = `${name} is positioned within the reverse osmosis product range for buyers sourcing packaged RO equipment or major skid components. This type of item is usually reviewed against feed-water quality, required permeate output, pretreatment arrangement, and site utilities before quotation. For accurate matching, the RFQ should confirm water analysis, production target, operating schedule, and whether the requirement is for a new installation or replacement within an existing RO line.`
    seoDescription = `${name} available for industrial reverse osmosis plant, skid, and packaged RO quotation support from Vortexus Industrial Excellence.`
  } else if (family === 'controller') {
    shortDescription = `${name} is listed for control, sensing, or protection duties within reverse osmosis equipment where stable operation and system monitoring need to be maintained.`
    technicalSummary = `${name} is presented under the RO control layer for buyers sourcing electrical, protection, or signal-handling components used around reverse osmosis skids. Selection should be based on the existing panel arrangement, voltage and phase, sensor compatibility, and the exact function the component performs inside the system. Where the original model is already installed, a panel photo or nameplate is the fastest way to verify the correct replacement path.`
    seoDescription = `${name} listed for reverse osmosis control, monitoring, or protection applications with RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'accessory') {
    shortDescription = `${name} is listed as an RO line accessory or support component used around pretreatment, membrane skid piping, or system protection points.`
    technicalSummary = `${name} supports reverse osmosis installation, line handling, or skid-level accessory replacement within treatment systems. These items are usually selected by line size, pressure requirement, connection standard, and the position they occupy in the treatment train. Before quotation, the buyer should confirm whether the part is tied to pretreatment, membrane skid piping, or instrumentation support so the replacement fits the existing arrangement correctly.`
    seoDescription = `${name} available for reverse osmosis accessory, line-support, and skid integration requirements from Vortexus Industrial Excellence.`
  } else {
    const dutyText =
      duty === 'seawater'
        ? 'seawater and high-salinity reverse osmosis service'
        : duty === 'low-pressure'
          ? 'low-pressure reverse osmosis duty'
          : duty === 'domestic'
            ? 'tap-water and compact reverse osmosis purification'
            : duty === 'nanofiltration'
              ? 'nanofiltration and selective dissolved-solids reduction'
              : 'brackish-water reverse osmosis duty'

    shortDescription = `${name} is listed as a membrane element for ${dutyText}, helping buyers source replacement membranes or shortlist suitable elements for new RO builds.`
    technicalSummary = `${name} is presented within reverse osmosis membranes for buyers reviewing element replacement or new membrane selection. The correct fit depends on membrane size, vessel configuration, feed-water profile, and the treatment duty expected from the element. Before quotation, confirm whether the requirement is for seawater, brackish water, low-pressure service, domestic purification, or nanofiltration so the membrane class is matched correctly and avoids costly selection errors.`
    seoDescription = `${name} listed for industrial reverse osmosis membrane sourcing, replacement review, and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    brand,
    family,
    duty,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildRoApplications(family, duty),
    keyFeatures: buildRoFeatures(product, family, duty, brand),
    selectionNotes: buildRoSelectionNotes(family, duty),
    compatibilityNotes: buildRoCompatibilityNotes(family, duty),
    rfqFields: buildRoRfqFields(family),
  }
}

function enrichReverseOsmosisProduct(product) {
  const ro = buildRoText(product)

  let nextSubcategory = product.subcategory
  if (ro.family === 'membrane') {
    nextSubcategory = 'RO Membranes'
  } else if (ro.family === 'controller') {
    nextSubcategory = 'RO Controllers'
  } else if (ro.family === 'accessory') {
    nextSubcategory = 'RO Accessories'
  } else if (ro.family === 'plant') {
    nextSubcategory = 'RO Plants'
  }

  return {
    ...product,
    subcategory: nextSubcategory,
    summary: ro.shortDescription,
    description: ro.technicalSummary,
    shortDescription: ro.shortDescription,
    technicalSummary: ro.technicalSummary,
    applications: ro.applications,
    specHighlights: ro.keyFeatures,
    keyFeatures: ro.keyFeatures,
    selectionNotes: ro.selectionNotes,
    compatibilityNotes: ro.compatibilityNotes,
    rfqFields: ro.rfqFields,
    seoDescription: ro.seoDescription,
  }
}

function detectFiltrationBrand(product) {
  return detectBrand(product)
}

function detectFiltrationFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()
  const itemGroup = normalizeSpaces(product.itemGroup).toLowerCase()
  const subcategory = normalizeSpaces(product.subcategory).toLowerCase()

  if (/housing|membrane housing/.test(name) || /filter housings/.test(itemGroup)) {
    return 'housing'
  }

  if (/microfilter|hpcf|ss304/.test(name) || /microfilters/.test(itemGroup) || /microfiltration/.test(subcategory)) {
    return 'microfilter'
  }

  if (/uf\b|ultrafiltration|washable uf|demo kit/.test(name) || /wt-uf units|wt-purifiers/.test(itemGroup)) {
    if (/ro system|ro d01b/.test(name)) {
      return 'compact-purifier'
    }
    return 'uf-unit'
  }

  if (/nanofiltration|\bnf\b/.test(name) || /nanofiltration/.test(subcategory)) {
    return 'nf-membrane'
  }

  if (/activated carbon|carbon filters|ptc carbon/.test(name) || /activated carbon/.test(subcategory)) {
    return 'carbon-media'
  }

  if (/sand media|afm|dmi media|calcium carbonate|media/.test(name) || /wt-medias/.test(itemGroup)) {
    return 'filter-media'
  }

  if (/pentair|autotrol|fleck|3way kit|wellmate|brinetanks|pressurevesselsrange/.test(name) || /filter cartridges/.test(subcategory)) {
    return 'cartridge-component'
  }

  if (/purifier|water purifier/.test(name)) {
    return 'compact-purifier'
  }

  return 'filtration-component'
}

function buildFiltrationApplications(family) {
  if (family === 'housing') {
    return [
      'Filter cartridge installation and replacement',
      'Pretreatment stage assembly',
      'Compact and industrial line filtration setups',
    ]
  }

  if (family === 'microfilter') {
    return [
      'Fine solids removal and process polishing',
      'Pretreatment ahead of membrane stages',
      'Industrial water and process-stream filtration',
    ]
  }

  if (family === 'uf-unit') {
    return [
      'Ultrafiltration process review',
      'Suspended-solids and microorganism reduction',
      'Pretreatment and polishing skid evaluation',
    ]
  }

  if (family === 'nf-membrane') {
    return [
      'Nanofiltration duty review',
      'Selective dissolved-solids reduction',
      'Membrane replacement and quotation planning',
    ]
  }

  if (family === 'carbon-media') {
    return [
      'Adsorption and taste or odor improvement',
      'Pretreatment for downstream membrane protection',
      'Water polishing and chlorine reduction',
    ]
  }

  if (family === 'filter-media') {
    return [
      'Granular media filtration stages',
      'Pretreatment ahead of membrane systems',
      'Utility-water clarification and polishing',
    ]
  }

  if (family === 'compact-purifier') {
    return [
      'Point-of-use or compact treatment review',
      'Packaged purifier selection and replacement',
      'Light commercial and utility-water polishing',
    ]
  }

  if (family === 'cartridge-component') {
    return [
      'Valve, vessel, or cartridge-side filtration support',
      'Replacement planning for packaged filtration systems',
      'Water softening and filter-line component review',
    ]
  }

  return [
    'General filtration replacement planning',
    'Pretreatment and process-water review',
    'Quotation support for filtration components',
  ]
}

function buildFiltrationFeatures(product, family, brand) {
  const features = []

  if (brand) {
    features.push(`Brand: ${brand}`)
  }

  if (family === 'housing') {
    features.push('Product family: filter housing or vessel body')
  } else if (family === 'microfilter') {
    features.push('Product family: microfiltration assembly')
  } else if (family === 'uf-unit') {
    features.push('Product family: ultrafiltration unit or demo set')
  } else if (family === 'nf-membrane') {
    features.push('Product family: nanofiltration membrane')
  } else if (family === 'carbon-media') {
    features.push('Product family: activated carbon filtration media')
  } else if (family === 'filter-media') {
    features.push('Product family: granular filter media')
  } else if (family === 'compact-purifier') {
    features.push('Product family: compact purifier or packaged unit')
  } else if (family === 'cartridge-component') {
    features.push('Product family: cartridge-side filtration component')
  } else {
    features.push('Product family: filtration component')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildFiltrationSelectionNotes(family) {
  if (family === 'housing') {
    return [
      'Confirm housing size, connection size, and cartridge format before ordering.',
      'Check whether the housing is slim, jumbo, or tied to a compact purifier configuration.',
      'A photo of the installed housing helps confirm the right replacement path.',
    ]
  }

  if (family === 'microfilter') {
    return [
      'Confirm the target micron or filtration stage before replacing a microfilter assembly.',
      'Check body material, length, and element arrangement where applicable.',
      'Microfilter assemblies should be reviewed against flow requirement and pressure drop tolerance.',
    ]
  }

  if (family === 'uf-unit') {
    return [
      'Confirm required output, feed-water quality, and whether the item is a demo set or operating unit.',
      'Check whether the requirement is for suspended-solids removal, microbial reduction, or polishing.',
      'If replacing an installed UF unit, share the existing configuration or product photo.',
    ]
  }

  if (family === 'nf-membrane') {
    return [
      'Confirm whether the duty is nanofiltration rather than standard reverse osmosis.',
      'Check membrane size and process objective before RFQ.',
      'Feed-water profile and target reduction should be reviewed before selection.',
    ]
  }

  if (family === 'carbon-media' || family === 'filter-media') {
    return [
      'Confirm the contaminant issue or pretreatment duty before selecting media.',
      'Check vessel size, bed depth, and backwash arrangement where applicable.',
      'Media choice should follow process need, not only material familiarity.',
    ]
  }

  if (family === 'compact-purifier') {
    return [
      'Confirm whether the requirement is domestic, commercial, or light industrial.',
      'Check production target, available pressure, and consumable format before ordering.',
      'If the unit is already installed, use the old model details to confirm fit.',
    ]
  }

  return [
    'Confirm model, size, and process duty before RFQ.',
    'Share a product photo or code if the item is replacing an existing unit.',
    'Check whether the item belongs to pretreatment, polishing, or packaged filtration duty.',
  ]
}

function buildFiltrationCompatibilityNotes(family) {
  if (family === 'housing') {
    return [
      'Compatibility depends on cartridge size, housing format, connection size, and pressure class.',
      'Do not assume housings with similar shape are interchangeable without checking the installed size.',
    ]
  }

  if (family === 'microfilter') {
    return [
      'Compatibility should be checked against line flow, installed body size, and filtration stage.',
      'Replacement assemblies should match the existing stainless or HPCF arrangement where relevant.',
    ]
  }

  if (family === 'uf-unit' || family === 'compact-purifier') {
    return [
      'Compatibility depends on feed-water condition, required output, and installed piping or utility arrangement.',
      'Packaged units should be checked against consumable format and operating environment before replacement.',
    ]
  }

  if (family === 'carbon-media' || family === 'filter-media') {
    return [
      'Media compatibility depends on the contaminant target, vessel loading, and process sequence.',
      'Media replacement should be reviewed together with the operating filter vessel and backwash arrangement.',
    ]
  }

  return [
    'Compatibility should be confirmed against the existing installation, process duty, and operating conditions.',
    'Where product history is unclear, the installed item photo is the fastest confirmation tool.',
  ]
}

function buildFiltrationRfqFields(family) {
  if (family === 'housing') {
    return [
      'Housing size and connection size',
      'Slim or jumbo format where known',
      'Installed cartridge type',
      'Photo of the old housing if available',
    ]
  }

  if (family === 'microfilter') {
    return [
      'Installed model or assembly code',
      'Required flow or service point',
      'Body material and size if known',
      'Whether this is replacement or a new build',
    ]
  }

  if (family === 'uf-unit' || family === 'compact-purifier') {
    return [
      'Feed-water source and quality',
      'Required output or production rate',
      'Installation location',
      'Whether the request is for a new unit or replacement',
    ]
  }

  if (family === 'carbon-media' || family === 'filter-media') {
    return [
      'Type of water problem or contaminant target',
      'Quantity or vessel size',
      'Current media type if replacing',
      'Whether the media is for pretreatment or polishing',
    ]
  }

  return [
    'Product name or installed code',
    'Application or process duty',
    'Quantity required',
    'Whether the item is for replacement or new installation',
  ]
}

function buildFiltrationText(product) {
  const name = normalizeSpaces(product.name)
  const brand = detectFiltrationBrand(product)
  const family = detectFiltrationFamily(product)

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''
  let nextSubcategory = product.subcategory

  if (family === 'housing') {
    nextSubcategory = 'Cartridge Filters'
    shortDescription = `${name} is listed as a filter housing or vessel body used to support cartridge-based pretreatment, polishing, or compact purifier stages within filtration systems.`
    technicalSummary = `${name} is presented within filtration systems for buyers sourcing filter housings, cartridge bodies, or compact vessel replacements. The correct selection depends on housing size, cartridge format, connection size, and whether the installation uses slim, jumbo, or purifier-specific consumables. For clean replacement matching, use the installed housing dimensions, connection details, and a photo of the existing unit during RFQ.`
    seoDescription = `${name} available for filtration housing replacement, cartridge support, and pretreatment quotation from Vortexus Industrial Excellence.`
  } else if (family === 'microfilter') {
    nextSubcategory = 'Microfiltration'
    shortDescription = `${name} is listed as a microfiltration assembly used for fine solids removal, process polishing, or pretreatment support ahead of downstream treatment stages.`
    technicalSummary = `${name} is positioned within microfiltration for buyers reviewing stainless or packaged fine-filtration assemblies used in treatment skids and process-water lines. These products are usually selected by installed size, body arrangement, solids-loading duty, and the filtration stage they support. Before quotation, confirm the existing model, length, and process location so the replacement or new unit fits the intended line correctly.`
    seoDescription = `${name} listed for industrial microfiltration, process polishing, and pretreatment RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'uf-unit') {
    nextSubcategory = 'Ultrafiltration'
    shortDescription = `${name} is listed as an ultrafiltration unit or demonstration set for buyers reviewing compact UF stages used for suspended-solids reduction, polishing, or pre-membrane treatment.`
    technicalSummary = `${name} is presented within ultrafiltration for buyers assessing UF modules, packaged units, or demo-format assemblies. Ultrafiltration products are usually reviewed against feed-water condition, target output, cleaning approach, and the role they play ahead of downstream purification or polishing stages. Before quotation, confirm whether the requirement is for an installed working unit, a compact purifier stage, or a demonstration or test setup.`
    seoDescription = `${name} available for ultrafiltration unit review, compact UF sourcing, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'nf-membrane') {
    nextSubcategory = 'Nanofiltration'
    shortDescription = `${name} is listed as a nanofiltration product for buyers reviewing selective dissolved-solids reduction and membrane-based filtration duty.`
    technicalSummary = `${name} is presented within nanofiltration for buyers sourcing membrane products that sit between conventional filtration and full reverse osmosis duty. Selection should be matched to process objective, membrane size, and the separation duty required at site. Before quotation, confirm whether the application needs nanofiltration rather than standard RO so the process objective remains technically correct.`
    seoDescription = `${name} listed for nanofiltration membrane sourcing, selective filtration review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'carbon-media') {
    nextSubcategory = 'Activated Carbon Filters'
    shortDescription = `${name} is listed as activated carbon filtration media for adsorption, polishing, and pretreatment duties where taste, odor, chlorine, or organic load need to be reduced.`
    technicalSummary = `${name} is presented within activated carbon filtration for buyers sourcing adsorptive media used in polishing, dechlorination, and pretreatment stages. Carbon media should be selected against the contaminant target, contact time, vessel loading, and the position it holds in the treatment train. Before quotation, confirm whether the media is for chlorine reduction, odor control, general polishing, or upstream membrane protection.`
    seoDescription = `${name} available for activated carbon filtration media, adsorption, and pretreatment RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'filter-media') {
    nextSubcategory = 'Sand Filters'
    shortDescription = `${name} is listed as filtration media used for clarification, pretreatment, or packed-bed polishing stages inside industrial water-treatment systems.`
    technicalSummary = `${name} is presented within filtration media for buyers sourcing granular material used in packed-bed filters and pretreatment vessels. Media products should be matched to the contaminant issue, vessel configuration, backwash arrangement, and the process stage they support. Before quotation, confirm whether the material is being used for basic clarification, membrane pretreatment, iron or manganese reduction support, or general water polishing.`
    seoDescription = `${name} listed for filtration media, pretreatment vessel loading, and packed-bed RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'compact-purifier') {
    shortDescription = `${name} is listed as a compact purifier or packaged filtration unit for buyers reviewing integrated treatment products used in light commercial, domestic, or utility-water applications.`
    technicalSummary = `${name} is presented within filtration systems for buyers sourcing packaged purifier units and compact treatment products. This type of item is usually selected by production target, installation setting, and the treatment stages already built into the unit. Before quotation, confirm whether the requirement is for a new purifier, a compact replacement, or an upgrade to an already-installed point-of-use or light commercial unit.`
    seoDescription = `${name} available for packaged filtration unit review, purifier quotation, and compact treatment sourcing from Vortexus Industrial Excellence.`
  } else if (family === 'cartridge-component') {
    nextSubcategory = 'Cartridge Filters'
    shortDescription = `${name} is listed as a filtration-side component connected to cartridge filtration, softening, pressure vessels, or packaged treatment support.`
    technicalSummary = `${name} is presented within filtration systems for buyers sourcing cartridge-side components, valves, vessels, or packaged support items tied to water filtration and conditioning lines. Selection should be based on installed system type, connection format, and whether the product is part of a softener, vessel, cartridge arrangement, or packaged utility-water line. During RFQ, share the old product code or installation context to avoid mismatching visually similar components.`
    seoDescription = `${name} listed for cartridge filtration support, conditioning-line components, and RFQ assistance from Vortexus Industrial Excellence.`
  } else {
    shortDescription = `${name} is listed within filtration systems for industrial buyers reviewing replacement filtration components, treatment accessories, or process-water support items.`
    technicalSummary = `${name} is presented in the filtration range for buyers who need replacement or process-support filtration products. The correct fit depends on the installation duty, connected equipment, and the position the product holds in the treatment line. A photo or the installed model reference helps verify the right item before quotation.`
    seoDescription = `${name} available for industrial filtration product sourcing and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    subcategory: nextSubcategory,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildFiltrationApplications(family),
    keyFeatures: buildFiltrationFeatures(product, family, brand),
    selectionNotes: buildFiltrationSelectionNotes(family),
    compatibilityNotes: buildFiltrationCompatibilityNotes(family),
    rfqFields: buildFiltrationRfqFields(family),
  }
}

function enrichFiltrationProduct(product) {
  const filtration = buildFiltrationText(product)
  const preserveCatalogText = product.preserveCatalogText === true

  return {
    ...product,
    subcategory: preserveCatalogText ? product.subcategory : filtration.subcategory,
    summary: preserveCatalogText ? product.summary : filtration.shortDescription,
    description: preserveCatalogText ? product.description : filtration.technicalSummary,
    shortDescription: preserveCatalogText ? product.summary : filtration.shortDescription,
    technicalSummary: preserveCatalogText ? product.description : filtration.technicalSummary,
    applications: preserveCatalogText ? product.applications : filtration.applications,
    specHighlights: preserveCatalogText ? product.specHighlights : filtration.keyFeatures,
    keyFeatures: preserveCatalogText ? product.specHighlights : filtration.keyFeatures,
    selectionNotes: preserveCatalogText ? product.selectionNotes : filtration.selectionNotes,
    compatibilityNotes: preserveCatalogText ? product.compatibilityNotes : filtration.compatibilityNotes,
    rfqFields: preserveCatalogText ? product.rfqFields : filtration.rfqFields,
    seoDescription: preserveCatalogText ? product.seoDescription || filtration.seoDescription : filtration.seoDescription,
  }
}

function detectChemicalFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()

  if (/chlorine|hypochlorite/.test(name)) {
    return 'disinfectant'
  }

  if (/hydrochloric acid|ph minus|caustic soda|citric acid|phosphorous acid|phosphoric acid/.test(name)) {
    return 'ph-adjuster'
  }

  if (/floccuant|flocculant|polymer/.test(name)) {
    return 'flocculant'
  }

  if (/antiscallant|genesys|dna 420c|kleen mct|antistain/.test(name)) {
    return 'scale-inhibitor'
  }

  if (/membrane cleaner/.test(name)) {
    return 'membrane-cleaner'
  }

  if (/resin cation|resin/.test(name)) {
    return 'ion-exchange-resin'
  }

  if (/activated alumina|dmi media/.test(name)) {
    return 'treatment-media'
  }

  return 'treatment-chemical'
}

function buildChemicalApplications(family) {
  if (family === 'disinfectant') {
    return [
      'Disinfection and microbial control',
      'Treated-water sanitation support',
      'Oxidation or residual chlorine programs',
    ]
  }

  if (family === 'ph-adjuster') {
    return [
      'pH correction and process balancing',
      'Chemical dosing and water-conditioning support',
      'Pretreatment and cleaning chemistry review',
    ]
  }

  if (family === 'flocculant') {
    return [
      'Clarification and floc formation',
      'Solid-liquid separation support',
      'Pretreatment improvement before downstream stages',
    ]
  }

  if (family === 'scale-inhibitor') {
    return [
      'Scale control in membrane and treatment systems',
      'Pretreatment chemical support',
      'Deposit management in process-water lines',
    ]
  }

  if (family === 'membrane-cleaner') {
    return [
      'RO membrane cleaning programs',
      'Recovery of membrane performance',
      'Scheduled CIP or cleaning support',
    ]
  }

  if (family === 'ion-exchange-resin') {
    return [
      'Softening and ion-exchange treatment',
      'Hardness control in water systems',
      'Resin replacement and vessel recharge planning',
    ]
  }

  if (family === 'treatment-media') {
    return [
      'Specialized contaminant reduction',
      'Media loading for treatment vessels',
      'Pretreatment and polishing support',
    ]
  }

  return [
    'Chemical treatment support',
    'Pretreatment and conditioning review',
    'Quotation planning for process chemicals',
  ]
}

function buildChemicalFeatures(product, family) {
  const features = []

  if (family === 'disinfectant') {
    features.push('Product family: disinfectant chemistry')
  } else if (family === 'ph-adjuster') {
    features.push('Product family: pH adjustment chemistry')
  } else if (family === 'flocculant') {
    features.push('Product family: flocculation support chemical')
  } else if (family === 'scale-inhibitor') {
    features.push('Product family: scale-inhibitor or antiscalant chemistry')
  } else if (family === 'membrane-cleaner') {
    features.push('Product family: membrane cleaning chemical')
  } else if (family === 'ion-exchange-resin') {
    features.push('Product family: ion-exchange resin')
  } else if (family === 'treatment-media') {
    features.push('Product family: specialty treatment media')
  } else {
    features.push('Product family: treatment chemical')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildChemicalSelectionNotes(family) {
  if (family === 'disinfectant') {
    return [
      'Confirm the target disinfection duty and dosing method before ordering.',
      'Check concentration, handling requirements, and system compatibility.',
      'Residual target and contact conditions should be reviewed during RFQ.',
    ]
  }

  if (family === 'ph-adjuster') {
    return [
      'Confirm whether the process requires pH reduction or pH increase.',
      'Check dosing arrangement, concentration, and material compatibility.',
      'For existing systems, share the current chemical program if available.',
    ]
  }

  if (family === 'flocculant') {
    return [
      'Confirm the clarification problem and solids behavior before selecting a flocculant.',
      'Jar testing or existing treatment history helps improve chemical matching.',
      'Check whether the product is being used upstream of settling, filtration, or dewatering.',
    ]
  }

  if (family === 'scale-inhibitor') {
    return [
      'Confirm whether the treatment challenge is scaling, silica control, stain control, or general deposit management.',
      'Check the system type, especially if the chemical is tied to RO pretreatment.',
      'Feed-water profile and existing dosing rate help verify the correct chemical path.',
    ]
  }

  if (family === 'membrane-cleaner') {
    return [
      'Confirm the foulant type or membrane cleaning objective before ordering.',
      'Check whether the cleaner is for routine CIP or targeted recovery work.',
      'Membrane type and cleaning compatibility should be reviewed first.',
    ]
  }

  if (family === 'ion-exchange-resin') {
    return [
      'Confirm whether the resin is for softening or a broader ion-exchange duty.',
      'Check vessel size, current resin type, and regeneration arrangement.',
      'If replacing existing resin, share the vessel size or old media reference.',
    ]
  }

  if (family === 'treatment-media') {
    return [
      'Confirm the contaminant target and vessel loading requirement before selection.',
      'Check whether the media is being used for adsorption, iron removal, or general polishing.',
      'Treatment media should be matched to the installed vessel and operating sequence.',
    ]
  }

  return [
    'Confirm the treatment duty and dosing or loading arrangement before RFQ.',
    'Check whether the product is for replacement, new commissioning, or chemical program change.',
    'Share the current process challenge to improve chemical matching.',
  ]
}

function buildChemicalCompatibilityNotes(family) {
  if (family === 'disinfectant' || family === 'ph-adjuster') {
    return [
      'Compatibility depends on concentration, dosing arrangement, and contact with wetted materials.',
      'Chemical handling should always match the existing dosing system and safety procedure.',
    ]
  }

  if (family === 'flocculant') {
    return [
      'Compatibility depends on raw-water behavior, coagulant pairing, and the clarification stage in use.',
      'A flocculant that works in one plant should not be assumed to fit every process without review.',
    ]
  }

  if (family === 'scale-inhibitor' || family === 'membrane-cleaner') {
    return [
      'Compatibility should be checked against membrane chemistry, feed-water profile, and dosing or cleaning program.',
      'Wrong chemical selection can reduce performance or damage downstream treatment stages.',
    ]
  }

  if (family === 'ion-exchange-resin' || family === 'treatment-media') {
    return [
      'Compatibility depends on vessel type, process objective, and regeneration or backwash arrangement.',
      'Media or resin replacement should be checked against the current treatment vessel and application duty.',
    ]
  }

  return [
    'Compatibility should be reviewed against the process duty, system materials, and application stage.',
    'Where the current chemical program is already running, use that reference during RFQ.',
  ]
}

function buildChemicalRfqFields(family) {
  if (family === 'disinfectant' || family === 'ph-adjuster') {
    return [
      'Chemical name and required pack size',
      'Application or dosing point',
      'Quantity required',
      'Current treatment objective or operating issue',
    ]
  }

  if (family === 'flocculant') {
    return [
      'Water source or process stream',
      'Clarification or solids issue',
      'Quantity required',
      'Current treatment history where available',
    ]
  }

  if (family === 'scale-inhibitor' || family === 'membrane-cleaner') {
    return [
      'System type, especially RO where applicable',
      'Current scaling or fouling issue',
      'Pack size or quantity required',
      'Water analysis or treatment history if available',
    ]
  }

  if (family === 'ion-exchange-resin' || family === 'treatment-media') {
    return [
      'Type of vessel or system in use',
      'Media or resin quantity required',
      'Treatment objective',
      'Whether this is a replacement or new loading',
    ]
  }

  return [
    'Product name',
    'Application',
    'Quantity required',
    'Whether this is replacement or a new program',
  ]
}

function buildChemicalText(product) {
  const name = normalizeSpaces(product.name)
  const family = detectChemicalFamily(product)

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''
  let nextSubcategory = product.subcategory

  if (family === 'disinfectant') {
    nextSubcategory = 'Disinfectants'
    shortDescription = `${name} is listed as a disinfection chemical used to support microbial control, sanitation, or oxidizing treatment steps inside industrial and utility water systems.`
    technicalSummary = `${name} is presented within industrial water-treatment chemicals for buyers sourcing disinfectant chemistry used in sanitation, residual control, or oxidizing treatment programs. Selection should be matched to the treatment target, dosing arrangement, and handling requirement at site. Before quotation, confirm the concentration, quantity, and the disinfection duty so the chemical fits the intended treatment workflow correctly.`
    seoDescription = `${name} available for industrial water disinfection, sanitation chemistry, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'ph-adjuster') {
    nextSubcategory = 'pH Adjusters'
    shortDescription = `${name} is listed as a pH adjustment chemical used where industrial buyers need acidity or alkalinity correction within treatment and process-water systems.`
    technicalSummary = `${name} is presented within pH adjustment chemicals for buyers sourcing process-correction chemistry used in treatment, cleaning, or conditioning programs. These products should be selected according to whether the plant needs pH reduction, pH increase, or controlled process balancing at a specific dosing point. For accurate RFQ handling, confirm the treatment objective, pack size, and compatibility with the existing dosing arrangement.`
    seoDescription = `${name} listed for pH adjustment, chemical dosing, and water-conditioning RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'flocculant') {
    nextSubcategory = 'Flocculants'
    shortDescription = `${name} is listed as a flocculation-support chemical used to improve solids aggregation and clarification performance in treatment processes.`
    technicalSummary = `${name} is presented within flocculation chemicals for buyers reviewing clarification support products used ahead of settling, filtration, or downstream polishing stages. Flocculants should be matched to the raw-water condition, solids behavior, and the clarification process already in place. Before quotation, share the treatment problem or current chemical program so the product can be evaluated against the actual process duty.`
    seoDescription = `${name} available for clarification chemistry, flocculation support, and RFQ review from Vortexus Industrial Excellence.`
  } else if (family === 'scale-inhibitor') {
    nextSubcategory = 'Scale Inhibitors'
    shortDescription = `${name} is listed as scale-control or antiscalant chemistry used where deposits, silica, or related scaling risk need to be managed inside treatment systems.`
    technicalSummary = `${name} is presented within scale-management chemistry for buyers sourcing antiscalants and related treatment chemicals used to protect membranes, control deposits, or stabilize process-water performance. Selection should be matched to the water profile, scaling tendency, and the point where the chemical enters the process. Before quotation, confirm whether the program is tied to RO pretreatment, general deposit control, or another scaling-related application.`
    seoDescription = `${name} listed for scale-control chemistry, antiscalant review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'membrane-cleaner') {
    nextSubcategory = 'Membrane Cleaners'
    shortDescription = `${name} is listed as membrane cleaning chemistry used to restore or support performance in reverse osmosis and related membrane treatment systems.`
    technicalSummary = `${name} is presented within membrane-cleaning products for buyers sourcing cleaning chemistry used in scheduled CIP routines or targeted membrane recovery work. The correct cleaner depends on the foulant type, membrane compatibility, and the cleaning objective at site. During RFQ, confirm whether the problem is scaling, organic fouling, biological fouling, or general performance decline so the cleaning path can be reviewed properly.`
    seoDescription = `${name} available for membrane cleaning, RO performance recovery, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'ion-exchange-resin') {
    nextSubcategory = 'Ion Exchange Resin'
    shortDescription = `${name} is listed as ion-exchange resin used in softening and treatment vessels where hardness or ionic loading needs to be controlled.`
    technicalSummary = `${name} is presented within treatment chemicals as ion-exchange resin for buyers sourcing replacement media used in softeners and related ion-exchange systems. Resin selection should be matched to the vessel arrangement, treatment objective, and whether the product is being used as fresh loading or replacement stock. Before quotation, confirm the vessel size, resin duty, and the installed system so the material fits the intended application correctly.`
    seoDescription = `${name} listed for ion-exchange resin, softening media replacement, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'treatment-media') {
    nextSubcategory = 'Treatment Media'
    shortDescription = `${name} is listed as specialty treatment media used for targeted contaminant reduction, vessel loading, or support within industrial water-treatment processes.`
    technicalSummary = `${name} is presented within treatment chemicals as specialty media for buyers sourcing adsorptive, catalytic, or process-support media used in dedicated treatment vessels. These products should be selected against the contaminant target, vessel configuration, and the treatment duty expected at site. For clean RFQ matching, confirm the vessel size, treatment objective, and whether the request is for new loading or media replacement.`
    seoDescription = `${name} available for treatment media loading, specialty contaminant control, and RFQ support from Vortexus Industrial Excellence.`
  } else {
    shortDescription = `${name} is listed within industrial water-treatment chemicals for buyers reviewing process chemistry, treatment support, or conditioning products for operational use.`
    technicalSummary = `${name} is presented in the industrial chemicals range for buyers sourcing treatment support chemistry used in operating water systems. The correct fit depends on the treatment objective, dosing or loading method, and the role the product plays in the process. Before quotation, confirm the application, quantity, and the current process challenge so the product can be matched more accurately.`
    seoDescription = `${name} listed for industrial treatment chemistry sourcing and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    subcategory: nextSubcategory,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildChemicalApplications(family),
    keyFeatures: buildChemicalFeatures(product, family),
    selectionNotes: buildChemicalSelectionNotes(family),
    compatibilityNotes: buildChemicalCompatibilityNotes(family),
    rfqFields: buildChemicalRfqFields(family),
  }
}

function enrichChemicalProduct(product) {
  const chemical = buildChemicalText(product)

  return {
    ...product,
    subcategory: chemical.subcategory,
    summary: chemical.shortDescription,
    description: chemical.technicalSummary,
    shortDescription: chemical.shortDescription,
    technicalSummary: chemical.technicalSummary,
    applications: chemical.applications,
    specHighlights: chemical.keyFeatures,
    keyFeatures: chemical.keyFeatures,
    selectionNotes: chemical.selectionNotes,
    compatibilityNotes: chemical.compatibilityNotes,
    rfqFields: chemical.rfqFields,
    seoDescription: chemical.seoDescription,
  }
}

function detectDisinfectionFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()
  const itemGroup = normalizeSpaces(product.itemGroup).toLowerCase()
  const subcategory = normalizeSpaces(product.subcategory).toLowerCase()

  if (/banisol|saniplus|borkler|sterisol/.test(name) || /hth/.test(itemGroup)) {
    return 'pool-chemical'
  }

  if (/uv lamp|uv sleeve|uv adaptor|uv chamber|o-ring/.test(name)) {
    return 'uv-accessory'
  }

  if (/uv|sterilizer|sanitizing/.test(name) || /sterilizer|hidrotek/.test(itemGroup + subcategory)) {
    return 'uv-system'
  }

  if (/gas feed|vacuum system/.test(name) || /xylem/.test(itemGroup)) {
    return 'chlorination-system'
  }

  if (
    /pool sand filter|leaf|life saver|telescopic handle|vacuum head|side grill|pool light|fountain safety transformer|safety harness|stabilisher/.test(
      name,
    ) ||
    /pool accessories/.test(itemGroup)
  ) {
    return 'pool-accessory'
  }

  return 'disinfection-component'
}

function buildDisinfectionApplications(family) {
  if (family === 'uv-system') {
    return [
      'Point-of-use and line-side UV disinfection',
      'Microbiological risk reduction in treated water',
      'Compact sterilization support for clean-water systems',
    ]
  }

  if (family === 'uv-accessory') {
    return [
      'UV unit maintenance and service replacement',
      'Lamp, sleeve, adaptor, and chamber support',
      'Sterilizer upkeep on installed UV systems',
    ]
  }

  if (family === 'chlorination-system') {
    return [
      'Gas-feed chlorination system sourcing',
      'Chemical disinfection equipment review',
      'Treatment-plant chlorination integration',
    ]
  }

  if (family === 'pool-chemical') {
    return [
      'Swimming-pool disinfection and sanitation support',
      'Pool water hygiene management',
      'Chemical maintenance of recreational water systems',
    ]
  }

  if (family === 'pool-accessory') {
    return [
      'Pool maintenance and service support',
      'Swimming-pool cleaning and operating accessories',
      'Support items around recreational water systems',
    ]
  }

  return [
    'Disinfection-system service review',
    'Replacement planning for installed sanitization equipment',
    'RFQ support for water-disinfection components',
  ]
}

function buildDisinfectionFeatures(product, family, brand) {
  const features = []

  if (brand) {
    features.push(`Brand: ${brand}`)
  }

  if (family === 'uv-system') {
    features.push('Product family: UV sterilizer or sanitizing unit')
  } else if (family === 'uv-accessory') {
    features.push('Product family: UV service accessory')
  } else if (family === 'chlorination-system') {
    features.push('Product family: chlorination system or gas-feed unit')
  } else if (family === 'pool-chemical') {
    features.push('Product family: pool disinfection chemical')
  } else if (family === 'pool-accessory') {
    features.push('Product family: pool maintenance accessory')
  } else {
    features.push('Product family: disinfection-system component')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildDisinfectionSelectionNotes(family) {
  if (family === 'uv-system') {
    return [
      'Confirm required flow rate and the intended installation point before RFQ.',
      'Check whether the unit is for point-of-use, line-side, or specialized sterilization duty.',
      'Replacement matching is easier when the current UV unit reference is shared.',
    ]
  }

  if (family === 'uv-accessory') {
    return [
      'Confirm the exact UV unit model before ordering service accessories.',
      'Check whether the request is for a lamp, sleeve, adaptor, chamber, or sealing part.',
      'UV accessories should be matched to the installed sterilizer size and series.',
    ]
  }

  if (family === 'chlorination-system') {
    return [
      'Confirm disinfection duty, feed method, and plant scale before RFQ.',
      'Check whether the request is for a complete chlorination assembly or a line-side component.',
      'Installed chlorination details help verify the right replacement path.',
    ]
  }

  if (family === 'pool-chemical') {
    return [
      'Confirm the water-care duty before selecting pool chemicals.',
      'Check whether the item supports sanitizing, shock treatment, or general pool maintenance.',
      'Chemical compatibility and handling method should be reviewed before ordering.',
    ]
  }

  if (family === 'pool-accessory') {
    return [
      'Confirm whether the item supports cleaning, safety, lighting, or pool-side maintenance.',
      'Check installed size or model where the accessory connects to existing pool hardware.',
      'Pool-service accessories should be matched against the current setup before RFQ.',
    ]
  }

  return [
    'Confirm the exact disinfection role before RFQ.',
    'Use the current model or installed photo where available.',
    'Check whether the request is for a main unit, accessory, or service item.',
  ]
}

function buildDisinfectionCompatibilityNotes(family) {
  if (family === 'uv-system' || family === 'uv-accessory') {
    return [
      'Compatibility depends on UV unit size, chamber type, lamp format, and installation duty.',
      'UV accessories should be matched to the exact sterilizer series before replacement.',
    ]
  }

  if (family === 'chlorination-system') {
    return [
      'Compatibility depends on feed method, system scale, and the installed chlorination arrangement.',
      'Gas-feed chlorination components should be reviewed against the current plant setup before replacement.',
    ]
  }

  if (family === 'pool-chemical' || family === 'pool-accessory') {
    return [
      'Compatibility depends on the pool service method and the equipment or chemical program already in use.',
      'Do not assume all pool-care items interchange without checking the current installation or maintenance routine.',
    ]
  }

  return [
    'Compatibility should be checked against the installed disinfection setup and operating duty.',
    'Use current labels or photos where possible before ordering.',
  ]
}

function buildDisinfectionRfqFields(family) {
  if (family === 'uv-system') {
    return [
      'Required flow rate if known',
      'Installation point',
      'Current UV unit reference if replacing',
      'Quantity required',
    ]
  }

  if (family === 'uv-accessory') {
    return [
      'Current UV system model',
      'Accessory required',
      'Lamp or chamber size if known',
      'Quantity required',
    ]
  }

  if (family === 'chlorination-system') {
    return [
      'Disinfection duty',
      'Plant or line application',
      'Current chlorination reference if replacing',
      'Quantity required',
    ]
  }

  if (family === 'pool-chemical' || family === 'pool-accessory') {
    return [
      'Pool application',
      'Current maintenance or equipment reference',
      'Quantity required',
      'Whether the request is for replacement or routine supply',
    ]
  }

  return [
    'Product name',
    'Application',
    'Quantity required',
    'Installed reference if available',
  ]
}

function buildDisinfectionText(product) {
  const name = normalizeSpaces(product.name)
  const brand = detectBrand(product)
  const family = detectDisinfectionFamily(product)

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''
  let nextSubcategory = product.subcategory

  if (family === 'uv-system') {
    nextSubcategory = 'UV Sterilizers'
    shortDescription = `${name} is listed as a UV disinfection unit used to reduce microbiological risk and support treated-water hygiene in clean-water systems.`
    technicalSummary = `${name} is presented within disinfection systems for buyers sourcing UV sterilization equipment used on potable-water, utility-water, and compact treatment lines. These units should be selected according to flow rate, installation point, and the level of microbiological control required on site. During RFQ, confirm whether the request is for a new UV stage or a direct replacement of an installed sterilizer.`
    seoDescription = `${name} available for UV sterilizer sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'uv-accessory') {
    nextSubcategory = 'UV Accessories'
    shortDescription = `${name} is listed as a UV accessory used to maintain, replace, or complete installed sterilizer systems.`
    technicalSummary = `${name} is presented within disinfection systems for buyers sourcing service parts used on UV sterilizers and related chambers. These accessories should be matched against the exact UV unit series, lamp format, and chamber arrangement already installed on site. For accurate quotation, confirm the current sterilizer model and the specific service part required.`
    seoDescription = `${name} listed for UV accessory sourcing, sterilizer maintenance, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'chlorination-system') {
    nextSubcategory = 'Chlorination Systems'
    shortDescription = `${name} is listed as chlorination equipment used to support chemical disinfection and plant-side sanitizing control.`
    technicalSummary = `${name} is presented within disinfection systems for buyers sourcing chlorination equipment used in treatment plants and managed disinfection lines. These products should be reviewed against the disinfection duty, feed method, and installed plant arrangement before replacement or new-build ordering. During RFQ, confirm whether the item supports a complete chlorination assembly or a specific system replacement need.`
    seoDescription = `${name} available for chlorination-system sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'pool-chemical') {
    nextSubcategory = 'Pool Chemicals'
    shortDescription = `${name} is listed as a pool-care chemical used to support recreational-water sanitation and treatment maintenance.`
    technicalSummary = `${name} is presented within disinfection systems for buyers sourcing swimming-pool chemical products used for sanitation and ongoing water-care routines. These items should be selected according to the maintenance program, treatment objective, and pool operating conditions already in place. For accurate RFQ handling, confirm the intended pool-care use and required supply quantity.`
    seoDescription = `${name} listed for pool chemical sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'pool-accessory') {
    nextSubcategory = 'Pool Accessories'
    shortDescription = `${name} is listed as a pool-service accessory used around cleaning, maintenance, safety, or recreational-water system support.`
    technicalSummary = `${name} is presented within disinfection systems for buyers sourcing accessories used around swimming-pool maintenance and operational support. These items should be selected according to the installed pool arrangement and the specific cleaning, safety, or operating role they support. During RFQ, confirm the accessory function and any size or fit detail tied to the current pool setup.`
    seoDescription = `${name} available for pool accessory sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else {
    shortDescription = `${name} is listed within disinfection systems for buyers reviewing sanitization, UV, or pool-support products used in treated-water environments.`
    technicalSummary = `${name} is presented in the disinfection range for buyers sourcing system components used around sanitization, water hygiene, and service support. The right match depends on the exact disinfection duty and the installation arrangement already in use. During RFQ, confirm the operating context so the replacement path stays accurate.`
    seoDescription = `${name} listed for disinfection-system sourcing and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    subcategory: nextSubcategory,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildDisinfectionApplications(family),
    keyFeatures: buildDisinfectionFeatures(product, family, brand),
    selectionNotes: buildDisinfectionSelectionNotes(family),
    compatibilityNotes: buildDisinfectionCompatibilityNotes(family),
    rfqFields: buildDisinfectionRfqFields(family),
  }
}

function enrichDisinfectionProduct(product) {
  const disinfection = buildDisinfectionText(product)

  return {
    ...product,
    subcategory: disinfection.subcategory,
    summary: disinfection.shortDescription,
    description: disinfection.technicalSummary,
    shortDescription: disinfection.shortDescription,
    technicalSummary: disinfection.technicalSummary,
    applications: disinfection.applications,
    specHighlights: disinfection.keyFeatures,
    keyFeatures: disinfection.keyFeatures,
    selectionNotes: disinfection.selectionNotes,
    compatibilityNotes: disinfection.compatibilityNotes,
    rfqFields: disinfection.rfqFields,
    seoDescription: disinfection.seoDescription,
  }
}

function detectStorageFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()
  const itemGroup = normalizeSpaces(product.itemGroup).toLowerCase()
  const subcategory = normalizeSpaces(product.subcategory).toLowerCase()

  if (/end cap|saddle|straps/.test(name) || /accessories/.test(itemGroup)) {
    return 'vessel-accessory'
  }

  if (/pressure tank/.test(name) || /pressure tanks/.test(itemGroup + subcategory)) {
    return 'pressure-tank'
  }

  if (/frp vessel|4040|8040|300psi|450psi/.test(name) || /wt-vessels/.test(itemGroup)) {
    return 'membrane-vessel'
  }

  if (/frp tank/.test(name) || /wt-frp tanks/.test(itemGroup)) {
    return 'frp-tank'
  }

  if (/chemical|dosing tank|storage tank/.test(name) || /chemical tanks/.test(itemGroup + subcategory)) {
    return 'chemical-tank'
  }

  return 'storage-component'
}

function buildStorageApplications(family) {
  if (family === 'chemical-tank') {
    return [
      'Chemical storage and batching',
      'Dosing-system day tanks and solution holding',
      'Treatment plant chemical handling support',
    ]
  }

  if (family === 'frp-tank') {
    return [
      'Media filtration and softener tank bodies',
      'FRP pressure-tank system builds',
      'Replacement of installed mineral tank shells',
    ]
  }

  if (family === 'pressure-tank') {
    return [
      'Pressure buffering on pump systems',
      'Small booster and domestic pressure support',
      'System stabilization on water-delivery lines',
    ]
  }

  if (family === 'membrane-vessel') {
    return [
      'RO membrane pressure-vessel builds',
      '4040 and 8040 membrane skid replacement work',
      'Packaged treatment-system vessel sourcing',
    ]
  }

  if (family === 'vessel-accessory') {
    return [
      'Membrane-vessel installation support',
      'Pressure-vessel mounting and closure hardware',
      'Replacement accessories for RO vessel assemblies',
    ]
  }

  return [
    'Storage and containment review',
    'Tank or vessel replacement planning',
    'Quotation support for plant storage components',
  ]
}

function buildStorageFeatures(product, family) {
  const features = []

  if (family === 'chemical-tank') {
    features.push('Product family: chemical storage or dosing tank')
  } else if (family === 'frp-tank') {
    features.push('Product family: FRP media or softener tank')
  } else if (family === 'pressure-tank') {
    features.push('Product family: pump pressure tank')
  } else if (family === 'membrane-vessel') {
    features.push('Product family: RO membrane pressure vessel')
  } else if (family === 'vessel-accessory') {
    features.push('Product family: vessel accessory or mounting hardware')
  } else {
    features.push('Product family: storage or tank component')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildStorageSelectionNotes(family) {
  if (family === 'chemical-tank') {
    return [
      'Confirm the chemical in use and the required storage volume before RFQ.',
      'Check whether the tank is for bulk storage, day dosing, or batching duty.',
      'Material compatibility matters where acids, chlorine, or aggressive chemicals are stored.',
    ]
  }

  if (family === 'frp-tank') {
    return [
      'Confirm tank size, service duty, and valve or vessel head arrangement before selection.',
      'Check whether the FRP tank is intended for softening, filtration, or another media application.',
      'Replacement matching is easier when the existing tank size and control-valve size are shared.',
    ]
  }

  if (family === 'pressure-tank') {
    return [
      'Confirm system pressure range and required vessel size before RFQ.',
      'Check whether the request is for pump cycling control, pressure buffering, or line stabilization.',
      'Existing pump details help confirm the right pressure-tank size and duty.',
    ]
  }

  if (family === 'membrane-vessel') {
    return [
      'Confirm membrane size, pressure rating, and vessel length before ordering.',
      'Check whether the requirement is for 4040 or 8040 vessel duty and how many elements are held.',
      'Share the existing vessel nameplate if the replacement model is not fully certain.',
    ]
  }

  if (family === 'vessel-accessory') {
    return [
      'Confirm the exact vessel size and accessory position before RFQ.',
      'Check whether the request is for end closure hardware or mounting support parts.',
      'Installed photos help verify accessory fit on the current vessel arrangement.',
    ]
  }

  return [
    'Confirm storage duty, size, and installation role before RFQ.',
    'Use the current tank or vessel reference where available.',
    'Check whether the request is for a full vessel or a support component.',
  ]
}

function buildStorageCompatibilityNotes(family) {
  if (family === 'chemical-tank') {
    return [
      'Compatibility depends on stored chemical, tank size, and dosing or transfer arrangement.',
      'Do not assume one chemical tank suits every reagent without checking compatibility first.',
    ]
  }

  if (family === 'frp-tank') {
    return [
      'Compatibility depends on tank diameter, height, service pressure, media duty, and valve connection.',
      'FRP media tanks should be matched against the installed head and service application before replacement.',
    ]
  }

  if (family === 'pressure-tank') {
    return [
      'Compatibility depends on pressure setting, vessel size, and the connected pump system.',
      'Pressure tanks should be checked against the control arrangement already installed on site.',
    ]
  }

  if (family === 'membrane-vessel' || family === 'vessel-accessory') {
    return [
      'Compatibility depends on vessel series, membrane size, pressure rating, and mounting arrangement.',
      'Vessel accessories should be matched to the exact 4040 or 8040 assembly already in use.',
    ]
  }

  return [
    'Compatibility should be checked against size, duty, and the installed tank or vessel arrangement.',
    'Use current model details where possible before ordering.',
  ]
}

function buildStorageRfqFields(family) {
  if (family === 'chemical-tank') {
    return [
      'Required volume',
      'Chemical stored',
      'Indoor or outdoor installation',
      'Whether the tank is for storage or dosing duty',
    ]
  }

  if (family === 'frp-tank') {
    return [
      'Tank size',
      'Service duty',
      'Valve or head connection size',
      'Replacement or new installation status',
    ]
  }

  if (family === 'pressure-tank') {
    return [
      'Required tank size',
      'Pump or booster system in use',
      'Operating pressure if known',
      'Quantity required',
    ]
  }

  if (family === 'membrane-vessel' || family === 'vessel-accessory') {
    return [
      'Vessel size or model',
      'Pressure rating if known',
      '4040 or 8040 system confirmation',
      'Photo or current nameplate if available',
    ]
  }

  return [
    'Product name',
    'Application',
    'Quantity required',
    'Replacement or new installation status',
  ]
}

function buildStorageText(product) {
  const name = normalizeSpaces(product.name)
  const family = detectStorageFamily(product)

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''
  let nextSubcategory = product.subcategory

  if (family === 'chemical-tank') {
    nextSubcategory = 'Chemical Storage Tanks'
    shortDescription = `${name} is listed as a chemical storage or dosing tank for buyers handling reagent storage, batching, or chemical-feed support within treatment systems.`
    technicalSummary = `${name} is presented within storage and tanks for buyers sourcing chemical holding tanks used in treatment plants, dosing systems, and utility-water operations. These tanks should be selected against required volume, stored chemical, installation environment, and whether the duty is bulk storage or day-tank dosing support. For accurate quotation, confirm the chemical service and the tank capacity expected on site.`
    seoDescription = `${name} available for chemical storage tank sourcing, dosing-tank review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'frp-tank') {
    nextSubcategory = 'FRP Tanks'
    shortDescription = `${name} is listed as an FRP tank body used for media filtration, softening, or related pressure-tank treatment duties.`
    technicalSummary = `${name} is presented within storage and tanks for buyers sourcing FRP media-tank bodies used in filtration and softener system builds. These tanks are normally reviewed by size, service duty, operating pressure, and the valve or control-head arrangement already installed on the unit. During RFQ, confirm the tank dimensions and whether the request is for a replacement shell or a new treatment build.`
    seoDescription = `${name} listed for FRP tank sourcing, filtration vessel review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'pressure-tank') {
    nextSubcategory = 'Pressure Tanks'
    shortDescription = `${name} is listed as a pressure tank used to buffer line pressure, reduce pump cycling, and stabilize water-delivery systems.`
    technicalSummary = `${name} is presented within storage and tanks for buyers sourcing pressure-buffer vessels used on pump and booster systems. Pressure tanks should be selected against system pressure, tank size, and the operating role they support in the delivery line. For accurate RFQ handling, confirm the connected pump arrangement and whether the tank is being replaced due to loss of pressure stability or capacity.`
    seoDescription = `${name} available for pressure tank sourcing, pump buffering review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'membrane-vessel') {
    nextSubcategory = 'Pressure Vessels'
    shortDescription = `${name} is listed as an RO membrane pressure vessel used to house membrane elements in packaged treatment and desalination systems.`
    technicalSummary = `${name} is presented within storage and tanks for buyers sourcing FRP pressure vessels used on reverse osmosis membrane skids. These vessels should be checked against membrane size, pressure rating, element count, and the existing skid arrangement before replacement or new-build ordering. During RFQ, confirm whether the duty is 4040 or 8040 membrane service and share the current vessel reference if available.`
    seoDescription = `${name} listed for RO pressure vessel sourcing, membrane skid replacement, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'vessel-accessory') {
    nextSubcategory = 'Vessel Accessories'
    shortDescription = `${name} is listed as a vessel accessory used to support the closure, mounting, or installation of FRP membrane pressure vessels.`
    technicalSummary = `${name} is presented within storage and tanks for buyers sourcing support components used on FRP membrane-vessel assemblies. These accessories should be matched to the exact vessel size and arrangement already installed, especially where end closures, saddles, or strap kits are involved. For clean replacement matching, confirm the vessel series and installation layout during RFQ.`
    seoDescription = `${name} available for membrane vessel accessory sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else {
    shortDescription = `${name} is listed within storage and tanks for buyers reviewing containment, vessel, or installation-support products used in treatment systems.`
    technicalSummary = `${name} is presented in the storage and tanks range for buyers sourcing system-containment products used around treatment, dosing, and pump installations. The right match depends on the stored medium, size, and installation role expected on site. During RFQ, confirm the operating duty and whether the request is for a full tank body or a support component.`
    seoDescription = `${name} listed for industrial storage and tank sourcing and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    subcategory: nextSubcategory,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildStorageApplications(family),
    keyFeatures: buildStorageFeatures(product, family),
    selectionNotes: buildStorageSelectionNotes(family),
    compatibilityNotes: buildStorageCompatibilityNotes(family),
    rfqFields: buildStorageRfqFields(family),
  }
}

function enrichStorageProduct(product) {
  const storage = buildStorageText(product)

  return {
    ...product,
    subcategory: storage.subcategory,
    summary: storage.shortDescription,
    description: storage.technicalSummary,
    shortDescription: storage.shortDescription,
    technicalSummary: storage.technicalSummary,
    applications: storage.applications,
    specHighlights: storage.keyFeatures,
    keyFeatures: storage.keyFeatures,
    selectionNotes: storage.selectionNotes,
    compatibilityNotes: storage.compatibilityNotes,
    rfqFields: storage.rfqFields,
    seoDescription: storage.seoDescription,
  }
}

function detectAutomationFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()
  const itemGroup = normalizeSpaces(product.itemGroup).toLowerCase()
  const subcategory = normalizeSpaces(product.subcategory).toLowerCase()

  if (/inverter|veichi/.test(name) || /solar items/.test(itemGroup)) {
    return 'drive'
  }

  if (/cable/.test(name) || /cables/.test(itemGroup)) {
    return 'cable'
  }

  if (
    /pressure switch|kp35|kp352|kp36|kpu|acb cartridge|thermostat|network pressure management|toggle switch/.test(
      name,
    ) ||
    /pressure switch|danfoss/.test(itemGroup)
  ) {
    return 'pressure-switch'
  }

  if (/module|emergency stop|pump start|indicator|phase indicator|panel series/.test(name) || /control panels/.test(subcategory)) {
    return 'control-panel'
  }

  return 'control-component'
}

function buildAutomationApplications(family) {
  if (family === 'control-panel') {
    return [
      'Pump panel assembly and maintenance',
      'Motor-start and operator control stations',
      'Treatment-system electrical panel support',
    ]
  }

  if (family === 'pressure-switch') {
    return [
      'Pressure-based control and cut-in or cut-out protection',
      'RO system high-pressure and low-pressure switching',
      'Pump-line automation and interlock review',
    ]
  }

  if (family === 'cable') {
    return [
      'Control-panel wiring and field connections',
      'Submersible and plant-side cable replacement',
      'Electrical installation support for water systems',
    ]
  }

  if (family === 'drive') {
    return [
      'Motor speed control and soft-start review',
      'Pump automation and energy-optimization support',
      'Drive integration in treatment or solar-linked systems',
    ]
  }

  return [
    'Automation and plant-control review',
    'Replacement planning for electrical control items',
    'RFQ support for installed control-system components',
  ]
}

function buildAutomationFeatures(product, family, brand) {
  const features = []

  if (brand) {
    features.push(`Brand: ${brand}`)
  }

  if (family === 'control-panel') {
    features.push('Product family: panel-control component')
  } else if (family === 'pressure-switch') {
    features.push('Product family: pressure switch or control sensor')
  } else if (family === 'cable') {
    features.push('Product family: electrical cable or wiring accessory')
  } else if (family === 'drive') {
    features.push('Product family: inverter or motor-control drive')
  } else {
    features.push('Product family: automation and control component')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildAutomationSelectionNotes(family) {
  if (family === 'control-panel') {
    return [
      'Confirm panel function and the control role of the item before RFQ.',
      'Check whether the request is for a switch, indicator, push button, or panel module.',
      'Share the current panel layout or component reference where replacement certainty matters.',
    ]
  }

  if (family === 'pressure-switch') {
    return [
      'Confirm the operating pressure range and the control duty before selection.',
      'Check whether the switch is used for RO protection, pump cut-out, or another pressure trigger point.',
      'Installed photos or existing switch labels help avoid mismatch on replacement.',
    ]
  }

  if (family === 'cable') {
    return [
      'Confirm cable size, core count, and installation environment before RFQ.',
      'Check whether the cable is for panel wiring, underground duty, or submersible service.',
      'Do not substitute cable type without confirming the application and routing conditions.',
    ]
  }

  if (family === 'drive') {
    return [
      'Confirm motor power, voltage, and phase before selecting an inverter or drive.',
      'Check whether the drive is for pump speed control, solar-linked duty, or general motor automation.',
      'Installed motor details help verify sizing before quotation.',
    ]
  }

  return [
    'Confirm the exact control function before RFQ.',
    'Use the current model or installed photo where available.',
    'Check whether the item is field wiring, switching, or panel-control hardware.',
  ]
}

function buildAutomationCompatibilityNotes(family) {
  if (family === 'control-panel') {
    return [
      'Compatibility depends on panel design, voltage, mounting style, and control logic.',
      'Panel components should be matched against the installed panel arrangement before replacement.',
    ]
  }

  if (family === 'pressure-switch') {
    return [
      'Compatibility depends on pressure range, connection style, and the control duty it performs.',
      'A visually similar pressure switch can still be wrong if the switching setpoint differs.',
    ]
  }

  if (family === 'cable') {
    return [
      'Compatibility depends on conductor size, number of cores, insulation type, and installation conditions.',
      'Control and submersible cables should not be interchanged without confirming duty.',
    ]
  }

  if (family === 'drive') {
    return [
      'Compatibility depends on motor power, control method, voltage, phase, and enclosure environment.',
      'Drives should be matched to the connected motor and automation arrangement before replacement.',
    ]
  }

  return [
    'Compatibility should be checked against voltage, control role, and installed panel arrangement.',
    'Use current component references where possible before ordering.',
  ]
}

function buildAutomationRfqFields(family) {
  if (family === 'control-panel') {
    return [
      'Panel function or control role',
      'Voltage if known',
      'Existing component reference',
      'Quantity required',
    ]
  }

  if (family === 'pressure-switch') {
    return [
      'Operating pressure range',
      'Switching duty',
      'Connection type if known',
      'Replacement or new installation status',
    ]
  }

  if (family === 'cable') {
    return [
      'Cable size',
      'Core count',
      'Installation environment',
      'Required length or quantity',
    ]
  }

  if (family === 'drive') {
    return [
      'Motor power',
      'Voltage and phase',
      'Control application',
      'Replacement or new installation status',
    ]
  }

  return [
    'Product name',
    'Application',
    'Quantity required',
    'Installed reference if available',
  ]
}

function buildAutomationText(product) {
  const name = normalizeSpaces(product.name)
  const brand = detectBrand(product)
  const family = detectAutomationFamily(product)

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''
  let nextSubcategory = product.subcategory

  if (family === 'control-panel') {
    nextSubcategory = 'Control Panels'
    shortDescription = `${name} is listed as a panel-control component used for switching, indication, or operator control in pump and treatment automation systems.`
    technicalSummary = `${name} is presented within automation and control for buyers sourcing panel-side components used on pump panels, treatment skids, and electrical control stations. These items should be selected according to their control role, voltage, mounting arrangement, and the specific panel function they support. During RFQ, confirm the installed panel use case and whether the requirement is for replacement maintenance or new panel assembly.`
    seoDescription = `${name} available for control-panel component sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'pressure-switch') {
    nextSubcategory = 'Pressure Switches'
    shortDescription = `${name} is listed as a pressure-switch or control-sensing item used to trigger, protect, or regulate pump and RO system operation.`
    technicalSummary = `${name} is presented within automation and control for buyers sourcing pressure-activated switching and protection components used on RO systems, pump lines, and automation interlocks. These products should be selected against the operating pressure range, switching duty, and control logic expected at the installation point. For accurate RFQ handling, confirm the setpoint requirement and whether the item supports high-pressure protection, low-pressure cutout, or general line control.`
    seoDescription = `${name} listed for pressure switch sourcing, control protection review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'cable') {
    nextSubcategory = 'Cables & Wiring'
    shortDescription = `${name} is listed as an electrical cable or wiring item used for pump controls, field installation, or submersible system connections.`
    technicalSummary = `${name} is presented within automation and control for buyers sourcing plant-side wiring and cable items used in control panels, field routing, and water-system electrical connections. These products should be selected according to cable size, core count, insulation type, and the environment in which they will be installed. For accurate quotation, confirm whether the cable is for panel duty, underground routing, or submersible service.`
    seoDescription = `${name} available for control-system cable sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'drive') {
    nextSubcategory = 'Drives & Inverters'
    shortDescription = `${name} is listed as an inverter or motor-control drive used to support pump automation, speed control, and electrical efficiency.`
    technicalSummary = `${name} is presented within automation and control for buyers sourcing motor drives and inverter hardware used on pump systems and treatment installations. These products should be reviewed against motor power, voltage, phase, and the control method required on site before replacement or new-build selection. During RFQ, confirm the connected motor details and whether the drive supports process control, energy saving, or solar-linked operation.`
    seoDescription = `${name} listed for inverter and drive sourcing, pump automation review, and RFQ support from Vortexus Industrial Excellence.`
  } else {
    shortDescription = `${name} is listed within automation and control for buyers reviewing electrical control and system-automation components used in water-treatment and pump installations.`
    technicalSummary = `${name} is presented in the automation and control range for buyers sourcing installed electrical-control components used on treatment and pumping systems. The correct fit depends on the function, voltage, and control arrangement already in use. During RFQ, confirm the component role and the installed system context so the replacement path stays accurate.`
    seoDescription = `${name} listed for automation and control sourcing and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    subcategory: nextSubcategory,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildAutomationApplications(family),
    keyFeatures: buildAutomationFeatures(product, family, brand),
    selectionNotes: buildAutomationSelectionNotes(family),
    compatibilityNotes: buildAutomationCompatibilityNotes(family),
    rfqFields: buildAutomationRfqFields(family),
  }
}

function enrichAutomationProduct(product) {
  const automation = buildAutomationText(product)

  return {
    ...product,
    subcategory: automation.subcategory,
    summary: automation.shortDescription,
    description: automation.technicalSummary,
    shortDescription: automation.shortDescription,
    technicalSummary: automation.technicalSummary,
    applications: automation.applications,
    specHighlights: automation.keyFeatures,
    keyFeatures: automation.keyFeatures,
    selectionNotes: automation.selectionNotes,
    compatibilityNotes: automation.compatibilityNotes,
    rfqFields: automation.rfqFields,
    seoDescription: automation.seoDescription,
  }
}

function detectSparePartsFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()
  const itemGroup = normalizeSpaces(product.itemGroup).toLowerCase()
  const subcategory = normalizeSpaces(product.subcategory).toLowerCase()

  if (/air release valve|air valve|needle valve|drain valve|flow sensor/.test(name) || /valve spare parts/.test(subcategory)) {
    return 'valve-spare'
  }

  if (/membrane connectors|end cap|endcap|holder|hm 90/.test(name) || /membranes accessories/.test(itemGroup)) {
    return 'membrane-accessory'
  }

  if (/booster pump|adapter|faucet|uv enclosure|silicone|lubricant/.test(name) || /purifier accessories/.test(itemGroup)) {
    return 'purifier-accessory'
  }

  return 'service-component'
}

function buildSparePartsApplications(family) {
  if (family === 'valve-spare') {
    return [
      'Valve-line replacement and service maintenance',
      'Small-part support for installed treatment skids',
      'Replacement of control and service-line components',
    ]
  }

  if (family === 'membrane-accessory') {
    return [
      'RO membrane vessel assembly support',
      'Membrane connection and end-hardware replacement',
      'Pressure-vessel maintenance planning',
    ]
  }

  if (family === 'purifier-accessory') {
    return [
      'Undersink RO and purifier maintenance support',
      'Replacement of accessory parts around compact purifier systems',
      'Small-component sourcing for service and repair work',
    ]
  }

  return [
    'Replacement-part sourcing',
    'Service support for installed equipment',
    'RFQ review for maintenance items',
  ]
}

function buildSparePartsFeatures(product, family) {
  const features = []

  if (family === 'valve-spare') {
    features.push('Product family: valve spare or line-service component')
  } else if (family === 'membrane-accessory') {
    features.push('Product family: membrane accessory or vessel connector')
  } else if (family === 'purifier-accessory') {
    features.push('Product family: purifier accessory or compact-system service part')
  } else {
    features.push('Product family: spare part or service component')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildSparePartsSelectionNotes(family) {
  if (family === 'valve-spare') {
    return [
      'Confirm size, line role, and installed part reference before RFQ.',
      'Check whether the part supports venting, isolation, sensor pickup, or drain duty.',
      'Small service-line parts should be matched carefully against the installed assembly.',
    ]
  }

  if (family === 'membrane-accessory') {
    return [
      'Confirm whether the accessory is for 4040, 8040, or another membrane assembly before ordering.',
      'Check whether the request is for connection hardware, end closure, or holder support.',
      'Current vessel photos help verify the right membrane accessory quickly.',
    ]
  }

  if (family === 'purifier-accessory') {
    return [
      'Confirm the purifier or undersink RO model before RFQ.',
      'Check whether the request is for a pump, adapter, faucet, UV support part, or service consumable.',
      'Replacement matching is easier when the current accessory photo is shared.',
    ]
  }

  return [
    'Confirm the installed system and exact part function before RFQ.',
    'Use the current part reference where available.',
    'Check whether the request is for direct replacement or service stocking.',
  ]
}

function buildSparePartsCompatibilityNotes(family) {
  if (family === 'valve-spare') {
    return [
      'Compatibility depends on line size, service role, and the assembly already installed.',
      'A similar-looking valve spare can still be wrong if the duty or thread arrangement differs.',
    ]
  }

  if (family === 'membrane-accessory') {
    return [
      'Compatibility depends on membrane series, vessel size, and accessory position in the assembly.',
      'Membrane accessories should be matched to the exact vessel arrangement before replacement.',
    ]
  }

  if (family === 'purifier-accessory') {
    return [
      'Compatibility depends on purifier model, accessory style, and the service arrangement already in use.',
      'Compact purifier parts should be checked against the installed system before ordering.',
    ]
  }

  return [
    'Compatibility should be checked against the installed part and service duty before ordering.',
    'Use current photos or labels where possible.',
  ]
}

function buildSparePartsRfqFields(family) {
  if (family === 'valve-spare') {
    return [
      'Part size if known',
      'Installed use or duty',
      'Existing part reference',
      'Quantity required',
    ]
  }

  if (family === 'membrane-accessory') {
    return [
      '4040 or 8040 system confirmation',
      'Accessory type required',
      'Current vessel or membrane reference',
      'Quantity required',
    ]
  }

  if (family === 'purifier-accessory') {
    return [
      'Purifier or RO model',
      'Accessory required',
      'Existing part reference',
      'Quantity required',
    ]
  }

  return [
    'Product name',
    'Installed system',
    'Quantity required',
    'Replacement reference if available',
  ]
}

function buildSparePartsText(product) {
  const name = normalizeSpaces(product.name)
  const family = detectSparePartsFamily(product)

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''
  let nextSubcategory = product.subcategory

  if (family === 'valve-spare') {
    nextSubcategory = 'Valve Spare Parts'
    shortDescription = `${name} is listed as a valve spare or service-line part used to maintain, vent, drain, or support fluid-control assemblies in treatment systems.`
    technicalSummary = `${name} is presented within spare parts and components for buyers sourcing replacement items used on valve lines, service drains, and small installed assemblies around treatment equipment. These parts should be selected according to size, duty, and the exact installed arrangement already in use. During RFQ, confirm the current part role and connection standard so the replacement path stays accurate.`
    seoDescription = `${name} available for valve spare sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'membrane-accessory') {
    nextSubcategory = 'Membrane Accessories'
    shortDescription = `${name} is listed as a membrane accessory used to connect, hold, or complete pressure-vessel membrane assemblies.`
    technicalSummary = `${name} is presented within spare parts and components for buyers sourcing accessories used on RO membrane vessels and related pressure assemblies. These items should be matched against membrane size, vessel series, and accessory position before ordering. For accurate quotation, confirm whether the accessory supports 4040 or 8040 systems and share the current vessel reference where possible.`
    seoDescription = `${name} listed for membrane accessory sourcing, vessel service support, and RFQ review from Vortexus Industrial Excellence.`
  } else if (family === 'purifier-accessory') {
    nextSubcategory = 'Purifier Accessories'
    shortDescription = `${name} is listed as a purifier accessory or compact-system service part used around undersink RO and related small treatment units.`
    technicalSummary = `${name} is presented within spare parts and components for buyers sourcing service items used on compact purifier and undersink RO systems. These accessories should be selected against the installed unit model and the exact maintenance role they support, whether pump-side, faucet-side, UV-side, or general service replacement. During RFQ, confirm the current purifier arrangement so the accessory is matched correctly.`
    seoDescription = `${name} available for purifier accessory sourcing and RFQ support from Vortexus Industrial Excellence.`
  } else {
    shortDescription = `${name} is listed within spare parts and components for buyers reviewing service parts used on installed treatment equipment.`
    technicalSummary = `${name} is presented in the spare-parts range for buyers sourcing maintenance items used around treatment systems and installed hardware. The right match depends on the exact part function and the system already in service. During RFQ, confirm the current assembly or part reference before replacement ordering.`
    seoDescription = `${name} listed for spare-parts sourcing and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    subcategory: nextSubcategory,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildSparePartsApplications(family),
    keyFeatures: buildSparePartsFeatures(product, family),
    selectionNotes: buildSparePartsSelectionNotes(family),
    compatibilityNotes: buildSparePartsCompatibilityNotes(family),
    rfqFields: buildSparePartsRfqFields(family),
  }
}

function enrichSparePartsProduct(product) {
  const spare = buildSparePartsText(product)

  return {
    ...product,
    subcategory: spare.subcategory,
    summary: spare.shortDescription,
    description: spare.technicalSummary,
    shortDescription: spare.shortDescription,
    technicalSummary: spare.technicalSummary,
    applications: spare.applications,
    specHighlights: spare.keyFeatures,
    keyFeatures: spare.keyFeatures,
    selectionNotes: spare.selectionNotes,
    compatibilityNotes: spare.compatibilityNotes,
    rfqFields: spare.rfqFields,
    seoDescription: spare.seoDescription,
  }
}

function detectFluidBrand(product) {
  return detectBrand(product)
}

function detectFluidFamily(product) {
  const name = normalizeSpaces(product.name).toLowerCase()
  const itemGroup = normalizeSpaces(product.itemGroup).toLowerCase()
  const subcategory = normalizeSpaces(product.subcategory).toLowerCase()

  if (
    /well probe|level switch|junction box|drop pipe|float switch|cable ties|borehole cover/.test(name) ||
    /borehole accessories/.test(itemGroup)
  ) {
    return 'pump-accessory'
  }

  if (/seko|dosing pump|liquid transfer|arkad/.test(name + itemGroup) || /dosing pumps/.test(subcategory)) {
    return 'dosing-pump'
  }

  if (/booster|pump skids|pressure booster/.test(name) || /booster pumps/.test(subcategory)) {
    return 'booster-pump'
  }

  if (/valve|joint|non return/.test(name) || /valves/.test(subcategory) || /mpvs|gi fittings|atlas|auxin|certikin|xylem/.test(itemGroup)) {
    return 'valve'
  }

  if (
    /pipe|elbow|union|adapter|adaptor|socket|bush|connector|clip/.test(name) ||
    /pvc fittings|ppr fittings|pu fittings/.test(itemGroup)
  ) {
    return 'pipe-fitting'
  }

  if (/submersible pump|qdx/.test(name) || /submersible pumps/.test(subcategory)) {
    return 'submersible-pump'
  }

  if (
    /centrifugal|multistage|peripheral|circulation pumps|vertical pump|lowara|xylem nb|leo pump|cnp |15sv|acm |xqm |xtc /.test(
      name,
    ) ||
    /centrifugal pumps/.test(subcategory)
  ) {
    return 'centrifugal-pump'
  }

  return 'fluid-component'
}

function buildFluidApplications(family) {
  if (family === 'centrifugal-pump') {
    return [
      'Clean-water transfer and process circulation',
      'Pressure boosting and utility-water delivery',
      'Skid integration for treatment and service lines',
    ]
  }

  if (family === 'booster-pump') {
    return [
      'Pressure boosting systems',
      'Building or plant water delivery support',
      'Packaged pump-set review and quotation planning',
    ]
  }

  if (family === 'submersible-pump') {
    return [
      'Submerged pumping and borehole duty',
      'Drainage or raw-water lifting support',
      'Water abstraction and transfer applications',
    ]
  }

  if (family === 'dosing-pump') {
    return [
      'Metered chemical dosing',
      'Treatment chemical feed points',
      'Low-flow process injection support',
    ]
  }

  if (family === 'valve') {
    return [
      'Flow isolation and line control',
      'Pump-line maintenance and shutoff support',
      'Pressure-side piping and serviceability review',
    ]
  }

  if (family === 'pipe-fitting') {
    return [
      'Line routing and pipe connection support',
      'Pump discharge and suction-side fittings',
      'Water-transfer and utility piping assemblies',
    ]
  }

  if (family === 'pump-accessory') {
    return [
      'Pump installation and support accessories',
      'Borehole and submersible line setup',
      'Electrical or mounting-side pump support',
    ]
  }

  return [
    'Fluid-handling system support',
    'Replacement planning for installed equipment',
    'Quotation review for line components and pumps',
  ]
}

function buildFluidFeatures(product, family, brand) {
  const features = []

  if (brand) {
    features.push(`Brand: ${brand}`)
  }

  if (family === 'centrifugal-pump') {
    features.push('Product family: centrifugal or multistage pump')
  } else if (family === 'booster-pump') {
    features.push('Product family: booster set or pressure booster')
  } else if (family === 'submersible-pump') {
    features.push('Product family: submersible pump')
  } else if (family === 'dosing-pump') {
    features.push('Product family: dosing or metering pump')
  } else if (family === 'valve') {
    features.push('Product family: valve or line-control component')
  } else if (family === 'pipe-fitting') {
    features.push('Product family: pipe or fitting component')
  } else if (family === 'pump-accessory') {
    features.push('Product family: pump or borehole accessory')
  } else {
    features.push('Product family: fluid-handling component')
  }

  if (product.itemGroup) {
    features.push(`Stock group: ${product.itemGroup}`)
  }

  return features
}

function buildFluidSelectionNotes(family) {
  if (family === 'centrifugal-pump') {
    return [
      'Confirm flow rate, head, and fluid type before selecting a centrifugal pump.',
      'Check voltage, phase, and material suitability where shown in the model name.',
      'For replacement pumps, share the old nameplate or duty point if available.',
    ]
  }

  if (family === 'booster-pump') {
    return [
      'Confirm required delivery pressure, duty cycle, and installation environment.',
      'Check whether the request is for a single pump, booster set, or skid assembly.',
      'A site photo or current booster details help confirm the right system layout.',
    ]
  }

  if (family === 'submersible-pump') {
    return [
      'Confirm borehole or submerged duty before ordering.',
      'Check lifting head, flow target, and cable or control accessory requirements.',
      'For existing installations, share the current pump or line details during RFQ.',
    ]
  }

  if (family === 'dosing-pump') {
    return [
      'Confirm the chemical, dosing rate, and back pressure before selecting a dosing pump.',
      'Check whether the item is a complete dosing pump or a compatible dosing component.',
      'Material compatibility matters wherever chemical feed is involved.',
    ]
  }

  if (family === 'valve') {
    return [
      'Confirm valve size, connection type, and service duty before ordering.',
      'Check whether the valve is manual, electric, pneumatic, or a dismantling joint arrangement.',
      'Installed line photos help verify the right replacement path quickly.',
    ]
  }

  if (family === 'pipe-fitting') {
    return [
      'Confirm pipe size, fitting type, and material before RFQ.',
      'Check whether the fitting is PVC, PPR, PU, GI, or another line standard.',
      'Do not rely on appearance alone where multiple line systems are already installed.',
    ]
  }

  if (family === 'pump-accessory') {
    return [
      'Confirm the accessory function before ordering, especially on borehole or submersible installations.',
      'Check whether the item supports control, mounting, cable management, or rising main setup.',
      'Installed photos or old part references help avoid accessory mismatches.',
    ]
  }

  return [
    'Confirm model, size, and installation duty before RFQ.',
    'Use the old product code or installed photo where available.',
    'Check whether the item is a pump, line component, or system accessory.',
  ]
}

function buildFluidCompatibilityNotes(family) {
  if (family === 'centrifugal-pump' || family === 'booster-pump' || family === 'submersible-pump') {
    return [
      'Compatibility depends on hydraulic duty, power supply, connection size, and system arrangement.',
      'A visually similar pump can still be wrong if the duty point and electrical conditions do not match.',
    ]
  }

  if (family === 'dosing-pump') {
    return [
      'Compatibility depends on chemical type, dosing range, tubing or connection format, and control method.',
      'Dosing equipment should be reviewed against the existing feed system before replacement.',
    ]
  }

  if (family === 'valve' || family === 'pipe-fitting') {
    return [
      'Compatibility should be checked against line size, pressure class, material standard, and connection type.',
      'Do not assume all fittings or valves interchange across PVC, GI, PPR, PU, and flange systems.',
    ]
  }

  if (family === 'pump-accessory') {
    return [
      'Compatibility depends on the installed pump arrangement and the accessory function it supports.',
      'Borehole and submersible accessories should be checked against the existing installation layout.',
    ]
  }

  return [
    'Compatibility should be checked against the installed equipment, line standard, and operating duty.',
    'Use photos or old nameplates where model certainty is low.',
  ]
}

function buildFluidRfqFields(family) {
  if (family === 'centrifugal-pump' || family === 'booster-pump' || family === 'submersible-pump') {
    return [
      'Required flow rate and head if known',
      'Voltage and phase',
      'Application or installation point',
      'Whether the request is for replacement or new installation',
    ]
  }

  if (family === 'dosing-pump') {
    return [
      'Chemical to be dosed',
      'Required dosing rate',
      'Pressure or back-pressure conditions',
      'Whether the request is for a full pump or spare-compatible component',
    ]
  }

  if (family === 'valve' || family === 'pipe-fitting') {
    return [
      'Line size',
      'Connection or fitting type',
      'Material standard if known',
      'Quantity required',
    ]
  }

  if (family === 'pump-accessory') {
    return [
      'Pump type or installation supported',
      'Accessory function',
      'Size or length where relevant',
      'Photo of the installed setup if available',
    ]
  }

  return [
    'Product name',
    'Application',
    'Quantity required',
    'Replacement or new installation status',
  ]
}

function buildFluidText(product) {
  const name = normalizeSpaces(product.name)
  const brand = detectFluidBrand(product)
  const family = detectFluidFamily(product)

  const customCnpPumps = {
    'CNP Vertical Inline Centrifugal Pump': {
      subcategory: 'Centrifugal Pumps',
      shortDescription:
        'Compact vertical inline centrifugal pump designed for pressure boosting, HVAC circulation, water transfer, and industrial piping systems.',
      technicalSummary:
        'Compact vertical inline centrifugal pump designed for pressure boosting, HVAC circulation, water transfer, and industrial piping systems. Space-saving design delivers efficient flow performance, stable pressure, and reliable continuous operation.',
      seoDescription:
        'CNP Vertical Inline Centrifugal Pump available for pressure boosting, HVAC circulation, and industrial water transfer RFQ review from Vortexus Industrial Excellence.',
      applications: ['Pressure boosting', 'HVAC circulation', 'Industrial piping systems'],
      keyFeatures: [
        'Pump family: Vertical inline centrifugal',
        'Designed for compact installation footprints',
        'Supports stable pressure and continuous-duty circulation',
      ],
    },
    'CNP Blue Cast Iron End-Suction Centrifugal Pump': {
      subcategory: 'Centrifugal Pumps',
      shortDescription:
        'Heavy-duty cast iron end-suction centrifugal pump designed for high-flow water transfer, pressure boosting, and industrial circulation systems.',
      technicalSummary:
        'Heavy-duty cast iron end-suction centrifugal pump designed for high-flow water transfer, pressure boosting, and industrial circulation systems. Durable construction ensures reliable performance, efficient operation, and long service life in demanding applications.',
      seoDescription:
        'CNP Blue Cast Iron End-Suction Centrifugal Pump listed for high-flow transfer, pressure boosting, and industrial circulation RFQ support from Vortexus Industrial Excellence.',
      applications: ['High-flow water transfer', 'Pressure boosting', 'Industrial circulation systems'],
      keyFeatures: [
        'Pump family: End-suction centrifugal',
        'Cast iron construction for demanding duty',
        'Built for continuous industrial transfer performance',
      ],
    },
    'CNP Vertical Multistage Centrifugal Pump': {
      subcategory: 'Centrifugal Pumps',
      shortDescription:
        'High-pressure vertical multistage centrifugal pump engineered for efficient water boosting, RO systems, filtration plants, and industrial applications.',
      technicalSummary:
        'High-pressure vertical multistage centrifugal pump engineered for efficient water boosting, RO systems, filtration plants, and industrial applications. Compact stainless steel construction delivers stable pressure, energy efficiency, and long operational life.',
      seoDescription:
        'CNP Vertical Multistage Centrifugal Pump available for RO systems, filtration plants, and high-pressure boosting RFQ review from Vortexus Industrial Excellence.',
      applications: ['RO systems', 'Filtration plants', 'High-pressure water boosting'],
      keyFeatures: [
        'Pump family: Vertical multistage centrifugal',
        'Compact stainless steel construction',
        'Built for stable pressure and energy-efficient operation',
      ],
    },
    'CNP Stainless Steel Horizontal Centrifugal Pump': {
      subcategory: 'Centrifugal Pumps',
      shortDescription:
        'High-performance stainless steel horizontal centrifugal pump designed for clean water transfer, pressure boosting, and industrial fluid handling.',
      technicalSummary:
        'High-performance stainless steel horizontal centrifugal pump designed for clean water transfer, pressure boosting, and industrial fluid handling. Corrosion-resistant construction ensures durability, efficient operation, and dependable long-term performance.',
      seoDescription:
        'CNP Stainless Steel Horizontal Centrifugal Pump listed for clean water transfer, pressure boosting, and fluid handling RFQ support from Vortexus Industrial Excellence.',
      applications: ['Clean water transfer', 'Pressure boosting', 'Industrial fluid handling'],
      keyFeatures: [
        'Pump family: Horizontal centrifugal',
        'Corrosion-resistant stainless steel construction',
        'Designed for dependable long-term process support',
      ],
    },
  }

  const customCnpPump = customCnpPumps[name]
  if (customCnpPump) {
    return {
      subcategory: customCnpPump.subcategory,
      shortDescription: customCnpPump.shortDescription,
      technicalSummary: customCnpPump.technicalSummary,
      seoDescription: customCnpPump.seoDescription,
      applications: customCnpPump.applications,
      keyFeatures: customCnpPump.keyFeatures,
      selectionNotes: buildFluidSelectionNotes('centrifugal-pump'),
      compatibilityNotes: buildFluidCompatibilityNotes('centrifugal-pump'),
      rfqFields: buildFluidRfqFields('centrifugal-pump'),
    }
  }

  let shortDescription = ''
  let technicalSummary = ''
  let seoDescription = ''
  let nextSubcategory = product.subcategory

  if (family === 'centrifugal-pump') {
    nextSubcategory = 'Centrifugal Pumps'
    shortDescription = `${name} is listed as a centrifugal or multistage pump for buyers reviewing clean-water transfer, pressure boosting, or circulation duties in industrial water systems.`
    technicalSummary = `${name} is presented within pumps and fluid handling for buyers sourcing centrifugal pump equipment used in transfer, circulation, and pressure-support applications. These pumps should be selected against flow rate, head, power supply, fluid condition, and installation arrangement rather than appearance alone. For accurate quotation, confirm the required hydraulic duty and whether the request is for direct replacement or a new system build.`
    seoDescription = `${name} available for centrifugal pump sourcing, water transfer review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'booster-pump') {
    nextSubcategory = 'Booster Pumps'
    shortDescription = `${name} is listed as a booster or packaged pressure-support product for buyers who need stable delivery pressure in building, plant, or treatment-water systems.`
    technicalSummary = `${name} is presented within booster pumping for buyers sourcing pressure-support equipment used in water delivery and packaged pump-set applications. Booster products should be reviewed against delivery pressure target, operating cycle, installation environment, and whether the requirement is for a single pump or a complete pressure-boosting assembly. During RFQ, the current site pressure problem and required output should be confirmed clearly.`
    seoDescription = `${name} listed for booster pump sourcing, pressure-support systems, and RFQ review from Vortexus Industrial Excellence.`
  } else if (family === 'submersible-pump') {
    nextSubcategory = 'Submersible Pumps'
    shortDescription = `${name} is listed for submersible or submerged-duty pumping where water abstraction, lifting, or borehole-linked operation must be supported reliably.`
    technicalSummary = `${name} is presented within submersible pumping for buyers sourcing submerged-duty equipment or pump-linked line items tied to borehole and lifting applications. Selection depends on head, flow, installation depth, and any connected control or line-support accessories required at site. For clean RFQ matching, confirm the installation arrangement and whether the item is the pump itself or an accessory supporting the pump line.`
    seoDescription = `${name} available for submersible pump applications, borehole duty review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'dosing-pump') {
    nextSubcategory = 'Dosing Pumps'
    shortDescription = `${name} is listed as dosing or liquid-transfer equipment used for controlled chemical feed and low-flow process injection in treatment systems.`
    technicalSummary = `${name} is presented within dosing pumps for buyers sourcing chemical-feed equipment and compatible dosing components. Dosing products should be selected according to the chemical in use, required dosing rate, back pressure, and control method expected at the installation point. Before quotation, confirm the process chemical and whether the requirement is for a full dosing pump or a system-compatible replacement item.`
    seoDescription = `${name} listed for dosing pump sourcing, chemical feed review, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'valve') {
    nextSubcategory = 'Valves'
    shortDescription = `${name} is listed as a valve or line-control component used to isolate, regulate, or service fluid-handling systems and connected pump lines.`
    technicalSummary = `${name} is presented within valves and line-control products for buyers sourcing shutoff, control, jointing, or maintenance-side components used in water-transfer systems. The correct match depends on line size, connection type, actuation style where applicable, and the service duty expected from the valve. For accurate RFQ handling, confirm the pipe standard, connection method, and whether the product is being used for control, isolation, or maintenance access.`
    seoDescription = `${name} available for valve sourcing, fluid-line control, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'pipe-fitting') {
    nextSubcategory = 'Pipe Fittings'
    shortDescription = `${name} is listed as a pipe or fitting component used to route, connect, or adapt fluid-handling lines in pump and treatment installations.`
    technicalSummary = `${name} is presented within pipes and fittings for buyers sourcing line components used around pumps, water-transfer routes, and treatment skids. These products should be selected by line size, fitting function, material standard, and the connected piping system already installed on site. During RFQ, confirm whether the line is PVC, PPR, PU, GI, or another standard so the fitting is matched correctly.`
    seoDescription = `${name} listed for pipe fitting sourcing, fluid-line connections, and RFQ support from Vortexus Industrial Excellence.`
  } else if (family === 'pump-accessory') {
    nextSubcategory = 'Pump Accessories'
    shortDescription = `${name} is listed as a pump-support accessory used around borehole, submersible, or general fluid-handling installations to support setup, control, or serviceability.`
    technicalSummary = `${name} is presented within pumps and fluid handling as an installation-support accessory rather than a main pump body. These accessories usually support control, cable handling, line setup, mounting, or borehole-side installation work. For accurate replacement matching, confirm the installed pump arrangement, the exact role of the accessory, and any size or line detail tied to the existing setup.`
    seoDescription = `${name} available for pump accessory sourcing, borehole installation support, and RFQ review from Vortexus Industrial Excellence.`
  } else {
    shortDescription = `${name} is listed within pumps and fluid handling for buyers reviewing fluid-transfer components, line items, or installation-support products.`
    technicalSummary = `${name} is presented in the pumps and fluid-handling range for buyers sourcing equipment or components used around water transfer and service lines. The correct fit depends on the system arrangement, connection standard, and the operating duty it supports. During RFQ, confirm the installation context and any current product reference so the replacement path stays accurate.`
    seoDescription = `${name} listed for fluid-handling equipment sourcing and RFQ support from Vortexus Industrial Excellence.`
  }

  return {
    subcategory: nextSubcategory,
    shortDescription,
    technicalSummary,
    seoDescription,
    applications: buildFluidApplications(family),
    keyFeatures: buildFluidFeatures(product, family, brand),
    selectionNotes: buildFluidSelectionNotes(family),
    compatibilityNotes: buildFluidCompatibilityNotes(family),
    rfqFields: buildFluidRfqFields(family),
  }
}

function enrichFluidProduct(product) {
  const fluid = buildFluidText(product)

  return {
    ...product,
    subcategory: fluid.subcategory,
    summary: fluid.shortDescription,
    description: fluid.technicalSummary,
    shortDescription: fluid.shortDescription,
    technicalSummary: fluid.technicalSummary,
    applications: fluid.applications,
    specHighlights: fluid.keyFeatures,
    keyFeatures: fluid.keyFeatures,
    selectionNotes: fluid.selectionNotes,
    compatibilityNotes: fluid.compatibilityNotes,
    rfqFields: fluid.rfqFields,
    seoDescription: fluid.seoDescription,
  }
}

export function enrichCatalogProducts(products = []) {
  return products.map((product) => {
    if (product.categorySlug === 'reverse-osmosis-systems') {
      return enrichReverseOsmosisProduct(product)
    }

    if (product.categorySlug === 'filtration-systems') {
      return enrichFiltrationProduct(product)
    }

    if (product.categorySlug === 'water-treatment-chemicals') {
      return enrichChemicalProduct(product)
    }

    if (product.categorySlug === 'disinfection-systems') {
      return enrichDisinfectionProduct(product)
    }

    if (product.categorySlug === 'automation-control') {
      return enrichAutomationProduct(product)
    }

    if (product.categorySlug === 'storage-tanks') {
      return enrichStorageProduct(product)
    }

    if (product.categorySlug === 'spare-parts-components') {
      return enrichSparePartsProduct(product)
    }

    if (product.categorySlug === 'pumps-fluid-handling') {
      return enrichFluidProduct(product)
    }

    return product
  })
}

export function enrichCatalogSummary(summary = {}, products = []) {
  const featuredIds = new Set((summary.featuredProducts || []).map((product) => product.id))

  return {
    ...summary,
    totalProducts: products.length,
    featuredProducts: products.filter((product) => featuredIds.has(product.id)),
  }
}
