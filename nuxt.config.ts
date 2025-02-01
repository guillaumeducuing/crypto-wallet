const title = "Crypto Wallet";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [],
  build: {
    transpile: ["gsap"]
  },

  nitro: { compressPublicAssets: true },

  runtimeConfig: {
    public: {}
  },

  devtools: { enabled: true },

  app: {
    head: {
      title,
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { hid: "charset", charset: "utf-8" },
        { hid: "robots", name: "robots", content: "index, follow" },
        {
          hid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover"
        }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/icon.png" }
      ]
    },
    pageTransition: { name: "page", mode: "out-in" }
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
      "postcss-nested": {}
    }
  },

  pinia: {
    storesDirs: ["./store/**"]
  },

  compatibilityDate: "2024-08-01"
});
