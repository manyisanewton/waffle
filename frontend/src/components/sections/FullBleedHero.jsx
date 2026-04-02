function FullBleedHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  media,
  overlayClassName = 'theme-hero-dark',
  children,
}) {
  return (
    <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden bg-brand-ink text-white lg:-mt-12">
      {media ?? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </div>
    </section>
  )
}

export default FullBleedHero
