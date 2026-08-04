const DEFAULT_CHATBOT_API_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:5000'
  : 'https://chatbot.vortexusindustrial.com'
const CHATBOT_API_URL = (import.meta.env.VITE_CHATBOT_API_URL || DEFAULT_CHATBOT_API_URL).replace(/\/$/, '')

export async function askChatbot(message, options = {}) {
  const response = await fetch(`${CHATBOT_API_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      flow_id: options.flowId,
      flow_state: options.flowState,
    }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.answer || 'The chatbot could not answer right now.')
  }

  return payload
}

export { CHATBOT_API_URL }
