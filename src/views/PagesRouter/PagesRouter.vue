
<template>
  <div>
    <div class="edit-page">
        <div class="contributors-list-box" v-if="contributorsList?.length>0">
          <span class="contributors-title" >  {{'editContributors'}}</span>
          <!-- <svg t="1648096656589" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1900" width="20" height="20"><path fill="#344a85" d="M778.666667 236.8c0-57.6-46.933333-104.533333-106.666667-104.533333h-320c-59.733333 0-106.666667 46.933333-106.666667 104.533333C64 236.8 85.333333 236.8 85.333333 341.333333c0 87.466667 72.533333 157.866667 160 157.866667 6.4 0 12.8 0 19.2-2.133333C300.8 597.333333 384 691.2 486.4 704v157.866667H405.333333c-14.933333 0-25.6 10.666667-25.6 25.6s12.8 25.6 25.6 25.6h213.333334c14.933333 0 27.733333-12.8 27.733333-25.6 0-14.933333-12.8-25.6-27.733333-25.6h-78.933334V704c100.266667-14.933333 185.6-106.666667 221.866667-209.066667 6.4 0 12.8 2.133333 19.2 2.133334 87.466667 0 160-70.4 160-157.866667-2.133333-102.4 19.2-102.4-162.133333-102.4z m-533.333334 209.066667c-59.733333 0-106.666667-46.933333-106.666666-104.533334s2.133333-53.333333 106.666666-53.333333v157.866667zM725.333333 392.533333c0 115.2-96 262.4-213.333333 262.4s-213.333333-145.066667-213.333333-262.4V234.666667c0-25.6 27.733333-53.333333 53.333333-53.333334h320c25.6 0 53.333333 25.6 53.333333 53.333334v157.866666z m53.333334 53.333334v-157.866667c104.533333 0 106.666667-6.4 106.666666 53.333333 0 57.6-49.066667 104.533333-106.666666 104.533334z" p-id="1901"></path></svg> -->
          <svg t="1648096750538" class="icon" viewBox="0 0 1195 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2178" width="18" height="18"><path fill="#344a85" d="M1192.262422 246.651345a39.828914 39.828914 0 0 0-39.691809-40.034571 39.211943 39.211943 0 0 0-27.420939 11.105481v-1.096838l-266.600078 241.989785L644.254958 27.352387a54.841878 54.841878 0 0 0-46.684148-27.420939A55.801611 55.801611 0 0 0 548.418777 29.751719L335.358082 458.272441 63.753683 212.238067a38.320762 38.320762 0 0 0-22.553722-7.746415 39.897466 39.897466 0 0 0-39.691809 40.03457c0 1.371047-0.754076 0.754076-1.233943 1.233943l84.456492 634.246315v-2.604989a118.252799 118.252799 0 0 0 74.996268 96.453153 1463.661164 1463.661164 0 0 0 435.033195 48.397957 1450.567666 1450.567666 0 0 0 442.094087-58.4066 117.978589 117.978589 0 0 0 71.979964-94.807896 60.326065 60.326065 0 0 0 0.479867 9.117462l83.83952-630.681594c-0.342762-0.411314-0.891181 0.411314-0.89118-0.822628zM596.40542 936.425062L426.395599 681.547435 596.40542 426.669809l170.009821 254.877626z" p-id="2179"></path></svg>
         <ul class="contributors-list-ul">
             <li v-for="(item, idx) in contributorsList" :key="idx">
                 <a :href="'https://github.com'+item.repo" :title="item.name">
                    <img :src="item.logo" alt="">
                 </a>
             </li>
         </ul>
     </div>
      <modalBox ref="editBox" title="编辑此页" v-if="docRepo&&docRepo=='tinymce-plugin-docs'">
        <template #show>
          <span>
            {{'tp.editPage'}}
            <svg
              t="1648027203716"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2193"
              width="16"
              height="16"
            >
              <path
                fill="#344A85"
                d="M678.854949 37.925925 151.913033 37.925925C67.776878 37.925925 0 105.939719 0 189.838987L0 872.086938C0 956.223137 68.013787 1024 151.913033 1024L834.161006 1024C918.297234 1024 986.074039 955.986205 986.074039 872.086938L986.074039 352.876954 910.22219 428.728803 910.22219 872.086938C910.22219 914.194593 876.305262 948.148151 834.161006 948.148151L151.913033 948.148151C109.805422 948.148151 75.851849 914.231172 75.851849 872.086938L75.851849 189.838987C75.851849 147.731332 109.76885 113.777781 151.913033 113.777781L603.003099 113.777781 678.854949 37.925925ZM320.679497 698.854934 550.775881 633.528042 386.423442 470.180586 320.679497 698.854934ZM935.236535 251.412619 770.882048 88.063035 409.297774 447.421923 573.650213 610.755591 935.236535 251.412619ZM1011.623351 114.198462 908.897353 12.111338C891.877742-4.806437 863.36629-3.885305 845.211136 14.152038L795.896832 63.146942 960.252416 226.495459 1009.563575 177.485707C1027.718729 159.447296 1028.639817 131.118358 1011.623351 114.198462Z"
              ></path>
            </svg>
          </span>
        </template>
        <div class="edit-page_box">
          <a
            v-if="docRepo"
            :href="prefix.github + docRepo + '/edit/main/' + docPath"
            target="_blank"
            @click.stop="closeOpen"
          >
            <svg
              height="128"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="128"
              data-view-component="true"
              class="octicon octicon-mark-github v-align-middle"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
            <br>
            <br>
            <span>
              {{transformI18n('tp.editPageInGithub')}}
              </span
            ><svg
              class="icon outbound icon"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              data-v-1501f284=""
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              ></path>
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              ></polygon></svg
          ></a>
          <a
            :href="prefix.gitee + docRepo + '/edit/main/' + docPath"
            target="_blank"
            @click.stop="closeOpen"
          >
            <svg
              t="1648028102473"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2405"
              width="128"
              height="128"
            >
              <path
                d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"
                fill="#C71D23"
              ></path>
            </svg>
            <br>
            <br>
            <span> {{transformI18n('tp.editPageInGitee')}}</span
            ><svg
              class="icon outbound icon"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              data-v-1501f284=""
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              ></path>
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              ></polygon></svg
          ></a>
        </div>
      </modalBox>
      <a v-else-if="docRepo &&docPath.length>5" :href="prefix.github + docRepo + '/edit/main/' + docPath" target="_blank"><span class="edit-page-text" >{{transformI18n('tp.editPageInGithub')}}</span><svg class="icon outbound icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" data-v-1501f284=""><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>
      <div v-if="upTime" class="upDate"> {{transformI18n('tp.upTime')}}：{{upTime}}</div>
    </div>
    <div class="pages-router">
      <div class="pages-prev" v-if="pagesPrev && pagesPrev.path">
        <router-link :to="pagesPrev.path"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon icon-prev"
            data-v-01ae7502=""
          >
            <path
              d="M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z"
            ></path></svg
          ><span>{{
            pagesPrev.meta ? pagesPrev.meta.title : pagesPrev.name
          }}</span></router-link
        >
      </div>
      <div class="pages-next" v-if="pagesNext && pagesNext.path">
        <router-link :to="pagesNext.path"
          ><span>{{
            pagesNext.meta ? pagesNext.meta.title : pagesNext.name
          }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon icon-next"
            data-v-01ae7502=""
          >
            <path
              d="M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z"
            ></path></svg
        ></router-link>
      </div>
      <!-- <loadingVue/> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRef ,watch} from "vue";
