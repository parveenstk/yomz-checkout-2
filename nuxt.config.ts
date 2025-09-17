// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  runtimeConfig: {
    konnective: {
      loginId: "abc",
      password: "abc123",
      campaignId: 24,
    },
    public: {
      encryptResponses: true, // Optional public flag
    }
  }
})
