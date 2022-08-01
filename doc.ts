import fs from "fs";
const siteMap = []
import MarkdownIt from "markdown-it";
import mdContainer from "./markdown-it-container";
import mdAnchor from "./markdown-it-anchor";
import mdToc from "./markdown-it-anchor/toc";
import {resolveHighlightLines, isHighlightLine} from "./highlightLines";
import * as csstree from 'css-tree';
// import  from "axios"
// import _G from '../../../global'
// import _routes from "../../../src/router/routers"
import hljs from './highlight/highlight.js';
import { mkdirPath,delPath,isExternalLinks,getImageInfo} from "./tools/files";
function createRedirectHtml(root:string, path:string){
  let content = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<script>
    window.location.href = "/?redirect=${path}";
</script>
<body>
</body>
</html>
  `
  return new Promise(function(resolve:Function,reject){
    // console.log(path);
    mkdirPath(root+'/public'+path)
    // mkdirs(root,'./pubilc'+path,()=>{
      try{
        fs.writeFile(root+'/public'+path+'/index.html',content, "utf-8",function(err: any){ 
          if(err){
            reject(err)
          }else{
            resolve()
          } 
        })

      }catch{
        resolve()
      }
    
    // })
    //  mkdirPath()
  
  })
}

export function createRedirect(root){

  siteMap.forEach((item:any)=>{
  
      if(item.children){
          item.children.forEach((ele:any)=>{
            createRedirectHtml(root,item.path+'/'+ele.path)
          })
      }else{
        createRedirectHtml(root,item.path)
      }
   
  })

}

var docSite:any = {TimeID: new Date().getTime(),dataList:[]};
var docSiteObj:any = {}
const docRule = /^\/@docs\/(.*?).md$/;
var stripImportCheck = {}


function writeFs(path: string,content: { TimeID: number; dataList: never[]; }){
  return new Promise(function(resolve:Function,reject){
    fs.writeFile(path,JSON.stringify(content, null , 2), "utf-8",function(err: any){ 
      if(err){
        reject(err)
      }else{
        resolve()
      } 
    })
  })
}

function writeDemo(path: string,content: string){
  return new Promise(function(resolve:Function,reject){
    fs.writeFile(path,content, "utf-8",function(err: any){ 
      if(err){
        reject(err)
      }else{
        resolve()
      } 
    })
  })
}
function parserJsx(code:string){
  let parser = require("babel-core").transform(code, {
    plugins: ["transform-react-jsx"]
  });
  return parser.code
}

const demoContainer = (md: { render: (arg0: any) => any; }, callback: (arg0: any) => any) => ({
 
  validate(params: string) {
    return params.trim().match(/^demo\s*(.*)$/);
  },
  render(tokens:any, idx: string | number) {
   
    if (tokens[idx].nesting === 1) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      docSite.dataList.push(m)
      const description = m && m.length > 1 ? m[1] : "";
      description && callback(md.render(description));
      return "";
    }
    return "";
  },
});
const detailsContainer =  {
  validate: function(params) {
    return params.trim().match(/^details\s+(.*)$/);
  },
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details class="fv-state-details"><summary>' + m[1] + '</summary>\n';
 
    } else {
      // closing tag
      return '</details>\n';
    }
  }
}

const tipContainer ={
 
  validate: function(params) {
    return params.trim().match(/^tip\s+(.*)$/);
  },
 
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^tip\s+(.*)$/);
 
    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
 
    } else {
      // closing tag
      return '</details>\n';
    }
  }
}
const demoTinymceVue3Container =  (md: { render: (arg0: any) => any; }, callback: { (description: any): void; (arg0: any): any; }) => ({
 
  validate(params: string) {
    return params.trim().match(/^tinymce-vue3\s*(.*)$/);
  },
  render(tokens: any, idx: string | number) {
    if (tokens[idx].nesting === 1) {
      callback('')
      return "";
    }
    return "";
  },
});

const demoTinymceVue2Container =  (md: { render: (arg0: any) => any; }, callback: (arg0: any) => any) => ({
 
  validate(params: string) {
    return params.trim().match(/^tinymce-vue2/);
  },
  render(tokens: { [x: string]: { info: string; nesting:any }; }, idx: string | number) {
    if (tokens[idx].nesting === 1) {
      callback('')
      return "";
    }
    return "";
  },
});

const demoTinymceReactContainer =  (md: { render: (arg0: any) => any; }, callback: (arg0: any) => any) => ({
 
  validate(params: string) {
    return params.trim().match(/^tinymce-react/);
  },
  render(tokens: { [x: string]: { info: string; nesting:any }; }, idx: string | number) {

    if (tokens[idx].nesting === 1) {
      callback('')
      return "";
    }
    return "";
  },
});
let currentDemoList={}
let currentBoxType = '';
let currentBoxTypeDemo ={}
const demoTinymceBoxContainer  =  (md: { render: (arg0: any) => any; }, callback: (arg0: any) => any) => ({
 
  validate(params: string) {
    return params.trim().match(/^tinymce-box/);
  },
  render(tokens: { [x: string]: { info: string; nesting:any }; }, idx: string | number) {
  
    if (tokens[idx].nesting === 1) {
  
      currentBoxType="tinymce-box"
      callback('')
      return "<codeBox>";
    }
    currentBoxType=""
    let _styleStr = currentBoxTypeDemo['css']
    _styleStr = _styleStr.replace(/<\/?.+?\/?>/g,'')
    let _jsStr = currentBoxTypeDemo['js']
    _jsStr = _jsStr.replace(/<\/?.+?\/?>/g,'')
    let _htmlStr = currentBoxTypeDemo['html']

    const tinymceDmeoheight = getHeight(_jsStr);
    let _code =`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>${_styleStr}</style>\n
      <script src="/tinymce/tinymce.js"></script>
      <script src="/tinymce/tinymce-plugin.js"></script>
    </head><body style="padding-bottom: 20px"> ${_htmlStr}<script> ${_jsStr}</script></body></html>`
    let demoSrc = '/demo/codebox/demo-'+currentBoxTypeDemo.fileName+ new Date().getTime()+'/'
   mkdirPath('./public'+demoSrc)
   writeDemo('./public'+demoSrc+'index.html',_code)
   currentDemoList[currentBoxTypeDemo.fileName]&&currentDemoList[currentBoxTypeDemo.fileName].length>0? currentDemoList[currentBoxTypeDemo.fileName].push(demoSrc):currentDemoList[currentBoxTypeDemo.fileName] = [demoSrc]
   currentBoxTypeDemo={}
    return `<codeBoxItem title="TinyMCE"><iframe scrolling="no" style="width:100%;margin:auto 0;border:0px; min-height: ${tinymceDmeoheight.tpHeight||tinymceDmeoheight.min_height||tinymceDmeoheight.min_height||'220'}px"  onload="autoIframeHeight(this)"  src="${demoSrc}index.html"></iframe></codeBoxItem></codeBox>`;
  },
});
const demoTinymceIframeContainer =  (md: { render: (arg0: any) => any; }, callback: (arg0: any) => any) => ({
 
  validate(params: string) {
    return params.trim().match(/^tinymce$/);
  },
  render(tokens: { [x: string]: { info: string; nesting:any }; }, idx: string | number) {
    if (tokens[idx].nesting === 1) {
      callback('')
      return "";
    }
    return "";
  },
});

function stripImport(content: string) {
  const result = content.match(/import(.*);/gi);
  let code = ''
  result&&result.forEach(ele=>{
   let importList = ele.trim().replace(/import ([\s\S]+) from ([\s\S]+);/g,'$1').trim().replace(/{([\s\S]+)}/g,'$1').trim().split(',')
   let importStr = ele
  //  console.log(importList);
   let delCount = 0
   importList.forEach(_i=>{
      let _import = _i.trim()
      if(!stripImportCheck[_import]){
          stripImportCheck[_import] = true
      }else{
        delCount++
        importStr = importStr.replace(new RegExp( _i+','),'').replace(new RegExp( _i),'')
      }
     
   })
 
    delCount < importList.length?(code+=(importStr.trim()+'\n')):''
  })

  return code;
}
function getHeight(content:string) {
 let result = {}
 let contentList = content.split('tinymce.init({')
 contentList&&contentList[0].replace(/<* [^>]*tp-page-height=['"]([^'"]+)[^>]*>/,(macth,val)=>{
  result['tpHeight'] =  parseInt(val)+21
  return ''
})
 contentList&&contentList.length>1&&contentList[1].replace(/min_height\:(.*)/g,(macth,val)=>{
  result["min_height"] = parseInt(val) + 21
  return ''
}).replace(/\nheight\:(.*)/g,(macth,val)=>{
  result['height'] =  parseInt(val) + 21
  return ''
})
 return result
}
function stripScript(content: string) {
  const result = content.match(/<script.*>([\s\S]+)<\/script>/);
  const code = result && result[1] ? result[1].trim() : "";
  return code.replace(/\/\/import(.*);\n/gi,'').replace(/import(.*);\n/gi,'');
}
function parseStyle(style,preName){
 let _ast = csstree.parse(style);
 
if(_ast){
  csstree.walk(_ast, (node) => {
    if(node.type==='Rule'&&node.prelude&&/^SelectorList/.test(node.prelude.type)){
      node.prelude.children.forEach((cNode)=>{
        // console.log(cNode.children)
            if(cNode.type==='Selector'&&cNode.children){
              cNode.children.unshift({
                "type": "Combinator",
                "loc": null,
                 "name": " "
               })
              cNode.children.unshift({
                 "type": "ClassSelector",
                  "loc": null,
                  "name": preName
               })
            }
      })
    }
  })
  
  return  csstree.generate(_ast)
}
return ''
}
function stripStyle(content: string) {
  const result = content.match(/<style.*>([\s\S]+)<\/style>/);
  return result && result[1] ? result[1].trim() : "";
}
function getHighlightCode (code: { match: (arg0: RegExp) => { (): any; new(): any; length: any; }; }, lang: string, langText: string,highlightLines?:string) {
  // console.log(highlightLines);

  try {

    const highlightLinesRanges = !!highlightLines 
    ? resolveHighlightLines(highlightLines)
    : null
    let numberStr = '';
    let numberLen = code.match(/\n/ig).length
     for(let i =0; i<numberLen; i++){ 
       numberStr +='<li '+(highlightLinesRanges&&isHighlightLine(i+1,highlightLinesRanges)?'class="line"':'')+'><span>'+(i+1)+'</span></li>'
    }
    // console.log(code);
    
    return '<pre class="hljs fv-hljs '+(highlightLinesRanges?'highlight-line':'')+'">'+( numberStr? '<ul class="highlight-line-number '+(numberLen<5?' nonumber':'')+'"  >'+numberStr+'</ul>':'')+'<code class=" hljs  hljs-'+lang+'" @click.stop="()=>{}">' +
       hljs.highlight(lang,code,true).value +
           '</code><div class="language-text" >'+ langText +'</div></pre>';
  } catch (__) {}
  return ''
}
function stripTemplate(content: string) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "").replace(/<template>/, '').replace(/<\/template>/, '').trim();
}

interface createVuedcoPlugin {
  docsPath?: (root: string) => string | undefined;
  root?: string | undefined;
  plugins?: any[];
}
let viteConfig: any | undefined = undefined 
export function createVuedcoPlugin(options: { docsPath: any; mode?: any; root?: any; }) {
  const { docsPath , root, mode} = options;
  const docDir = docsPath?docsPath(root) :'' || root;
  
  // 
  const docLoadRule = new RegExp(`/(.*?).md$`)
  return {
    name: 'md-to-vue-plugin', // 必须
    buildStart(){
    },
    buildEnd(error: any){
      if (error) throw error;
      for(let key in docSiteObj){
        docSite.dataList.push(docSiteObj[key])
      }
      fs.stat('./public/demo',(stat:any)=>{
        if(stat){
           delPath('./public/demo')
         }
       })
    },
    configResolved(resolvedConfig: any) {
      viteConfig = resolvedConfig
    },
    transform(src: any, id: any) {
    let styleStr=''
        if (docLoadRule.test(id)) {
           stripImportCheck = {}
            const fileName:any = id.split("/").pop().split(".")[0]
            const demos: { id: string; component: string; }[] = [];
            
            let docpathPath:any = id.indexOf('site/docs')>-1? id.replace(root.replace(/\\/g,'/'),'').replace(/^\/build\/site\//,'').split("/resources/"): id
           const docRepo = docpathPath[0]
           const docpath = docpathPath[1]
            docSiteObj[fileName] = {title: fileName,repo: docRepo.split('/')[1], path: docpath.replace(/(_t_(.*)_p_\.md)$/,'') }
              let currentDescription = "";
              let currentType = '';
              const md = new MarkdownIt("default", {
                html: true,
                linkify: true,
                // langPrefix:   'language-', 
                typographer: true,
                highlight: function (code: any, lang: string, highlightLine: string) {
                  const id = `Demo${demos.length}`;
                  let langText = lang
                  lang === 'vue' ? lang = 'js': ''
                  if (langText === "vue"&&currentType) {
                   
                    const stript = (stripImport(code)+(currentType ==='vue2'?'export default {}':stripScript(code)) || "export default {}").replace(
                      "export default",
                      `const ${id} =`,
                    );
                    const template = stripTemplate(code);
                    styleStr+=parseStyle(stripStyle(code),"demo-"+fileName)
                    // console.log(styleStr);
                    // console.log(stript);
                    demos.push({
                      id: id,
                      component: [
                        "",
                        stript,
                        `
                        if (${id}.methods) {
                          ${id}.methods.source = function () {
                            return ${JSON.stringify(getHighlightCode(code, lang, langText,highlightLine))}
                          }
                          ${currentType ==='vue2' ? ` ${id}.methods.template= function () {
                            return ${JSON.stringify(template)}
                            }
                            ${id}.methods.sourceCode = function(){
                              return ${stripScript(code).split("export default")[1].replace(/data\(\)/,'data: function()')}
                            }
                            `:''}
                        } else {
                          ${id}.methods = {
                            ${currentType ==='vue2'?`template(){
                            return ${JSON.stringify(template)}
                            },sourceCode(){
                              return ${stripScript(code).split("export default")[1].replace(/data\(\)/,'data: function()')}
                            },`:''}
                            source() {
                              return ${JSON.stringify(getHighlightCode(code, lang, langText,highlightLine))}
                            },
                          }
                        }`,
                        `${id}.template = ${JSON.stringify(
                          currentType ==='vue2'?
                            `<PreviewVue2 class="demo-${fileName}"  :template="template()"  :source="source()">
                              ${
                                currentDescription &&
                                `<template v-slot:description>${currentDescription}</template>`
                              }
                            </PreviewVue2>`:
                            `<Preview class="demo-${fileName}" :source="source()">
                                <template v-slot:demo>${template}</template>'
                                ${
                                  currentDescription &&
                                  `<template v-slot:description>${currentDescription}</template>`
                                } 
                              </Preview>`
                        )}`,
                      ].join("\n"),
                    });
                    currentType = ''
                    return '<'+id+' data-isComponent="vue" class="demo-'+fileName+'" />'
                  }else if(currentType =='react'){
                    const stript = (`const ${id} = {}\n`+stripImport(code))
                    styleStr+=parseStyle(stripStyle(code),"demo-"+fileName)
                    const template = stripTemplate(code);
              
               
                    demos.push({
                      id: id,
                      component: [
                        "",
                        stript,
                        `
                          ${id}.methods = {
                            source() {
                              return ${JSON.stringify(getHighlightCode(code, lang, langText,highlightLine))}
                            },
                            sourceCode(DomeID){
                                ${parserJsx(stripScript(code)).replace(/document\.getElementById\(([A-Za-z0-9_'"^%&',;=?$]+)\)/,'DomeID').replace(/ReactDOM\.render/,'return ReactDOM.render')}
                            }
                          }
                       `,
                        `${id}.template = ${JSON.stringify(
                            `<PreviewReact class="demo-${fileName}" idx="${id}"  :source="source()">
                              ${
                                currentDescription &&
                                `<template v-slot:description>${currentDescription}</template>`
                              }
                            </PreviewReact>`
                          
                        )}`,
                      ].join("\n"),
                    });
                    currentType = ''
                    return '<'+id+'  data-isComponent="react"  class="demo-'+fileName+'" />'
                  }else if(currentType =='iframe'){
                    const stript = (`const ${id} = {}\n`)
                  //  setTimeout
                  
                    const tinymceDmeoheight = getHeight(code);
                    let demoSrc = '/demo/demo-'+fileName+ new Date().getTime()+'/'
                   mkdirPath('./public'+demoSrc)
                   writeDemo('./public'+demoSrc+'index.html',code)
                   currentDemoList[fileName]&&currentDemoList[fileName].length>0? currentDemoList[fileName].push(demoSrc):currentDemoList[fileName] = [demoSrc]
                    demos.push({
                      id: id,
                      component: [
                        "",
                        stript,
                        `
                          ${id}.methods = {
                            source() {
                              return   ${JSON.stringify(getHighlightCode(code, lang, langText,highlightLine))}
                            },
                            sourceCode(){
                              return '<iframe scrolling="no" width="100%" style="width:100%;margin:auto 0;border:0px; min-height: ${tinymceDmeoheight.tpHeight||tinymceDmeoheight.min_height||tinymceDmeoheight.min_height||'220'}px"  onload="autoIframeHeight(this)"  src="${demoSrc}index.html"></iframe>'
                            }
                          }
                       `,
                        `${id}.template = ${JSON.stringify(
                            `<PreviewIframe class="demo-${fileName}" idx="${id}"  :source="source()" :sourceCode="sourceCode()">
                              ${
                                currentDescription &&
                                `<template v-slot:description>${currentDescription}</template>`
                              }
                            </PreviewIframe>`
                          
                        )}`,
                      ].join("\n"),
                    });
                    currentType = ''
                    return '<'+id+'  data-isComponent="iframe" />'
                   
                  }else if(currentBoxType =='tinymce-box'&& currentType=='html'){
                    currentBoxTypeDemo['html']=code
                    currentBoxTypeDemo['fileName']=fileName

                    currentType = ''
                      return `<codeBoxItem title="HTML"><pre>${getHighlightCode(currentBoxTypeDemo['html'], lang, langText,highlightLine)}</pre></codeBoxItem>`
                  }else if(currentBoxType =='tinymce-box'&& currentType=='js'){
                    currentBoxTypeDemo['js']=code
                    currentType = ''
                      return `<codeBoxItem  title="JS"><pre>${getHighlightCode(currentBoxTypeDemo['js'], lang, langText,highlightLine)}</pre></codeBoxItem>`
                  }else if(currentBoxType =='tinymce-box'&& currentType=='css'){
                    currentBoxTypeDemo['css']=code
                    currentType = ''
                      return `<codeBoxItem title="CSS"><pre>${getHighlightCode(currentBoxTypeDemo['css'], lang, langText,highlightLine)}</pre></codeBoxItem>`
                  } else if (lang && hljs.getLanguage(lang)) {
                    // console.log(lang);
                    currentType = ''
                   return  getHighlightCode(code, lang, langText,highlightLine)
                  }
                  currentType = ''
                  return '';
                },
              });
              const default_code_inline =  md.renderer.rules.code_inline;
              md.renderer.rules.code_inline = function(tokens: { [x: string]: { attrSet: (arg0: string, arg1: string) => void; }; }, idx: string | number, options: any, env: any, self: any) {
                tokens[idx].attrSet('class','fv-code_inline')
                return default_code_inline(tokens, idx, options, env, self)
              }
           
              var default_image  = md.renderer.rules.image;
              md.renderer.rules.image = function (tokens, idx, options, env, self) {
                  let token = tokens[idx],
                  aIndex = token.attrIndex('src');
                 let imageInfo:any = getImageInfo(tokens[idx].attrs[aIndex][1])
                  // console.log(imageInfo);
                  // console.log(self);
                  if(imageInfo.width){
                    token.attrIndex('width')<0 && tokens[idx].attrPush(['width', imageInfo.width]);
                  }
                  if(imageInfo.height){
                    token.attrIndex('height')<0 && tokens[idx].attrPush(['height', imageInfo.height]);
                  }
                // 传递 token 给默认的渲染器。
                return default_image(tokens, idx, options, env, self);
                };

                var default_link_open = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
                  return self.renderToken(tokens, idx, options);
                };
                
                md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
                  // 如果你确认其他的插件不能添加 `target`
                  let ahref = tokens[idx].attrIndex('href');
                 if(ahref>=0&&isExternalLinks(tokens[idx].attrs[ahref][1])){
                    let aIndex = tokens[idx].attrIndex('target');
                    if (aIndex < 0) {
                      tokens[idx].attrPush(['target', '_blank']); // 添加新属性
                    } else {
                      tokens[idx].attrs[aIndex][1] = '_blank';    // 替换已经存在的属性值
                    }
                 }
                  // 传递 token 到默认的渲染器。
                  return default_link_open(tokens, idx, options, env, self);
                };
              md.use(
                mdContainer,
                "tinymce-vue3",
                demoTinymceVue3Container(md, (description: string) => {
                  currentType = 'vue'
                  currentDescription = description;
                }),
              );
              md.use(
                mdContainer,
                "tinymce-vue2",
                demoTinymceVue2Container(md, (description) => { 
                  currentType = 'vue2'
                  currentDescription = description;
                }),
              );
              md.use(
                mdContainer,
                "tinymce-react",
                demoTinymceReactContainer(md, (description) => {
                  currentType = 'react'
                  currentDescription = description;
                }),
              );
              md.use(
                mdContainer,
                "tinymce-box",
                demoTinymceBoxContainer(md, (description) => { 
                  currentDescription = description;
                }),
              );
              md.use(
                mdContainer,
                "html",
                {
                  validate(params: string) {
                    return params.trim().match(/^html/);
                  },
                  render(tokens: { [x: string]: { info: string; nesting:any }; }, idx: string | number) {
                    if (tokens[idx].nesting === 1) {
                      currentType = 'html'
                      return "";
                    }
                    return "";
                  },
                });
                md.use(
                  mdContainer,
                  "js",
                  {
                    validate(params: string) {
                      return params.trim().match(/^js/);
                    },
                    render(tokens: { [x: string]: { info: string; nesting:any }; }, idx: string | number) {
                      if (tokens[idx].nesting === 1) {
                        currentType = 'js'
                        return "";
                      }
                      return "";
                    },
                  });
                  md.use(
                    mdContainer,
                    "css",
                    {
                      validate(params: string) {
                        return params.trim().match(/^css/);
                      },
                      render(tokens: { [x: string]: { info: string; nesting:any }; }, idx: string | number) {
                        if (tokens[idx].nesting === 1) {
                          currentType = 'css'
                          return "";
                        }
                        return "";
                      },
                    });
              md.use(
                mdContainer,
                "tinymce",
                demoTinymceIframeContainer(md, (description) => {
                  currentType = 'iframe'
                  currentDescription = description;
                }),
              );
          
              md.use(mdContainer, "tip");
              md.use(mdContainer, "danger");
              md.use(mdContainer, "info");
              md.use(mdContainer, "warning");
              md.use(mdContainer, "details",detailsContainer);
              // md.use(mdAnchor,{  permalinkSymbol:'#',level: [1,2,3,4,5], permalink: true , permalinkBefore:true, callback:  function(e:any, value:any){
              //  } 
              // })
              md.use(mdToc)
              let context = md.render(src, {});
              context = context.replace(/\<pre\>\<code[^>]*>/g,'').replace(/\<\/code><\/pre\>/g,'')
              const docComponent = docRepo.split('/')[1] ?`
                    import { createApp, defineComponent } from 'vue';
                      ${demos.map((demo) => demo.component).join("")}
                      const __script = defineComponent({
                        components: {
                            ${demos.map((demo) => demo.id).join(",")}
                        },
                        template: '<div class="fv-mardown-html">'+${JSON.stringify('<div class="fv-mardown-main tp-doc">'+context+'</div>')}+'</div>'
                      });
                      export default __script;`: `
                      import { createApp, defineComponent } from 'vue';
                        ${demos.map((demo) => demo.component).join("")}
                       const __script = defineComponent({
                          components: {
                              ${demos.map((demo) => demo.id).join(",")}
                          },
                          template: '<div class="fv-mardown-html">'+${JSON.stringify('<div class="fv-mardown-main">'+context+'</div>')}+'</div>'
                        });
                        export default __script;`
                      ;
                      // console.log();
                      // console.log(styleStr);
                      
                   let styleCode =   styleStr?`var __vite_style__=document.createElement("style");__vite_style__.innerHTML=\`${styleStr}\`;\n  document.head.appendChild(__vite_style__);\n`:''
          return {
            code: styleCode+docComponent,
            map: null, // 如果可行将提供 source map
          }
        }
    },
  };
}