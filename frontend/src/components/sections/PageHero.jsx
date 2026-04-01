function PageHero({ eyebrow, title, description }) {
  return (
    <section className="grid gap-8 rounded-[2rem] border border-brand-border bg-brand-surface p-8 shadow-[0_24px_80px_rgba(35,33,32,0.08)] lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-tight font-semibold text-brand-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-brand-muted">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[1.75rem] bg-brand-green-deep p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Strategy
          </p>
          <p className="mt-10 text-3xl font-semibold">01</p>
        </div>
        <div className="rounded-[1.75rem] bg-brand-green p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Delivery
          </p>
          <p className="mt-10 text-3xl font-semibold">02</p>
        </div>
        <div className="rounded-[1.75rem] bg-brand-neutral p-6 text-brand-ink">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
            Process
          </p>
          <p className="mt-10 text-3xl font-semibold">03</p>
        </div>
        <div className="rounded-[1.75rem] bg-brand-green-muted p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Growth
          </p>
          <p className="mt-10 text-3xl font-semibold">04</p>
        </div>
      </div>
    </section>
  )
}

export default PageHero
