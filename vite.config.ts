import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createVuedcoPlugin} from "./doc";
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path";

const pathResolve = (pathStr:string) => {
  return path.resolve(__dirname, pathStr);
};
// https://vitejs.dev/config/
export default defineConfig(({ command, mode })=>{
  // createRedirect(__dirname)/
  return {
    // base: '/build-docs/',
    server: {
      host: '0.0.0.0',
      port: 8999,
      // 是否开启 https
      https: false,
      server:{
        hmr:{
          overlay: false
        }
      },
      fs: {
        // 可以为项目根目录的上一级提供服务
        allow: [pathResolve('../../../__docs__'),pathResolve('./')]
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ` 
          $fontColor: #333;
          $themeColor: #35495E;
          $themeBrightColor: #43B984;
          `
        }
      }
    },
    resolve:{
      alias:{
        '/@': pathResolve('./src'),
        'vue': 'vue/dist/vue.esm-bundler.js',
        '/@tools/': pathResolve('./tools/'),
        '@tinymce-plugin/tp-layout': pathResolve('../../../dist/plugin.js'),
        'tinymce-plugin/plugins/tpLayout': pathResolve('../../../dist/'),
        '@npkg/tinymce-plugin/plugins/tpLayout': pathResolve('../../../dist/'),
      },
      extensions:[ '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json','.md']
    },
    build:{
      chunkSizeWarningLimit: 2000,
      minify: true,
      sourcemap: false,
      brotliSize: false,
    },
    plugins: [
      createVuedcoPlugin({
        docsPath(root) {
          return  "/__docs__"
        },
        // command: command,
        mode: mode,
        root: path.join(__dirname)
        }),
      vue(), vueJsx(),
    ],
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    }
  }
})