import { connect } from 'cloudflare:sockets'

const MAX_BODY = 4_500_000
const MAX_RESUME = 3 * 1024 * 1024

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function text(value, max = 5000) {
  return String(value || '').trim().slice(0, max)
}

function oneLine(value, max = 180) {
  return text(value, max).replace(/[\r\n]+/g, ' ')
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
}

async function readJson(request) {
  const raw = await request.text()
  if (raw.length > MAX_BODY) {
    const error = new Error('Payload too large')
    error.status = 413
    throw error
  }
  try {
    return raw ? JSON.parse(raw) : {}
  } catch {
    const error = new Error('Invalid JSON')
    error.status = 400
    throw error
  }
}

function encode(value) {
  return new TextEncoder().encode(value)
}

async function readSmtp(reader) {
  const decoder = new TextDecoder()
  let body = ''
  while (!/^\d{3} /m.test(body.split(/\r?\n/).filter(Boolean).pop() || '')) {
    const { value, done } = await reader.read()
    if (done) break
    body += decoder.decode(value, { stream: true })
    if (body.length > 100_000) break
  }
  return body
}

async function smtpCommand(writer, reader, line) {
  await writer.write(encode(`${line}\r\n`))
  const reply = await readSmtp(reader)
  const code = Number(reply.slice(0, 3))
  if (!code || code >= 400) throw new Error(reply.trim() || 'SMTP failed')
  return reply
}

function b64(value) {
  const bytes = encode(value)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function wrapBase64(value) {
  return value.replace(/\s/g, '').match(/.{1,76}/g)?.join('\r\n') || ''
}

function mailMessage({ from, to, replyTo, subject, textBody, attachment }) {
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : '',
    `Subject: ${oneLine(subject, 180)}`,
    'MIME-Version: 1.0',
  ].filter(Boolean)

  if (!attachment) {
    headers.push('Content-Type: text/plain; charset=utf-8')
    return `${headers.join('\r\n')}\r\n\r\n${textBody}`
  }

  const boundary = `ee-${crypto.randomUUID()}`
  headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`)
  const filename = oneLine(attachment.filename, 180).replace(/"/g, '')
  return [
    headers.join('\r\n'),
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    textBody,
    `--${boundary}`,
    `Content-Type: ${attachment.type || 'application/octet-stream'}; name="${filename}"`,
    'Content-Transfer-Encoding: base64',
    `Content-Disposition: attachment; filename="${filename}"`,
    '',
    wrapBase64(attachment.data),
    `--${boundary}--`,
    '',
  ].join('\r\n')
}

async function sendMail(env, message) {
  const from = text(env.CONTACT_EMAIL, 180)
  const pass = env.CONTACT_PASS || ''
  const to = text(env.CONTACT_TO || env.CONTACT_EMAIL, 180)
  if (!from || !pass || !to) {
    const error = new Error('Email is not configured')
    error.status = 503
    throw error
  }

  const socket = connect({ hostname: 'smtp.office365.com', port: 587 })
  let reader = socket.readable.getReader()
  let writer = socket.writable.getWriter()
  try {
    await readSmtp(reader)
    await smtpCommand(writer, reader, 'EHLO essentiaenvironments.com')
    await smtpCommand(writer, reader, 'STARTTLS')
    reader.releaseLock()
    writer.releaseLock()
    const secure = socket.startTls()
    reader = secure.readable.getReader()
    writer = secure.writable.getWriter()
    await smtpCommand(writer, reader, 'EHLO essentiaenvironments.com')
    await smtpCommand(writer, reader, 'AUTH LOGIN')
    await smtpCommand(writer, reader, b64(from))
    await smtpCommand(writer, reader, b64(pass))
    await smtpCommand(writer, reader, `MAIL FROM:<${from}>`)
    await smtpCommand(writer, reader, `RCPT TO:<${to}>`)
    await smtpCommand(writer, reader, 'DATA')
    const dotted = message.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..')
    await writer.write(encode(`${dotted}\r\n.\r\n`))
    const queued = await readSmtp(reader)
    if (!queued.startsWith('250')) throw new Error(queued.trim() || 'SMTP failed')
    await smtpCommand(writer, reader, 'QUIT')
  } finally {
    try { reader.releaseLock() } catch { /* already released */ }
    try { writer.releaseLock() } catch { /* already released */ }
    try { await socket.close() } catch { /* closed with the TLS socket */ }
  }
}

async function handleContact(request, env) {
  const data = await readJson(request)
  const name = text(data.name, 120)
  const email = text(data.email, 180)
  const message = text(data.message)
  const phone = text(data.phone, 40)
  const subject = text(data.subject, 180)
  const looking = text(data.looking, 180)
  const space = text(data.space, 180)
  const source = text(data.source, 180)

  if (!name || !email || !message) return json({ message: 'Name, email, and message are required' }, 400)
  if (!isEmail(email)) return json({ message: 'Enter a valid email address' }, 400)

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    subject && `Subject: ${subject}`,
    looking && `Looking for: ${looking}`,
    space && `Space: ${space}`,
    source && `Source: ${source}`,
    '',
    message,
  ].filter((line) => line !== false && line !== '')

  await sendMail(env, mailMessage({
    from: text(env.CONTACT_EMAIL, 180),
    to: text(env.CONTACT_TO || env.CONTACT_EMAIL, 180),
    replyTo: email,
    subject: `New Contact Inquiry: ${oneLine(subject || looking || 'website enquiry')}`,
    textBody: lines.join('\n'),
  }))
  return json({ message: 'Enquiry sent successfully' })
}

async function handleCareer(request, env) {
  const data = await readJson(request)
  const name = text(data.name, 120)
  const email = text(data.email, 180)
  const phone = text(data.phone, 40)
  const category = text(data.category, 120)
  const portfolio = text(data.portfolio, 300)
  const message = text(data.message)
  const resume = data.resume || {}

  if (!name || !email || !phone || !category) {
    return json({ message: 'Name, email, phone, and role are required' }, 400)
  }
  if (!isEmail(email)) return json({ message: 'Enter a valid email address' }, 400)
  if (!resume.data || !resume.filename) return json({ message: 'Please attach your resume' }, 400)

  const filename = oneLine(resume.filename, 180)
  const contentType = text(resume.type, 120)
  if (contentType && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(contentType) && !/\.(pdf|doc|docx)$/i.test(filename)) {
    return json({ message: 'Resume must be a PDF or Word file' }, 400)
  }
  const clean = String(resume.data).replace(/\s/g, '')
  const bytes = Math.floor((clean.length * 3) / 4)
  if (!bytes || bytes > MAX_RESUME) return json({ message: 'Resume must be a PDF or Word file under 3 MB' }, 400)

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Category: ${category}`,
    portfolio && `Portfolio: ${portfolio}`,
    message && `Message: ${message}`,
  ].filter(Boolean)

  await sendMail(env, mailMessage({
    from: text(env.CONTACT_EMAIL, 180),
    to: text(env.CONTACT_TO || env.CONTACT_EMAIL, 180),
    replyTo: email,
    subject: `New Job Application: ${oneLine(category)} - ${oneLine(name)}`,
    textBody: lines.join('\n'),
    attachment: { filename, type: contentType || 'application/octet-stream', data: clean },
  }))
  return json({ message: 'Application sent successfully' })
}

