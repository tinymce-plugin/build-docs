<template>
  <div class="preview vue2 demo-block">
    <div class="topBox">
       <img class="icon" src="https://v3.cn.vuejs.org/logo.png" alt="">
       <p class="text">V<span>{{versionVal|| "2.6.14"}}</span></p>
    </div>
    <div class="preview__card">
      <div class="preview__demo source">
        <div :id="demoID" ></div>
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
// import tinymce from "/@/assets/lib/tinymce-vue/tinymce";
// import tp$ from "/@/assets/lib/tinymce-vue/tinymce-plugin/tinymce-plugin";  
import {
    reactive,
    ref,
    defineComponent
  } from "vue"

  export default defineComponent( {
    name: "PreviewVue2",
    props: {
      source: {
        type: String,
        default: ""
      },
      template:{
        type: String,
        default: ''
      },
      demoID:{
        type: String,
        default: 'demoVue2'+new Date().getTime()+Math.round(Math.random()*10)
      },
      versionVal:{
        type: String,
        default: '2.6.14'
      }
    },
    created(){
    this.init()
    },
    methods:{
      init(){
      // @ts-ignore
      let TinymceVue2 =  Vue2.component('TinymceVue',{
          props:{
            value: {
                type: [String,Number],
                default: 'dsd'
            },
            show:{
              type: Boolean,
              default: false
            },
            init:{
              type: Object,
              default: {}
            },
          },
          data(){
            return {
              tinymceID: 'tinymce-'+ new Date().getTime()+Math.floor(Math.random()*10)+Math.floor(Math.random()*10),
              tinymceTimerID: null,
              tinymce_width: '100%',
              tinymce_height: 200,
              tinymce_loading: 'loading',
              editorFn: ''
            }
         },
         created(){
          const defaultOpt =
     
        setTimeout(()=>{
          // @ts-ignore
          if(typeof tinymce === "undefined"){ 
              clearInterval(this.tinymceTimerID)
              throw new Error('tinymce undefined');
          }
        },3000)
        this.tinymceTimerID = setInterval(()=>{
          // @ts-ignore
            if(typeof tinymce !== "undefined"&&tp$State){
              
              this.ceateInit(JSON.stringify({
                base_url:'/tinymce',
                // branding: false,
                language:'zh_CN',
                // menubar: false,
                schema: 'html5',
                plugins: 'code hr',
                table_default_attributes: {
                    'border': '1'
                },
                table_default_styles: {
                    'border-collapse': 'collapse',
                    'width': '100%'
                },
                table_header_type: 'sectionCells',
                table_responsive_width: true,
                skeletonScreen: true,
                file_picker_types: 'file img media',
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
            }))
              clearInterval(this.tinymceTimerID)
            }
        },50)

        },
        methods: {
       importantFn(){
            this.editor.execCommand('mceImportword')
      },
      xhrOnProgress(fun) {
          this.xhrOnProgress.onprogress = fun;
          return function () {
              var xhr = this.createXHR();
              // @ts-ignore
              if (typeof xhrOnProgress.onprogress !== 'function')
                  return xhr;
                  // @ts-ignore
              if (xhrOnProgress.onprogress && xhr.upload) {
                // @ts-ignore
                  xhr.upload.onprogress = xhrOnProgress.onprogress;
              }
              return xhr;
          }
        },
       createXHR(){
          if(window.XMLHttpRequest) {
           return new XMLHttpRequest(); //要是支持XMLHttpRequest的则采用XMLHttpRequest生成对象
          }// @ts-ignore
          else if(window.ActiveXobiect){ //要是支持win的ActiveXobiect则采用ActiveXobiect生成对象。
            // @ts-ignore
           return new ActiveXobiect('Microsoft.XMLHTTP');
          }
         return '';
        },
        ceateInit(defaultOpt){
          let that = this
         let defaultOptions = JSON.parse(defaultOpt)
          defaultOptions.selector = '#' + that.tinymceID;
          defaultOptions.setup =  (editor)=> {
                  that.editorFn = editor
                  editor.on('init', ()=>{
                        // setTimeout(()=>{
                        //  that.tinymce_loading = '';
                        
                        // },200)
                         editor.setTpContent(that.value)
                         // @ts-ignore
                        tinymce.activeEditor.setProgressState(false,50); 
                       
                    });
                  editor.on('input NodeChange', ()=>{
                     that.$emit('input',editor.getTpContent());
                  })
                }
             Object.assign(defaultOptions, this.init || {})
             that.tinymce_height = defaultOptions.min_height
             // @ts-ignore
            tinymce.init(defaultOptions)
        }
  },
          template: `
                    <div>
                      <div class="tinymceVue">
                        <div :id="tinymceID"></div>
                    </div>
                  </div>
                `
        })
       let sourceCode = this.$parent.sourceCode()
        !sourceCode.components?sourceCode.components={}:''
        sourceCode.components['TinymceVue'] = TinymceVue2
        // @ts-ignore
       let Vue2Demo = new Vue2({
          template: this.template,
          ...sourceCode
        })
      
       setTimeout(()=>{
          Vue2Demo.$mount('#'+this.demoID)
         },0)
      
     
  // console.log();
  
        // new Vue2Demo().$mount('#'+this.demoID) 
        // console.log()
      }
    },
    setup(props, {slots, attrs }) {
      const codeRef = ref<HTMLElement>()
      const demoVueRef = ref<HTMLElement>()
      const state = reactive({
        codeHeight: 0
      })
      // demoVueRef.value.innerHTML
      // console.log(slots);
      // console.log(Vue2);
      // const cVue2 = (window:any).Vue2
     
  //     new cVue2({render: function (createElement) {
  //   return createElement(
  //     'h' + this.level,   // 标签名称
  //     this.$slots.default // 子节点数组
  //   )
  // }})
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
      opacity: 0.7 ;
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
        color: var(--tp-c-text-1);

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
    background-color: var(--tp-custom-block-details-bg)
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


