<template>
  <div class="preview react demo-block">
    <div class="topBox">
       <img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="">
       <p class="text">V<span>{{versionVal || "17.0.2"}}</span></p>
    </div>
    <div class="preview__card">
      <div class="preview__demo source">
        <div :id="demoID + '_' + idx" ></div>
        <!-- <div><slot name="demo1" ></slot></div> -->
        <!-- <div><slot name="demo" ></slot></div> -->
      </div>
      <div :style='{height: `${state.codeHeight}px`}' class="preview__code meta">
        <div class="preview__footer demo-block-control"  @click.stop='toggleCode'>
        {{ state.codeHeight > 0 ? "隐藏代码" : "显示代码" }}
      </div>
        <div ref='codeRef' class="preview__coderef">
            <div v-if="slotDescription" class="preview__description description">
                <slot name="description" ></slot>
            </div>
           <div class="preview__coder highlight" v-html='source'></div>
        </div>
      </div>
      <div class="preview__footer demo-block-control"   @click.stop='toggleCode'>
        {{ state.codeHeight > 0 ? "隐藏代码" : "显示代码" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

// import tp$ from "/@/assets/lib/tinymce-vue/tinymce-plugin/tinymce-plugin";  
// import { Editor } from '@tinymce/tinymce-react';
// import tinymce from "/@/assets/lib/tinymce-vue/tinymce";
// import tinymce from 'tinymce/tinymce';
import {
    reactive,
    ref,
    defineComponent,
  } from "vue"

  export default defineComponent( {
    name: "PreviewReact",
    props: {
      source: {
        type: String,
        default: ""
      },
      idx:{
        type: String,
        default: 'demo0'
      },
      template:{
        type: String,
        default: ''
      },
      demoID:{
        type: String,
        default: 'demoReact'+new Date().getTime()
      },
      versionVal:{
        type: String,
        default: '17.0.2'
      }
    },
    created(){
    this.init()
      
    },
    methods:{
      init(){
          setTimeout(()=>{
             this.$parent.sourceCode(document.getElementById(''+this.demoID + '_' + this.idx))
          },10)
      }
    },
    setup(props, {slots, attrs }) {
      const codeRef = ref<HTMLElement>()
      const demoVueRef = ref<HTMLElement>()
      const state = reactive({
        codeHeight: 0
      })
      const slotDescription = slots.description ? true : false
      const toggleCode = () => {
        if (state.codeHeight === 0) {
          state.codeHeight = codeRef.value?.offsetHeight || 0
        } else {
          state.codeHeight = 0
        }
      }
      return {
        toggleCode,
        slots,
        state,
        codeRef,
        demoVueRef,
        slotDescription
      }
    }
  })
  
</script>

<style lang="scss" scoped>

.dark{
  .preview{
    &__card {
    border-color:  transparent;
    }
  }
}

  .preview__coder.highlight :deep(pre){
    margin-top:0;
   }
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
        color:var(--tp-c-text-1);
      }
      font-size: 14px;
      font-weight: bold;
      color:#61DAFB;
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
    box-sizing: border-box;

    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
  }
  &__demo {
    padding: 20px;
    background-color: var(--tp-custom-block-details-bg);
  }
  &__code {
    background-color: var(--tp-custom-block-details-bg);
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
    border-top: 1px solid var(--tp-c-bg);
    height: 44px;
    line-height: 43px;
    box-sizing: border-box;
    background-color: var(--tp-custom-block-details-bg);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: var(--tp-c-text-1);
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


