export const config = { api: { bodyParser: false } }

function sendJson(res, status, message) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ error: { message } }))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, 'Method not allowed')

  const key = process.env.GROQ_API_KEY
  if (!key) return sendJson(res, 503, 'Chat is not configured')

  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 1_000_000) return sendJson(res, 413, 'Payload too large')
    chunks.push(chunk)
  }

  try {
    const groq = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: Buffer.concat(chunks),
    })
    const text = await groq.text()
    res.statusCode = groq.status
    res.setHeader('Content-Type', groq.headers.get('content-type') || 'application/json')
    res.end(text)
  } catch (error) {
    console.error('Groq chat error:', error)
    return sendJson(res, 500, 'Failed to reach chat')
  }
}
