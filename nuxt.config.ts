// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    plugins: ['~/plugins/lucide.ts'],
    nitro: {
        preset: 'static'
    },
    runtimeConfig: {
        public: {
            wpBaseUrl: process.env.WP_BASE_URL || 'https://geospatica.com/'
        }
    },
    app: {
    // 👇 Adjust these for subfolder deployment
        baseURL: process.env.NUXT_BASE_URL || '/connect/',
        cdnURL: process.env.NUXT_BASE_URL || '/connect/'
    }
})
