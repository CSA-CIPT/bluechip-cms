// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: false,
  devServer: {
    host: "192.168.70.65", // Listen on all interfaces
    port: 3000, // The port you want to use
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxt/icon',
    '@pinia/nuxt',
    "nuxt-lodash"
  ],
})