import { useEffect, useRef, useState } from 'react'
import { IoChatbubbleEllipsesOutline, IoClose, IoPaperPlaneOutline } from 'react-icons/io5'
import { company } from '../../data/site/company'
import { askChatbot } from '../../lib/chatbotApi'
import { submitWeb3Form } from '../../lib/web3forms'

const starterPrompts = [
  { label: 'Request Quote', rfqFlow: true },
  { label: 'Find a Pump', message: 'Help me choose the right pump from your catalog.' },
  { label: 'Treat Water', message: 'Help me choose the right water treatment solution.' },
  { label: 'Browse Products', message: 'Show me the main product categories.' },
]

const initialMessages = [
  {
    role: 'bot',
    text: 'Hi, I can help with Vortexus products, water treatment, pumps, chemicals, automation, RFQs, and contact details.',
  },
]

const rfqSteps = [
  {
    key: 'productInterest',
    label: 'Product or system needed',
    prompt: 'What product, spare part, or system do you need?',
    required: true,
    requiredMessage: 'Please tell me the product, spare part, or system you need so the team can prepare the RFQ properly.',
  },
  { key: 'application', label: 'Application or site problem', prompt: 'What is the application or site problem?' },
  { key: 'quantity', label: 'Quantity, size, or capacity', prompt: 'What quantity, size, capacity, flow rate, or pressure do you need, if known?' },
  { key: 'location', label: 'Location', prompt: 'Where is the project or delivery location?' },
  { key: 'urgency', label: 'Urgency', prompt: 'How urgent is this: breakdown, this week, planning, or comparing options?' },
  {
    key: 'fullName',
    label: 'Name',
    prompt: 'What is your full name?',
    required: true,
    requiredMessage: 'Please share your name so the team knows who to contact about this RFQ.',
  },
  {
    key: 'phone',
    label: 'Phone',
    prompt: 'What phone number should the Vortexus team use to follow up?',
    required: true,
    requiredMessage: 'Please share a phone number so the Vortexus team can follow up on the RFQ.',
  },
  { key: 'email', label: 'Email', prompt: 'What email should we use? You can type "skip" if phone is enough.' },
  { key: 'companyName', label: 'Company', prompt: 'What company or organization is this for? You can type "skip" if not applicable.' },
]

const emptyRfqAnswers = Object.fromEntries(rfqSteps.map((step) => [step.key, '']))
const quoteIntentPattern = /\b(quote|quotation|rfq|price|pricing|cost|how much)\b/i
const quoteNoisePattern = /\b(please|kindly|can|could|may|i|we|want|need|get|give|send|request|quote|quotation|rfq|price|pricing|cost|for|of|on|a|an|the|me|us|to|buy|purchase|order)\b/gi

function extractRfqProductInterest(text) {
  if (!quoteIntentPattern.test(text)) return ''

  const cleaned = text
    .replace(/["']/g, '')
    .replace(/\bwhat(?:'s| is| are)?\s+(?:the\s+)?/gi, ' ')
    .replace(/\b(?:please|kindly)?\s*(?:can|could|may)?\s*(?:i|we)?\s*(?:want|need)?\s*(?:to)?\s*(?:get|have|request|send|give)?\s*(?:a|an)?\s*(?:quote|quotation|rfq|price|pricing|cost)\s*(?:for|of|on)?\s*/gi, ' ')
    .replace(/\bhow much(?: is| are| for)?\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const meaningfulWords = cleaned.replace(quoteNoisePattern, ' ').replace(/\s+/g, ' ').trim()
  return meaningfulWords.length >= 3 ? cleaned : ''
}

function formatInlineText(text, onRequestQuote) {
  const segments = String(text).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)

  return segments.map((segment, index) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return (
        <strong key={`${segment}-${index}`} className="font-semibold text-brand-ink">
          {segment.slice(2, -2)}
        </strong>
      )
    }

    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, url] = linkMatch

      if (url === '/request-quote') {
        return (
          <button
            key={`${label}-${url}-${index}`}
            type="button"
            onClick={() => onRequestQuote?.(label)}
            className="inline font-semibold text-[var(--color-accent-blue-deep)] underline decoration-[var(--color-accent-blue)] underline-offset-4 transition hover:text-[var(--color-accent-blue)]"
          >
            {label}
          </button>
        )
      }

      return (
        <a
          key={`${label}-${url}-${index}`}
          href={url}
          className="font-semibold text-[var(--color-accent-blue-deep)] underline decoration-[var(--color-accent-blue)] underline-offset-4 transition hover:text-[var(--color-accent-blue)]"
        >
          {label}
        </a>
      )
    }

    return segment
  })
}

