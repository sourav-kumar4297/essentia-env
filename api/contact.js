import { handleContact } from '../server/leads.js'

export const config = { api: { bodyParser: false } }

export default function handler(req, res) {
  return handleContact(req, res)
}
