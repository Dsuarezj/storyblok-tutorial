import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import storyblok from '@storyblok/astro'
import tailwind from "@astrojs/tailwind";
const env = loadEnv("", process.cwd(), 'STORYBLOK')

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        page: 'storyblok/Page',
        config: 'storyblok/Config',
        feature: 'storyblok/Feature',
        grid: 'storyblok/Grid',
        teaser: 'storyblok/Teaser',
      },
    }),
    tailwind()
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
})
