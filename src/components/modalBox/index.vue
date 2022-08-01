<template>
  <div>
    <a @click="modalOpen = true" class="modal-button">
      <slot name="show">{{title}}</slot> 
    </a>
    <teleport to="body">
      <div v-if="modalOpen" class="modal-box" @click.stop="clickCloseFn">
        <div class="modal-box-body" @click.stop="()=>{}">
         <slot></slot>
          <a @click="modalOpen = false" class="close-button">
            <svg t="1648029396299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3858" width="35" height="35"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z" p-id="3859"></path></svg>
          </a>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "modalBox",
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
  }
})


</script>
<style lang="scss" scoped>
  .modal-box {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    .modal-box-body{
      position: relative;
      // display: block;
      // width: 100%;

    }
    .close-button{
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 0px;
    
      // margin-top: 300px;
      // // margin-top:50px;
      // padding: 10px 30px;
      // background: #344A85;
      // border-radius: 50px;
      // letter-spacing: 2px;
      // color: #fff;
    }
  }
  .modal-button{
    text-decoration: none;
    color: #344A85;
    cursor: pointer;
  }
  .modal-box div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--tp-c-bg-mute);
    border-radius: 4px;
  
    min-height: 300px;
    height: 20%;
    min-width: 200px;
    max-width: 500px;
    width: 80%;
    padding: 5px;
    padding-bottom: 0;
  }
  @media only screen and (max-width: 600px) {
    .modal-box div {
       min-height: 200px;
    }
  }
</style>
