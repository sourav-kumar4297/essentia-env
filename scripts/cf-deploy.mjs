import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const keys = ['GROQ_API_KEY', 'CONTACT_PASS', 'CONTACT_EMAIL', 'CONTACT_TO']

function run(args) {
  const result = spawnSync('npx', ['wrangler', ...args], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

run(['deploy'])

const missing = keys.filter((key) => !process.env[key])
if (missing.length) {
  console.error(`Deployed the site. These variables were not available to the deploy command: ${missing.join(', ')}`)
  process.exit(0)
}

const secrets = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
const dir = mkdtempSync(join(tmpdir(), 'ee-cf-'))
const file = join(dir, 'secrets.json')
writeFileSync(file, JSON.stringify(secrets))
try {
  run(['secret', 'bulk', file])
} finally {
  rmSync(dir, { recursive: true, force: true })
}
