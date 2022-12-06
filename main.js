import App from './App'
import Blockchain from './common/web3.js'
import Utils from './common/utils.js'
import CONFIG from './common/base.js'
import i18n from './i18n/i18n'
import uView from "uview-ui"
// import tween from './common/TweenMax.min.js'
import TronWeb from 'tronweb'
Vue.use(uView);
import abi20 from "@/abi/abi20.json";
import abi721 from "@/abi/abi721.json";
// import abiusdt from "@/abi/abiusdt.json";
import abilp from "@/abi/abilp.json";
import abibs from "@/abi/abibs.json";


uni.setStorageSync('abi20',abi20)
uni.setStorageSync('abi721',abi721)
// uni.setStorageSync('abiusdt',abiusdt)
uni.setStorageSync('abilp',abilp)
uni.setStorageSync('abibs',abibs)

//初始化web3
var Web3=require('web3');
var Web3Eth = require('web3-eth');

Vue.prototype._Blockchain=Blockchain
Vue.prototype.Utils=Utils
Vue.prototype.config=CONFIG
Vue.prototype._i18n = i18n
// Vue.prototype._tween = tween

//初始化c20
Vue.prototype.init20=async function(address,privateKey){
	const HttpProvider = TronWeb.providers.HttpProvider;
	const fullNode = new HttpProvider('https://api.trongrid.io');
	const solidityNode = new HttpProvider('https://api.trongrid.io');
	const eventServer = 'https://api.trongrid.io/';
	// const privateKey='b6b5a290cfb107ec99b7b2032a8950bed5006c18eced124a508fe918181bb389'
	
	const tronWeb = new TronWeb(
	    fullNode,
	    solidityNode,
	    eventServer,
		privateKey
	);
	tronWeb.setAddress(address);
	tronWeb.setPrivateKey(privateKey)
	
	Vue.prototype.tronWeb=tronWeb
	Vue.prototype.c20 = await tronWeb.contract(uni.getStorageSync('abi20'),address); //合约地址
}

import {mixinsOne} from "@/mixin/mixin.js"
Vue.mixin(mixinsOne)

// #ifndef VUE3
import Vue from 'vue'
//引入切换语言
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif