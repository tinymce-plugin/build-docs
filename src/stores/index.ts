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
      // that.menuList = []
      
      // let githubStore = useGithubStore()
      // console.log();
    
      Object.keys(modulesList).forEach(ele=>{
        let routerPath = ele.split('__docs__')[1].replace(/.md$/,'')
        router.addRoute({path: routerPath, name: routerPath.replace(/\//g,'_'), meta: {title: routerPath.replace(/\//g,'_') }, component: modulesList[ele]})
      })
      // const siteMap:any = await githubStore.getSiteMap()
      
      // that.siteMap = siteMap.siteMap
      // console.log( siteMap.routes);
      
      // siteMap.routes.map((ele)=>{ 
      //   router.hasRoute(ele.name)&&router.removeRoute(ele.name)
      //   if(ele.children&&ele.children.length>0){
      //      router.addRoute({ ...ele, component:  {template: '<div class="'+ele.name+'" ><router-view></router-view></div>'}})
      //      ele.children.map((e)=>{
      //        if(e.children&&e.children.length>0){
      //         router.addRoute(ele.name,{ ...e, component: {template: '<div class="'+e.name+'" ><router-view></router-view></div>'}})
      //         e.children.map((e2)=>{
      //           router.addRoute(e.name,{ ...e2, component:() => import('../'+e2.component+'.md')})
      //         })
      //        }else{
      //         router.addRoute(ele.name,{ ...e, component: () => import('../'+e.component+'.md')})
      //        }
              
      //      })
      //   }else{
      //      router.addRoute({ ...ele, component: () => import('../'+ele.component+'.md')})
      //   }
      //  })
      //  router.push(router.currentRoute.value.fullPath)
      //  console.log(router.getRoutes());
      // console.log(router.getRoutes());
      
       // @ts-ignore
      // router.getRoutes();
      // const routerList:any = await githubStore.getRepos()
      // console.log(that.menuList);
      
      // routerList.forEach(ele => {
      //   if(!isExclude(ele.name)){
      //     let addPath =  ele.name
         
      //       push({ name: ele.name, path: ele.name, component: () => import(`../../plugins/${ele.name}.md`) ,meta: {title: ele.description}})
      //    }
      // });
      // router.addRoute({ name: 'admin', path: '/admin', component: {template: '<div class="'++'" ><router-view></router-view></div>',} })
      // let repoData = await githubStore.getContents('tinymce-plugin-docs','guide/contributing/writing-guide.md')
      // console.log(repoData);
      
      // let pagesPrev = '_pagesPrev'
      // MenuObj.plugins.forEach(plugin=>{
      //   !router.hasRoute(plugin.path)&&router.addRoute('plugins',plugin)
      // })
      // siteMap.routes.forEach(ele=>{
      //   that.menuList.push(ele)
      // })
      let routes = router.getRoutes()
      let firstMenu = 0 
      routes.forEach(ele=>{
      //  if(MenuObj[ele.name]){
      //   ele.children.push(...MenuObj[ele.name])
      //   that.menuList.push(ele)
      //  }else{
        // console.log(ele);
        
        ele.name!='redirect' && that.menuList.push(ele)
      //  }
      })

     
        
     
      // that.menuList.shift();
     
      // console.log();
      
      // console.log(router.getRoutes());
      
     // console.log(that.menuList);
   
      // routes.forEach(ele=>{
      // //  if(MenuObj[ele.name]){
      // //   ele.children.push(...MenuObj[ele.name])
      // //   that.menuList.push(ele)
      // //  }else{
      //   ele.name!='redirect' && that.menuList_en.push(ele)
      // //  }
      // })
      

      //  console.log(router.getRoutes());  
      router.push(routes[0].path)
       setTimeout(()=>{
        that.completeMenu = true
       },300)
       
    },
    initStore(){
      //  console.log("inde");
       this.initRouter()
       
    },
    setPagePath(routePath:string,query:Object|any,obj:any){
          let that:any = this
          that.pagePath = routePath
          that.pageRoute = obj
          // console.log(obj);
          
          //useGithubStore()
          // that.api.setMenuDataIsOn(query)
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
      // }else{
      //   let mode = process.env.routesSuffix
      //    let redirectPage = (lang==='en'?'/en':'')+"/introduction"+mode
      //    router.push(redirectPage)
      // }
    
    }
 }
})

export {
  useStore,
}

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(mainStore, import.meta.hot))
// }
