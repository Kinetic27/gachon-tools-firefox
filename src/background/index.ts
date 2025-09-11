import 'webextension-polyfill'

browser.runtime.onInstalled.addListener(async () => {
  for (const cs of browser.runtime.getManifest().content_scripts ?? []) {
    for (const tab of await browser.tabs.query({ url: cs.matches ?? [] })) {
      browser.scripting.executeScript({
        target: { tabId: tab.id ?? 0 },
        files: cs.js ?? [],
      })
      cs.css?.forEach((css: string) => {
        browser.scripting.insertCSS({
          target: { tabId: tab.id ?? 0 },
          files: [css],
        })
      })
    }
  }
})

browser.runtime.onUpdateAvailable.addListener(() => {
  browser.runtime.reload()
})

browser.runtime.onConnect.addListener((port: browser.runtime.Port) => {
  console.log('Connected .....', port)

  if (port.name === '@crx/client') {
    port.onMessage.addListener((msg: any) => {
      console.log('message received', msg)
    })
  }
})

browser.storage.onChanged.addListener((changes: { [key: string]: browser.storage.StorageChange }, areaName: string) => {
  if (areaName === 'local') {
    for (const key of Object.keys(changes)) {
      console.log(`storage.local.${key} changed`)
    }
  }
})

export {}
