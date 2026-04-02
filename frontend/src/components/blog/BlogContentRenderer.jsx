import { NavLink } from 'react-router-dom'

function BlogContentRenderer({ blocks, onImageClick }) {
  const slugifyHeading = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`

        if (block.type === 'heading') {
          const HeadingTag = block.level === 3 ? 'h3' : 'h2'
          const headingId = slugifyHeading(block.content)

          return (
            <HeadingTag
              key={key}
              id={headingId}
              className={
                block.level === 3
                  ? 'font-display text-2xl font-semibold text-brand-ink sm:text-3xl'
                  : 'pt-3 font-display text-3xl font-semibold text-brand-ink sm:text-4xl'
              }
            >
              {block.content}
            </HeadingTag>
          )
        }

        if (block.type === 'paragraph') {
          return (
            <p key={key} className="text-base leading-8 text-brand-muted sm:text-[1.04rem]">
              {block.content}
            </p>
          )
        }

        if (block.type === 'list') {
          return (
            <ul
              key={key}
              className="space-y-3 rounded-[1.5rem] border border-brand-border bg-white px-5 py-5 text-base leading-8 text-brand-muted shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={key}
              className="rounded-[1.75rem] border border-brand-border bg-brand-surface px-6 py-6 font-display text-2xl leading-10 text-brand-ink shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              “{block.content}”
            </blockquote>
          )
        }

        if (block.type === 'image') {
          return (
            <figure
              key={key}
              className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              <button
                type="button"
                onClick={() =>
                  onImageClick?.({
                    src: block.src,
                    alt: block.alt,
                    caption: block.caption,
                  })
                }
                className="group block w-full text-left"
              >
                <img
                  src={block.src}
                  alt={block.alt}
                  className="h-[280px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[420px]"
                />
              </button>
              {block.caption ? (
                <figcaption className="px-5 py-4 text-sm leading-7 text-brand-muted">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        }

        if (block.type === 'video') {
          return (
            <figure
              key={key}
              className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-ink text-white shadow-[0_18px_46px_rgba(35,33,32,0.08)]"
            >
              <video
                controls
                playsInline
                preload="metadata"
                poster={block.poster}
                className="w-full bg-brand-ink"
              >
                <source src={block.src} type="video/mp4" />
              </video>
              {block.caption ? (
                <figcaption className="px-5 py-4 text-sm leading-7 text-white/72">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        }

        if (block.type === 'cta') {
          return (
            <section
              key={key}
              className="overflow-hidden rounded-[1.9rem] bg-brand-ink px-6 py-8 text-white shadow-[0_24px_70px_rgba(35,33,32,0.12)] sm:px-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
                Continue The Conversation
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold">
                {block.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/76">
                {block.text}
              </p>
              <NavLink
                to={block.buttonHref}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                {block.buttonLabel}
              </NavLink>
            </section>
          )
        }

        return null
      })}
    </div>
  )
}

export default BlogContentRenderer
