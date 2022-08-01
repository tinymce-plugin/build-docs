import { createApp } from 'vue'
import App from './App.vue'
import Preview from "./views/Preview/Preview.vue";
import PreviewVue2 from "./views/Preview/PreviewVue2.vue";
import PreviewReact from "./views/Preview/PreviewReact.vue";
import PreviewIframe from "./views/Preview/PreviewIframe.vue";
import PagesRouter from "./views/PagesRouter/PagesRouter.vue";
import modalBox from "./components/modalBox/index.vue";
import fvToc from "./components/fvToc/index.vue";
import codeGroup from "./components/codeGroup/index.ts";
import codeGroupItem from "./components/codeGroup/codeGroupItem.vue";
import { createPinia } from 'pinia'
import router from './router';
import demoGroup from './components/demoGroup';
import demoGroupItem from './components/demoGroup/demoGroupItem.vue';
import codeBox from "./components/codeBox/index.ts";
import codeBoxItem from "./components/codeBox/codeBoxItem.vue";

import './assets/styles/fonts.css'
import './assets/styles/vars.css'
import './assets/styles/utils.css'
import './assets/styles/components/custom-block.css'
import './assets/styles/components/vp-code.css'
import './assets/styles/components/tp-doc.css'
import './assets/styles/components/vp-sponsor.css'
import "./assets/css/markdown.css";

const app = createApp(App);
app.component("modalBox",modalBox);
app.component("fvToc",fvToc);
app.component("codeGroup",codeGroup);
app.component("codeGroupItem",codeGroupItem);
app.component("demoGroup",demoGroup);
app.component("demoGroupItem",demoGroupItem);
app.component("codeBox",codeBox);
app.component("codeBoxItem",codeBoxItem);
app.component("Preview", Preview);
app.component("PreviewVue2", PreviewVue2);
app.component("PreviewReact", PreviewReact);
app.component("PreviewIframe", PreviewIframe);
app.component("PagesRouter", PagesRouter);
app.use(router).use(createPinia()).mount("#app");

