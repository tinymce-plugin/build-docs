
const modulesList =  import.meta.glob("../../../../__docs__/**/*.md")
// const modulesList =  import.meta.glob("../../markdown/test/**/*.md")
console.log(modulesList);

// console.log(modulesList);
// console.dir(import.meta);
const setRoutes = (router:any)=>{
router.push(router.currentRoute.value.fullPath).catch(()=>{});
}
export default setRoutes