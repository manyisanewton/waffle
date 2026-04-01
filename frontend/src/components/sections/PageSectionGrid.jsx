function PageSectionGrid({ items }) {
  return (
    <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-[1.75rem] border border-brand-border bg-white p-6 shadow-[0_20px_60px_rgba(35,33,32,0.06)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-green">
            {item.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-brand-ink">
            {item.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-brand-muted">
            {item.description}
          </p>
        </article>
      ))}
    </section>
  )
}

export default PageSectionGrid
