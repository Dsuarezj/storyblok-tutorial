import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import storyblok from '@storyblok/astro'
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
const env = loadEnv("", process.cwd(), 'STORYBLOK')

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: env.STORYBLOK_IS_PREVIEW === 'yes',
      components: {
        page: 'storyblok/Page',
        config: 'storyblok/Config',
        feature: 'storyblok/Feature',
        grid: 'storyblok/Grid',
        teaser: 'storyblok/Teaser',
        hero: 'storyblok/Hero',
        'popular-articles': 'storyblok/PopularArticles',
        'all-articles': 'storyblok/AllArticles',
        article: 'storyblok/Article',
      },
    }),
    tailwind()
  ],
  output: 'server',
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  adapter: vercel()
})
