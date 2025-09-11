import type { StorageData } from '@/types'
import type { Storage } from 'webextension-polyfill'

class BrowserStorageClient {
  private static instance: BrowserStorageClient
  private storage: Storage.StorageArea

  private constructor() {
    this.storage = browser.storage.local
  }

  public static getInstance(): BrowserStorageClient {
    if (!BrowserStorageClient.instance) {
      BrowserStorageClient.instance = new BrowserStorageClient()
    }
    return BrowserStorageClient.instance
  }

  public async getData(): Promise<StorageData> {
    return (await this.storage.get(null)) as StorageData
  }

  public async setData(data: Partial<StorageData>): Promise<void> {
    return this.storage.set(data)
  }

  public async removeData(keys: string | string[]): Promise<void> {
    return this.storage.remove(keys)
  }

  public async clearData(): Promise<void> {
    return this.storage.clear()
  }

  public async getDataByKey<K extends keyof StorageData>(key: K): Promise<StorageData[K]> {
    const result = await this.storage.get(key)
    return result[key] as StorageData[K]
  }

  public async updateDataByKey<K extends keyof StorageData>(
    key: K,
    updateFn: (prevValue: StorageData[K]) => StorageData[K],
  ): Promise<void> {
    const currentValue = await this.getDataByKey(key)
    const newValue = updateFn(currentValue)
    await this.setData({ [key]: newValue } as Partial<StorageData>)
  }

  public onStorageChanged(
    callback: (changes: { [key: string]: Storage.StorageChange }, areaName: string) => void,
  ): void {
    browser.storage.onChanged.addListener(callback)
  }

  public removeStorageChangedListener(
    callback: (changes: { [key: string]: Storage.StorageChange }, areaName: string) => void,
  ): void {
    browser.storage.onChanged.removeListener(callback)
  }
}

export const browserStorageClient = BrowserStorageClient.getInstance()
