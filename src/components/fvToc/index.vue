<template>
  <div>
 
    <!-- <a @click="modalOpen = true" class="modal-button">
      <slot name="show">{{title}}</slot> 
    </a> -->
    <teleport to="div#fv-tocBox">
        <p class="toc-title">目录</p>
        <div id="fv-toc">
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
//  import * as tocbot from 'tocbot';
//  console.log(tocbot);
 

 
export default defineComponent({
  name: "fvToc",
  props:{
    title:{
      type: String,
      default: '按钮'
    }

  },
  data() {
    return { 
      modalOpen: false
    }
  },
  methods:{
    clickCloseFn(){
          this.modalOpen = false
    }
  },
  created(){
   
    setTimeout(()=>{
       this.$root.showToc = true
    //@ts-ignore
    tocbot.init({
      tocSelector: '#fv-toc',
      contentSelector: '#main-box main',
      headingSelector: 'h1, h2, h3',
      scrollSmooth: true,
      scrollSmoothDuration: 120,
      scrollSmoothOffset: 120,
      hasInnerContainers: true,
      orderedList:false,
      headingsOffset: 210,
      collapseDepth: Number('2'),
      // disableTocScrollSync: true,
          
    });
    },200)
  },
  beforeUnmount(){
    this.$root.showToc = false
    //@ts-ignore
    tocbot.destroy();
  }
})


</script>
<style lang="scss">
    #fv-toc {
      overflow: hidden;
    }
    #fv-toc .toc-link::before {
        background-color: var(--tp-c-bg);
        // max-height: 20px;
        position: absolute;
        right: 23.5vw;
        display: block;
    }
    #fv-toc .is-active-link {
        color: #344A85;
    }
    #fv-toc .is-active-link::before {
        background-color: #344A85
     }
    #fv-toc .toc-list  li a{
      padding: 5px 0;
      text-decoration: none;
    }
    #floating-toc-btn {
        position: fixed;
        right: 15px;
        bottom: 76px;
        padding-top: 15px;
        margin-bottom: 0;
        z-index: 998;
    }
    #floating-toc-btn .btn-floating {
        width: 48px;
        height: 48px;
    }
    #floating-toc-btn .btn-floating i {
        line-height: 48px;
        font-size: 1.4rem;
    }
</style>
