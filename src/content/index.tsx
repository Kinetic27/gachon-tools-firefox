import 'webextension-polyfill'
import { createRoot } from 'react-dom/client'
import cropperStyles from 'react-easy-crop/react-easy-crop.css?inline'

import { App } from './App'
import baseStyles from '@/styles/index.css?inline'
import backdropStyles from '@/styles/backdrop.css?inline'
import createShadowRoot from '@/utils/createShadowRoot'

const logPrefix = '[Gachon Tools]'

const initApp = () => {
  try {
    console.info(`${logPrefix} initializing content script`, {
      url: window.location.href,
      readyState: document.readyState,
      hasBody: Boolean(document.body),
    })

    // remove scroll to top button
    document.getElementById('back-top')?.remove()

    const shadowRoot = createShadowRoot([baseStyles, backdropStyles, cropperStyles])
    createRoot(shadowRoot).render(<App />)

    console.info(`${logPrefix} mounted UI`)
  } catch (error) {
    console.error(`${logPrefix} failed to initialize`, error)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, { once: true })
} else {
  initApp()
}
