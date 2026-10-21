import { handleCareer } from '../server/leads.js'

export const config = { api: { bodyParser: false } }

export default function handler(req, res) {
  return handleCareer(req, res)
}
