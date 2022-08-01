<template>
  <div
    class="appBox"
    @click.stop="closeMenu"
    :class="
      instance?.locale && instance.locale.locale ? instance.locale.locale : ''
    "
  >
    <Header :dWidth="_resize" />
    <div class="menu_icon" @click.stop="store.openMenu = !store.openMenu">
      <svg
        class="icon"
        t="1628149369842"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4051"
        width="30"
        height="30"
      >
        <path
          d="M789.12 210.56H42.88a35.2 35.2 0 0 1-35.2-35.2 35.2 35.2 0 0 1 35.2-34.56h746.24a34.56 34.56 0 0 1 35.2 34.56 35.2 35.2 0 0 1-35.2 35.2zM981.12 544.64H42.88a35.2 35.2 0 1 1 0-69.76h938.24a35.2 35.2 0 1 1 0 69.76zM981.12 878.72H42.88a35.2 35.2 0 0 1-35.2-34.56 35.2 35.2 0 0 1 35.2-35.2h938.24a35.2 35.2 0 0 1 35.2 35.2 35.2 35.2 0 0 1-35.2 34.56z"
          p-id="4052"
        ></path>
        <path
          d="M949.12 175.36m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
          p-id="4053"
        ></path>
      </svg>
    </div>
    <aside
      :class="[store.openMenu ? 'openMenu' : '']"
      :style="{
        transform: `translateX(${store.completeMenu ? '0' : '-100%'})`,
      }"
    >
      <Sidebar></Sidebar>
    </aside>
    <div id="main-box" :class="showToc ? '' : 'noshow'">
      <main @click="listenerFun"><router-view></router-view></main>
      <div id="nav-right">
        <div id="repos"></div>
        
        <div id="fv-tocBox"></div>
        <div></div>
        <div class="scroll-top" @click="screenTopFn">
          <svg
            t="1657001043035"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3013"
            width="36"
            height="36"
          >
            <path
              d="M528.968975 162.41916c-4.493338-4.493338-10.600429-7.045463-16.969487-7.045463-6.370081 0-12.43317 2.552126-16.97051 7.045463L320.358797 337.024873c-9.335622 9.401114-9.335622 24.559349 0 33.938973 9.422603 9.358135 24.604374 9.358135 33.938973 0l157.700695-157.700695 157.699672 157.700695c4.668323 4.64581 10.818393 6.978948 17.013489 6.978948 6.064113 0 12.258185-2.333138 16.926508-6.978948 9.335622-9.379625 9.335622-24.537859 0-33.938973L528.968975 162.41916 528.968975 162.41916zM528.968975 162.41916"
              p-id="3014"
            ></path>
            <path
              d="M65.290517 606.881974l102.55984 0L167.850357 868.626303l47.89994 0L215.750297 606.881974l102.55984 0 0-47.942919L65.290517 558.939055 65.290517 606.881974zM65.290517 606.881974"
              p-id="3015"
            ></path>
            <path
              d="M582.713017 558.939055l-127.033231 0c-15.311731 0-30.667463 5.866614-42.315758 17.537422-11.778254 11.735275-17.624403 27.047006-17.624403 42.380226l0 189.873442c0 15.312754 5.846148 30.645974 17.624403 42.35976 11.648294 11.691273 27.004027 17.537422 42.315758 17.537422l127.033231 0c15.22475 0 30.624485-5.846148 42.35976-17.537422 11.691273-11.712763 17.536398-27.047006 17.536398-42.35976L642.609175 618.856703c0-15.33322-5.845125-30.644951-17.536398-42.380226C613.337501 564.806693 597.937766 558.939055 582.713017 558.939055L582.713017 558.939055zM594.666256 808.730145c0 2.26867-0.610914 5.54018-3.533476 8.463766-2.835581 2.87856-6.195096 3.489474-8.419763 3.489474l-127.033231 0c-2.26867 0-5.584182-0.610914-8.463766-3.489474-2.87856-2.922563-3.489474-6.195096-3.489474-8.463766L443.726545 618.856703c0-2.26867 0.610914-5.54018 3.489474-8.463766 2.87856-2.921539 6.195096-3.511987 8.463766-3.511987l127.033231 0c2.224668 0 5.584182 0.589424 8.419763 3.511987 2.922563 2.922563 3.533476 6.195096 3.533476 8.463766L594.666256 808.730145 594.666256 808.730145zM594.666256 808.730145"
              p-id="3016"
            ></path>
            <path
              d="M941.21504 576.476477c-11.779278-11.669784-27.091008-17.537422-42.402739-17.537422L734.481605 558.939055 734.481605 868.626303l47.898917 0L782.380522 732.802872l116.432803 0c15.311731 0 30.623461-5.845125 42.402739-17.557888 11.647271-11.691273 17.493419-27.025517 17.493419-42.337247l0-54.05001C958.70846 603.523483 952.862311 588.211752 941.21504 576.476477L941.21504 576.476477zM910.765541 672.906713c0 2.224668-0.610914 5.54018-3.490497 8.463766-2.921539 2.87856-6.238075 3.489474-8.462742 3.489474L782.380522 684.859953l0-77.977979 116.432803 0c2.224668 0 5.54018 0.589424 8.462742 3.511987 2.879584 2.922563 3.490497 6.195096 3.490497 8.463766L910.766564 672.906713 910.765541 672.906713zM910.765541 672.906713"
              p-id="3017"
            ></path>
          </svg>
        </div>
        <!-- <test/> -->
      </div>
    </div>
  </div>