import { transformI18n } from "/@/i18n";
import { useStore } from "/@/stores";
import API from "/@/api"
//import loadingVue from "/@/components/loading/loading.vue";
export default defineComponent({
  name: "PagesRouter",
 // components:{ 
  // "loadingVue": loadingVue
 // }, 
  props: {
    pagesName: {
      type: String,
      default: "",
    },
    mapType:{
      type: String,
      default: "docsMap",
    },
    docRepo: {
      type: String,
      default: "",
    },
    docPath: {
      type: String,
      default: "",
    },
  },
  created() {
    this.init();
  },
  setup(props) {
    //https://gitee.com/tinymce-plugin
    //https://github.com/tinymce-plugin
    const prefix = {
      gitee: "https://gitee.com/tinymce-plugin/",
      github: "https://github.com/tinymce-plugin/",
    };
 
    const pagesNext: any = ref<object>({});
    const pagesPrev: any = ref<object>({});
    const store: any = inject("store");
    const editBox:any = ref('')
    const contributorsList = ref([])
    const upTime = ref('')
      prefix.gitee + props.docRepo + "/edit/main/" + props.docPath;
      const closeOpen = ()=>{
        editBox.value.clickCloseFn()
      }
    //   API.getContributorsList(props.docRepo,props.docPath).then((resData)=>{
    //         console.log(resData);
    //   })
    const init = () => {
      // console.log(store.value.pagesObj[store.value.pagesObj[props.pagesName].pagesNext]);
      let storePages
      let setIntervalID = setInterval(() => {
        storePages = store.value[store.value.language=='en'?'pagesObj_en':'pagesObj']
        if (storePages[props.pagesName]|| storePages[props.docRepo]) {
          clearInterval(setIntervalID);
          
          let pagesNow = storePages?storePages[props.pagesName]:storePages[props.docRepo]
          pagesNext.value =  storePages[
              pagesNow.pagesNext
            ];
          pagesPrev.value =
            storePages[
              pagesNow.pagesPrev
            ];
            if(props.docRepo&&store.value.siteMap[props.mapType+'Map']){
               let docData = store.value.siteMap[props.mapType+'Map'][props.docRepo][props.docPath.replace(/\.md$/,'')]
               docData.upTime&&(upTime.value = new Date(docData.upTime).toLocaleString())
               contributorsList.value = docData["contributors-list"]?.slice(0,12)
            }
       
        }
      }, 200);
      setTimeout(() => {
        clearInterval(setIntervalID);
      }, 60000);
     
    };

    return {
     closeOpen,
      prefix,
      store,
      init,
      contributorsList,
      upTime,
      editBox,
      pagesPrev,
      pagesNext,
     transformI18n
    };
  },
});
</script>

