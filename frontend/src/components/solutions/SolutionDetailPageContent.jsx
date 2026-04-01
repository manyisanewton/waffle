import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { resolveSolutionImage } from '../../data/solutionsCatalog'

function ClickableImage({ src, alt, className, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen({ src, alt })}
      className="group block w-full cursor-zoom-in overflow-hidden"
      aria-label={`Open larger view of ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className={[className, 'transition duration-300 group-hover:scale-[1.02]'].join(' ')}
      />
    </button>
  )
}

function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [image, onClose])

  if (!image) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/82 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        Close
      </button>
      <div
        className="max-h-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="max-h-[82vh] w-full object-contain" />
      </div>
    </div>
  )
}

function SectionHeader({ title, lead }) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-base leading-8 text-brand-muted">{lead}</p>
      ) : null}
    </div>
  )
}

function SplitSection({ section, onOpen }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <SectionHeader title={section.title} lead={section.lead} />
        {section.body ? (
          <p className="mt-6 text-sm leading-8 text-brand-muted">{section.body}</p>
        ) : null}
        {section.items?.length ? (
          <ul className="mt-6 space-y-4">
            {section.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-brand-muted">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="space-y-5">
        <div className="overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(35,33,32,0.08)]">
          <ClickableImage
            src={resolveSolutionImage(section.image)}
            alt={section.imageAlt || section.title}
            className="h-full max-h-[34rem] w-full object-cover"
            onOpen={onOpen}
          />
        </div>
        {section.cards?.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {section.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.5rem] border border-brand-border bg-white px-5 py-5"
              >
                <h3 className="font-display text-xl font-semibold text-brand-ink">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-brand-muted">{card.text}</p>
              </div>
            ))}
          </div>
        ) : null}
        {section.gallery?.length ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {section.gallery.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[1.5rem] bg-white">
                <ClickableImage
                  src={resolveSolutionImage(item.src)}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                  onOpen={onOpen}
                />
                <div className="px-4 py-3 text-sm font-medium text-brand-ink">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function MetricsRow({ metrics }) {
  if (!metrics?.length) {
    return null
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-[1.5rem] border border-brand-border bg-white px-5 py-5"
        >
          <p className="text-3xl font-semibold text-brand-green">{metric.value}</p>
          <p className="mt-2 text-sm leading-7 text-brand-muted">{metric.label}</p>
        </div>
      ))}
    </div>
  )
}

function GallerySection({ section, onOpen }) {
  return (
    <div className="space-y-8">
      <SectionHeader title={section.title} lead={section.lead} />
      {section.body ? (
        <p className="max-w-4xl text-sm leading-8 text-brand-muted">{section.body}</p>
      ) : null}
      <MetricsRow metrics={section.metrics} />
      {section.gallery?.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {section.gallery.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              <ClickableImage
                src={resolveSolutionImage(item.src)}
                alt={item.title}
                className="h-56 w-full object-cover"
                onOpen={onOpen}
              />
              <div className="px-5 py-4">
                <p className="font-display text-lg font-semibold text-brand-ink">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ProductsSection({ section, onOpen }) {
  return (
    <div className="space-y-8">
      <SectionHeader title={section.title} lead={section.lead} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {section.products?.map((product) => (
          <article
            key={product.title}
            className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <ClickableImage
              src={resolveSolutionImage(product.image)}
              alt={product.title}
              className="h-56 w-full object-cover"
              onOpen={onOpen}
            />
            <div className="space-y-3 px-5 py-5">
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                {product.title}
              </h3>
              <p className="text-sm leading-7 text-brand-muted">{product.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CardsSection({ section }) {
  return (
    <div className="space-y-8">
      <SectionHeader title={section.title} lead={section.lead} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {section.cards?.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-6 shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <h3 className="font-display text-2xl font-semibold text-brand-ink">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-brand-muted">{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function TablesSection({ section }) {
  return (
    <div className="space-y-8">
      <SectionHeader title={section.title} lead={section.lead} />
      {section.body ? (
        <p className="max-w-4xl text-sm leading-8 text-brand-muted">{section.body}</p>
      ) : null}
      <div className="space-y-6">
        {section.tables?.map((table) => (
          <div
            key={table.title}
            className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <div className="border-b border-brand-border px-5 py-4">
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                {table.title}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-brand-surface text-brand-ink">
                  <tr>
                    {table.columns.map((column) => (
                      <th key={column} className="px-5 py-4 font-semibold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row.join('-')} className="border-t border-brand-border">
                      {row.map((cell) => (
                        <td key={cell} className="px-5 py-4 text-brand-muted">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GroupsSection({ section, onOpen }) {
  return (
    <div className="space-y-8">
      <SectionHeader title={section.title} lead={section.lead} />
      <div className="space-y-6">
        {section.groups?.map((group) => (
          <article
            key={group.title}
            className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-6 shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <h3 className="font-display text-2xl font-semibold text-brand-ink">
              {group.title}
            </h3>
            <p className="mt-3 text-sm leading-8 text-brand-muted">{group.body}</p>
            {group.images?.length ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.images.map((image) => (
                  <ClickableImage
                    key={image}
                    src={resolveSolutionImage(image)}
                    alt={group.title}
                    className="h-44 w-full rounded-[1.25rem] object-cover"
                    onOpen={onOpen}
                  />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}

function renderSection(section, onOpen) {
  switch (section.layout) {
    case 'split':
      return <SplitSection section={section} onOpen={onOpen} />
    case 'gallery':
      return <GallerySection section={section} onOpen={onOpen} />
    case 'products':
      return <ProductsSection section={section} onOpen={onOpen} />
    case 'cards':
      return <CardsSection section={section} />
    case 'tables':
      return <TablesSection section={section} />
    case 'groups':
      return <GroupsSection section={section} onOpen={onOpen} />
    default:
      return <SplitSection section={section} onOpen={onOpen} />
  }
}

function SolutionDetailPageContent({ solution }) {
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <div className="text-brand-ink">
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-brand-ink text-white">
        <ClickableImage
          src={resolveSolutionImage(solution.heroImage)}
          alt={solution.title}
          className="absolute inset-0 h-full w-full object-cover"
          onOpen={setLightboxImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(98deg,rgba(20,23,21,0.82)_0%,rgba(20,23,21,0.62)_40%,rgba(20,23,21,0.48)_100%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              {solution.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {solution.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
              {solution.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {solution.quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              <p className="text-3xl font-semibold text-brand-green">{stat.value}</p>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sticky top-[92px] z-40 border-y border-brand-border/70 bg-brand-canvas/95 px-4 py-3 backdrop-blur sm:px-6 lg:hidden">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em] text-brand-green">
            On This Page
          </p>
          <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {solution.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium whitespace-nowrap text-brand-muted transition hover:border-brand-green hover:text-brand-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-10 lg:items-start lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:sticky lg:top-[108px] lg:block lg:h-fit">
            <div className="rounded-[1.75rem] border border-brand-border bg-white p-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)] lg:max-h-[calc(100vh-132px)] lg:overflow-y-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
                On This Page
              </p>
              <nav className="mt-4 flex flex-col gap-2">
                {solution.nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-full px-4 py-2.5 text-sm font-medium text-brand-muted transition hover:bg-brand-surface hover:text-brand-ink"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-16 lg:space-y-20">
            {solution.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                {renderSection(section, setLightboxImage)}
              </section>
            ))}

            <section className="overflow-hidden rounded-[2rem] bg-brand-ink px-6 py-10 text-white shadow-[0_24px_70px_rgba(35,33,32,0.12)] sm:px-8 lg:px-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
                    Next Step
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                    {solution.cta.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
                    {solution.cta.text}
                  </p>
                </div>
                <NavLink
                  to={solution.cta.primaryTo}
                  className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
                >
                  {solution.cta.primaryLabel}
                </NavLink>
              </div>
            </section>
          </div>
        </div>
      </section>
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  )
}

export default SolutionDetailPageContent
