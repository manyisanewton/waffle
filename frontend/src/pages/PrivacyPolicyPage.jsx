import { NavLink } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import { company } from '../data/site/company'

const policySections = [
  { id: 'information-we-collect', label: '1. Information we collect' },
  { id: 'how-we-use-information', label: '2. How we use information' },
  { id: 'legal-grounds', label: '3. Legal grounds for processing' },
  { id: 'cookies-and-analytics', label: '4. Cookies and analytics' },
  { id: 'sharing-information', label: '5. When we share information' },
  { id: 'retention-and-security', label: '6. Retention and security' },
  { id: 'your-rights', label: '7. Your rights' },
  { id: 'childrens-privacy', label: '8. Children’s privacy' },
  { id: 'external-links', label: '9. External links' },
  { id: 'policy-changes', label: '10. Changes to this policy' },
  { id: 'contact-us', label: '11. Contact us' },
]

function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Seo
        title="Privacy Policy"
        description={`Learn how ${company.name} collects, uses, shares, and protects personal information when you use this website.`}
        canonicalPath="/privacy-policy"
      />

      <NavLink
        to="/"
        className="text-sm font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
      >
        ← Back to home
      </NavLink>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start xl:gap-16">
        <aside className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold text-brand-ink">On this page</p>
          <nav aria-label="Privacy policy sections" className="mt-4">
            <ol className="space-y-1 border-l border-brand-border">
              {policySections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-6 text-blue-600 underline underline-offset-4 transition hover:border-blue-600 hover:text-blue-800"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="max-w-4xl text-base leading-8 text-brand-muted">
          <h1 className="font-display text-4xl font-semibold text-brand-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm">Last updated: 5 August 2026</p>

        <p className="mt-8">
          {company.name} (“Vortexus”, “we”, “us”, or “our”) respects your privacy.
          This policy explains how we collect, use, share, and protect personal
          information when you visit vortexusindustrial.com, contact us, request a
          quotation, or use our website chatbot.
        </p>

        <h2 id="information-we-collect" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          1. Information we collect
        </h2>
        <p className="mt-3">We may collect information that you provide, including:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Your name, email address, phone number, company, and job position.</li>
          <li>
            Product interests, project requirements, delivery location, quantities,
            technical details, and other information included in an inquiry or RFQ.
          </li>
          <li>Messages sent through our contact forms, callback form, or chatbot.</li>
          <li>Communications you send to us by email, phone, WhatsApp, or social media.</li>
        </ul>
        <p className="mt-4">
          We may also automatically receive technical information such as your IP
          address, browser and device type, pages visited, referring page, and the time
          and manner in which you use the website.
        </p>

        <h2 id="how-we-use-information" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          2. How we use information
        </h2>
        <p className="mt-3">We use personal information to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Respond to questions, requests for quotations, and callback requests.</li>
          <li>Recommend products or solutions and provide customer support.</li>
          <li>Communicate about orders, projects, services, and business opportunities.</li>
          <li>Operate, secure, troubleshoot, and improve the website and chatbot.</li>
          <li>Measure website usage and the performance of our marketing.</li>
          <li>Meet legal, regulatory, accounting, and fraud-prevention obligations.</li>
        </ul>

        <h2 id="legal-grounds" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          3. Legal grounds for processing
        </h2>
        <p className="mt-3">
          Depending on the circumstances, we process information with your consent, to
          take steps at your request before entering into or performing a contract, to
          comply with a legal obligation, or for our legitimate business interests where
          those interests do not override your rights.
        </p>

        <h2 id="cookies-and-analytics" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          4. Cookies and analytics
        </h2>
        <p className="mt-3">
          The website uses technologies such as cookies and similar identifiers. Google
          Analytics and Metricool help us understand website traffic and usage. Meta Pixel
          helps us measure advertising activity. These providers may receive technical and
          usage information and may process it according to their own privacy policies. You
          can limit cookies through your browser settings, although some website features
          may not work as expected.
        </p>

        <h2 id="sharing-information" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          5. When we share information
        </h2>
        <p className="mt-3">
          We do not sell your personal information. We may share it with employees and
          service providers that need it to carry out the purposes described above. These
          providers may include Web3Forms for form delivery, Google and Metricool for
          analytics, Google Maps, Meta for advertising measurement, website hosting and
          technical service providers, and communication platforms you choose to use.
        </p>
        <p className="mt-4">
          We may also disclose information where required by law, to protect legal rights
          or safety, or as part of a business reorganisation. Some providers may process
          information outside Kenya, subject to the safeguards required by applicable law.
        </p>

        <h2 id="retention-and-security" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          6. Information retention and security
        </h2>
        <p className="mt-3">
          We keep personal information only for as long as reasonably necessary for the
          purpose for which it was collected, including customer service, contractual,
          legal, accounting, and dispute-resolution needs. We use reasonable technical
          and organisational safeguards, but no internet transmission or storage system
          can be guaranteed to be completely secure.
        </p>

        <h2 id="your-rights" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          7. Your rights
        </h2>
        <p className="mt-3">
          Subject to applicable law, you may ask to be informed about our use of your
          information, access it, correct inaccurate or misleading information, object to
          or restrict processing, request deletion, or withdraw consent where processing
          is based on consent. You may also opt out of direct marketing at any time.
        </p>
        <p className="mt-4">
          To exercise a right, email{' '}
          <a
            href={`mailto:${company.email}`}
            className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            {company.email}
          </a>
          . We may need to verify your identity before completing a request. You may also
          lodge a complaint with Kenya’s Office of the Data Protection Commissioner at{' '}
          <a
            href="https://www.odpc.go.ke/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            odpc.go.ke
          </a>
          .
        </p>

        <h2 id="childrens-privacy" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          8. Children’s privacy
        </h2>
        <p className="mt-3">
          This business website is not directed to children, and we do not knowingly
          collect personal information from children through it. Please contact us if you
          believe a child has provided personal information.
        </p>

        <h2 id="external-links" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          9. External links
        </h2>
        <p className="mt-3">
          Our website links to third-party websites and services, including WhatsApp and
          social-media platforms. Their privacy practices are controlled by their own
          policies, and this policy does not cover those services.
        </p>

        <h2 id="policy-changes" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          10. Changes to this policy
        </h2>
        <p className="mt-3">
          We may update this policy when our practices, services, or legal obligations
          change. The updated version will be posted on this page with a revised date.
        </p>

        <h2 id="contact-us" className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-brand-ink">
          11. Contact us
        </h2>
        <p className="mt-3">
          For privacy questions or requests, contact {company.name} at{' '}
          <a
            href={`mailto:${company.email}`}
            className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            {company.email}
          </a>{' '}
          or P.O. Box 1356-00518, Nairobi, Kenya.
        </p>

        <div className="mt-12 border-t border-brand-border pt-6">
          <NavLink
            to="/"
            className="text-sm font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            ← Back to home
          </NavLink>
        </div>
        </article>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
