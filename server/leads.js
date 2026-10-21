import nodemailer from 'nodemailer'

const MAX_MESSAGE = 5000
const MAX_RESUME_BYTES = 3 * 1024 * 1024
const RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body)
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(JSON.parse(req.body || '{}'))
    } catch {
      return Promise.reject(new Error('Invalid JSON'))
    }
  }

  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > 4_500_000) {
        reject(new Error('Payload too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

function oneLine(value, max = 180) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)
}

function text(value, max = MAX_MESSAGE) {
  return String(value || '').trim().slice(0, max)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
}

function mailer() {
  const user = process.env.CONTACT_EMAIL
  const pass = process.env.CONTACT_PASS
  if (!user || !pass) {
    const error = new Error('Email is not configured')
    error.code = 'MAIL_NOT_CONFIGURED'
    throw error
  }

  return {
    from: user,
    to: process.env.CONTACT_TO || user,
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user, pass },
    }),
  }
}

async function deliver({ replyTo, subject, textBody, attachments }) {
  const { from, to, transport } = mailer()
  await transport.sendMail({
    from,
    to,
    replyTo,
    subject,
    text: textBody,
    attachments,
  })
}

function fail(res, error) {
  console.error('Lead mail error:', error)
  if (error?.code === 'MAIL_NOT_CONFIGURED' || error?.message === 'Email is not configured') {
    return sendJson(res, 503, { message: 'Email is not configured on the server' })
  }
  if (error?.message === 'Invalid JSON' || error?.message === 'Payload too large') {
    return sendJson(res, 400, { message: error.message })
  }
  return sendJson(res, 500, { message: 'Failed to send message' })
}

export async function handleContact(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { message: 'Method not allowed' })

  try {
    const data = await readBody(req)
    const name = text(data.name, 120)
    const email = text(data.email, 180)
    const message = text(data.message)
    const phone = text(data.phone, 40)
    const subject = text(data.subject, 180)
    const looking = text(data.looking, 180)
    const space = text(data.space, 180)
    const source = text(data.source, 180)

    if (!name || !email || !message) {
      return sendJson(res, 400, { message: 'Name, email, and message are required' })
    }
    if (!isEmail(email)) {
      return sendJson(res, 400, { message: 'Enter a valid email address' })
    }

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

    await deliver({
      replyTo: email,
      subject: `New Contact Inquiry: ${oneLine(subject || looking || 'website enquiry')}`,
      textBody: lines.join('\n'),
    })

    return sendJson(res, 200, { message: 'Enquiry sent successfully' })
  } catch (error) {
    return fail(res, error)
  }
}

export async function handleCareer(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { message: 'Method not allowed' })

  try {
    const data = await readBody(req)
    const name = text(data.name, 120)
    const email = text(data.email, 180)
    const phone = text(data.phone, 40)
    const category = text(data.category, 120)
    const portfolio = text(data.portfolio, 300)
    const message = text(data.message)
    const resume = data.resume || {}

    if (!name || !email || !phone || !category) {
      return sendJson(res, 400, { message: 'Name, email, phone, and role are required' })
    }
    if (!isEmail(email)) {
      return sendJson(res, 400, { message: 'Enter a valid email address' })
    }
    if (!resume.data || !resume.filename) {
      return sendJson(res, 400, { message: 'Please attach your resume' })
    }

    const filename = oneLine(resume.filename, 180)
    const contentType = text(resume.type, 120)
    if (contentType && !RESUME_TYPES.has(contentType) && !/\.(pdf|doc|docx)$/i.test(filename)) {
      return sendJson(res, 400, { message: 'Resume must be a PDF or Word file' })
    }

    const content = Buffer.from(String(resume.data), 'base64')
    if (!content.length || content.length > MAX_RESUME_BYTES) {
      return sendJson(res, 400, { message: 'Resume must be a PDF or Word file under 3 MB' })
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Category: ${category}`,
      portfolio && `Portfolio: ${portfolio}`,
      message && `Message: ${message}`,
    ].filter(Boolean)

    await deliver({
      replyTo: email,
      subject: `New Job Application: ${oneLine(category)} - ${oneLine(name)}`,
      textBody: lines.join('\n'),
      attachments: [{ filename, content, contentType: contentType || undefined }],
    })

    return sendJson(res, 200, { message: 'Application sent successfully' })
  } catch (error) {
    return fail(res, error)
  }
}
