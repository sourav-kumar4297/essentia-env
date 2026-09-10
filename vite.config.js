import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
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
    plugins: [react(), tailwindcss()],

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
