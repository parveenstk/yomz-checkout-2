// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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
