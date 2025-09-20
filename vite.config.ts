import { promises as fs } from 'fs'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest.config'

const isFirefoxBuild = process.env.BROWSER === 'firefox'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    crx({
      manifest,
      contentScripts: {
        injectCss: true,
      },
    }),
    (() => {
      let outDir = 'dist'

      return {
        name: 'gachon-tools:firefox-manifest-fixups',
        apply: 'build',
        enforce: 'post',
        configResolved(resolvedConfig) {
          outDir = resolvedConfig.build.outDir
        },
        async closeBundle() {
          if (!isFirefoxBuild) {
            return
          }

          const manifestPath = join(outDir, 'manifest.json')

          try {
            const manifestRaw = await fs.readFile(manifestPath, 'utf8')
            const manifestJson = JSON.parse(manifestRaw)

            delete manifestJson.version_name

            manifestJson.web_accessible_resources = manifestJson.web_accessible_resources?.map(
              ({ use_dynamic_url: _ignored, ...rest }: Record<string, unknown>) => rest,
            )

            await fs.writeFile(manifestPath, `${JSON.stringify(manifestJson, null, 2)}\n`, 'utf8')
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
              this.warn(`Failed to adjust Firefox manifest: ${String(error)}`)
            }
          }
        },
      }
    })(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/assets': resolve(__dirname, './src/assets'),
    },
  },
})
