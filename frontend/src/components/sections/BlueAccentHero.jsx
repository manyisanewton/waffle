function BlueAccentHero({ eyebrow = 'Company', title, description }) {
  return (
    <section className="theme-hero-blue relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden text-white lg:-mt-12">
      <div className="theme-hero-blue-overlay absolute inset-0" />
      <div className="theme-hero-blue-mist absolute inset-y-0 left-[-12%] w-[42%]" />
      <div className="theme-hero-blue-mist theme-hero-blue-mist-right absolute inset-y-0 right-[-8%] w-[34%]" />
      <div className="theme-hero-blue-orb absolute left-[8%] top-14 h-36 w-36 rounded-full blur-3xl sm:h-44 sm:w-44" />
      <div className="theme-hero-blue-orb theme-hero-blue-orb-soft absolute bottom-12 right-[14%] h-40 w-40 rounded-full blur-3xl sm:h-52 sm:w-52" />
      <div className="theme-hero-blue-grid absolute inset-0 opacity-20" />
      <div className="theme-hero-blue-stripes absolute inset-x-0 bottom-10 h-12 opacity-70 sm:bottom-12 sm:h-14" />

      <div className="relative mx-auto flex min-h-[300px] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-[360px] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-white/90" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/88">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
            {description}
          </p>
        </div>
      </div>

      <div className="theme-hero-blue-bottom absolute inset-x-0 bottom-0 h-16 sm:h-20" />
    </section>
  )
}

export default BlueAccentHero
