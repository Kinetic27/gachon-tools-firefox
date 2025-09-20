import { SHADOW_HOST_ID } from '@/constants'

export default function createShadowRoot(styles: string[]): ShadowRoot {
  const existingHost = document.getElementById(SHADOW_HOST_ID)
  if (existingHost?.shadowRoot) {
    return existingHost.shadowRoot
  }

  existingHost?.remove()

  const host = document.createElement('div')
  host.setAttribute('id', SHADOW_HOST_ID)
  const shadowRoot = host.attachShadow({ mode: 'open' })

  const combinedStyles = styles.join('\n')

  const styleElement = document.createElement('style')
  styleElement.textContent = combinedStyles
  shadowRoot.appendChild(styleElement)

  const appendHost = () => {
    const target = document.body ?? document.documentElement
    if (!target) {
      throw new Error('Failed to locate a container to mount the Gachon Tools shadow host')
    }
    target.appendChild(host)
  }

  if (document.body) {
    appendHost()
  } else {
    document.addEventListener('DOMContentLoaded', appendHost, { once: true })
  }

  return shadowRoot
}
