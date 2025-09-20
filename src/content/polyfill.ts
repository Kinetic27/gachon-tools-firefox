const polyfillLogPrefix = '[Gachon Tools][polyfill]'

try {
  if (typeof globalThis.chrome === 'undefined' && typeof globalThis.browser !== 'undefined') {
    ;(globalThis as typeof globalThis & { chrome: typeof globalThis.browser }).chrome = globalThis.browser
    console.info(`${polyfillLogPrefix} mapped browser → chrome namespace`)
  } else {
    console.info(`${polyfillLogPrefix} chrome namespace already available`)
  }
} catch (error) {
  console.error(`${polyfillLogPrefix} failed`, error)
}

export {}
