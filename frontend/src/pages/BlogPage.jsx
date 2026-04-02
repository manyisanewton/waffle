import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FullBleedHero from '../components/sections/FullBleedHero'
import { blogCategories, blogPosts } from '../data/blogPosts'

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const featuredPosts = useMemo(
    () => blogPosts.filter((post) => post.featured).slice(0, 2),
    [],
  )

  const visiblePosts = useMemo(() => {
    if (activeCategory === 'all') {
      return blogPosts
    }

    return blogPosts.filter((post) => post.category === activeCategory)
  }, [activeCategory])

  const leadPost = featuredPosts[0]
  const secondaryFeaturedPosts = featuredPosts.slice(1)

  return (
    <div className="space-y-16 text-brand-ink lg:space-y-24">
      <FullBleedHero
        eyebrow="Insights & Articles"
        title="A modern editorial space for water, pumping, solar, and project delivery insight."
        description="This blog is where Vortexus explains the thinking behind its work. It combines practical field knowledge, treatment guidance, project lessons, and system-level advice clients can actually use."
        imageSrc="/images/assets/img/norwa/clean-organized-pharmaceutical-plant-where-steel-pipelines-valves-are-part-sterile-environment.jpg"
        imageAlt="Editorial insight into water, energy, and automation systems"
        overlayClassName="theme-hero-dark-strong"
      >
        <div className="flex flex-wrap gap-3">
          <NavLink
            to={leadPost ? `/blog/${leadPost.slug}` : '/contact-us'}
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
          >
            Read Featured Story
          </NavLink>
          <NavLink
            to="/contact-us"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/12"
          >
            Talk to Our Team
          </NavLink>
        </div>
      </FullBleedHero>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { value: `${blogPosts.length}`, label: 'Published sample posts' },
          { value: 'Photos + Video', label: 'Rich content support' },
          { value: 'Water + Energy', label: 'Primary editorial themes' },
          { value: 'Frontend Ready', label: 'CMS-friendly structure' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[1.75rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
          >
            <p className="text-3xl font-semibold text-brand-green">{item.value}</p>
            <p className="mt-2 text-sm leading-7 text-brand-muted">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="rounded-[2rem] bg-brand-surface px-6 py-7 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Editorial Focus
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
            Built to educate clients, not just fill a content slot.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            Every article should help a client understand a technical issue more
            clearly, see where Vortexus fits, and feel more confident starting a
            conversation about their own project, plant, property, or community
            water challenge.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Treatment Guidance',
              text: 'Explain source-water challenges, treatment options, and where each technology fits.',
            },
            {
              title: 'Field Delivery Insight',
              text: 'Show how pumping, treatment, solar, and project delivery decisions play out on actual sites.',
            },
            {
              title: 'Client Confidence',
              text: 'Turn technical knowledge into language that helps customers trust what they are buying.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.6rem] border border-brand-border bg-white px-5 py-5 shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
            >
              <h2 className="font-display text-2xl font-semibold text-brand-ink">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-brand-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {leadPost ? (
        <section className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <article className="overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-[0_24px_70px_rgba(35,33,32,0.07)]">
            <img
              src={leadPost.coverImage}
              alt={leadPost.title}
              className="h-72 w-full object-cover sm:h-80 lg:h-[420px]"
            />
            <div className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
                Featured Article
              </p>
              <h2 className="font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
                {leadPost.title}
              </h2>
              <p className="text-base leading-8 text-brand-muted">
                {leadPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-muted">
                <span>{leadPost.author}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                <span>{formatDate(leadPost.publishedAt)}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                <span>{leadPost.readTime}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                <span>{leadPost.categoryLabel}</span>
              </div>
              <NavLink
                to={`/blog/${leadPost.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Read Article
              </NavLink>
            </div>
          </article>

          <div className="grid gap-5">
            {secondaryFeaturedPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_18px_46px_rgba(35,33,32,0.05)]"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-56 w-full object-cover"
                />
                <div className="space-y-3 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                    {post.categoryLabel}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-brand-ink">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-brand-muted">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-sm leading-7 text-brand-muted">{post.excerpt}</p>
                  <NavLink
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-border px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-green hover:text-brand-green"
                  >
                    Open Story
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            Browse The Journal
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Explore articles by topic.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {blogCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={[
                'rounded-full px-5 py-3 text-sm font-semibold transition',
                activeCategory === category.slug
                  ? 'bg-brand-green text-white shadow-[0_14px_34px_rgba(43,162,82,0.22)]'
                  : 'border border-brand-border bg-white text-brand-ink hover:border-brand-green hover:text-brand-green',
              ].join(' ')}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_20px_52px_rgba(35,33,32,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_62px_rgba(35,33,32,0.09)]"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-60 w-full object-cover"
            />
            <div className="space-y-4 px-5 py-5">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                <span>{post.categoryLabel}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                {post.title}
              </h3>
              <p className="text-sm leading-7 text-brand-muted">{post.excerpt}</p>
              <p className="text-sm font-medium text-brand-muted">
                {formatDate(post.publishedAt)} · {post.author}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-surface px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <NavLink
                to={`/blog/${post.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
              >
                Read More
              </NavLink>
            </div>
          </article>
        ))}
      </section>

      {visiblePosts.length === 0 ? (
        <section className="rounded-[2rem] border border-dashed border-brand-border bg-white px-6 py-10 text-center sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green">
            No Posts Found
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink">
            This topic does not have a published article yet.
          </h2>
          <p className="mt-4 text-base leading-8 text-brand-muted">
            Switch the filter or continue to the solutions page while the editorial
            library grows.
          </p>
        </section>
      ) : null}

      <section className="overflow-hidden rounded-[2rem] bg-brand-ink px-6 py-10 text-white shadow-[0_24px_70px_rgba(35,33,32,0.12)] sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-green-muted">
              Need Something Specific?
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Let the blog lead into the right technical conversation.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
              If you are dealing with low pressure, saline water, fluoride, solar
              pumping, treatment system selection, or community supply planning,
              Vortexus can help translate the problem into a practical next step.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <NavLink
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-green-soft"
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              View Projects
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