</template>
 
 <script  lang="ts" >
import {
  defineComponent,
  provide,
  ref,
  onMounted,
  getCurrentInstance,
} from "vue";
import Header from "./views/Header/Header.vue";
import Sidebar from "./views/Sidebar/Sidebar.vue";
// import test from "./views/Preview/test.vue"
import { useStore } from "./stores";
import { storageLocal } from "../tools/storage";

export default defineComponent({
  components: { Header, Sidebar },
  data() {
    return {
      _resize: document.documentElement.clientWidth,
      showToc: false,
      // openMenu: false,
    };
  },
  name: "App",
  created() {
    window.addEventListener("resize", this.resizeFun, false);
  },
  setup() {
    onMounted(() => {
      document.dispatchEvent(new Event("render-event"));
    });
    if (/^\/en/.test(window.location.pathname)) {
      storageLocal.getItem("responsive-locale")?.locale !== "en"
        ? storageLocal.setItem("responsive-locale", { locale: "en" })
        : "";
    } else {
      storageLocal.getItem("responsive-locale")?.locale === "en"
        ? storageLocal.setItem("responsive-locale", { locale: "zh" })
        : "";
    }
    const instance =
      getCurrentInstance().appContext.config.globalProperties.$storage;
    let store: any = useStore();
    store.initStore();
    provide("store", ref(store));
    return {
      store,
      instance,
    };
  },
  methods: {
    resizeFun(e: any) {
      this._resize = document.documentElement.clientWidth;
      // this._resize < 959 ? (this.store.openMenu = false) : "";
      //  console.log();
    },
    screenTopFn() {
      document.documentElement.scrollTop = 0;
    },
    closeMenu() {
      // console.log(this.store);
      this._resize < 959 ? (this.store.openMenu = false) : "";
    },
    listenerFun(e: any) {
      if (/fv-hljs/.test(e.target.className)) {
        let input: any = document.getElementById("inputCopy");
        input.value =
          e.target.children[0].tagName === "CODE"
            ? e.target.children[0].innerText
            : e.target.children[1].innerText;
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        this.showTips("codeCopySuccess", "ok", 60, 3);
      }
    },
    showTips(content: any, message: any, height: any, time: number) {
      let docTips: any = document.getElementById("tips");
      docTips.innerHTML =
        '<div class="tipsClass ' + message + '"><i></i>' + content + "</div>";
      this._resize < 750
        ? (height = height / 100 + "rem")
        : (height = height + "px");
      docTips.children[0].style.top = height;
      docTips.children[0].style.display = "block";
      setTimeout(function () {
        docTips.children[0].style.display = "none";
      }, time * 1000);
    },
  },
  destroy() {
    window.removeEventListener("resize", this.resizeFun);
  },
});
</script>
 <style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 1px;
  font-size: 0;
  color: var(--tp-c-text-1);
  background-color: var(--tp-c-bg);
}
.scroll-top {
  display: block;
  position: fixed;
  bottom: 8%;
  right: 3%;
  cursor: pointer;
}
.scroll-top svg{
  fill: #43b984
}

#nav-right {
  /* top: 120px;
   right: 0px;*/
  position: sticky;
  top: 120px;
  box-sizing: border-box;
  /* float: right; */
  /* display: inline-block; */
  /* vertical-align: top;
   */

  /* position: relative; */
  width: 0;
  width: 100%;
  height: 0;
  padding-top: 65px;
  padding-left: 20px;
  z-index: 1;
}

