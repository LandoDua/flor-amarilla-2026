import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['flowers/**/*.png'],
      manifest: {
        name: 'Flores Amarillas 💛',
        short_name: 'Flores',
        description: 'Carta animada de flores amarillas - Dia de las Flores Amarillas 2026',
        theme_color: '#f5f0e1',
        background_color: '#f5f0e1',
        display: 'standalone',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌻</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html}', 'flowers/**/*.png'],
        runtimeCaching: [
          {
            urlPattern: /\/flowers\/.*\.png$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'flower-images',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
  base: '/flor-amarilla-2026/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