function FormattedMessage({ text, onRequestQuote }) {
  const lines = String(text)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())

  const blocks = []
  let listItems = []

  function flushList() {
    if (!listItems.length) return
    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-2 space-y-1.5 pl-4">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`} className="list-disc pl-1">
            {formatInlineText(item, onRequestQuote)}
          </li>
        ))}
      </ul>,
    )
    listItems = []
  }

  lines.forEach((line) => {
    if (!line) {
      flushList()
      return
    }

    const bulletMatch = line.match(/^[-*]\s+(.*)$/)
    if (bulletMatch) {
      listItems.push(bulletMatch[1])
      return
    }

    flushList()
    blocks.push(
      <p key={`p-${blocks.length}`} className="mb-2 last:mb-0">
        {formatInlineText(line, onRequestQuote)}
      </p>,
    )
  })

  flushList()

  return <div className="chatbot-message-text">{blocks}</div>
}

function WebsiteChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [activeFlow, setActiveFlow] = useState(null)
  const [rfqFlow, setRfqFlow] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [isOpen, messages])

  async function sendMessage(messageText, options = {}) {
    const text = messageText.trim()
    if (!text || isSending) return

    if (rfqFlow && !options.forceBot) {
      processRfqMessage(text)
      return
    }

    const quotedProduct = extractRfqProductInterest(text)
    if (quoteIntentPattern.test(text)) {
      startRfqFlow(text, quotedProduct)
      return
    }

    setDraft('')
    setIsSending(true)
    setMessages((current) => [...current, { role: 'user', text }])

    try {
      const payload = await askChatbot(text, {
        flowId: options.flowId,
        flowState: options.flowId || options.clearFlow ? null : activeFlow,
      })

      if (payload.flow_state && !payload.flow_state.is_complete) {
        setActiveFlow(payload.flow_state)
      } else if (payload.flow_state?.is_complete || options.clearFlow || !payload.flow_state) {
        setActiveFlow(null)
      }

      setMessages((current) => [
        ...current,
        {
          role: 'bot',
          text: payload.answer,
          links: payload.links || [],
          quickReplies: payload.quick_replies || [],
          catalogResults: payload.catalog_results,
          confidence: payload.confidence,
        },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'bot',
          text: error.message || 'The chatbot could not answer right now. Please try again.',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(draft)
  }

  function startRfqFlow(userLabel = 'Request Quote', initialProductInterest = '') {
    const startingAnswers = { ...emptyRfqAnswers, productInterest: initialProductInterest }
    const stepIndex = initialProductInterest ? 1 : 0

    setDraft('')
    setActiveFlow(null)
    setRfqFlow({ stepIndex, answers: startingAnswers })
    setMessages((current) => [
      ...current,
      { role: 'user', text: userLabel },
      {
        role: 'bot',
        text: initialProductInterest
          ? `I can collect the RFQ details here and send them to the Vortexus team.\n\nProduct or system needed: ${initialProductInterest}\n\n${rfqSteps[stepIndex].prompt}`
          : `I can collect the RFQ details here and send them to the Vortexus team.\n\n${rfqSteps[0].prompt}`,
      },
    ])
  }

  function formatRfqSummary(answers) {
    return rfqSteps
      .map((step) => `${step.label}: ${answers[step.key] || 'Not provided'}`)
      .join('\n')
  }

  async function submitRfq(answers) {
    setIsSending(true)
    try {
      await submitWeb3Form({
        subject: `Chatbot RFQ${answers.productInterest ? `: ${answers.productInterest}` : ''}`,
        fromName: 'Vortexus Chatbot RFQ',
        replyTo: answers.email || 'info@vortexusindustrial.com',
        fields: {
          inquiry_type: 'Chatbot RFQ',
          customer_name: answers.fullName,
          company_name: answers.companyName || 'Not provided',
          email: answers.email || 'Not provided',
          phone: answers.phone,
          landing_page: 'chatbot',
          product_interest: answers.productInterest || 'Not specified',
          quantity_or_size: answers.quantity || 'Not provided',
          location: answers.location || 'Not provided',
          urgency: answers.urgency || 'Not provided',
          application_or_site_problem: answers.application || 'Not provided',
          message: formatRfqSummary(answers),
        },
      })

      setRfqFlow(null)
      setMessages((current) => [
        ...current,
        {
          role: 'bot',
          text: 'Your RFQ has been submitted. The Vortexus team will review the details and follow up using the contact information you provided.',
          quickReplies: ['Find a product', 'Help me choose a pump', 'Help me choose water treatment'],
        },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'bot',
          text: error.message || 'The RFQ could not be submitted right now. Please try again.',
          quickReplies: ['Submit RFQ', 'Cancel RFQ'],
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  function processRfqMessage(text) {
    setDraft('')

    const normalized = text.toLowerCase()
    if (['cancel', 'cancel rfq', 'stop', 'start over'].includes(normalized)) {
      setRfqFlow(null)
      setMessages((current) => [
        ...current,
        { role: 'user', text },
        {
          role: 'bot',
          text: 'No problem. I have cancelled the RFQ capture. You can ask another product or technical question.',
          quickReplies: ['Browse Products', 'Find a Pump', 'Treat Water'],
        },
      ])
      return
    }

    if (rfqFlow.awaitingConfirmation) {
      if (['submit', 'submit rfq', 'send', 'send rfq', 'yes'].includes(normalized)) {
        setMessages((current) => [...current, { role: 'user', text }])
        submitRfq(rfqFlow.answers)
        return
      }

      if (['edit', 'edit rfq', 'change'].includes(normalized)) {
        setRfqFlow({ stepIndex: 0, answers: { ...emptyRfqAnswers } })
        setMessages((current) => [
          ...current,
          { role: 'user', text },
          { role: 'bot', text: `Sure, let's collect the RFQ again.\n\n${rfqSteps[0].prompt}` },
        ])
        return
      }

      setMessages((current) => [
        ...current,
        { role: 'user', text },
        {
          role: 'bot',
          text: 'Please type "submit" to send the RFQ, "edit" to restart the details, or "cancel" to stop.',
          quickReplies: ['Submit RFQ', 'Edit RFQ', 'Cancel RFQ'],
        },
      ])
      return
    }

    const step = rfqSteps[rfqFlow.stepIndex]
    const value = ['skip', 'n/a', 'na'].includes(normalized) ? '' : text

    if (step.required && !value) {
      setMessages((current) => [
        ...current,
        { role: 'user', text },
        { role: 'bot', text: step.requiredMessage || `${step.label} is required for the RFQ.` },
      ])
      return
    }

    const nextAnswers = { ...rfqFlow.answers, [step.key]: value }
    const nextIndex = rfqFlow.stepIndex + 1

    if (nextIndex < rfqSteps.length) {
      setRfqFlow({ stepIndex: nextIndex, answers: nextAnswers })
      setMessages((current) => [
        ...current,
        { role: 'user', text },
        { role: 'bot', text: rfqSteps[nextIndex].prompt },
      ])
      return
    }

    setRfqFlow({ stepIndex: nextIndex, answers: nextAnswers, awaitingConfirmation: true })
    setMessages((current) => [
      ...current,
      { role: 'user', text },
      {
        role: 'bot',
        text: `Please confirm the RFQ details before I send them:\n\n${formatRfqSummary(nextAnswers)}\n\nType "submit" to send, "edit" to restart, or "cancel" to stop.`,
        quickReplies: ['Submit RFQ', 'Edit RFQ', 'Cancel RFQ'],
      },
    ])
  }

  function handleQuickAction(action) {
    if (action.rfqFlow) {
      startRfqFlow(action.label)
      return
    }

    sendMessage(action.message || action.label, {
      flowId: action.flowId,
      clearFlow: action.clearFlow,
    })
  }

  function actionFromLabel(label) {
    const normalized = label.toLowerCase()
    if (normalized.startsWith('start rfq')) {
      return { label, message: 'Start RFQ guide', flowId: 'rfq' }
    }
    if (normalized.startsWith('start pump')) {
      return { label, message: 'Start pump selection', flowId: 'pump-selection' }
    }
    if (normalized.startsWith('start water')) {
      return { label, message: 'Start water treatment help', flowId: 'water-treatment' }
    }
    if (normalized.includes('submit rfq')) {
      return { label, message: 'submit' }
    }
    if (normalized.includes('edit rfq')) {
      return { label, message: 'edit' }
    }
    if (normalized.includes('cancel rfq')) {
      return { label, message: 'cancel' }
    }
    if (normalized.includes('rfq') || normalized.includes('quote')) {
      return { label, rfqFlow: true }
    }
    if (normalized.includes('pump')) {
      return { label, message: 'Help me choose the right pump from your catalog.', clearFlow: true }
    }
    if (normalized.includes('water treatment') || normalized.includes('treat water')) {
      return { label, message: 'Help me choose the right water treatment solution.', clearFlow: true }
    }
    if (normalized.includes('product')) {
      return { label, message: 'Show me the main product categories.', clearFlow: true }
    }
    if (normalized.includes('contact')) {
      return { label, message: 'Contact Vortexus', clearFlow: true }
    }
    return { label, message: label, clearFlow: true }
  }

  return (
    <div className="fixed inset-x-2 bottom-2 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Vortexus chatbot"
          className="mb-3 flex h-[min(640px,calc(100vh-5.5rem))] w-full flex-col overflow-hidden rounded-lg border border-brand-border bg-brand-white shadow-2xl shadow-slate-950/20 sm:mb-4 sm:w-[390px] sm:max-w-[calc(100vw-2rem)]"
        >
          <header className="flex items-center justify-between bg-[var(--color-accent-blue-deep)] px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white">
                <img src={company.favicon} alt="" className="size-7 object-contain" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold tracking-wide">Vortexus Assistant</h2>
                <p className="truncate text-xs text-white/80">Product and RFQ support</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chatbot"
              onClick={() => setIsOpen(false)}
              className="grid size-9 shrink-0 place-items-center rounded-md text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <IoClose aria-hidden="true" className="text-xl" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-brand-canvas px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[92%] rounded-lg px-3 py-2 text-sm leading-relaxed shadow-sm sm:max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-[var(--color-accent-blue-deep)] text-white'
                      : 'border border-brand-border bg-white text-brand-ink'
                  }`}
                >
                  <FormattedMessage text={message.text} onRequestQuote={startRfqFlow} />
                  {message.links?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.links.map((link) => (
                        link.url === '/request-quote' ? (
                          <button
                            key={`${link.label}-${link.url}`}
                            type="button"
                            onClick={() => startRfqFlow(link.label)}
                            className="rounded-md border border-[color-mix(in_srgb,var(--color-accent-blue)_24%,transparent)] px-2 py-1 text-xs font-semibold text-[var(--color-accent-blue-deep)] transition hover:border-[var(--color-accent-blue)] hover:bg-blue-50"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <a
                            key={`${link.label}-${link.url}`}
                            href={link.url}
                            className="rounded-md border border-[color-mix(in_srgb,var(--color-accent-blue)_24%,transparent)] px-2 py-1 text-xs font-semibold text-[var(--color-accent-blue-deep)] transition hover:border-[var(--color-accent-blue)] hover:bg-blue-50"
                          >
                            {link.label}
                          </a>
                        )
                      ))}
                    </div>
                  ) : null}
                  {message.catalogResults?.items?.length ? (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {message.catalogResults.title} matches
                      </p>
                      {message.catalogResults.items.slice(0, 4).map((item) => (
                        <a
                          key={`${item.name}-${item.url}`}
                          href={item.url}
                          className="flex items-center gap-2 rounded-md border border-brand-border bg-brand-canvas p-2 transition hover:border-[var(--color-accent-blue)] hover:bg-blue-50"
                        >
                          <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-md bg-white ring-1 ring-slate-200">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt=""
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-lg font-semibold text-[var(--color-accent-blue-deep)]">
                                {item.name.charAt(0)}
                              </span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="line-clamp-2 block text-sm font-semibold leading-snug text-slate-900">
                              {item.name}
                            </span>
                            <span className="mt-0.5 line-clamp-1 block text-xs text-slate-500">
                              {[item.brand, item.category || item.subcategory].filter(Boolean).join(' / ')}
                            </span>
                          </span>
                        </a>
                      ))}
                      {message.catalogResults.total > 4 ? (
                        <p className="text-xs text-slate-500">
                          Showing top 4 of {message.catalogResults.total} matches.
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {message.quickReplies?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply) => {
                        const action = actionFromLabel(reply)
                        return (
                          <button
                            key={reply}
                            type="button"
                            onClick={() => handleQuickAction(action)}
                            className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-[var(--color-accent-blue-deep)] transition hover:bg-blue-100 disabled:opacity-60"
                            disabled={isSending}
                          >
                            {reply}
                          </button>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {isSending ? (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-2 rounded-lg border border-brand-border bg-white px-3 py-2 shadow-sm"
                  aria-label="Vortexus Assistant is preparing a response"
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent-blue-deep)] [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent-blue)] [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent-blue-highlight)]" />
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-brand-border bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => handleQuickAction(prompt)}
                  className="rounded-md border border-[color-mix(in_srgb,var(--color-accent-blue)_24%,transparent)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-accent-blue-deep)] transition hover:border-[var(--color-accent-blue)] hover:bg-blue-50 disabled:opacity-60"
                  disabled={isSending}
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <label htmlFor="vortexus-chatbot-message" className="sr-only">
                Message
              </label>
              <input
                id="vortexus-chatbot-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about products, RFQs, pumps..."
                className="min-w-0 flex-1 rounded-md border border-brand-border px-3 py-2 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-blue)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-accent-blue)_22%,transparent)]"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={isSending || !draft.trim()}
                className="grid size-10 place-items-center rounded-md bg-[var(--color-accent-blue)] text-white transition hover:bg-[var(--color-accent-blue-hover)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-accent-blue)_32%,transparent)] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <IoPaperPlaneOutline aria-hidden="true" className="text-lg" />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? 'Close Vortexus chatbot' : 'Open Vortexus chatbot'}
        onClick={() => setIsOpen((current) => !current)}
        className="ml-auto grid size-14 place-items-center rounded-lg bg-[var(--color-accent-blue)] text-white shadow-xl shadow-slate-950/25 transition hover:bg-[var(--color-accent-blue-hover)] focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-accent-blue)_24%,transparent)]"
      >
        {isOpen ? (
          <IoClose aria-hidden="true" className="text-2xl" />
        ) : (
          <IoChatbubbleEllipsesOutline aria-hidden="true" className="text-2xl" />
        )}
      </button>
    </div>
  )
}

export default WebsiteChatbot