#main-box {
  display: grid;
  grid-template-columns: 80% 20%;
}
#main-box.noshow {
  grid-template-columns: 95%;
}
#fv-tocBox {
 
  top: 120px;
  position: sticky;
  /* min-width: 70%; */
  /* background: rgb(254, 254, 254); */
  display: inline-block;
  overflow-y: hidden;
   overflow: hidden;
}
#fv-tocBox .toc-title {
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 1px solid #d0d7de;
  padding-bottom: 10px;
  /* text-align: center; */
  letter-spacing: 2px;
}
#fv-toc ul {
  list-style: none;
  /* padding: 0; */
  /* margin: 0; */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--tp-c-text-1);
  margin-top: 60px;
  margin: 0;
  padding: 0;
  min-height: 100%;
  font-size: initial;
}
.appBox {
  width: 100%;
  min-height: 100%;
  text-align: left;
}
.menu_icon {
  position: fixed;
  z-index: 199;
  bottom: 20px;
  left: 10px;
  width: 30px;
  padding: 10px;
  height: 30px;
  border-radius: 20px;
  background: #fff;
  color: rgb(75, 140, 224);
  box-shadow: 5px 10px 100px rgb(75, 140, 224);
  display: none;
}
.menu_icon svg {
  fill: rgb(75, 140, 224);
}

aside {
  /* width: 3%; */
  /* background: #fff; */
  background-color: var(--tp-c-bg-alt);
  max-width: 300px;
  min-width: 12%;
  height: 100%;
  top: 0px;
  padding-top: 85px;
  position: fixed;
  z-index: 90;
  border-right: 1px solid var(--tp-c-bg-alt);
  transform: translateX(-100%);
  transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
}
aside.openMenu {
  transform: translateX(0) !important;
}
main {
  width: 65%;
  padding-top: 2%;
  min-height: 60%;
  padding-left: 21%;
  padding-right: 0;
  display: inline-block;
  vertical-align: top;
  margin: 0 auto;
}
@media only screen and (min-width: 1200px) and (max-width: 1500px) {
  main {
    width: 75%;
    padding-top: 2%;
    min-height: 60%;
    padding-left: 22%;
    padding-right: 0;
  }
  #main-box {
    grid-template-columns: 83% 17%;
  }
}
@media only screen and (min-width: 959px) and (max-width: 1199px) {
  main {
    width: 70%;
    padding-top: 2%;
    min-height: 60%;
    padding-left: 30%;
    padding-right: 0;
  }
  #main-box {
    grid-template-columns: 78% 20%;
  }
}
@media only screen and (max-width: 959px) {
  aside {
    transform: translateX(-100%) !important;
  }
  #nav-right{
    display: none;
  }
  #fv-tocBox {
    display: none;
  }
  #main-box {
    grid-template-columns: 100% 0%;
  }
  .menu_icon {
    display: block;
  }
  #main-box.noshow {
    grid-template-columns: 100%;
  }
  main {
    width: 94%;
    padding-left: 0%;
    padding-right: 0%;
    padding-top: 2%;
    min-height: 60%;
  }
}
/* 弹出框 */
.tipsClass {
  position: fixed;
  letter-spacing: 2px;
  border-radius: 10px;
  text-align: justify;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  border: 1px solid #ebeef5;
  min-width: 280px;
  padding: 15px 15px 15px 20px;
  display: flex;
  animation: upshow 0.3s ease-out;
  align-items: center;
  z-index: 99999;
}
@keyframes upshow {
  0% {
    top: 20%;
  }
  90% {
    top: 9%;
  }
  100% {
    top: 10%;
  }
}
.tipsClass {
  font-size: initial;
}
.tipsClass.ok {
  background: #f0f9eb;
  color: #67c23a;
  font-weight: bold;
}
.tipsClass > i {
  position: relative;
  margin-right: 30px;
  line-height: 1;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font: normal normal normal 14px/1 FontAwesome;
  text-rendering: auto;
}
.tipsClass.ok > i:before {
  content: "✔";
  color: #fff;
  display: block;
}
.tipsClass.ok > i:after {
  display: block;
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: #67c23a;
  left: -5px;
  top: -3px;
  border-radius: 50%;
  text-align: center;
  z-index: -1;
}
.tipsClass.err {
  border-color: #fde2e2;
  background-color: #fef0f0;
  font-weight: bold;
  color: #f56c6c;
}
.tipsClass.err > i:before {
  content: "×";
  color: #fff;
  display: block;
}
.tipsClass.err > i:after {
  display: block;
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: #f56c6c;
  left: -5px;
  top: -3px;
  border-radius: 50%;
  text-align: center;
  z-index: -1;
}
.tipsClass.warn {
  border-color: #faecd8;
  background-color: #fdf6ec;
  color: #e6a23c;
}
.tipsClass.warn > i:before {
  content: "!";
  color: #fff;
  font-weight: bold;
  display: block;
}
.tipsClass.warn > i:after {
  display: block;
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: #e6a23c;
  left: -8px;
  top: -3px;
  border-radius: 50%;
  text-align: center;
  z-index: -1;
}
</style>