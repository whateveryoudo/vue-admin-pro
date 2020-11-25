/**
 * Created by 86159 on 2019/8/10.
 */
import Vue from "vue"
import { getStore } from "@/utils"
import VueI18n from "vue-i18n"

// import elementEnLocale from "element-ui/lib/locale/lang/en" // element-ui lang
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN"// element-ui lang
import zhLocale from "./ZN"
import enLocale from "./EN"

Vue.use(VueI18n)
const messages = {
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  en: {
    ...enLocale,
    ...elementZhLocale
  }
}

// 获取当前语言

export const getLanguage = () => {
  const localLanguage = getStore("language");
  if (localLanguage) { return localLanguage };

  // 获取浏览器语言
  let curLanguage = "zh";// 默认中文
  const language = (navigator.language || navigator.browserLanguage);
  curLanguage = Object.keys(messages).find(local => language.indexOf(local) > -1);

  return curLanguage;
}
// 构建实例

const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

export default i18n
