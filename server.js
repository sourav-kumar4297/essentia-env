import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = process.env.PORT || 3000

// Create the dist directories if they don't exist
const distPath = path.resolve(__dirname, '../../dist')
const distServerPath = path.resolve(__dirname, '../../dist/server')

// Serve client assets
app.use(express.static(path.join(distPath, 'client'), { index: false }))

// Load the SSR bundle
let render
try {
  const { render: ssrRender } = await import(path.resolve(distServerPath, 'entry-server.mjs'))
  render = ssrRender
} catch (e) {
  console.error('Failed to load SSR bundle:', e)
  process.exit(1)
}

// Handle all routes with SSR
app.get('*', async (req, res) => {
  const url = req.originalUrl

  try {
    const { html, helmetContext } = render(url)
    const { helmet } = helmetContext

    // Get the HTML template
    const indexPath = path.join(distPath, 'client', 'index.html')
    let template = fs.readFileSync(indexPath, 'utf-8')

    // Replace the root div and inject Helmet tags
    const htmlWithHelmet = template
      .replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
      .replace(
        '</head>',
        `${helmet?.title?.toString() || ''}
         ${helmet?.meta?.toString() || ''}
         ${helmet?.link?.toString() || ''}
         </head>`
      )

    res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithHelmet)
  } catch (e) {
    console.error('SSR Error:', e)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`SSR Server running at http://localhost:${port}`)
})
