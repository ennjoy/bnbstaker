import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${ resolve(__dirname, 'src') }/`,
    },
  },

  plugins: [
    Vue(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
        'vue-i18n'
      ],

      // generate `auto-imports.d.ts` global declarations, 
      // also accepts a path for custom filename
      dts: 'src/auto-imports.d.ts'
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({

      // relative paths to the directory to search for components
      dirs: ['src/**/components'],
      
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],

      // generate `components.d.ts` global declarations, 
      // also accepts a path for custom filename
      dts: 'src/components.d.ts',

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,

      // resolvers for custom components
      resolvers: [
        HeadlessUiResolver()
      ]
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [ resolve(__dirname, 'locales/**') ],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),
  ],

  build: {
    chunkSizeWarningLimit: 1600
  },
  
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/head',
      '@vueuse/core',
      '@headlessui/vue',
      '@vue/apollo-composable',
      '@apollo/client/core',
      '@apollo/client/link/context',
      '@apollo/client/link/error'
    ]
  },
})
