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
    <section className="relative left-1/2 -mt-4 w-screen -translate-x-1/2 overflow-hidden bg-brand-ink text-white sm:-mt-6 lg:-mt-12">
      {media ?? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 max-w-4xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
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

      <div className="theme-hero-waterline pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 lg:h-32">
        <svg
          className="theme-hero-water-wave theme-hero-water-wave-soft absolute inset-x-[-8%] bottom-7 h-14 w-[116%] opacity-70 sm:h-16 lg:h-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,72 C80,54 152,46 228,54 C310,62 380,86 456,88 C542,92 604,60 682,50 C770,38 846,58 922,72 C1004,88 1070,98 1148,90 C1234,82 1312,52 1386,48 C1406,46 1424,46 1440,48 L1440,120 L0,120 Z"
            fill="rgba(255,255,255,0.28)"
          />
        </svg>
        <svg
          className="theme-hero-water-wave theme-hero-water-wave-front absolute inset-x-[-10%] bottom-0 h-20 w-[120%] sm:h-24 lg:h-28"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,96 C74,122 146,132 222,122 C306,110 372,74 450,60 C536,44 612,54 688,76 C764,98 830,116 910,108 C992,100 1052,68 1132,58 C1214,48 1296,58 1376,74 C1398,78 1420,82 1440,84 L1440,160 L0,160 Z"
            fill="rgba(51,173,234,0.96)"
          />
          <path
            d="M0,112 C82,138 156,146 232,138 C320,128 388,94 468,82 C552,68 628,74 704,96 C782,118 854,132 932,126 C1012,120 1080,92 1160,84 C1248,76 1334,86 1410,100 C1420,102 1430,104 1440,106 L1440,160 L0,160 Z"
            fill="var(--theme-brand-canvas)"
          />
        </svg>
      </div>
    </section>
  )
}

export default FullBleedHero
