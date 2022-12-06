<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('zichan.myzh')" urlline="index"></topnav>
			<view class="line"></view>
			<view class="my_money">{{$t('zichan.myzc')}}：{{looye}} LOO</view>
			<!-- <view class="zc_btn">
				<view class="btn_bg" @click="showcz=true">充值</view>
				<view class="btn_bg" @click="showtx=true">提现</view>
			</view> -->
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn" :class="showtype ==1?'active':''" @click="showtype=1">
						{{$t('zichan.chongzhi')}}
					</view>
					<view class="nav_btn" :class="showtype ==2?'active':''" @click="goCenter">{{$t('zichan.tixian')}}
					</view>
					<view class="nav_btn" @click="toPage('mingxi')">{{$t('zichan.asset')}}</view>
				</view>
			</view>

			<!-- 充值 -->
			<view class="exchange_box cz_bg" v-if="showtype ==1">
				<view class="zhan" style="height: 1px;"></view>
				<view class="box_top">
					<!-- <view class="top_img">
						<image src="../../static/h/qb/top_sj.png" mode=""></image>
					</view> -->
					<view class="top_name">{{$t('zichan.chongzhi')}}</view>
				</view>
				<view class="sj_input">
					<u--input :placeholder="$t('zichan.cznum')" border="none" style="padding: 14rpx 20rpx;"
						color="#ffffff" @input="exchangcznum" type="number" v-model="cznum">
						<view class="suf" slot="suffix">
							<view class="ge">LOO</view>
							<!-- <view class="line"></view> -->
							<!-- <view class="all" @click="allbtn()">全部</view> -->
						</view>
					</u--input>
				</view>
				<!-- <view class="huan"></view> -->
				<!-- <view class="profit_box">
					<u--input border="none"  placeholder="预计收益" style="padding: 14rpx 20rpx;" fontSize="32rpx" color="#ffffff" v-model="tddnum" disabled disabledColor="rgba(255, 255, 255, 0)">
						<view class="box_right" slot="suffix">LOO</view>
					</u--input>
				</view> -->
				<view class="btn" @click="recharge">{{$t('zichan.chongzhi')}}</view>
				<!-- <view class="">
					{{test}}
				</view> -->
				<!-- view class="btn" @click="showPay=true;payNum=cznum">{{$t('zichan.chongzhi')}}</view> -->
				<!-- <view class="tips">提现收取5%手续费</view> -->
			</view>

			<!-- 提现 -->
			<view class="exchange_box" v-if="showtype ==2">
				<view class="zhan" style="height: 1px;"></view>
				<view class="box_top">
					<!-- <view class="top_img">
						<image src="../../static/h/qb/top_sj.png" mode=""></image>
					</view> -->
					<view class="top_name">{{$t('zichan.tixian')}}</view>
				</view>
				<view class="sj_input">
					<u--input :placeholder="$t('zichan.txnum')" border="none" style="padding: 14rpx 20rpx;"
						color="#ffffff" @input="exchangtxnum" type="number" v-model="txnum">
						<view class="suf" slot="suffix">
							<view class="ge">LOO</view>
							<view class="line"></view>
							<view class="all" @click="allbtn()">{{$t('zichan.all')}}</view>
						</view>
					</u--input>
				</view>
				<view class="huan"></view>
				<view class="profit_box">
					<!-- <view class="box_left">{{tddnum}}</view>
					<view class="box_right">代币</view> -->
					<u--input border="none" :placeholder="$t('zichan.income')" style="padding: 14rpx 20rpx;"
						fontSize="32rpx" color="#ffffff" v-model="yuji" disabled disabledColor="rgba(255, 255, 255, 0)">
						<view class="box_right" slot="suffix">LOO</view>
					</u--input>
				</view>
				<view class="profit_box">
					<u--input border="none" placeholder="" style="padding: 14rpx 20rpx;" fontSize="32rpx"
						color="#ffffff" v-model="this.wallet" disabled disabledColor="rgba(255, 255, 255, 0)">
						<view class="box_right" slot="suffix">{{$t('zichan.address')}}</view>
					</u--input>
				</view>
				<view class="btn" @click="tixian()" v-if="this.txnum<=this.looye">{{$t('zichan.tixian')}}</view>
				<view class="btn" @click="tishi()" v-if="this.txnum>this.looye">{{$t('zichan.tixian')}}</view>
				<view class="tips">{{$t('zichan.sxfee')}} {{txfee}}% {{$t('zichan.sxf')}}</view>
			</view>

		</view>

		<!-- <u-popup :show="showPay" mode="bottom" @close="showPay=false" bgColor="transparent">
			<view class="showPay">
				<view class="showPay_title">
					<view class="showPay_jy">交易详情</view>
					<view class="showPay_close" @click="showPay=false"></view>
				</view>
				<view class="showPay_line"></view>
				<view class="showPay_num">{{payNum}} LOO</view>
				<view class="showPay_info">
					<view class="showpay_mame">付款地址</view>
					<view class="showpay_address">{{wallet}}</view>
				</view>
				<view class="showPay_line1"></view>
				<view class="showPay_info">
					<view class="showpay_mame">收款地址</view>
					<view class="showpay_address">{{payaddress}}</view>
				</view>
				<view class="showPay_line1"></view>
				<view class="showPay_info">
					<view class="showpay_mame">矿工费</view>
					<view class="showpay_address">($0.01~$1)之间</view>
				</view>
				<view class="showPay_line1"></view>
				<view class="showpay_btn" @click="showPay=false;showPassword=true">确认支付</view>
			</view>
		</u-popup>

		<u-popup :show="showPassword" mode="center" bgColor="transparent">
			<view class="showPassword">
				<view class="showPassword_title">输入密码</view>
				<u--input placeholder="请输入钱包密码" border="surround" v-model="payPassword" type="password"
					class="password_input"></u--input>
				<view class="password_btn">
					<view style="border-right: 1rpx solid rgba(220, 220, 220,0.5);color: #0096FF;"
						@click="showPassword=false;payPassword=''">取消</view>
					<view style="color: #FF0000;" @click="checkPassword()">确认</view>
				</view>
			</view>
		</u-popup> -->

	</view>
