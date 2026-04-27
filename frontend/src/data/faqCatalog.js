export const faqSections = [
  {
    slug: 'product-selection',
    title: 'Product Selection',
    intro:
      'These are the questions buyers ask most when trying to identify the right treatment, pumping, or instrumentation product before sending an RFQ.',
    items: [
      {
        question: 'How do I know whether I need RO, UF, UV, or simple filtration?',
        answer:
          'The right answer depends on the water problem, not the product name. Use reverse osmosis when dissolved salts, fluoride, conductivity, or membrane-grade purity are the issue. Use ultrafiltration when suspended solids and microorganism separation matter but dissolved salts are not the main problem. Use UV when the main concern is microbiological disinfection after the water is already physically clear enough for UV penetration. Use simple filtration for sediment, taste, odor, and pretreatment stages. If you already have a water analysis report, that should guide the selection first.',
      },
      {
        question: 'What information should I prepare before requesting a quotation?',
        answer:
          'The strongest RFQs include the application, source water type, required flow rate, pressure needs, installation location, power supply, and whether the item is for replacement or a new system. For treatment products, water analysis is critical. For pumps, head, flow, suction conditions, and duty cycle matter. For membrane and filter items, existing model numbers or housing sizes help avoid wrong product selection.',
      },
      {
        question: 'Can I buy a product even if I do not know the exact model number yet?',
        answer:
          'Yes, but the process is more accurate when you provide an image, old nameplate, part code, or system photo. Many industrial buyers begin with application and site problem rather than the exact product code. The better approach is to share what the product is doing, where it is installed, and what performance you need so the product can be matched correctly.',
      },
      {
        question: 'How do I choose the right pump for my application?',
        answer:
          'Pump selection should be based on flow rate, total dynamic head, fluid type, temperature, installation arrangement, power supply, and operating hours. A pump that looks similar physically can still be wrong for the duty point. In industrial water systems, the correct pump is the one that matches the required performance curve and operating conditions, not only the pipe size or motor rating.',
      },
      {
        question: 'What is the difference between a pressure gauge, flow meter, controller, and sensor?',
        answer:
          'A pressure gauge tells you system pressure. A flow meter tells you how much liquid is moving through the line. A controller is used to automate response, such as pump start-stop, dosing control, or alarm logic. A sensor provides the signal that a controller reads, such as pH, conductivity, pressure, or level. Buyers often confuse these because they are installed close together, but they play different roles inside the system.',
      },
    ],
  },
  {
    slug: 'water-treatment',
    title: 'Water Treatment Systems',
    intro:
      'These are the common technical questions around treatment trains, membranes, media, and consumables.',
    items: [
      {
        question: 'Why does pretreatment matter before an RO membrane?',
        answer:
          'Pretreatment protects membrane life, stabilizes performance, and reduces fouling risk. If suspended solids, chlorine, hardness, iron, manganese, or scaling load are not handled upstream, the membrane section becomes the most expensive place to solve a problem that should have been controlled earlier. Sand filtration, activated carbon, antiscalant dosing, cartridge filtration, and media selection are usually part of protecting the RO stage.',
      },
      {
        question: 'How often should membranes, cartridges, or media be replaced?',
        answer:
          'There is no single replacement interval that fits every site. Replacement depends on feed-water quality, operating hours, pretreatment discipline, cleaning practices, and system loading. Cartridge filters are usually replaced much more frequently than RO membranes. Media life varies widely depending on contaminant load and backwash quality. The correct approach is to monitor pressure drop, permeate quality, flow decline, and system history rather than relying only on a calendar.',
      },
      {
        question: 'What causes membranes to fail early?',
        answer:
          'The most common causes are poor pretreatment, chlorine attack, scaling, biological fouling, high differential pressure, wrong cleaning chemicals, dry storage after use, and operating outside design recovery or pressure conditions. Early failure is usually a system-discipline problem, not only a membrane problem.',
      },
      {
        question: 'Can one water analysis tell me exactly which product to buy?',
        answer:
          'A water analysis is one of the most important inputs, but it is not the only one. You still need the required production rate, operating pattern, temperature, installation context, and target water quality. A product can be technically correct for the analysis and still be commercially wrong if it does not fit the site duty or delivery expectation.',
      },
      {
        question: 'What chemicals are commonly used in treatment systems?',
        answer:
          'Common chemical groups include disinfectants, pH adjusters, coagulants, flocculants, antiscalants, membrane cleaners, and media-support chemicals. The correct chemical must match the process step and the material compatibility of the system. Chemical selection should never be treated as generic because dosing purpose, concentration, and compatibility all matter.',
      },
    ],
  },
  {
    slug: 'operations-maintenance',
    title: 'Operations and Maintenance',
    intro:
      'These questions come up when buyers are trying to reduce downtime, protect equipment life, and avoid wrong replacements.',
    items: [
      {
        question: 'Do I need original spare parts or can I use an alternative?',
        answer:
          'That depends on the role of the part. In many industrial systems, original or exact-fit equivalents are important because seals, housings, controls, membrane dimensions, and pressure-rated components can affect reliability and safety. Alternatives can work, but only if the technical fit is verified properly. Using a visually similar part without checking size, pressure class, material, and duty is a common cause of repeat failures.',
      },
      {
        question: 'How do I know if a pump or treatment product is undersized?',
        answer:
          'Typical signs include poor flow at the point of use, unstable pressure, frequent cycling, long recovery time, overheating, constant alarm events, weak output during peak demand, or rapid wear. Undersizing usually appears in performance behavior before it appears in total failure.',
      },
      {
        question: 'What should be monitored regularly in an industrial water system?',
        answer:
          'At minimum, monitor pressure, flow, conductivity or TDS where relevant, chemical dosing performance, filter differential pressure, tank levels, and alarm conditions. In membrane systems, permeate quality and recovery trend are especially important. Monitoring matters because most failures become visible in the data before they become visible in downtime.',
      },
      {
        question: 'Can you help me identify a product from a photo?',
        answer:
          'Yes. In many cases a clear product photo, nameplate, old invoice line, or installation image is enough to narrow the product family quickly. This is especially useful for membranes, pump accessories, gauges, valves, housings, dosing equipment, and electrical items where buyers do not always have the exact stock code.',
      },
    ],
  },
  {
    slug: 'commercial-buying',
    title: 'Commercial Buying and RFQ',
    intro:
      'These are the practical commercial questions buyers usually ask before they commit to a product or send an order request.',
    items: [
      {
        question: 'Can I compare products before requesting a quotation?',
        answer:
          'Yes. The catalog is structured to help buyers compare product families, applications, and related alternatives before sending an RFQ. That comparison step is important because many industrial items are available in multiple sizes, pressure classes, or model variants that should be shortlisted before quotation.',
      },
      {
        question: 'Do you supply only complete systems or also individual components?',
        answer:
          'Both. The catalog includes complete systems and also individual membranes, housings, chemicals, gauges, tanks, valves, pumps, cartridges, and support components. Many industrial buyers need a single replacement item, while others need a full package. The site is built to support both workflows.',
      },
      {
        question: 'Do you deliver across Kenya and support regional buyers?',
        answer:
          'Yes. The commercial model is built around Kenya-wide delivery with support for industrial buyers who need reliable sourcing, product matching, and quotation support. Delivery planning still depends on item type, urgency, and destination, so exact timelines should be confirmed during RFQ handling.',
      },
      {
        question: 'What happens after I submit an RFQ?',
        answer:
          'The request is reviewed against the product requirement, application, and any technical information you provided. If the request is clear enough, the next step is quotation. If it is incomplete, the team may first confirm model, size, operating conditions, or installation context so the quoted item is technically correct.',
      },
      {
        question: 'Can you support product sourcing for urgent breakdowns?',
        answer:
          'Yes, but urgent sourcing works best when you provide the failed item details clearly and early. For breakdown cases, the most useful information is the product name, size, duty, image, and what happened operationally. That shortens the time needed to identify the right replacement path.',
      },
    ],
  },
]

export const faqPageSummary = {
  title: 'Frequently Asked Questions',
  description:
    'Common buyer and technical questions about industrial water-treatment products, pumps, membranes, instrumentation, chemicals, system selection, and RFQ preparation.',
}
