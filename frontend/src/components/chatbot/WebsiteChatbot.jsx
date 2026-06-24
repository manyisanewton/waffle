import { useEffect, useRef, useState } from 'react'
import { IoChatbubbleEllipsesOutline, IoClose, IoPaperPlaneOutline } from 'react-icons/io5'
import { askChatbot } from '../../lib/chatbotApi'

const starterPrompts = [
  { label: 'Request Quote', flowId: 'rfq', message: 'Start RFQ guide' },
  { label: 'Pump Help', flowId: 'pump-selection', message: 'Start pump selection' },
  { label: 'Water Treatment', flowId: 'water-treatment', message: 'Start water treatment help' },
  { label: 'Products', message: 'What products do you supply?' },
]

const initialMessages = [
  {
    role: 'bot',
    text: 'Hi, I can help with Vortexus products, water treatment, pumps, chemicals, automation, RFQs, and contact details.',
  },
]

function WebsiteChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [activeFlow, setActiveFlow] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [isOpen, messages])

  async function sendMessage(messageText, options = {}) {
    const text = messageText.trim()
    if (!text || isSending) return

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

  function handleQuickAction(action) {
    sendMessage(action.message || action.label, {
      flowId: action.flowId,
      clearFlow: action.clearFlow,
    })
  }

  function actionFromLabel(label) {
    const normalized = label.toLowerCase()
    if (normalized.includes('rfq') || normalized.includes('quote')) {
      return { label, message: 'Start RFQ guide', flowId: 'rfq' }
    }
    if (normalized.includes('pump')) {
      return { label, message: 'Start pump selection', flowId: 'pump-selection' }
    }
    if (normalized.includes('water treatment')) {
      return { label, message: 'Start water treatment help', flowId: 'water-treatment' }
    }
    if (normalized.includes('contact')) {
      return { label, message: 'Contact Vortexus', clearFlow: true }
    }
    return { label, message: label, clearFlow: true }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Vortexus chatbot"
          className="mb-4 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-lg border border-emerald-950/10 bg-white shadow-2xl shadow-emerald-950/20"
        >
          <header className="flex items-center justify-between bg-emerald-950 px-4 py-3 text-white">
            <div>
              <h2 className="text-sm font-semibold tracking-wide">Vortexus Assistant</h2>
              <p className="text-xs text-emerald-50/80">Product and RFQ support</p>
            </div>
            <button
              type="button"
              aria-label="Close chatbot"
              onClick={() => setIsOpen(false)}
              className="grid size-9 place-items-center rounded-md text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <IoClose aria-hidden="true" className="text-xl" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed shadow-sm ${
                    message.role === 'user'
                      ? 'bg-emerald-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  {message.links?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.links.map((link) => (
                        <a
                          key={`${link.label}-${link.url}`}
                          href={link.url}
                          className="rounded-md border border-emerald-700/20 px-2 py-1 text-xs font-semibold text-emerald-800 transition hover:border-emerald-700/50 hover:bg-emerald-50"
                        >
                          {link.label}
                        </a>
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
                          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-2 transition hover:border-emerald-700/40 hover:bg-emerald-50"
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
                              <span className="text-lg font-semibold text-emerald-800">
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
                            className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200 disabled:opacity-60"
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
                <p className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
                  Checking the website knowledge base...
                </p>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => handleQuickAction(prompt)}
                  className="rounded-md border border-emerald-700/20 px-2.5 py-1.5 text-xs font-medium text-emerald-900 transition hover:border-emerald-700/50 hover:bg-emerald-50 disabled:opacity-60"
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
                className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={isSending || !draft.trim()}
                className="grid size-10 place-items-center rounded-md bg-emerald-700 text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 disabled:cursor-not-allowed disabled:bg-slate-300"
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
        className="ml-auto grid size-14 place-items-center rounded-lg bg-emerald-700 text-white shadow-xl shadow-emerald-950/25 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-700/25"
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
