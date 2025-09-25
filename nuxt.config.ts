// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: 'YOMZ - Checkout-2',
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image', '@pinia/nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  runtimeConfig: {
    konnective: {
      loginId: "gsteamapiu",
      password: "nZtvxxULEvJiqKiNpDF4",
      campaignId: 386,
    },
    public: {
      encryptResponses: true, // Optional public flag
    }
  }
})
