<template>
	<view class="app">
		<view class="app_bg">
			<view class="zhan" style="height: 10rpx;"></view>
			<!-- 顶部 -->
			<view class="top_box">
				<view class="sz_img" @click="showset=true">
					<image src="../../static/h/index/sz_img.png" mode=""></image>
				</view>
			</view>
			<!-- 宝箱-邀请 -->
			<view class="two_box">
				<!-- 宝箱 -->
				<view class="bx_box">
					<view class="bx_left">
						<!-- <view class="zhan" style="height: 30rpx;"></view> -->
						<view class="bx_content" @click.stop="optbox(1)">
							<view class="sx_img">
								<view class="boxnum_bg">
									<view class="box_num">X{{sxbbox}}</view>
								</view>
							</view>
							<view class="type_btn">
								<view :class="boxtype ==1?'xz_name':'no_name'">{{$t('index.sx')}}<br>{{$t('index.box')}}
								</view>
							</view>
						</view>
						<view class="xz_content">
							<view style="height: 40rpx;"></view>
							<view class="xz_img">
								<view class="boxnum_bg">
									<view class="box_num">X{{xzbbox}}</view>
								</view>
							</view>
							<view class="type_btn" @click="optbox(2)">
								<view :class="boxtype ==2?'xz_name':'no_name'">{{$t('index.xz')}}<br>{{$t('index.box')}}
								</view>
							</view>
						</view>
					</view>
					<view class="bx_right"></view>
				</view>
				<!-- 邀请 -->
				<view class="">
					<view class="award_box" @click="toPage('extend')">
						<view class="award_name">{{$t('index.invite')}}</view>
					</view>
					<view class="award_box" @click="toPage('zichan')">
						<view class="award_name">{{$t('index.account')}}</view>
					</view>
					<view class="award_box" @click="opneruel()">
						<view class="award_name">{{$t('index.game')}}</view>
					</view>
				</view>
			</view>
			<!-- 开启宝箱 -->
			<view class="openbox_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="open_sx" v-if="boxtype==1">
					<image src="../../static/h/index/open_sx.png" mode=""></image>
				</view>
				<view class="open_sx" v-if="boxtype==2">
					<image src="../../static/h/index/xz_box.png" mode=""></image>
				</view>
				<!-- PV导航栏 -->
				<view class="pv_box">
					<view class="pve_box" @click="toPage('bosslevel')">
						<view class="pv_img">
							<image src="../../static/h/index/pve_img.png" mode=""></image>
						</view>
						<view class="pv_name">PVE</view>
					</view>
					<view class="pvp_box" @click="toPage('pk')">
						<view class="pv_img">
							<image src="../../static/h/index/pvp_img.png" mode=""></image>
						</view>
						<view class="pv_name">PVP</view>
					</view>
				</view>
				<view class="openbtn_box">
					<!-- <view class="btn_box" @click="openmhsx()" v-if="boxtype==1">{{$t('index.open')}}</view> -->
					<view class="btn_box" @click="showdefine=true" v-if="boxtype==1&&sxbbox>0">{{$t('index.open')}}
					</view>
					<!-- <view class="btn_box" @click="openmhxz()" v-if="boxtype==2">{{$t('index.open')}}</view> -->
					<view class="btn_box" @click="showdefine=true" v-if="boxtype==2&&xzbbox>0">{{$t('index.open')}}
					</view>
					<view class="btn_box" @click="tips()" v-if="boxtype==1&&sxbbox==0">{{$t('index.open')}}</view>
					<view class="btn_box" @click="tips()" v-if="boxtype==2&&xzbbox==0">{{$t('index.open')}}</view>
					<!-- <view class="btn_box" @click="showopenten=true">开启十次</view> -->
				</view>
			</view>
			<!-- 底部导航栏 -->
			<view class="bottom_nav">
				<view class="nav_box">
					<view class="nav_info">
						<view class="nav_img" @click="toPage('mgshop')">
							<image src="../../static/h/index/mgshop_img.png" mode=""></image>
						</view>
						<view class="nav_name">{{$t('index.shop')}}</view>
					</view>
					<view class="nav_info">
						<view class="nav_img" @click="toPage('backpack')">
							<image src="../../static/h/index/pack_img.png" mode=""></image>
						</view>
						<view class="nav_name">{{$t('index.pack')}}</view>
					</view>
					<view class="nav_info">
						<view class="nav_img" @click="toPage('sjboss')">
							<image src="../../static/h/index/sjboss_img.png" mode=""></image>
						</view>
						<view class="nav_name">{{$t('index.boss')}}</view>
					</view>
					<view class="nav_info">
						<view class="nav_img" @click="toPage('market')">
							<image src="../../static/h/index/trade_img.png" mode=""></image>
						</view>
						<view class="nav_name">{{$t('index.trading')}}</view>
					</view>
				</view>
			</view>

			<!-- 设置弹出层 -->
			<u-overlay :show="showset" opacity="0.8">
				<view class="set_popup">
					<view class="set_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="set_top">
							<view class="space"></view>
							<view class="set_name">{{$t('index.set')}}</view>
							<view class="close_img" @click="showset=false"></view>
						</view>
						<view class="switch_box">
							<view class="switch_tit">{{$t('index.music')}}</view>
							<view class="switch_open" @click="musictype" v-if="showmusic==true">
								<view class="open_img"></view>
								<view class="open_name">{{$t('index.setopen')}}</view>
							</view>
							<view class="switch_stop" @click="musictype" v-if="showmusic==false">
								<view class="stop_name">{{$t('index.shut')}}</view>
								<view class="stop_img"></view>
							</view>
						</view>
						<view class="lang_box">
							<view class="lang_tit">{{$t('index.lang')}}</view>
							<view class="lang_now" @click="showopts=!showopts">{{nowlang}}</view>
						</view>
						<view class="optlang_box" v-if="showopts">
							<view class="opts" @click="optlang(1)">简体中文</view>
							<view class="opts" @click="optlang(2)">繁体中文</view>
							<view class="opts" @click="optlang(3)">English</view>
						</view>
					</view>
					<view class="okbtn_bg" @click="checkLang">{{$t('index.ok')}}</view>
				</view>
			</u-overlay>
			<!-- 开启一个 -->
			<u-overlay :show="showopenone" opacity="0.8">
				<view class="openone_popup">
					<view class="popup_tips">{{$t('index.ok')}}</view>
					<view class="openone_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="card_content">
							<view class="card_box"
								:style="'background: url(../../static/h/cards_bg/'+imgbg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img"></view>
									<view class="card_name">LOONG</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<!-- <view class="info_box">
									<view class="info_data">
										ss sss ssssss s sssssssssss ssssss ssssssssssss sssssss sss ssss sss
									</view>
								</view> -->
								<view class="atk_box">
									<view class="atk_data">
										ATK:2654551.45
									</view>
								</view>
							</view>
							<view class="card_img">
								<image src="../../static/h/cards/cards.jpg" mode=""></image>
							</view>

						</view>

						<view class="okbtn_bg" @click="showopenone=false">领取奖励</view>
					</view>
				</view>
			</u-overlay>
			<!-- 开启十个 -->
			<u-overlay :show="showopenten" opacity="0.8">
				<view class="openten_popup">
					<view class="content_box">
						<view class="card_content" v-for="(item,i) in czlist">
							<view class="card_box"
								:style="'background: url(../../static/h/cards_bg/'+item.bg+'.png);background-size: 200rpx 314rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="item.isslong==1"></view>
									<view class="card_name" :class="item.cardName=='SAGITTARIUS'?'chang':''"
										v-if="item.cardName!='CAPRICORN'">{{item.cardName}}</view>
									<view class="card_name" :class="item.cardName=='CAPRICORN'?'chang':''"
										v-if="item.cardName=='CAPRICORN'">{{item.cardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<!-- <view class="info_box">
									<view class="info_data">
										ss sss ssssss s sssssssssss ssssss ssssssssssss sssssss sss ssss sss
									</view>
								</view> -->
								<view class="atk_box">
									<view class="atk_data">ATK:{{item.atk}}</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="item.img" mode=""></image>
							</view>

						</view>

					</view>
					<view class="okbtn_bg" @click="showopenten=false">{{$t('index.receive')}}</view>
				</view>
			</u-overlay>
			<!-- 确定开启弹出层 -->
			<u-overlay :show="showdefine" opacity="0.8">
				<view class="define_popup">
					<view class="define_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="define_tit">{{$t('index.qropen')}}</view>
						<view class="popup_btn">
							<view class="no_btn" @click="showdefine=false">{{$t('index.no')}}</view>
							<view class="yes_btn" @click="openmhsx()" v-if="boxtype==1">{{$t('index.yes')}}</view>
							<view class="yes_btn" @click="openmhxz()" v-if="boxtype==2">{{$t('index.yes')}}</view>
						</view>
					</view>
				</view>
			</u-overlay>

			<!-- 过渡效果 -->
			<u-overlay :show="showgd" opacity="0.8">
				<view class="gd_popup">
					<view class="rollbox" :class="{'box_rolling':isRolling}" @click="gb()"
						v-for="(item,i) in [1,1,1,1,1]">
						<view class="zm">
							<view class="cardimg">
								<image src="../../static/h/cards/kaxz.png" mode=""></image>
							</view>
						</view>
						<view class="fm">
							<view class="cardimg">
								<image src="../../static/h/cards/kasx.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</u-overlay>

			<!-- 游戏规则 -->
			<u-overlay :show="showrule" opacity="0.8">
				<view class="rule_popup">
					<view class="rule_bg">
						<view class="popup_top">
							<view class="close_img" @click="showrule=false"></view>
						</view>
						<view class="rule_desc">
							<u-parse :content="showguize"></u-parse>
						</view>

					</view>
				</view>
			</u-overlay>

		</view>
		<view class="mask" v-if='false'>
			<view class="content">
				<view class="title">
					请点击确定跳转个人中心填写邀请码
				</view>
				<view class="btn-group">
					<!-- <view class="cancle" @click='show(false)'>
						取消
					</view> -->
					<view class="confirm" @click='show(true)'>
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/md5.js'
	import {
		gwUrl
	} from "@/common/base.js"
	export default {
		data() {
			return {
				popup: false,
				lang: this.$i18n.locale,
				xzbbox: '',
				sxbbox: '',
				boxtype: 1,
				showset: false,
				showopenone: false,
				czlist: '',
				cardbg: '',
				urlbg: '../../static/h/cards/cards_bg.png',
				showopenten: false,
				tencardbg: '',
				showmusic: false,
				showopts: false,
				nowlang: '简体中文',
				imgbg: 'f_bg',
				showdefine: false,
				showgd: false,
				isRolling: false,

				showrule: false,
				showguize: '',
				lang: 'zhCN',
				currentdate: '',
				waller: uni.getStorageSync('wallet'),
				key: 'EeuVwUuv',
				md5mm: '',

				innerAudioContext: '',
			}
		},
		onShow() {
			this.pageinit();
		},
		onLoad(options) {

			this.bjsong();

			try {
				// uni.removeStorageSync('userId')
				// uni.removeStorageSync('token')
				// uni.removeStorageSync('wallet')
			} catch (error) {
				console.log(error)
			}

			if (options.wallet) {
				uni.setStorageSync('wallet', options.wallet)
			}
			if (options.userId) {
				uni.setStorageSync('userId', options.userId)
			}
			if (options.token) {
				uni.setStorageSync('token', options.token)
			}

			var that = this;
			if (options.pid) {
				uni.setStorageSync("pid", options.pid);
			}
			// if (options.token) {
			//   this.nowday(options.token, options.wallet);
			// }

			// 打包打开
			// if (!uni.getStorageSync('wallet') || !uni.getStorageSync('userId') || !uni.getStorageSync('token')) {
			// 	window.location.href = "http://w.dragonloo.com"
			// }



			// if (options.wallet) {
			// 	uni.setStorageSync('wallet', options.wallet)
			// }

			// if (options.token) {
			// 	this.nowday(options.token, options.wallet);
			// } else  if(!options.token && !uni.getStorageSync('token')){
			// 	window.location.href = "http://gw.dragonloo.com"
			// }
		},
		mounted() {
			this.cardbg = 'background: url(' + this.urlbg + ');background-size: 300rpx 470rpx;';
			// this.tencardbg='background: url('+this.urlbg+');background-size: 150rpx 235rpx;';
			this.sysinit();
			this.pageinit();
			this.getrule();
			// this.gb()
		},
		methods: {
			checkLang() {
				this.$i18n.locale = this.lang
				this.showset = false
			},
			show(type) {
				if (type) {
					window.location.href = 'http://w.' + gwUrl + '/#/pages/member/member'
				}
			},
			opneruel() {
				this.getrule();
				this.showrule = true;
			},
			// 获取游戏规则
			getrule() {
				var that = this;
				let url = "/Arc/getinfo";
				let data = {
					id: 16,
					lang: this.$i18n.locale
				};
				this.Utils.tools.luch_get(url, data).then(res => {
					// console.log(res)
					that.showguize = res;
				});
			},
			nowday(token, wallet) {
				var date = new Date();
				var seperator1 = "-";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
				let md5mm = md5(wallet + currentdate + "EeuVwUuv");
				uni.setStorageSync('token', token)
				if (md5mm != token) {
					console.log("http://gw." + gwUrl);
					window.location.href = "http://gw." + gwUrl;
				}
			},
			gb() {
				var that = this
				this.isRolling = !this.isRolling
				setTimeout(function() {
					that.isRolling = false
				}, 1000)
				setTimeout(function() {
					that.isRolling = true
				}, 2000)
				setTimeout(function() {
					that.isRolling = false
				}, 3000)
				setTimeout(function() {
					that.isRolling = true
				}, 4000)
				setTimeout(function() {
					that.isRolling = false
				}, 5000)
				setTimeout(function() {
					that.isRolling = true
				}, 6000)
				setTimeout(function() {
					that.isRolling = false;
					that.showgd = false;
					that.showopenten = true;
				}, 7000)
			},
			tips() {
				uni.showToast({
					title: '没有宝箱，请先购买',
					duration: 2000,
					icon: 'none'
				});
			},
			bjsong() {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.src = '../../static/h/song/bg_song.mp3'
				this.innerAudioContext.autoplay = true;
				// this.innerAudioContext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';

				this.innerAudioContext.loop = true;
				this.innerAudioContext.play()
				this.innerAudioContext.onError(() => {
					console.log('播放错误')
				})
			},
			//获取系统参数
			async sysinit() {
				var that = this;
				uni.showLoading({
					title: that.$t("tips.wait"),
				})
				let url = "/Init"
				let data = {}
				await that.Utils.tools.luch_get(url, data).then(res => {
					console.log(res)
					//获取系统信息
					uni.setStorageSync("sysinfo", res);
					//收付款账号
					uni.setStorageSync("incomeaddress", res.incomeaddress);
					uni.setStorageSync("income_hire", res.income_hire);
					uni.setStorageSync("income_trade", res.income_trade);
					uni.setStorageSync("pay_trade", res.pay_trade);
					//合约地址
					uni.setStorageSync("contractaddress_721", res.contractaddress_721);
					uni.setStorageSync("contractaddress_20", res.contractaddress_20);
					uni.setStorageSync("contractaddress_usdt", res.contractaddress_usdt);
					//一些常量
					uni.setStorageSync("symbol", res.symbol);
					console.log('系统初始化完成');
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
				console.log('初始化用户信息')
				uni.hideLoading();
			},
			//页面初始化
			pageinit() {
				var that = this;
				//锤炼属性点
				var url = "/pageinit/home";
				let wallet = uni.getStorageSync('wallet')
				let walletname = uni.getStorageSync('walletname')
				this.wallet = wallet;
				this.walletname = walletname;
				var data = {
					lang: this.$i18n.locale,
					wallet: wallet
				};

				function fnSuc(res) {
					// console.log(res.data)
					that.userId = res.data.userId
					that.sxbbox = res.data.sxbbox
					that.xzbbox = res.data.xzbbox
					//用户ID token
					uni.setStorageSync("userId", that.userId);
					uni.setStorageSync("token", res.data.token);

					console.log("页面初始化完成");
					uni.hideLoading();
				}
				that.Utils.tools.post(url, data, that, fnSuc);
				// that.sysinit();
			},

			// 开启盲盒-生肖
			openmhsx() {
				var that = this;
				// this.showOpen=true;
				var url = "/bbox/opensxbbox";
				var data = {
					opennum: 1,
				};

				function fnSuc(res) {
					console.log(res.data)
					that.czlist = res.data.imglist;
					// that.cznum=res.data.cznum;
				}
				that.Utils.tools.post(url, data, that, fnSuc);
				this.showdefine = false;
				// this.showopenten=true;
				this.showgd = true;
				this.gb();
				setTimeout(function() {
					that.pageinit();
				}, 2000)
			},
			// 开启盲盒-星座
			openmhxz() {
				var that = this;
				// this.showOpen=true;
				var url = "/bbox/openxzbbox";
				var data = {
					opennum: 1,
				};

				function fnSuc(res) {
					console.log(res.data)
					that.czlist = res.data.imglist;
					// that.cznum=res.data.cznum;
				}
				that.Utils.tools.post(url, data, that, fnSuc);
				this.showdefine = false;
				// this.showopenten=true;
				this.showgd = true;
				this.gb();
				setTimeout(function() {
					that.pageinit();
				}, 2000)
			},
			// 选择语言
			optlang(e) {
				if (e == 1) {
					this.nowlang = '简体中文';
					this.lang = 'zhCN'
				} else if (e == 2) {
					this.nowlang = '繁體中文';
					this.lang = 'fan'
				} else if (e == 3) {
					this.nowlang = 'English';
					this.lang = 'en'
				}
				this.showopts = false;
			},
			musictype() {
				this.showmusic = !this.showmusic;
				if (this.showmusic == true) {
					// this.innerAudioContext.stop();
					this.innerAudioContext.pause();
				} else {
					this.innerAudioContext.play();
				}
			},
			// 选择宝箱
			optbox(e) {
				this.boxtype = e;
				console.log(e)
			},
			//跳转页面
			toPage(pagekey) {
				uni.setStorageSync('path', pagekey)
				uni.navigateTo({
					url: '../' + pagekey + '/' + pagekey,
				})
				// uni.navigateTo({
				// 	url: '../' + pagekey + '/' + pagekey,
				// })
			},
		},
	}
</script>

<style lang="scss">
	.mask {
		position: fixed;
		z-index: 99999999;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;


		.content {
			width: 654rpx;
			height: 374rpx;


			background: url('@/static/img/bgc.png');
			background-size: cover;

			.title {
				color: #fff;

				text-align: center;
				ont-size: 19rpx;
				font-weight: bold;
				color: #F7D38B;
				margin-top: 100rpx;
			}

			.btn-group {
				margin-top: 100rpx;
				padding: 0 100rpx;
				display: flex;
				justify-content: center;



				.confirm {
					width: 260rpx;
					height: 60rpx;
					color: #F7D38B;
					background: url('@/static/img/confirm.png');
					background-size: cover;
					text-align: center;
					line-height: 60rpx;
				}


			}

		}
	}

	.app {}

	.app_bg {
		width: 100vw;
		height: 100vh;
		background: url(../../static/img/index_bgc.png) no-repeat;
		background-size: 100vw 100vh;
		overflow: auto;
	}

	// 顶部
	.top_box {
		display: flex;
		justify-content: flex-end;
	}

	.top_box .sz_img {
		width: 80rpx;
		height: 80rpx;
		margin: 30rpx 24rpx 0 0;
	}

	.top_box .sz_img image {
		width: 80rpx;
		height: 80rpx;
	}

	// 宝箱-邀请
	.two_box {
		display: flex;
		justify-content: space-between;
		margin-top: 50rpx;
		position: relative;
		z-index: 10;
	}

	// 宝箱
	.two_box .bx_box {
		display: flex;
		justify-content: flex-start;
	}

	.bx_box .bx_left {
		width: 294rpx;
		height: 308rpx;
		background: url(../../static/h/index/bx_left.png) no-repeat;
		background-size: 294rpx 308rpx;
	}

	.bx_left .bx_content {
		display: flex;
		justify-content: flex-start;
		width: 290rpx;
		height: 150rpx;
		// padding: 30rpx 0 60rpx 0;
		background: url(../../static/h/index/bx_left.png) no-repeat;
		background-size: cover;
		z-index: 100;
	}

	.bx_left .bx_content .sx_img {
		margin: 30rpx 0 0 0;
		width: 104rpx;
		height: 92rpx;
		background: url(../../static/h/index/sx_box.png) no-repeat;
		background-size: 104rpx 92rpx;
		position: relative;
	}

	.bx_left .bx_content .xz_img {
		width: 108rpx;
		height: 102rpx;
		background: url(../../static/h/index/xz_box.png) no-repeat;
		background-size: 108rpx 102rpx;
		position: relative;
	}

	.bx_left .bx_content .boxnum_bg {
		position: absolute;
		bottom: 0;
		left: 10rpx;
		width: 94rpx;
		height: 36rpx;
		background: url(../../static/h/index/boxnum_bg.png) no-repeat;
		background-size: 94rpx 36rpx;
		margin: 0 auto;
		font-size: 24rpx;
		line-height: 36rpx;
		text-align: center;
	}

	.bx_left .bx_content .boxnum_bg .box_num {
		color: #FFFFFF;
		font-weight: bold;
		background: linear-gradient(-10deg, #F7CB6B 0%, #FBA980 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.bx_left .bx_content .type_btn {
		// margin-top: 40rpx;
	}

	.bx_left .bx_content .xz_name {
		font-size: 26rpx;
		font-weight: 400;
		color: #FFFFFF;
		background: linear-gradient(-10deg, #F7CB6B 0%, #FBA980 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-align: center;
		margin: 40rpx 0 0 30rpx;
	}

	.bx_left .bx_content .no_name {
		font-size: 26rpx;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		margin: 40rpx 0 0 30rpx;
	}

	.bx_left .xz_content {
		width: 290rpx;
		height: 150rpx;
		display: flex;
		justify-content: flex-start;
		background: url(../../static/h/index/bx_left.png) no-repeat;
		background-size: cover;
		background-position: 0 -150rpx;
		padding-top: 20rpx;
		// z-index: 100;
	}

	.bx_left .xz_content .xz_img {
		// margin: 10rpx 0;
		width: 108rpx;
		height: 102rpx;
		background: url(../../static/h/index/xz_box.png) no-repeat;
		background-size: 108rpx 102rpx;
		position: relative;
	}

	.bx_left .xz_content .boxnum_bg {
		position: absolute;
		bottom: 0;
		left: 10rpx;
		width: 94rpx;
		height: 36rpx;
		background: url(../../static/h/index/boxnum_bg.png) no-repeat;
		background-size: 94rpx 36rpx;
		margin: 0 auto;
		font-size: 24rpx;
		line-height: 36rpx;
		text-align: center;
	}

	.bx_left .xz_content .boxnum_bg .box_num {
		color: #FFFFFF;
		font-weight: bold;
		background: linear-gradient(-10deg, #F7CB6B 0%, #FBA980 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.bx_left .xz_content .type_btn {
		position: relative;
		// width: 130rpx;
		// height: 68rpx;
		z-index: 100;
	}

	.bx_left .xz_content .xz_name {
		font-size: 26rpx;
		font-weight: 400;
		color: #FFFFFF;
		background: linear-gradient(-10deg, #F7CB6B 0%, #FBA980 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-align: center;
		margin: 16rpx 0 0 30rpx;
	}

	.bx_left .xz_content .no_name {
		font-size: 26rpx;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		margin: 16rpx 0 0 30rpx;
	}

	.bx_box .bx_right {
		width: 82rpx;
		height: 308rpx;
		background: url(../../static/h/index/bx_right.png) no-repeat;
		background-size: 82rpx 308rpx;
	}

	// 邀请
	.two_box .award_box {
		margin-top: 10rpx;
		width: 190rpx;
		height: 80rpx;
		background: url(../../static/h/index/btn_bg.png) no-repeat;
		background-size: 308rpx 80rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
		// text-align: center;
		line-height: 76rpx;
		display: flex;
		justify-content: flex-end;
	}

	.award_box .award_name {
		margin-right: 24rpx;

	}

	// 开启宝箱
	.openbox_box {
		margin-top: -110rpx;
		position: relative;
		width: 750rpx;
		height: 650rpx;
		background: url(../../static/h/index/openbox_bg.png) no-repeat;
		background-size: 750rpx 650rpx;
		z-index: 1;
	}

	.open_sx {
		width: 246rpx;
		height: 220rpx;
		margin: 100rpx 0 0 280rpx;
	}

	.open_sx image {
		width: 246rpx;
		height: 220rpx;
	}

	// PV导航栏
	.pv_box {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.pve_box {
		display: flex;
		justify-content: flex-start;
		width: 170rpx;
		height: 80rpx;
		background: url(../../static/h/index/btn_bg.png) no-repeat;
		background-size: 308rpx 80rpx;
		background-position: right bottom;
	}

	.pvp_box {
		display: flex;
		justify-content: flex-end;
		width: 170rpx;
		height: 80rpx;
		background: url(../../static/h/index/btn_bg.png) no-repeat;
		background-size: 308rpx 80rpx;
	}

	.pv_box .pv_img {
		width: 53rpx;
		height: 52rpx;
		margin: auto 4rpx;
	}

	.pv_box .pv_img image {
		width: 53rpx;
		height: 52rpx;
	}

	.pv_box .pv_name {
		font-size: 28rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 80rpx;
		margin: 0 4rpx 0 4rpx;
	}

	.openbtn_box {
		position: absolute;
		bottom: 0;
		left: 270rpx;
		display: flex;
		// justify-content: center;
	}

	.openbtn_box .btn_box {
		margin: 0 10rpx;
		width: 210rpx;
		height: 70rpx;
		background: url(../../static/h/index/openbtn_bg.png) no-repeat;
		background-size: 210rpx 70rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 70rpx;
		text-align: center;
	}

	// 底部导航栏
	.bottom_nav {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 249rpx;
		background: url(../../static/h/index/nav_bg.png) no-repeat;
		background-size: 750rpx 249rpx;
	}

	.bottom_nav .nav_box {
		display: flex;
		justify-content: space-around;
		width: 90%;
		margin: 0 auto;
		margin-top: 70rpx;
	}

	.bottom_nav .nav_info .nav_img {
		width: 122rpx;
		height: 120rpx;
		margin: 0 auto;
	}

	.bottom_nav .nav_info .nav_img image {
		width: 122rpx;
		height: 120rpx;
	}

	.bottom_nav .nav_info .nav_name {
		font-size: 28rpx;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
	}

	// 设置弹出层
	.set_popup {
		margin: auto 0;
	}

	.set_popup .set_bg {
		position: relative;
		width: 654rpx;
		height: 374rpx;
		background: url(../../static/h/index/set_bg.png) no-repeat;
		background-size: 654rpx 374rpx;
		margin: 0 auto;
	}

	.set_popup .set_bg .set_top {
		width: 90%;
		margin: 10rpx auto 0;
		display: flex;
		justify-content: space-between;
	}

	.set_popup .set_bg .set_top .space {
		width: 54rpx;
		height: 54rpx;
	}

	.set_popup .set_bg .set_top .set_name {
		font-size: 32rpx;
		font-weight: bold;
		color: #F7D38B;
	}

	.set_popup .set_bg .set_top .close_img {
		width: 54rpx;
		height: 54rpx;
		background: url(../../static/h/index/close_img.png) no-repeat;
		background-size: 54rpx 54rpx;
	}

	.set_popup .switch_box {
		width: 80%;
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.set_popup .switch_box .switch_tit {
		font-size: 28rpx;
		font-weight: bold;
		color: #F7D38B;
		line-height: 100rpx;
	}

	.set_popup .switch_box .switch_open {
		width: 150rpx;
		height: 64rpx;
		background: url(../../static/h/index/switch_bg.png) no-repeat;
		background-size: 150rpx 64rpx;
		margin: auto 0;
		display: flex;
		justify-content: flex-start;
	}

	.set_popup .switch_box .switch_open .open_img {
		width: 56rpx;
		height: 54rpx;
		background: url(../../static/h/index/switch_open.png) no-repeat;
		background-size: 56rpx 54rpx;
		margin: 6rpx 0 0 0;
	}

	.set_popup .switch_box .switch_open .open_name {
		font-size: 24rpx;
		font-weight: 400;
		color: #F7D38B;
		line-height: 64rpx;
	}

	.set_popup .switch_box .switch_stop {
		width: 150rpx;
		height: 64rpx;
		background: url(../../static/h/index/switch_bg.png) no-repeat;
		background-size: 150rpx 64rpx;
		margin: auto 0;
		display: flex;
		justify-content: flex-end;
	}

	.set_popup .switch_box .switch_stop .stop_img {
		width: 56rpx;
		height: 54rpx;
		background: url(../../static/h/index/switch_stop.png) no-repeat;
		background-size: 56rpx 54rpx;
		margin: 6rpx 0 0 0;
	}

	.set_popup .switch_box .switch_stop .stop_name {
		font-size: 24rpx;
		font-weight: 400;
		color: #F7D38B;
		line-height: 64rpx;
	}

	.set_popup .lang_box {
		width: 80%;
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.set_popup .lang_box .lang_tit {
		font-size: 28rpx;
		font-weight: bold;
		color: #F7D38B;
		line-height: 100rpx;
	}

	.set_popup .lang_box .lang_now {
		width: 150rpx;
		height: 64rpx;
		background: url(../../static/h/index/switch_bg.png) no-repeat;
		background-size: 150rpx 64rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #F7D38B;
		text-align: center;
		line-height: 68rpx;
		margin: auto 0;
	}

	.set_popup .optlang_box {
		width: 144rpx;
		height: 180rpx;
		background-color: rgba(62, 53, 61, 0.8);
		font-size: 24rpx;
		font-weight: 400;
		color: #F7D38B;
		text-align: center;
		line-height: 60rpx;
		position: absolute;
		right: 70rpx;
		bottom: -50rpx;
	}





























	.set_popup .okbtn_bg {
		margin: 48rpx auto 0;
		width: 280rpx;
		height: 66rpx;
		background: url(../../static/h/index/okbtn_bg.png) no-repeat;
		background-size: 280rpx 66rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		line-height: 66rpx;
	}

	// 开启一个
	.openone_popup {
		margin: auto 0;
	}

	.openone_popup .popup_tips {
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
	}

	.openone_popup .openone_bg {
		width: 700rpx;
		height: 815rpx;
		background: url(../../static/h/index/gx_bg.png) no-repeat;
		background-size: 700rpx 815rpx;
		margin: 0 auto;
	}

	.openone_popup .card_content {
		margin: 100rpx auto 0;
		width: 300rpx;
		height: 470rpx;
		position: relative;
		padding: 16rpx 6rpx 16rpx 20rpx;
		// box-shadow: 0px 1px 3rpx 1px rgba(142, 140, 140, 0.16);
		// border: 2rpx solid  rgba(67, 62, 61, 0.2);
	}

	.openone_popup .card_box {
		// margin: 0 6rpx;
		// margin-top: 16rpx;
		width: 300rpx;
		height: 470rpx;
		position: relative;
		z-index: 10;
	}

	.openone_popup .card_box .super_img {
		width: 100rpx;
		height: 32rpx;
		background: url(../../static/h/cards/super.png) no-repeat;
		background-size: 100rpx 32rpx;
		position: absolute;
		top: 30rpx;
	}

	.openone_popup .card_box .card_name {
		position: absolute;
		top: 40rpx;
		left: 100rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #C79A52;
		transform: scale(0.7);
	}

	.openone_popup .card_box .card_dj {
		position: absolute;
		top: 36rpx;
		right: 40rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #ffc847;
	}

	.openone_popup .card_box .info_box {
		width: 189rpx;
		height: 56rpx;
		background: url(../../static/h/cards/info_bg.png) no-repeat;
		background-size: 189rpx 56rpx;
		position: absolute;
		bottom: 44rpx;
		left: 42rpx;
		overflow: auto;
	}

	.openone_popup .card_box .info_box .info_data {
		font-size: 24rpx;
		line-height: 22rpx;
		text-align: center;
		color: #C79A52;
	}

	.openone_popup .card_box .atk_box {
		width: 160rpx;
		height: 30rpx;
		background: url(../../static/h/cards/atk_bg.png) no-repeat;
		background-size: 160rpx 30rpx;
		position: absolute;
		bottom: 0;
		left: 50rpx;
	}

	.openone_popup .card_box .atk_box .atk_data {
		font-size: 24rpx;
		text-align: center;
		color: #C79A52;
		transform: scale(0.6);
	}

	.openone_popup .card_img {
		width: 266rpx;
		height: 280rpx;
		position: absolute;
		top: 70rpx;
		left: 24rpx;
	}

	.openone_popup .card_img image {
		width: 266rpx;
		height: 280rpx;
	}

	.openone_popup .okbtn_bg {
		margin: 48rpx auto 0;
		width: 280rpx;
		height: 66rpx;
		background: url(../../static/h/index/okbtn_bg.png) no-repeat;
		background-size: 280rpx 66rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		line-height: 66rpx;
	}



	// 开启十个
	.openten_popup {
		margin: auto 0;
	}

	.openten_popup .content_box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.openten_popup .card_content {
		position: relative;
		padding: 8rpx 3rpx 8rpx 10rpx;
	}

	.openten_popup .card_box {
		// margin: 0 6rpx;
		// margin-top: 16rpx;
		width: 200rpx;
		height: 314rpx;
		position: relative;
		z-index: 10;
	}

	.openten_popup .card_box .super_img {
		width: 66rpx;
		height: 22rpx;
		background: url(../../static/h/cards/super.png) no-repeat;
		background-size: 66rpx 22rpx;
		position: absolute;
		top: 20rpx;
	}

	.openten_popup .card_box .card_name {
		position: absolute;
		top: 22rpx;
		left: 56rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #C79A52;
		transform: scale(0.4);
	}

	.openten_popup .card_box .card_name.chang {
		position: absolute;
		top: 22rpx;
		left: 30rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #C79A52;
		transform: scale(0.4);
	}

	.openten_popup .card_box .card_dj {
		position: absolute;
		top: 8rpx;
		right: 28rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #ffc847;
		transform: scale(0.8);
	}

	.openten_popup .card_box .info_box {
		width: 126rpx;
		height: 38rpx;
		background: url(../../static/h/cards/info_bg.png) no-repeat;
		background-size: 126rpx 38rpx;
		position: absolute;
		bottom: 30rpx;
		left: 28rpx;
		overflow: auto;
	}

	.openten_popup .card_box .info_box .info_data {
		font-size: 24rpx;
		line-height: 11rpx;
		text-align: center;
		color: #C79A52;
		transform: scale(0.8);
	}

	.openten_popup .card_box .atk_box {
		width: 106rpx;
		height: 20rpx;
		background: url(../../static/h/cards/atk_bg.png) no-repeat;
		background-size: 106rpx 20rpx;
		position: absolute;
		bottom: 0;
		left: 34rpx;
	}

	.openten_popup .card_box .atk_box .atk_data {
		font-size: 24rpx;
		text-align: center;
		color: #FF9000;
		transform: scale(0.4);
		margin-top: -6rpx;
	}

	.openten_popup .card_img {
		width: 133rpx;
		height: 140rpx;
		position: absolute;
		top: 48rpx;
		left: 12rpx;
	}

	.openten_popup .card_img image {
		width: 178rpx;
		height: 186rpx;
	}

	.openten_popup .okbtn_bg {
		margin: 48rpx auto 0;
		width: 374rpx;
		height: 88rpx;
		background: url(../../static/h/index/okbtn_bg.png) no-repeat;
		background-size: 374rpx 88rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		line-height: 88rpx;
	}

	// 确定开启弹出层
	.define_popup {
		margin: auto 0;
	}

	.define_popup .define_bg {
		width: 654rpx;
		height: 374rpx;
		background: url(../../static/h/index/set_bg.png) no-repeat;
		background-size: 654rpx 374rpx;
		margin: 0 auto;
	}

	.define_bg .define_tit {
		font-size: 36rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		margin-top: 100rpx;
	}

	.define_bg .popup_btn {
		width: 80%;
		margin: 60rpx auto 0;
		display: flex;
		justify-content: space-between;
	}

	.define_bg .popup_btn .no_btn {
		width: 246rpx;
		height: 66rpx;
		background: url(../../static/h/boss/other_btn.png) no-repeat;
		background-size: 246rpx 66rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 66rpx;
		color: #838383;
	}

	.define_bg .popup_btn .yes_btn {
		width: 246rpx;
		height: 66rpx;
		background: url(../../static/h/boss/pk_btn.png) no-repeat;
		background-size: 246rpx 66rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 66rpx;
		color: #F7D38B;
	}

	// 过渡效果
	.gd_popup {
		margin: auto 0;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.rollbox {
		position: relative;
		perspective: 1000rpx;
		width: 200rpx;
		height: 314rpx;
		// margin:100rpx auto;
		// margin-left: 220rpx;
	}

	.rollbox .zm {
		transform-style: preserve-3d; //表示所有子元素在3D空间中呈现
		backface-visibility: hidden; //元素背面向屏幕时是否可见
		transition-duration: 1s;
		transition-timing-function: 'ease-in';
		// background:#008080;
	}

	.rollbox .fm {
		transform-style: preserve-3d; //表示所有子元素在3D空间中呈现
		backface-visibility: hidden; //元素背面向屏幕时是否可见
		transition-duration: 1s;
		transition-timing-function: 'ease-in';
		// background:#008080;
	}

	.rollbox .cardimg {
		width: 200rpx;
		height: 314rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rollbox .cardimg image {
		width: 200rpx;
		height: 314rpx;
	}

	.fm {
		transform: rotateY(180deg);
		visibility: hidden; //元素不可见，但占据空间
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		// transition: all 3s;
	}

	.box_rolling .zm {
		transform: rotateY(180deg);
		visibility: hidden;
		// transition: all 3s;
	}

	.box_rolling .fm {
		transform: rotateY(0deg);
		visibility: visible;
		// transition: all 3.3s;
	}

	// 游戏规则
	.rule_popup {
		margin: auto 0;
	}

	.rule_popup .rule_bg {
		width: 560rpx;
		height: 960rpx;
		background: url(../../static/h/packs/salepopup_bg.png) no-repeat;
		background-size: 560rpx 960rpx;
		margin: 0 auto;
	}

	.rule_popup .popup_top {
		display: flex;
		justify-content: flex-end;
	}

	.rule_popup .close_img {
		width: 54rpx;
		height: 54rpx;
		background: url(../../static/h/boss/close_img.png) no-repeat;
		background-size: 54rpx 54rpx;
	}

	.rule_popup .rule_desc {
		width: 460rpx;
		max-height: 740rpx;
		margin: 20rpx auto 0;
		overflow-y: auto;
		color: #F7D38B;
		font-size: 26rpx;
	}
</style>
