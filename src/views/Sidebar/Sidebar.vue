<template>
  <div
    class="sidebar-Box"
    v-if="store[store.language=='en'?'menuList_en':'menuList']?.length > 0"
    @click.stop="() => {}"
  >
    <div class="top-bage">
      <p class="Sponsor">
        <a href="https://github.com/Five-great" title="Sponsor Li Haolong"
          ><img
            src="https://avatars.githubusercontent.com/u/43601963?s=60&amp;amp;v=4"
            alt=""
        /></a>
      </p>
    </div>

    <ul class="sidebar-ul">
      <li
        v-for="(item, index) in store[store.language=='en'?'menuList_en':'menuList']"
        :key="index"
        class="sidebar-li"
        :data-ison="seletIdx === index ? true : false"
      >
        <div v-if="item.children && item.children.length > 0">
          <router-link
            :to="item.path + '/' + item.children[0].path"
            class="sidebar-title"
            >{{ store.language=='en'?item.name.replace(/\/en$/,'') : item.meta ? item.meta.title : item.name }}</router-link
          >
          <ul class="sidebar-cUl">
            <li
              v-for="(cItem, cIndex) in item.children"
              :key="cIndex"
              class="sidebar-cLi"
              :data-ison="seletcIdx === cIndex ? true : false"
            >
              <div v-if="cItem.children && cItem.children.length > 0">
                <router-link
                  :to="
                    item.path + '/' + cItem.path + '/' + cItem.children[0].path
                  "
                  class="sidebar-cTitle"
                  ><span>{{ cItem.meta ? cItem.meta.title : cItem.name }}</span
                  ><em>{{
                    cItem.meta && cItem.meta.remark
                      ? " | " + cItem.meta.remark
                      : ""
                  }}</em>
                </router-link>
                <ul class="sidebar-ccUl">
                  <li
                    v-for="(ccItem, ccIndex) in cItem.children"
                    :key="ccIndex"
                    class="sidebar-ccLi"
                  >
                    <router-link
                      :to="item.path + '/' + cItem.path + '/' + ccItem.path"
                      class="sidebar-ccTitle"
                      >{{
                        ccItem.meta ? ccItem.meta.title : ccItem.name
                      }}</router-link
                    >
                  </li>
                </ul>
              </div>
              <router-link
                v-else
                :to="item.path + '/' + cItem.path"
                class="sidebar-cTitle"
                ><span>{{ cItem.meta ? cItem.meta.title : cItem.name }}</span
                ><em>{{
                  cItem.meta && cItem.meta.pluginName
                    ? " | " + cItem.meta.pluginName
                    : ""
                }}</em>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link class="sidebar-title" v-else :to="item.path">{{
          item.meta ? item.meta.title : item.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { transformI18n } from "/@/i18n";
import { computed, defineComponent, nextTick, ref } from "vue";
import { useStore } from "/@/stores";
export default defineComponent({
  name: "Sidebar",
  data() {
    return {
      sidebarList: [],
    };
  },
  setup() {
    const store = useStore();
    const seletcIdx = ref(0);
    const outLinkQABox = ref();
    const seletIdx = computed(() => {
      let _idx = 0;
 
      store['menuList'].some((ele, idx) => {
        // console.log(ele);
        
        if (
          store.pageRoute &&
          store.pageRoute.matched &&
          ele.path === store.pageRoute.matched[0]?.path
        ) {
          //    console.log(store.pageRoute.matched)
          if (store.pageRoute.matched.length > 1) {
            //    console.log(ele.children);
            ele.children.some((cEle, cIdx) => {
              if (
                ele.path + "/" + cEle.path ===
                store.pageRoute.matched[1].path
              ) {
                seletcIdx.value = cIdx;
                return true;
              }
            });
          }
          _idx = idx;
          return true;
        }
        return false;
      });
      return _idx;
    });
    // seletIdx.value
    // const seletIdxFn =(idx:number)=>{
    //     seletIdx.value = idx
    // }
    const closeOpen = () => {
      outLinkQABox.value.clickCloseFn();
    };

    return {
      store,
      seletIdx,
      seletcIdx,
      closeOpen,
      transformI18n,
      // seletIdxFn
    };
  },
});
</script>

<style lang="scss" scoped>

  .en{
    .sidebar-Box{
      ul.sidebar-ul .sidebar-li .sidebar-title {
            font-size: 16px;
            letter-spacing: 0px;
          }
    }

  }
@media only screen and (max-width: 959px) {
  .sidebar-Box {
    li > div > a {
      // pointer-events: none;
    }
  }
}
.sidebar-Box {
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  width: 100%;
  padding-top: 1px;

  .top-bage {
    min-height: 80px;
    text-align: center;
    .Sponsor {
      padding: 0;
      margin: 0;
      padding-right: 40px;
      & > a {
        margin: 0 auto;
        display: block;
        width: 60px;
        height: 60px;

        border-radius: 40px;
        overflow: hidden;
      }
      span {
        letter-spacing: 1px;
        font-size: 14px;
        color: var(--tp-c-text-1);
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  ul.sidebar-ul {
    margin: 0;
    padding-left: 15px;
    //   margin-top: 20px;
    // //   border-top: 2px solid #eee;
    //   padding-top: 20px;
    padding-right: 15px;
    padding-bottom: 30px;
    max-height: calc(100vh - 195px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }

    &::-webkit-scrollbar-track {
      background-color: #344a85;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #344a85;
    }

    .sidebar-li {
      list-style: none;
      margin: 10px 0;
      &.outline {
        border-top: 2px solid #eee;
        padding-top: 15px;
        margin-top: 15px;
      }
      &.outlink {
        svg {
          display: inline-block;
          vertical-align: middle;
          margin-left: 15px;
        }
      }
      &[data-ison="true"] {
        & > div > a {
          color: $themeBrightColor !important;
          text-shadow: 0 1px 2px $themeBrightColor;
        }
        .sidebar-cUl {
          max-height: 100000px;
        }
      }
      .router-link-active {
        color: $themeBrightColor !important;
      }
      .router-link-exact-active {
        text-shadow: 0 1px 2px $themeBrightColor;
      }
      .sidebar-cUl {
        max-height: 0px;
        overflow: hidden;
        padding-left: 20px;
        transition: all 0.2s;
        .sidebar-cLi {
          margin: 8px 0;
          list-style: none;
          .sidebar-cTitle {
            text-decoration: none;
            color: var(--tp-c-text-1);
            em {
             font-style: normal;
              font-size: 0.5em;
            }
          }
          &[data-ison="true"] {
            & > div > a {
              color: $themeBrightColor !important;
              text-shadow: 0 1px 2px $themeBrightColor;
            }
            .sidebar-ccUl {
              max-height: 100000px;
            }
          }
          .sidebar-ccUl {
            max-height: 0px;
            overflow: hidden;
            padding-left: 20px;
            transition: all 0.2s;
            .sidebar-ccLi {
              margin: 4px 0;
              list-style: none;
              .sidebar-ccTitle {
                text-decoration: none;
                color: var(--tp-c-text-1);
                font-size: 0.9em;
                em {
                  font-size: 0.4em;
                }
              }
            }
          }
        }
      }
      .sidebar-title {
        text-decoration: none;
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: bold;
        color: var(--tp-c-text-1);
      }
    }
  }
  ul.sidebar-bottom {
    padding-left: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
    li {
      list-style: none;
      a {
        text-decoration: none;
        font-size: 20px;
        font-weight: bold;
        color: var(--tp-c-text-1);
        span,
        em {
          display: inline-block;
          vertical-align: middle;
          height: 100%;
        }
        em {
          font-size: 0;
        }
      }
    }
  }
}
</style>