async function handleChat(request, env) {
  const key = env.GROQ_API_KEY
  if (!key) return json({ error: { message: 'Chat is not configured' } }, 503)
  const raw = await request.text()
  if (raw.length > 1_000_000) return json({ error: { message: 'Payload too large' } }, 413)

  let body = raw
  try {
    const parsed = JSON.parse(raw || '{}')
    parsed.user = 'ee-chatbot'
    body = JSON.stringify(parsed)
  } catch {
    return json({ error: { message: 'Invalid JSON' } }, 400)
  }

  const groq = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body,
  })
  return new Response(await groq.text(), {
    status: groq.status,
    headers: { 'Content-Type': groq.headers.get('content-type') || 'application/json' },
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const route = url.pathname.replace(/\/$/, '')
    if (route !== '/api/contact' && route !== '/api/career' && route !== '/api/groq-chat') {
      return env.ASSETS.fetch(request)
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204 })
    if (request.method !== 'POST') {
      const message = 'Method not allowed'
      return route === '/api/groq-chat' ? json({ error: { message } }, 405) : json({ message }, 405)
    }

    try {
      if (route === '/api/groq-chat') return await handleChat(request, env)
      if (route === '/api/contact') return await handleContact(request, env)
      return await handleCareer(request, env)
    } catch (error) {
      console.error(route, error?.message || error)
      const status = error.status || 500
      const message = status === 503 ? 'Email is not configured on the server' : status === 400 || status === 413 ? error.message : 'Failed to send message'
      if (route === '/api/groq-chat') return json({ error: { message: status === 500 ? 'Failed to reach chat' : message } }, status)
      return json({ message }, status)
    }
  },
}
