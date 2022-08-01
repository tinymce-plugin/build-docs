// 多组件库的国际化和本地项目国际化兼容
import { App, WritableComputedRef } from "vue";
// import { storageLocal } from "../../tools/storage";
// import { type I18n, createI18n } from "vue-i18n";

// function siphonI18n(prefix = "zh-CN") {
//   return Object.fromEntries(
//     Object.entries(import.meta.globEager("../../locales/*.y(a)?ml")).map(
//       ([key, value]) => {
//         const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
//         return [matched, value.default];
//       }
//     )
//   )[prefix];
// }

// export const localesConfigs = {
//   zh: {
//     ...siphonI18n("zh-CN"),
//   },
//   en: {
//     ...siphonI18n("en"),
//   }
// };

/**
 * 国际化转换工具函数
 * @param message message
 * @param isI18n  如果true,获取对应的消息,否则返回本身
 * @returns message
 */
export function transformI18n(
  message: string | unknown | object = "",
  isI18n: boolean | unknown = true,
  argArray?: any[]
) {
  if (!message) {
    return "";
  }

  return message
  // // 处理存储动态路由的title,格式 {zh:"",en:""}
  // if (typeof message === "object") {
  //   const locale: string | WritableComputedRef<string> | any =
  //     i18n.global.locale;
  //   return message[locale?.value];
  // }
  // if (isI18n) {
  //   return i18n.global.t.call(i18n.global.locale, message, argArray);
  // } else {
  //   return message;
  // }
}

// export const transformI18ns = (messages: Array<string | object>) => {
//   const transformMessages: Array<string> = [];
//   const locale: string | WritableComputedRef<string> | any = i18n.global.locale;
//   messages.forEach(message => {
//     transformMessages.push(transformI18n(message));
//   });

//   return locale?.value === "en"
//     ? transformMessages.join(" ")
//     : transformMessages.join("");
// };

// 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除
export const $t = (key: string) => key;

// export const i18n: I18n = createI18n({
//   legacy: false,
//   locale: "zh",
//   fallbackLocale: "en",
//   messages: localesConfigs
// });

// export function useI18n(app: App) {
//   app.use(i18n);
// }
