import { createRouter, createWebHashHistory } from "@npkg/vue-router";
import { useStore } from "../stores";

let routes:any = [
  ];


 const _$routes = JSON.parse(JSON.stringify(routes))
  const router = createRouter({
    history: createWebHashHistory(''),
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
          el: to.hash,
          top: 210,
        })
        },to.name!==from.name? 500:100)
      })
     }
    }
  });
  router.beforeEach((to, from, next) => {
    next()
  })
  
  router.afterEach((to:any,from) => {
    let store = useStore()
    store.setPagePath(to.name,to.query,to)
    if(to.name ==='404'&&from.name!=='404'){
      let mode = ''
      let redirectPage = (store.language==='en'?'/en':'')+"/introduction"+mode
      router.push(redirectPage.trim())
    }else{
    }
  })
  export default router;
  export { router,routes, _$routes};