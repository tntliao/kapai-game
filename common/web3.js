var Web3 = require('web3');
// import {NETWORK}('./config.js');
require("./config.js");
var web3;
var ethereum;

function init(){
	console.log('连接初始化'+BASE_CONFIG.netWork);
	let params=BASE_CONFIG.netparams;
	window.ethereum.request({ method: 'wallet_addEthereumChain', params })
	                    .then(() => console.log('Success'))
	                    .catch((error) => console.log("Error", error.message));
	// if (ethereum) {
	// 	// 新版需要请求用户授权
	// 	let params=BASE_CONFIG.netparams;
	// 	window.ethereum.request({ method: 'wallet_addEthereumChain', params })
	// 	                    .then(() => console.log('Success'))
	// 	                    .catch((error) => console.log("Error", error.message));
	// } else if (web3) {
	// 	let provider = web3.currentProvider;
	// } else {
	// 	let provider = new Web3.providers.HttpProvider(BASE_CONFIG.netWork);
	// 	web3 = new Web3(provider);
	// 	console.log("连接到"+BASE_CONFIG.netname);
	// }
	console.log("连接到"+BASE_CONFIG.netname);
}

function login(wallet){
		uni.request({
			url:BASE_CONFIG.siteUrl+'/User/login',
			dataType: 'JSON',
			method:'GET',
			data: {
				noncestr: Date.now(),
				wallet:wallet,
			},
			success: (res) => {
				console.log('request success', res)
				uni.showToast({
					title: '请求成功',
					icon: 'success',
					mask: true,
					duration: duration
				});
				this.res = '请求结果 : ' + JSON.stringify(res);
			},
			fail: (err) => {
				console.log('request fail', err);
				uni.showModal({
					content: err.errMsg,
					showCancel: false
				});
			},
			complete: () => {
				this.loading = false;
			}
		});
	}

var web3tools = {
	wallet:'',
	//连接网络
	init:function(){
		var eth;
		if (typeof ethereum !== 'undefined') {
			// eth = new Web3Eth(ethereum);
			web3 = new Web3(web3.currentProvider);
			eth =web3.eth;
			console.log("ethereum");
		} else if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
			eth =web3.eth;
			console.log("web3");
		} else {
			// eth = new Web3Eth(ethereum);
			var provider = new Web3.providers.HttpProvider(BASE_CONFIG.netWork);
			web3 = new Web3(provider);
			eth =web3.eth;
			console.log("Unable to locate a compatible web3 browser!");
		}
		//选择网络
		if (typeof eth !== 'undefined') {
			console.log('调起钱包');
			let params=BASE_CONFIG.netparams;
			window.ethereum.request({ method: 'wallet_addEthereumChain', params })
			                    .then(res=>{
											var version = web3.version;
											console.log(version);
									web3.eth.getAccounts(function(error, result) {
										if (!error) {
											console.log(result);
										} else {
											console.log('获取钱包失败');
										}
									});
								})
			                    .catch((error) => console.log("Error", error.message));
		}else{
			console.log('钱包连接失败');
		}
	},
	//连接网络
	init2:function(){
		console.log("判断是不是有eth对象");
		console.log(Window.ethereum);
		if (ethereum) {
			// 新版需要请求用户授权
			let params=BASE_CONFIG.netparams;
			window.ethereum.request({ method: 'wallet_addEthereumChain', params })
			                    .then(() => console.log('Success'))
			                    .catch((error) => console.log("Error", error.message));
		    console.log('etherenum');
		} else if (Window.web3){
			console.log('web3');
			let provider = web3.currentProvider;
		} else {
			console.log('手动');
			// let provider = new Web3.providers.HttpProvider(BASE_CONFIG.netWork);
			web3 = new Web3(Web3.givenProvider || BASE_CONFIG.netWork);
			ethereum=web3.eth;
			console.log("连接到BSC");
		}
		this.getaccount();
	},
	
	//用户通过接口注册/登录
	login:function(){
		
	},
	//获取钱包地址
	getaccount:async function(){
		return new Promise((resolve, reject) => {
			const _timer = setInterval(() => {
				web3.eth.getAccounts(function(error, result) {
					if (!error) {
						clearInterval(_timer);
						this.wallet = result[0];
						console.log(result);
						//保存到本地
						uni.setStorageSync("wallet",this.wallet)
						console.log(this.wallet);
						login(this.wallet);
					} else {
						console.log('暂未获取到钱包地址');
					}
				});
			}, 3000);
		})
	}
	
}

export default{
	init,
	web3tools
}