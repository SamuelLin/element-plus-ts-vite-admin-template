import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { vueI18n } from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const localEnabled = !!process.env.USE_MOCK || false
  return {
    server: {
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: path.resolve(__dirname, './src/locales/**'),
        compositionOnly: true
      }),
      AutoImport({
        resolvers: [IconsResolver(), ElementPlusResolver()]
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [IconsResolver(), ElementPlusResolver()],
        dts: 'src/components.d.ts'
      }),
      Icons({
        autoInstall: true
      }),
      viteMockServe({
        mockPath: 'mock',
        supportTs: false,
        localEnabled
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        path: 'path-browserify'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    }
  }
})
