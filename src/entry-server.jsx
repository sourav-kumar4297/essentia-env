import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

export async function render(url, manifestPath) {
  const helmetContext = {}

  // Simple location mock for StaticRouter functionality
  const mockLocation = new URL(url, 'http://localhost').pathname

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  )

  const { helmet } = helmetContext

  return { 
    html, 
    head: {
      title: helmet?.title?.toString() || '',
      meta: helmet?.meta?.toString() || '',
      link: helmet?.link?.toString() || '',
      script: helmet?.script?.toString() || '',
    }
  }
}
