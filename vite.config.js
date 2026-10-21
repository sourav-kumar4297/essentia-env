import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const leadsModuleUrl = pathToFileURL(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'server/leads.js'),
).href

function leadApiPlugin() {
  const attach = (middlewares) => {
    middlewares.use(async (req, res, next) => {
      const url = req.url?.split('?')[0]
      if (req.method !== 'POST' || (url !== '/api/contact' && url !== '/api/career')) {
        next()
        return
      }

      try {
        const { handleContact, handleCareer } = await import(leadsModuleUrl)
        if (url === '/api/contact') await handleContact(req, res)
        else await handleCareer(req, res)
      } catch (error) {
        console.error('Lead API error:', error)
        if (!res.writableEnded) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ message: 'Failed to send message' }))
        }
      }
    })
  }

  return {
    name: 'lead-api',
    configureServer(server) {
      attach(server.middlewares)
    },
    configurePreviewServer(server) {
      attach(server.middlewares)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['CONTACT_EMAIL', 'CONTACT_PASS', 'CONTACT_TO', 'SMTP_HOST', 'SMTP_PORT']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }
  const groqProxy = {
    '/api/groq-chat': {
      target: 'https://api.groq.com',
      changeOrigin: true,
      rewrite: () => '/openai/v1/chat/completions',
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          proxyReq.setHeader('Authorization', `Bearer ${env.VITE_GROQ_API_KEY || ''}`)
        })
      },
    },
  }

  return {
    plugins: [react(), tailwindcss(), leadApiPlugin()],

    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    build: {
      target: 'es2017',
      minify: 'esbuild',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['framer-motion'],
            'vendor-gsap': ['gsap', '@gsap/react'],
            'vendor-ui': ['lucide-react', 'swiper'],
            'vendor-misc': ['lenis', 'react-helmet-async'],
          },
        },
      },
    },

    server: {
      hmr: true,
      proxy: groqProxy,
      configureServer(server) {
        const staticPages = {
          '/awards': '/awards/index.html',
          '/awards/': '/awards/index.html',
          '/luxury-interior-designers-gurgaon': '/luxury-interior-designers-gurgaon/index.html',
          '/luxury-interior-designers-gurgaon/': '/luxury-interior-designers-gurgaon/index.html',
        }
        server.middlewares.use((req, _res, next) => {
          const url = req.url?.split('?')[0]
          if (url && staticPages[url]) req.url = staticPages[url]
          next()
        })
      },
    },

    preview: { proxy: groqProxy },
  }
})
