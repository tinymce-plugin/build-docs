import { createRouter, createWebHashHistory } from "@npkg/vue-router";
import { useStore } from "../stores";

// import setRoutes from "./module/setRoutes";


const Plugins = {
  template: '<div class="plugins w1300" ><router-view></router-view></div>',
}
const Examples = {
  template: '<div class="example w1300" ><router-view></router-view></div>',
}
const Supportandfeedback ={
  template: '<div class="Supportandfeedback w1300" ><router-view></router-view></div>',
}
let mode = ''
let redirectPage = "/introduction"+mode
let routes:any = [
    {
      path: "/",
      name: "redirect",
      redirect: to => {
        return {path: to.query.redirect || redirectPage , query: Object.assign({}, to.query, { redirect: undefined }), hash: to.hash};
      },
    },
    // {
    //   path: "/quickStart",
    //   name: "quickStart",
    //   component: () => import("../markdown/quickStart.md"),
    //   // component: (): Component => import("../../packages/alert/__docs__/alert.md"),
    //   meta: {
    //     title: '快速上手',
    //   },
    // },
    // {
    //   path: "/plugins",
    //   name: "plugins",
    //   component: Plugins,
    //   meta: {
    //     title: '插件',
    //   },
    //   children:[{
    //     path: "axupimgs",
    //     name: "axupimgs",
    //     meta: {
    //       title: '多图上传',
    //       pluginName: 'upimgs'

    //     },
    //     component: () => import("../../packages/axupimgs/__docs__/axupimgs.md")
    //   },{
    //     path: "attachment",
    //     name: "attachment",
    //     meta: {
    //       title: '附件上传',
    //       pluginName: 'attachment'
    //     },
    //     component: () => import("../../packages/attachment/__docs__/attachment.md")
    //   }
    // ],
    // },
  
  ];


 const _$routes = JSON.parse(JSON.stringify(routes))
  const router = createRouter({
    history: createWebHashHistory(''),
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        // console.log(to.hash);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
          el: to.hash,
          top: 210,
        })
        },to.name!==from.name? 500:100)
      })
    //   }else{
    //   //   return new Promise((resolve, reject) => {
    //   //     setTimeout(() => {
    //   //       resolve({
    //   //     top: 200,
    //   //   })
    //   //   },500)
    //   // })
     }
    }
  });
  // setRoutes(router)
  // let initRouteFlag = false 
  router.beforeEach((to, from, next) => {
    // NProgress.start()
    next()
  })
  
  router.afterEach((to:any,from) => {
    let store = useStore()
    store.setPagePath(to.name,to.query,to)
    if(to.name ==='404'&&from.name!=='404'){
      let mode = ''
      let redirectPage = (store.language==='en'?'/en':'')+"/introduction"+mode
      router.push(redirectPage.trim())
      // NProgress.done()
    }else{
      // NProgress.done()
    }
  
 
  })
  export default router;
  export { router,routes, _$routes};