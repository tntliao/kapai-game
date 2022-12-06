var web3 = require("web3");
import CONFIG from './base'
import Request from 'luch-request'
const http = new Request();
var tools = {
	// towei:function(money,decimals){
	// 	let amount = money * Math.pow(10,decimals)
	// 	return amount.toFixed(0);
	// },
	// weito:function(money,decimals){
	// 	let amount = money / Math.pow(10,decimals)
	// 	return amount.toFixed(4);
	// },
	luch_post: async function(url, data = {}) {
		return new Promise((resolve, reject) => {
			let dourl = CONFIG.apiUrl + url;
			let userId = uni.getStorageSync("userId");
			let wallet = uni.getStorageSync("wallet");
			let token = uni.getStorageSync("token");
			data.userId = userId;
			if (!wallet) {
				wallet = window.tronWeb.defaultAddress.base58
			}
			data.wallet = wallet;
			data.token = token;

			http.post(dourl, data).then(res => {
				console.log(123456)
				resolve(res.data);
			}).catch(err => {
				reject(err);
			});
		})
	},
	luch_get: async function(url, data) {
		return new Promise((resolve, reject) => {
			let dourl = CONFIG.apiUrl + url;
			let userId = uni.getStorageSync("userId");
			let wallet = uni.getStorageSync("wallet");
			let token = uni.getStorageSync("token");
			data.userId = userId;
			data.wallet = wallet;
			data.token = token;
			http.get(dourl, {
				params: data
			}).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			});
		})
	},
	//显示消息
	showmsg: function(txt, num = 5000) {
		uni.showToast({
			title: txt,
			icon: 'none',
			duration: num,
		})
	},
	//随机整数
	randomNum: function(minNum, maxNum) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * minNum + 1, 10);
				break;
			case 2:
				return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
				break;
			default:
				return 0;
				break;
		}
	},
	// 复制
	copyToClipBoard: function(val) {
		let result
		// #ifndef H5
		uni.setClipboardData({
			data: val,
			success() {
				result = true
			},
			fail() {
				result = false
			}
		});
		// #endif

		// #ifdef H5 
		let textarea = document.createElement("textarea")
		textarea.value = val
		textarea.readOnly = "readOnly"
		document.body.appendChild(textarea)
		textarea.select() // 选中文本内容
		textarea.setSelectionRange(0, val.length)
		result = document.execCommand("copy")
		textarea.remove()
		// #endif
		return result
	},
	ppost: async function(url, data, that, fnSuccess, fnFail = function(err) {}, fnComplete = function(res) {}) {
		return new Promise((resolve, reject) => {
			let userId = uni.getStorageSync("userId");
			let wallet = uni.getStorageSync("wallet");
			let token = uni.getStorageSync("token");
			data.userId = userId;
			if (!wallet) {
				wallet = window.tronWeb.defaultAddress.base58
			}
			data.wallet = wallet;
			data.token = token;
			uni.request({
				url: CONFIG.apiUrl + url,
				dataType: 'JSON',
				method: 'GET',
				data: data,
				success: (res) => {
					resolve(res.data);
				},
				fail: (err) => {
					reject(err);
				},
				complete: fnComplete,
			});
		})
	},
	//post
	post: function(url, data, that, fnSuccess, fnFail = function(err) {}, fnComplete = function(res) {}) {
		var userId = uni.getStorageSync("userId");
		//var userId=86666;
		var wallet = uni.getStorageSync("wallet");
		var token = uni.getStorageSync("token");
		data.userId = userId;
		if (!wallet) {
			wallet = window.tronWeb.defaultAddress.base58
		}
		data.wallet = wallet;

		data.token = token;
		uni.request({
			url: CONFIG.apiUrl + url,
			dataType: 'JSON',
			method: 'GET',
			data: data,
			success: fnSuccess,
			fail: fnFail,
			complete: fnComplete,
		});
	},
	//post
	taskpost: function(url, data, fnSuccess = function(res) {}, fnFail = function(err) {}, fnComplete = function(
		res) {}) {
		var userId = uni.getStorageSync("userId");
		var wallet = uni.getStorageSync("wallet");
		var token = uni.getStorageSync("token");
		data.userId = userId;
		if (!wallet) {
			wallet = window.tronWeb.defaultAddress.base58
		}
		data.wallet = wallet;
		data.token = token;
		uni.request({
			url: CONFIG.taskUrl + url,
			dataType: 'JSON',
			method: 'GET',
			data: data,
			success: fnSuccess,
			fail: fnFail,
			complete: fnComplete,
		});
	},
	//钱包地址转换
	getShowAddress: function(str) {
		return str.slice(0, 6) + '...' + str.slice(-7);
	},
	//钱包地址转换
	getShowAddresslong: function(str) {
		return str.slice(0, 8) + '...' + str.slice(-9);
	},
	//换算成wei
	toanywei: function(money, decimals) {
		money.toString();
		if (decimals < 3) {
			return money * Math.pow(10, decimals);
		}
	},
	// 校验工具
	isnull: function(value) { //非空校验
		if (value.trim(value).length == 0) {
			return false;
		} else {
			return true;
		}
	},
	isidc: function(value) { //身份证校验
		var ext = /(^\d{15}&)|(^\d{18})|(^\d{17}(\d|X|x)$)/;
		return ext.test(value);
	},
	isen: function(value) { //英文校验
		var ext = /(^[a-zA-Z]+$)/;
		return ext.test(value);
	},
	isnum: function(value) { //数字校验
		var ext = /^[0-9]*$/;
		return ext.test(value);
	},
	isfloat: function(value) { //小数校验
		var ext = /^[0-9]+(.[0-9]{1,3})?$/;
		return ext.test(value);
	},
	isemail: function(value) { //邮箱校验
		var ext = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		return ext.test(value);
	},
	ismob: function(value) { //手机号校验
		var ext = /^1[3456789][0-9]{9}$/;
		return ext.test(value);
	},
	isInteger: function(s) { //是否整数
		var isInteger = RegExp(/^[0-9]+$/);
		return (isInteger.test(s));
	},
	isName: function(s) { //是否姓名
		var regName = /^[\u4e00-\u9fa5]{2,4}$/;
		if (!regName.test(s)) {
			return false;
		}
		return true;
	},
	isChinese: function(obj) { //是否汉字
		var reg = /^[\u0391-\uFFE5]+$/;
		if (obj != "" && !reg.test(obj)) {
			return false;
		}
		return true;
	},
	// 从wei来
	fromanywei: function(money, decimals) {
		money.toString();
		if (decimals < 3) {
			return money / Math.pow(10, decimals);
		}
	}

}

export default {
	tools
}
