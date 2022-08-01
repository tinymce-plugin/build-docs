<template>
  <div class="preview demo-block">
    <div class="topBox">
       <img class="icon" src="https://cn.vuejs.org/images/logo.svg" alt="">
       <p class="text">V<span>{{versionVal}}</span></p>
    </div>
    <div class="preview__card">
      <div class="preview__demo source">
        <div><div id="tiny_angular"></div></div>
      </div>
      <div :style='{height: `${state.codeHeight}px`}' class="preview__code meta">
        <div class="preview__footer demo-block-control" style="height: 24px;"  @click.stop='toggleCode'>
        {{ state.codeHeight > 0 ? "隐藏代码" : "显示代码" }}
      </div>
        <div ref='codeRef' class="preview__coderef">
            <div v-if="slotDescription" class="preview__description description">
                <slot name="description" ></slot>
            </div>
           <div class="preview__coder highlight" v-html= 'source'></div>
        </div>
      </div>
      <div class="preview__footer demo-block-control"   @click.stop='toggleCode'>
        {{ state.codeHeight > 0 ? "隐藏代码" : "显示代码" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import './polyfills';
// import { enableProdMode } from '@angular/core';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, Input } from '@angular/core';
// import { AppModule } from './app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'div#tiny_angular',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
class HelloComponent {
  @Input() name: string;
}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [HelloComponent],
  bootstrap: [HelloComponent],
})
class AppModule {}


import {
    reactive,
    ref,
    defineComponent,
    onMounted,
    nextTick,
    createApp,
    version
  } from "vue"
// import tinymce from "/@/assets/lib/tinymce-vue/tinymce";
// import tp$ from "/@/assets/lib/tinymce-vue/tinymce-plugin/tinymce-plugin";  
// import TinymceVue from "/@/example/vueDemo/Tinymce-vue.vue";
  export default defineComponent( {
    name: "Preview",
    // components:{
    //   TinymceVue
    // },
    props: {
      source: {
        type: String,
        default: ""
      }
    },
    setup(props, {slots, attrs }) {
      const codeRef = ref()
      const state = reactive({
        codeHeight: 0
      })
      const versionVal = version
      const slotDescription = slots.description ? true : false
    
      const toggleCode = () => {
        if (state.codeHeight === 0) {
          state.codeHeight = codeRef.value?.offsetHeight || 0
        } else {
          state.codeHeight = 0
        }
      }

      platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
      return {
        toggleCode,
        slots,
        state,
        codeRef,
        slotDescription,
        versionVal
      }
    }
  })
  // mapTo array
  const mapToArray = (obj) => {
    let arr = []
    for (let key in obj) {
      arr.push({
        key,
        value: obj[key]
      })
    }
    return arr
  }

</script>

<style lang="scss" scoped>
.preview {
  position: relative;
  .topBox{
    top: -4px;
    left: -6px;
    position: absolute;
    width: 100px;
    .icon{
      width: 25px;
      display: inline-block;
      vertical-align: middle;
    }
    .text{
      margin: 0;
      display: inline-block;
      vertical-align: middle;
      padding-left: 5px;
      span{
        display: inline-block;
        padding-left: 4px;
        font-size: 12px;
        color:#333;
      }
      font-size: 14px;
      font-weight: bold;
      color:#41B883;
    }
  }
  text-align: left;
  &__description {
    padding: 10px 20px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
  }
  &__title {
    font-size: 18px;
    margin: 30px 0 20px 0;
  }
  &__card {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;

    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
  }
  &__demo {
    padding: 20px;
    background-color: #fff;
  }
  &__code {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    height: 0;
    // transition: height 0.3s;
  }
  &__coderef {
    overflow: hidden;
    > pre {
      padding: 10px 0;
    }
  }
  &__coder {
    .language-markup {
      border: none;
      padding: 0 20px;
      font-size: 12px;
    }
  }
  &__comment {
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px 10px 0 10px;
    background-color: #fff;
    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }
  &__footer {
    font-size: 12px;
    border-top: 1px solid #eaeefb;
    height: 44px;
    line-height: 43px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    transition: color .3s,background-color .3s;
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
  }
  .row-mb-20 {
    margin-bottom: 20px;
  }
  .ml-10 {
    margin-left: 10px;
  }
   .preview__coder ::v-deep(.hljs){
     border-radius: 0!important;
   }
}
</style>