</template>

<script>
	import Wallet from '@/common/wallet.js'
	import abi_B_Loo from '@/abi/abi_B-LOO.json'
	import Web3 from 'web3'
	import {
		gwUrl
	} from "@/common/base.js"
	import topnav from '@/components/topnav/topnav.vue';
	export default {
		components: {
			topnav
		},
		data() {
			return {
				showPay: false,
				showPassword: false,
				payNum: 0,
				wallet: uni.getStorageSync('wallet'),
				payaddress: '',
				payPassword: '',
				contract: null,
				mmbg: '',
				cardbg: '',
				urlbg: '../../static/h/cards/cards_bg.png',
				hclist: [],
				tddnum: '',
				txnum: '', //提现数量
				cznum: '', //充值数量
				showtype: 1,
				looye: 0,
				txfee: 0,
				yuji: '', //提现预计到账
				wallet: '',
				walletname: '',

				//加载更多
				pageSize: 12,
				nowpage: 1,
				maxpage: 1,
				status: 'loading',
				lowerThreshold: 50,
				loadingText: this.$t('all.loadingText'),
				loadmoreText: this.$t('all.loadmoreText'),
				loadmoreText1: this.$t('all.loadmoreText1'),
				nomoreText: this.$t('all.nomoreText'),
				scrollable: false,
				height: 500,
				tronLooAddress: 'TA2EfXw8KV6zpdxqWkzUH2xBF8qgfyyLoZ',
				bnLooAddress: '0xfDB0fE3dD8F7e9A671f63b7e7db0935A955659ab',
				test: '',
				//链  tron bsc
				blockchain: '',
			}
		},
		filters: {
			ellipsis(value) {
				if (!value) return '';
				if (value.length > 10) {
					return value.slice(0, 10) + '...'
				}
				return value
			}
		},
		onLoad() {
			this.cardbg = 'background: url(' + this.urlbg + ');background-size:  150rpx 235rpx;';
			this.mmbg = 'background: url(' + this.urlbg + ');background-size:  100rpx 156rpx;';
			try {
				this.wallet = uni.getStorageSync('wallet')
			} catch (e) {
				//TODO handle the exception
			}
			// this.pageinit();
			this.sysinit();
			this.yminit();
			const href = `http://w.${gwUrl}/#/pages/recharge/recharge?wallet=${wallet}&userId=${userId}&token=${token}`
			console.log("goCenter", href);
		},
		methods: {
			//获取系统参数
			async sysinit() {
				var that = this;
				uni.showLoading({
					title: that.$t("tips.wait"),
				})
				let url = "/Init"
				let data = {}
				await that.Utils.tools.luch_get(url, data).then(res => {
					that.blockchain = res.blockchain
					// 实例化合约
					// 初始化合约对象
					let contractAddress = that.tronLooAddress
					let config = {
						scene: res.blockchain == 'tron' ? 'tron' : 'web3',
					}
					if (res.blockchain == 'bsc') {
						contractAddress = that.bnLooAddress
						console.log("Web3.givenProvider: ", Web3.givenProvider);
						let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
						// let web3 = new Web3('https://bscrpc.com');
						config.methods = new web3.eth.Contract(abi_B_Loo, contractAddress).methods
					}
					this.contract = new Wallet(contractAddress, (Type) => {
						uni.hideLoading();
						console.log("Wallet Type: ", Type);
					}, config)
					console.log('/Init', res)
					//获取系统信息
					uni.setStorageSync("sysinfo", res);
					//收付款账号
					uni.setStorageSync("incomeaddress", res.incomeaddress);
					uni.setStorageSync("incomeaddress_bsc", res.incomeaddress_bsc);
					uni.setStorageSync("income_hire", res.income_hire);
					uni.setStorageSync("income_trade", res.income_trade);
					uni.setStorageSync("pay_trade", res.pay_trade);
					//合约地址
					uni.setStorageSync("contractaddress_721", res.contractaddress_721);
					uni.setStorageSync("contractaddress_20", res.contractaddress_20);
					uni.setStorageSync("contractaddress_usdt", res.contractaddress_usdt);
					//一些常量
					uni.setStorageSync("symbol", res.symbol);
					that.mindefije = res.mindefije;
					that.payaddress = res.blockchain == 'tron' ? res.incomeaddress : res.incomeaddress_bsc
					// that.Utils.tools.luch_post('/Wallet/getprivate ').then(item => {
					// 	that.init20(res.contractaddress_20, item.privetkey)
					// })
				}).then(async () => {
					//RPC通讯得到钱包
					console.log('RPC通讯')
					// await that.initweb3()
				}).then(async () => {
					console.log('获取当前钱包')
					// await that.getMetaMask();
					// await that.linkWallet();
				}).catch((err) => {
					console.log(err)
				});
				// that.pageinit();
				// that.looye();
				console.log('初始化用户信息')

			},
			recharge() {
				// this.contract.balanceOf(uni.getStorageSync('wallet')).call().then(res => {
				// 	console.log(res.toNumber())
				// })
				this.contract.getBalance(uni.getStorageSync('wallet')).then(res => {
					if (Number(this.cznum) > res) {
						uni.showToast({
							title: this.$t('yebz'),
							icon: 'error'
						})
						return
					} else if (this.cznum <= 0) {
						uni.showToast({
							title: this.$t('bwl'),
							icon: 'error'
						})
						return
					}
					var that = this
					// console.log("send.payaddress: ",this.payaddress,'cznum:',this.cznum,'wallet:',uni.getStorageSync('wallet'));
					console.log(this.payaddress, '<====this.payaddress');
					this.contract.send(this.payaddress, this.cznum, {
						from: uni.getStorageSync('wallet')
					}).then(res => {
						console.log("transfer:success ", res);
						let url = "/Qianbao/czloodo"
						let data = {
							transactionHash: res,
							fromacc: uni.getStorageSync('wallet'),
							toacc: this.payaddress,
							paymoney: this.cznum,
							blockchain: this.blockchain,
							// foracc: that.foracc,
							// userId: uni.getStorageSync('userId'),
						}
						that.Utils.tools.luch_get(url, data).then(res => {
							if (res.status == 1) {
								uni.showToast({
									title: this.$t('czcg')
								})
							} else {
								uni.showToast({
									title: this.$t('czsb'),
									icon: 'error'
								})
							}
							that.yminit()
							// uni.navigateTo({
							// 	url: 'pages/mingxi/mingxi'
							// })
						})
					}).catch(error => {
						console.log("transfer.error: ", error);
					})


				}).catch(err => {
					console.log("getBalance.err: ", err);
				})




			},
			// 跳转到个人中心
			goCenter() {
				const wallet = uni.getStorageSync('wallet')
				const userId = uni.getStorageSync('userId')
				const token = uni.getStorageSync('token')
				const href = `http://w.${gwUrl}/#/pages/recharge/recharge?wallet=${wallet}&userId=${userId}&token=${token}`
				window.location.href = href
				console.log("goCenter", href);
			},
			// 提示
			tishi() {
				this.Utils.tools.showmsg(this.$t("tips.sorry"));
			},
			yminit() {
				var that = this;
				var url = "/Qianbao/zcinfo";
				var data = {
					lang: this.$i18n.locale,
				}
				var fnSuc = function(res) {
					console.log(res.data)
					that.looye = res.data.loo;
					that.txfee = res.data.txfee;
				}
				that.Utils.tools.post(url, data, that, fnSuc);
			},
			// 提现
			tixian() {

				var that = this;
				if (this.txnum < 500) {
					uni.showToast({
						title: that.$t("tips.txmin"),
						duration: 2000,
						icon: 'none',
					});
					return false;
				}
				var url = "/Qianbao/txloodo";
				var data = {
					lang: this.$i18n.locale,
					txnum: that.txnum
				}
				var fnSuc = function(res) {
					console.log(res.data)
					if (res.data.status == 1) {
						that.Utils.tools.showmsg(that.$t("tips.txyes"));
					} else if (res.data.status == -1) {
						that.Utils.tools.showmsg(that.$t("tips.txno"));
					}
				}
				that.Utils.tools.post(url, data, that, fnSuc);
				setTimeout(function() {
					that.yminit();
					that.txnum = '';
					that.yuji = '';
				}, 2000)
			},
			//校验密码
			checkPassword() {
				let url = '/Wallet/checkpwd'
				this.Utils.tools.luch_post(url, {
					password: this.payPassword
				}).then(res => {
					if (res.status == 1) {
						this.chongzhi();
					} else {
						this.Utils.tools.showmsg('密码输入错误')
					}
				})
				// 
			},
			// 充值
			async chongzhi() {
				var that = this;
				uni.showLoading({
					title: that.$t("tips.querying")
				})
				let to = uni.getStorageSync("incomeaddress");
				if (this.cznum == 0) {
					uni.showToast({
						title: that.$t("tips.enterb"),
						duration: 2000,
						icon: 'none',
					});
					return false;
				}
				if (this.cznum == '') {
					uni.showToast({
						title: that.$t("tips.entera"),
						duration: 2000,
						icon: 'none',
					});
					return false;
				}
				let prices = this.cznum;
				// let prices=parseFloat(this.price);
				let wallet = uni.getStorageSync("wallet");
				let ye = 0;
				console.log('c20=>', that.c20)
				that.c20.methods.balanceOf(wallet).call().then(res => {
					ye = web3.utils.hexToNumberString(res._hex) / 1000000;
					console.log("余额" + ye);
					if (prices * 1 > ye * 1) {
						that.Utils.tools.showmsg(that.$t("tips.sorry"));
						return false;
					}

					uni.hideLoading();
					uni.showLoading({
						title: that.$t("tips.paid")
					})
					let amount = that.Utils.tools.toanywei(prices + '', 6);
					that.c20.methods.transfer(to, amount).send({
						from: this.wallet,
						gas: 210000
					}).then(async (transactionHash) => {
						// if(!error) {
						uni.hideLoading();
						uni.showLoading({
							title: that.$t("tips.waiting")
						})
						let url = "/Qianbao/czloodo"
						let data = {
							transactionHash: transactionHash,
							fromacc: wallet,
							toacc: to,
							foracc: that.foracc,
							paymoney: that.cznum,
							userId: that.userId,
						}
						that.Utils.tools.luch_get(url, data)
					}).then(async (res) => {

						setTimeout(async () => {
							await that.Utils.tools.taskpost("/Task497", {})
						}, 2000)
					}).then(async res => {

						//执行购买结果查询
						setTimeout(async () => {
							await that.Utils.tools.taskpost("/Task497", {})
						}, 2000)
						uni.hideLoading();
						that.Utils.tools.showmsg(that.$t("tips.cztip"));
						setTimeout(function() {
							that.yminit();
							that.cznum = '';
							that.showPassword = false
							that.payPassword = ''
						}, 2000)
					}).catch(err => {
						console.log(err);
						uni.hideLoading();
						uni.showLoading({
							title: that.$t("tips.block")
						})
						uni.hideLoading();
					})
				}).catch(err => {
					uni.showToast({
						title: that.$t("tips.error"),
					})
					console.log(err);
					uni.hideLoading();
					return false;
				});


			},
			//获取用户输入提现数值
			exchangtxnum: function(event) {
				let sjprice = uni.getStorageSync('sjprice');
				this.tddnum = event * sjprice;
				this.txnum = event;
				this.yuji = event * (100 - this.txfee) * 0.01;
				this.yuji = this.yuji.toFixed(3);
			},
			//获取用户输入充值数值
			exchangcznum: function(event) {
				this.cznum = event;
			},
			// 全部按钮
			allbtn() {
				this.txnum = this.looye;
			},
			//页面初始化
			pageinit() {
				var that = this;
				if (this.nowpage == 1) {
					that.hclist = [];
				}
				var url = "/Gold/nftlist";
				var data = {
					nowpage: this.nowpage,
					pageSize: this.pageSize,
					lang: this.$i18n.locale,
				}
				var fnSuc = function(res) {
					// console.log(res.data)
					// console.log(res.data.data[0].cardlist[0].bg)
					that.hclist = that.hclist.concat(res.data.data);
					if (res.data.last_page <= that.nowpage) {
						that.status = 'nomore'
					} else {
						that.status = 'loadmore'
					}
					that.maxpage = res.data.last_page
				}
				that.Utils.tools.post(url, data, that, fnSuc);

			},

			//拉到底部
			dddd() {
				if (this.nowpage >= this.maxpage) {
					return false;
				}
				this.nowpage++;
				console.log('加载更多');
				this.pageinit();
			},
			// 点击加载
			loadmore() {
				console.log('loadmore');
				// uni.$u.toast('加载更多')
				if (this.nowpage >= this.maxpage) {
					return false;
				}
				this.nowpage++;
				this.pageinit();
			},
			//跳转页面
			toPage(pagekey) {
				uni.setStorageSync('path', pagekey)
				var that = this;
				uni.redirectTo({
					url: '../' + pagekey + '/' + pagekey,
				})
			},
		},
	}
