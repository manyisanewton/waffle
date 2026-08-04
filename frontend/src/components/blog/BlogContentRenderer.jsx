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
            <p
              key={key}
              className="text-base leading-8 text-brand-muted sm:text-[1.04rem] [&_strong]:font-semibold [&_strong]:text-brand-ink"
              dangerouslySetInnerHTML={{ __html: block.html || block.content }}
            />
          )
        }

        if (block.type === 'list') {
          const ListTag = block.style === 'numbered' ? 'ol' : 'ul'
          return (
            <ListTag
              key={key}
              className={`${block.style === 'numbered' ? 'list-decimal' : 'list-disc'} space-y-3 pl-7 text-base leading-8 text-brand-muted marker:font-semibold marker:text-[var(--color-accent-blue)]`}
            >
              {block.items.map((item, itemIndex) => (
                <li
                  key={`${itemIndex}-${item}`}
                  dangerouslySetInnerHTML={{ __html: item }}
                  className="pl-2"
                />
              ))}
            </ListTag>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={key}
              className="rounded-[1.75rem] border border-brand-border bg-brand-surface px-6 py-6 font-display text-2xl leading-10 text-brand-ink shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              “{block.content}”
              {block.attribution ? (
                <footer className="mt-4 text-base font-medium text-brand-muted">— {block.attribution}</footer>
              ) : null}
            </blockquote>
          )
        }

        if (block.type === 'image') {
          return (
            <figure
              key={key}
              className="max-w-full overflow-hidden rounded-[1.25rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
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
                  className="h-auto max-h-[70vh] w-full object-contain transition duration-300 group-hover:scale-[1.01]"
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
          const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(block.src || '')
          return (
            <figure
              key={key}
              className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-ink text-white shadow-[0_18px_46px_rgba(35,33,32,0.08)]"
            >
              {isDirectVideo ? (
                <video controls playsInline preload="metadata" poster={block.poster} className="w-full bg-brand-ink">
                  <source src={block.src} />
                </video>
              ) : (
                <a href={block.src} target="_blank" rel="noopener noreferrer" className="block px-6 py-10 text-center font-semibold text-white underline underline-offset-4">
                  Watch the attached video
                </a>
              )}
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
              className="border-l-4 border-brand-blue bg-[rgba(13,124,232,0.06)] px-6 py-8 text-brand-ink sm:px-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue">
                Continue The Conversation
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-brand-ink">
                {block.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
                {block.text}
              </p>
              <a
                href={block.buttonHref}
                target={block.openInNewTab ? '_blank' : undefined}
                rel={[
                  block.openInNewTab ? 'noopener noreferrer' : '',
                  block.nofollow ? 'nofollow' : '',
                  block.sponsored ? 'sponsored' : '',
                ].filter(Boolean).join(' ') || undefined}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                {block.buttonLabel}
              </a>
            </section>
          )
        }

        if (block.type === 'table') {
          return (
            <div key={key} className="max-w-full overflow-x-auto border-2 border-brand-ink bg-white overscroll-x-contain">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm text-brand-muted">
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b-2 border-brand-ink last:border-b-0">
                      {row.map((cell, cellIndex) => {
                        const CellTag = block.has_header && rowIndex === 0 ? 'th' : 'td'
                        return <CellTag key={cellIndex} className={`${block.has_header && rowIndex === 0 ? 'bg-brand-surface font-bold text-brand-ink' : ''} border-r-2 border-brand-ink px-5 py-4 first:text-brand-ink last:border-r-0`} dangerouslySetInnerHTML={{ __html: cell }} />
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        if (block.type === 'divider') {
          return <hr key={key} className="my-8 border-brand-border" />
        }

        return null
      })}
    </div>
  )
}

export default BlogContentRenderer
