import { defineStore } from 'pinia'
import { reactive, Ref, ref, toRef, toRefs} from 'vue'
// import { storageLocal } from '../../tools/storage'
import {router,routes }from '../router'

const modulesList =  import.meta.glob("../../../../../__docs__/**/*.md")
const excludeCheck = {
 'tinymce-plugin.github.io': true,
 'tinymce-plugin':true,
 'tinymce-plugin-docs': true
}
const isExclude=(name:string)=>excludeCheck[name]
const prefix = {
   packages: '/packages',
   plugins: "/plugins"
}
const MenuObj = {
  plugins: [],
  examples: []
}
const useStore = defineStore({
  id: 'store',
  state: () => ({
    pagePath:'index',
    pageRoute: [] as any,
    language: "zh",
    menuList: [],
    menuList_en: [],
    pagesObj: {"_pagesPrev": {}},
    pagesObj_en: {"_pagesPrev": {}},
    siteMap: {},
    openMenu: false,
    completeMenu: false
  }),
  actions: {
    async initRouter(){
      let that = this
      Object.keys(modulesList).forEach(ele=>{
        let routerPath = ele.split('__docs__')[1].replace(/.md$/,'')
        router.addRoute({path: routerPath, name: routerPath.replace(/\//g,'_'), meta: {title: routerPath.replace(/\//g,'_') }, component: modulesList[ele]})
      })
      let routes = router.getRoutes()
  
      routes.forEach(ele=>{
        ele.name!='redirect' && that.menuList.push(ele)
      })
      router.push(routes[0].path)
       setTimeout(()=>{
        that.completeMenu = true
       },300)
       
    },
    initStore(){
       this.initRouter()
    },
    setPagePath(routePath:string,query:Object|any,obj:any){
          let that:any = this
          that.pagePath = routePath
          that.pageRoute = obj
    },
    getPagePath(resObj:Ref<any>){
      let that:any = this 
      that.isShow = toRef(resObj,'value')
    },
    chanageLanguage(lang:string) {
      this.$patch({
        language: lang,
      })
      let newPath =window.location.pathname
      newPath = (lang==='en'?'/en':'') + newPath.replace(/^\/en/,'')
      router.push(newPath)
    }
 }
})

export {
  useStore,
}
