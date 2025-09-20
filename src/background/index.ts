const extensionApi = globalThis.browser ?? chrome
const runtime = extensionApi.runtime
const tabs = extensionApi.tabs
const scripting = extensionApi.scripting
const storage = extensionApi.storage

runtime.onInstalled.addListener(async details => {
  if (details.reason === 'install') {
    // set a badge so the browser action is enabled on install
    runtime.setUninstallURL?.('https://github.com/Kinetic27/gachon-tools-firefox')
  }
})

runtime.onUpdateAvailable.addListener(() => {
  runtime.reload()
})

runtime.onConnect.addListener((port: Runtime.Port) => {
  console.log('Connected .....', port)

  if (port.name === '@crx/client') {
    port.onMessage.addListener((msg: any) => {
      console.log('message received', msg)
    })
  }
})

storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    for (const key of Object.keys(changes)) {
      console.log(`storage.local.${key} changed`)
    }
  }
})

export {}