</script>

<style lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background: #191716;
		overflow: auto;
	}

	.app_bg {
		width: 750rpx;
		height: 800rpx;
		background: url(../../static/h/mgshop/pages_bg.png) no-repeat;
		background-size: 750rpx 800rpx;
	}

	.line {
		width: 750rpx;
		height: 2rpx;
		background: #F7D38B;
		margin: 20rpx 0 36rpx;
	}

	.my_money {
		margin: 36rpx auto 0;
		width: 620rpx;
		height: 126rpx;
		background: url(../../static/h/packs/allatk_bg.png) no-repeat;
		background-size: 620rpx 126rpx;
		font-size: 32rpx;
		color: #F3A508;
		text-align: center;
		line-height: 146rpx;
	}

	// 导航栏
	.nav_bg {
		width: 750rpx;
		height: 88rpx;
		background: url(../../static/h/boss/nav_bg.png) no-repeat;
		background-size: 750rpx 88rpx;
		margin: 70rpx 0 34rpx;
	}

	.nav_bg .nav_box {
		display: flex;
		justify-content: center;
	}

	.nav_bg .nav_box .nav_btn {
		width: 33%;
		font-size: 32rpx;
		font-weight: 400;
		color: #F7D38B;
		text-align: center;
		line-height: 88rpx;
	}

	.nav_bg .nav_box .nav_btn.active {
		width: 250rpx;
		height: 84rpx;
		background: url(../../static/h/boss/active_bg.png) no-repeat;
		background-size: 250rpx 84rpx;
	}

	.zc_btn {
		width: 60%;
		margin: 60rpx auto 0;
		display: flex;
		justify-content: space-between;
	}

	.zc_btn .btn_bg {
		width: 200rpx;
		height: 70rpx;
		background: url(../../static/h/boss/buymp_btn.png) no-repeat;
		background-size: 200rpx 70rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 70rpx;
		font-weight: bold;
		color: #F7D38B;
	}


	// 提现
	.tx_popup {
		margin: auto 0;
	}

	.exchange_box {
		margin: 60rpx auto 0;
		width: 686rpx;
		height: 804rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 40rpx;
	}

	.box_top {
		width: 90%;
		margin: 30rpx auto 0;
		display: flex;
		justify-content: center;
	}

	.box_top .space {
		width: 54rpx;
		height: 54rpx;
	}

	.box_top .close_img {
		width: 54rpx;
		height: 54rpx;
		background: url(../../static/h/boss/close_img.png) no-repeat;
		background-size: 54rpx 54rpx;
	}

	.box_top .top_img {
		width: 61rpx;
		height: 88rpx;
	}

	.box_top .top_img image {
		width: 61rpx;
		height: 88rpx;
	}

	.box_top .top_name {
		margin-left: 12rpx;
		line-height: 80rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #F7D38B;
	}

	.sj_input {
		margin: 24rpx auto;
		width: 600rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 8rpx;
	}

	.sj_input .suf {
		display: flex;
		justify-content: flex-start;
	}

	.sj_input .suf .ge {
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.sj_input .suf .line {
		margin: 4rpx 10rpx 0;
		width: 2rpx;
		height: 32rpx;
		background: rgba(255, 255, 255, .5);
	}

	.sj_input .suf .all {
		font-size: 28rpx;
		font-weight: 500;
		color: #F7D38B;
	}

	.huan {
		margin: 0 auto;
		width: 52rpx;
		height: 130rpx;
		background: url(../../static/h/qb/huan.png) no-repeat;
		background-size: 52rpx 130rpx;
	}

	.profit_box {
		display: flex;
		justify-content: space-between;
		margin: 24rpx auto;
		width: 600rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 8rpx;
	}

	.profit_box .box_left {
		margin-left: 20rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.6);
		line-height: 80rpx;
	}

	.profit_box .box_right {
		// margin-right: 20rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
	}

	.btn {
		margin: 60rpx auto;
		width: 202rpx;
		height: 71rpx;
		background: url(../../static/h/index/okbtn_bg.png) no-repeat;
		background-size: 202rpx 71rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		line-height: 71rpx;
	}

	.tips {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.6);
		text-align: center;
	}

	// 充值
	.cz_bg {
		margin: 60rpx auto 0;
		width: 686rpx;
		height: 404rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 40rpx;
	}

	/*支付确认框*/
	.showPay {
		position: relative;
		width: 750rpx;
		height: 800rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
	}

	.showPay_title {
		position: relative;
		width: 750rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
	}

	.showPay_jy {
		width: 750rpx;
		font-size: 32rpx;
		text-align: center;
	}

	.showPay_close {
		position: absolute;
		right: 20rpx;
		width: 30rpx;
		height: 30rpx;
		background: url(@/static/img/close.png);
		background-size: cover;
	}

	.showPay_line {
		width: 750rpx;
		height: 2rpx;
		background: rgba(220, 220, 220, 0.5);
	}

	.showPay_line1 {
		width: 686rpx;
		height: 2rpx;
		background: rgba(220, 220, 220, 0.5);
		margin-left: 32rpx;
	}

	.showPay_num {
		width: 750rpx;
		font-size: 36rpx;
		text-align: center;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.showPay_info {
		width: 750rpx;
		height: 100rpx;
		display: flex;
		align-items: flex-start;
		margin-top: 20rpx;
	}

	.showpay_mame {
		width: 30%;
		font-size: 28rpx;
		color: #a9a9a9;
		text-align: center;
	}

	.showpay_address {
		width: 60%;
		font-size: 30rpx;
		word-break: break-all;
	}

	.showpay_btn {
		position: absolute;
		bottom: 40rpx;
		width: 686rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: #0096FF;
		border-radius: 16rpx;
		margin-left: 32rpx;
	}

	/*密码输入*/
	.showPassword {
		width: 600rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	}

	.showPassword_title {
		width: 100%;
		font-size: 26rpx;
		text-align: center;
		margin: 20rpx 0;
	}

	.password_input {
		width: 504rpx;
		height: 38rpx;
		margin-left: 30rpx;
	}

	.password_btn {
		width: 100%;
		/* height: 100rpx; */
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.password_btn view {
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 24rpx;
		text-align: center;
		border-top: 1rpx solid rgba(220, 220, 220, 0.5);
	}
</style>
