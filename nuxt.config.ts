import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  compilerOptions: {
    types: ["@nuxtjs/axios"]
  },
  css: ["~/assets/style/main.scss"],
  vite: {
    define: {
      "process.env.DEBUG": false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/style/_variables.scss";'
        }
      }
    }
  }
});