<style lang="scss" >

.edit-page-text{
    color: #344a85;
    margin-right: 4px;
    display: inline-block;
    vertical-align: middle;
}
    .contributors-list-box{
        position: absolute;
        right: 0;
        svg{
            
            color: #344a85;
            display: inline-block;
            vertical-align: middle;
        }
        .contributors-title{
            color: #344a85;
            margin-right: 4px;
            display: inline-block;
            vertical-align: middle;
        }
        ul{
            padding-left:22px;
            margin: 0;
            display: inline-block;
            vertical-align: middle;
        li{
            &:hover{
                box-shadow: 0px 0px 3px rgba(150, 188, 238, 0.712);
            }
           list-style: none;
           display: inline-block; 
           border-radius:100% ;
           overflow: hidden;
           width: 40px;
           height: 40px;
           margin:0 4px;
           margin-left: -20px;
           img{
               width: 100%;
           }
        }
      }
    }
    .edit-page{
        position: relative; 
        margin-top: 20px;
        margin-bottom: 15px;
        max-width: 1300px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .upDate{
          font-size: 12px;
        } 
    }
.edit-page_box {
    display: inline-flex;
   
  
  a {
    display: block;
    width:  168px;
    padding: 20px 5px;
    padding-bottom: 10px;
    margin: 0 5px;
    font-size: initial;
    text-align: center;
    text-decoration: none;
    color: #344a85;
    border-radius: 10px;
    border: 2px dashed transparent;
    transition: all 0.3s cubic-bezier(0, 0.26, 1, 1);
    &:hover{
        border-color:  #666;
        background-color:rgba(211, 200, 200, 0.712) ;
    }
  }
}
@media only screen and (max-width: 600px)  {
  .edit-page_box {
    display: inline-flex;
  a {
      width:  118px;
     &>svg:first-child{
         width: 100px;
         height: 100px;
      }
      span{
        font-size: 12px;
      }
  }
  }
}
.pages-router {
  padding-top: 20px;
  margin-top: 30px;
  border-top: 2px solid $themeColor;
  max-width: 1300px;
  .pages-prev {
    float: left;
  }
  .pages-next {
    float: right;
  }
  .pages-prev,
  .pages-next {
    a {
      svg {
        display: inline-block;
        width: 1em;
        vertical-align: middle;
        fill: $themeBrightColor;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        transition: all 0.3s;
      }
      font-size: 1.2em;
      height: 2em;
      line-height: 2em;
      color: $themeBrightColor;
      text-decoration: none;

      &:hover {
        span {
          margin: 0 10px;
        }
      }
    }
  }
}
</style>


