// i18n/i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCN from './langs/zh-CN'
import en from './langs/en'
import fan from './langs/fan'

Vue.use(VueI18n)

const messages = {
    en,
    zhCN,
	fan,
}

const i18n = new VueI18n({
    locale: 'zhCN',  //默认中文，也可根据系统语言动态设置
    messages
})

export default i18n