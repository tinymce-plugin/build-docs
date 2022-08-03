import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createVuedcoPlugin,initPlugin} from "./doc";
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path";
import { namingFormat} from "../vite-build/dist/hooks/index";
const pkg = require("../../../package.json");

const registerName = namingFormat.toHump(pkg.name.replace(/\@tinymce-plugin\//, ''))
const pluginName = namingFormat.toHyphen(pkg.name.replace(/\@tinymce-plugin\//, ''))
// console.log(registerName);

const pathResolve = (pathStr:string) => {
  return path.resolve(__dirname, pathStr);
};
let aliasList =[
  {find: "/@", replacement: pathResolve('./src')},
  {find: "vue", replacement: 'vue/dist/vue.esm-bundler.js'},
  {find: "/@tools/", replacement: pathResolve('./tools/')},
] 
aliasList.push({find: `@tinymce-plugin/${pluginName}/`,replacement: pathResolve('../../../dist/')})
aliasList.push({find: `@npkg/tinymce-plugin`,replacement: pathResolve('./tinymce-plugin')})
aliasList.push({find: `tinymce-plugin`,replacement: pathResolve('./tinymce-plugin')})

// https://vitejs.dev/config/
export default defineConfig(async({ command, mode })=>{
  // createRedirect(__dirname)/
  await initPlugin(registerName)
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
        allow: [pathResolve('../../../__docs__'),pathResolve('../../../dist'),pathResolve('./'),pathResolve('./packages')]
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
      alias: aliasList,
      extensions:[ '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json','.md']
    },
    build:{
      chunkSizeWarningLimit: 2000,
      minify: true,
      sourcemap: false,
      brotliSize: false,
    },
    plugins: [
      // myPlugin(),
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