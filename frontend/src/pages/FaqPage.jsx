import { useMemo, useState } from 'react'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import BlueAccentHero from '../components/sections/BlueAccentHero'
import FaqJsonLd from '../components/seo/FaqJsonLd'
import Seo from '../components/seo/Seo'
import { faqPageSummary, faqSections } from '../data/faqCatalog'

function FaqPage() {
  const allFaqItems = useMemo(() => faqSections.flatMap((section) => section.items), [])
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState(() =>
    allFaqItems[0] ? { [allFaqItems[0].question]: true } : {},
  )

  const filteredSections = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase()

    if (!normalizedQuery) {
      return faqSections
    }

    return faqSections
      .map((section) => {
        const sectionMatches =
          section.title.toLowerCase().includes(normalizedQuery) ||
          section.intro.toLowerCase().includes(normalizedQuery)

        const items = section.items.filter(
          (item) =>
            item.question.toLowerCase().includes(normalizedQuery) ||
            item.answer.toLowerCase().includes(normalizedQuery),
        )

        if (sectionMatches && items.length === 0) {
          return section
        }

        return {
          ...section,
          items,
        }
      })
      .filter((section) => section.items.length > 0)
  }, [searchTerm])

  const totalVisibleQuestions = filteredSections.reduce(
    (count, section) => count + section.items.length,
    0,
  )
  const visibleSectionsCount = filteredSections.length
  const getFaqItemId = (question) =>
    `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

  const toggleItem = (question) => {
    setOpenItems((current) =>
      current[question]
        ? {}
        : {
            [question]: true,
          },
    )
  }

  return (
    <div className="space-y-16 pb-8 lg:space-y-22">
      <Seo
        title={faqPageSummary.title}
        description={faqPageSummary.description}
        canonicalPath="/faq"
      />
      <FaqJsonLd items={allFaqItems} />

      <BlueAccentHero
        eyebrow="Buyer Knowledge Base"
        title="Frequently Asked Questions"
        description="Practical answers to the questions industrial buyers ask most about pumps, membranes, filtration, chemicals, instrumentation, sizing, maintenance, and quotation readiness."
      />

      <section className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.8rem] border border-brand-border bg-white px-6 py-6 shadow-[0_16px_38px_rgba(35,33,32,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Browse Topics
              </p>
              <span className="rounded-full bg-brand-surface px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-muted">
                {visibleSectionsCount} visible
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Jump straight into the section that matches the buyer question or technical issue.
            </p>
            <label className="mt-5 block">
              <span className="mb-3 block text-sm font-medium text-brand-ink">
                Search the FAQ library
              </span>
              <div className="relative">
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search pumps, RO, membranes, RFQ..."
                  className="h-12 w-full rounded-[1rem] border border-brand-border bg-brand-surface/35 pl-11 pr-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-green focus:bg-white"
                />
              </div>
            </label>
            <div className="mt-5 space-y-3">
              {filteredSections.map((section, index) => (
                <a
                  key={section.slug}
                  href={`#${section.slug}`}
                  className="flex items-start justify-between gap-4 rounded-[1rem] border border-brand-border px-4 py-3.5 text-sm font-medium text-brand-ink transition hover:border-brand-green hover:bg-brand-surface/40 hover:text-brand-green"
                >
                  <div>
                    <span className="block">{section.title}</span>
                    <span className="mt-1 block text-xs font-medium text-brand-muted">
                      {section.items.length} question{section.items.length === 1 ? '' : 's'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-brand-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-brand-border bg-brand-surface/45 px-6 py-6 shadow-[0_14px_34px_rgba(35,33,32,0.04)]">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
              Best Use
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Use the FAQ to narrow the product family first, then move into category review or RFQ once the application, size, or operating context is clear.
            </p>
          </div>
        </aside>

        <div className="space-y-8">
          {filteredSections.length ? filteredSections.map((section) => (
            <section
              key={section.slug}
              id={section.slug}
              className="scroll-mt-32 rounded-[2rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_44px_rgba(35,33,32,0.05)] sm:px-6 sm:py-6 lg:px-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-brand-border pb-5">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                    {section.title}
                  </p>
                  <p className="mt-3 text-base leading-8 text-brand-muted">
                    {section.intro}
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-brand-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
                  {section.items.length} items
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {section.items.map((item) => {
                  const isOpen = Boolean(openItems[item.question])

                  return (
                    <article
                      key={item.question}
                      id={getFaqItemId(item.question)}
                      className={[
                        'overflow-hidden rounded-[1.5rem] border bg-white transition',
                        isOpen
                          ? 'border-brand-green/40 shadow-[0_18px_42px_rgba(35,33,32,0.08)]'
                          : 'border-brand-border shadow-[0_12px_28px_rgba(35,33,32,0.04)]',
                      ].join(' ')}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(item.question)}
                        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                        aria-expanded={isOpen}
                      >
                        <div className="space-y-3">
                          <span className="inline-flex rounded-full bg-brand-surface px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
                            FAQ
                          </span>
                          <span className="block font-display text-xl font-semibold leading-8 text-brand-ink sm:text-2xl">
                            {item.question}
                          </span>
                        </div>
                        <FaChevronDown
                          className={[
                            'mt-1 shrink-0 text-sm text-brand-green transition-transform',
                            isOpen ? 'rotate-180' : '',
                          ].join(' ')}
                        />
                      </button>
                      {isOpen ? (
                        <div className="border-t border-brand-border bg-brand-surface/35 px-5 py-5 sm:px-6">
                          <p className="text-base leading-8 text-brand-muted">{item.answer}</p>
                        </div>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </section>
          )) : (
            <section className="rounded-[1.8rem] border border-dashed border-brand-border bg-white px-6 py-10 text-center shadow-[0_14px_34px_rgba(35,33,32,0.04)]">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                No Matches
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
                No FAQ items match that search yet.
              </h2>
              <p className="mt-4 text-base leading-8 text-brand-muted">
                Try broader keywords such as RO, pump, membrane, filter, pressure, or quotation.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] bg-brand-ink px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              Still Need Help?
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl">
              Send the requirement and let the team help you match the right product.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              If the answer depends on site conditions, flow, pressure, water quality, or exact model history, move to an RFQ instead of guessing.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <NavLink
              to="/request-quote"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Request Quote
            </NavLink>
            <NavLink
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FaqPage
