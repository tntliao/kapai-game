<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('shop.shop')" urlline="index"></topnav>
			<view class="content_bg">
				<view class="zhan" style="height: 1px;"></view>
				
				<view class="shop_content">
					<view class="content_top">
						<view class="type_box">
							<view class="type_name">{{$t('shop.box')}}</view>
							<!-- <view class="xjt_img"></view> -->
						</view>
						<view class="list_btn"></view>
					</view>
					<view class="line"></view>
					<!-- 宝箱 -->
					<view class="bx_box">
						<view class="sx_box">
							<view class="sx_img">
								<image src="../../static/h/index/sx_box.png" mode=""></image>
							</view>
							<view class="price_box">
								<view class="price_name">{{$t('shop.price')}}</view>
								<view class="price_line"></view>
								<view class="price_info">
									<view class="info_num">{{blindboxprice}}</view>
									<view class="info_name">LOO</view>
								</view>
							</view>
							<view class="buy_btn" @click="openbuy('sxbbox')">{{$t('shop.buy')}}</view>
						</view>
						<view class="sx_box">
							<!-- 星座宝箱 -->
							<view class="xz_img">
								<image src="../../static/h/index/xz_box.png" mode=""></image>
							</view>
							<view class="price_box">
								<view class="price_name">{{$t('shop.price')}}</view>
								<view class="price_line"></view>
								<view class="price_info">
									<view class="info_num">{{blindboxprice}}</view>
									<view class="info_name">LOO</view>
								</view>
							</view>
							<view class="buy_btn" @click="openbuy('xzbbox')">{{$t('shop.buy')}}</view>
						</view>
					</view>
					<view class="content_top">
						<view class="type_box">
							<view class="type_name">{{$t('shop.cards')}}</view>
							<!-- <view class="xjt_img"></view> -->
						</view>
						<view class="list_btn"> </view>
					</view>
					<view class="line"></view>
					<!-- 卡牌 -->
					<view class="content_box">
						<view class="card_content" v-for="(item,i) in cardlist">
							<view class="card_box"
								:style="'background: url(../../static/h/cards_bg/'+item.bg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="item.cardName=='LOONG'"></view>
									<view class="card_name"
										v-if="item.cardName!='RAT'&&item.cardName!='DOG'&&item.cardName!='OX'&&item.cardName!='GOAT'&&item.cardName!='PIG'&&item.cardName!='LEO'">
										{{item.cardName}}</view>
									<view class="card_rat"
										v-if="item.cardName=='RAT'||item.cardName=='DOG'||item.cardName=='OX'||item.cardName=='GOAT'||item.cardName=='PIG'||item.cardName=='LEO'">
										{{item.cardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<view class="info_box">
									<view class="info_data" v-if="lang=='en'">
										{{item.desEn}} 
									</view>
									<view class="info_data" v-else>
										{{item.desCn}} 
									</view>
								</view>
								<view class="atk_box">
									<view class="atk_data">ATK:{{item.atk}}</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="item.cnImg" mode=""></image>
							</view>
							<view class="price_box">
								<view class="price_name">{{$t('shop.price')}}</view>
								<view class="price_line"></view>
								<view class="price_info">
									<view class="info_num">{{item.price}}</view>
									<view class="info_name">LOO</view>
								</view>
							</view>
							<view class="buy_btn" @click="qrbuycard(item.id,item.price)">{{$t('shop.buy')}}</view>
						</view>

					</view>
				</view>


			</view>
			
			<!-- 选择购买宝箱数量 -->
			<u-overlay :show="showbuynum" opacity="0.8">
				<view class="buymp_popup">
					<view class="buymp_bg">
						<view class="popup_top">
							<view class="close_img" @click="showbuynum=false"></view>
						</view>
						<view class="sx_img" v-if="bboxtype=='sxbbox'">
							<image src="../../static/h/index/sx_box.png" mode=""></image>
						</view>
						<view class="xz_img" v-if="bboxtype=='xzbbox'">
							<image src="../../static/h/index/xz_box.png" mode=""></image>
						</view>
						<view class="mp_name">{{$t('shop.box')}}</view>
						<view class="input_box">
							<u-number-box integer v-model="buynum" @change="valChange"></u-number-box>
						</view>
						<view class="price_box">
							<view class="price_name">{{$t('boss.price')}}</view>
							<view class="price_line"></view>
							<view class="price_info">
								<view class="info_num">{{paymoney}}</view>
								<view class="info_name">LOO</view>
							</view>
						</view>
						<view class="buymp_btn" @click="buybbox('sxbbox')" v-if="bboxtype=='sxbbox'">{{$t('boss.buy')}}</view>
						<view class="buymp_btn" @click="buybbox('xzbbox')" v-if="bboxtype=='xzbbox'">{{$t('boss.buy')}}</view>
					</view>
				</view>
			</u-overlay>
			
			
			<!-- 选择类型弹出层 -->
			<u-popup :show="showtype" @close="close" @open="open" mode="bottom">
				<view class="type_popup">
					<view class="type_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="type_top">
							<view class="space"></view>
							<view class="popup_name">类型</view>
							<view class="close_img" @click="close()">
								<image src="../../static/h/cards/close_img.png" mode=""></image>
							</view>
						</view>
						<view class="type_name">神龙</view>
						<view class="opts_box">
							<view class="type_opt">神龙</view>
						</view>
						<view class="popup_line"></view>
						<view class="type_name">十二生肖</view>
						<view class="opts_box">
							<view class="type_opt">龙</view>
							<view class="type_opt">虎</view>
							<view class="type_opt">牛</view>
							<view class="type_opt">马</view>
							<view class="type_opt">蛇</view>
							<view class="type_opt">猴</view>
							<view class="type_opt">猪</view>
							<view class="type_opt">狗</view>
							<view class="type_opt">羊</view>
							<view class="type_opt">鸡</view>
							<view class="type_opt">兔</view>
							<view class="type_opt">鼠</view>
						</view>
						<view class="popup_line"></view>
						<view class="type_name">十二星座</view>
						<view class="opts_box">
							<view class="type_opt">狮子座</view>
							<view class="type_opt">金牛座</view>
							<view class="type_opt">双子座</view>
							<view class="type_opt">处女座</view>
							<view class="type_opt">天枰座</view>
							<view class="type_opt">水瓶座</view>
							<view class="type_opt">射手座</view>
							<view class="type_opt">摩羯座</view>
							<view class="type_opt">白羊座</view>
							<view class="type_opt">双鱼座</view>
							<view class="type_opt">巨蟹座</view>
							<view class="type_opt">天蝎座</view>
						</view>
						<view class="popup_line"></view>
						<view class="ok_btn">确定</view>
					</view>
				</view>
			</u-popup>
			
			<!-- 确定购买 -->
			<u-overlay :show="showdefine" opacity="0.8">
				<view class="define_popup">
					<view class="define_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="define_tit">{{$t('shop.qrbuy')}}</view>
						<view class="popup_btn">
							<view class="no_btn" @click="showdefine=false">{{$t('shop.no')}}</view>
							<view class="yes_btn" @click="buycard(cardId,cardprice)">{{$t('shop.yes')}}</view>
						</view>
					</view>
				</view>
			</u-overlay>
			

		</view>
	</view>
</template>

<script>
	import web3 from 'web3'
	import topnav from '@/components/topnav/topnav.vue';
	export default {
		components: {
			topnav
		},
		data() {
			return {
				lang:this.$i18n.locale,
				cardbg: '',
				urlbg: '../../static/h/cards/cards_bg.png',
				showtype: false,
				showbuynum:false,
				cardlist: [], //可购买的卡片
				blindboxprice: 0, //宝箱费用
				buynum: 1,
				paymoney:0,
				bboxtype:'sxbbox',
				showdefine:false,
				cardId:'',
				cardprice:'',
				looye:0,//我的余额
			}
		},
		mounted() {
			this.cardbg = 'background: url(' + this.urlbg + ');background-size: 300rpx 470rpx;';
			this.pageinit();
			this.sysinit();
			this.yminit();
		},
		methods: {
			yminit(){
				var that=this;
				
				var url = "/Qianbao/zcinfo";
				var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,}
				var fnSuc = function(res){
					console.log(res.data)
					that.looye=res.data.loo;
					
				}
				that.Utils.tools.post(url,data,that,fnSuc);
			},
			// 确认购买
			qrbuycard(cardId, price){
				this.showdefine=true;
				this.cardprice=price;
				this.cardId=cardId;
			},
			openbuy(e){
				this.showbuynum=true;
				this.bboxtype=e;
				this.paymoney=this.blindboxprice;
			},
			valChange(e){
				this.paymoney=this.blindboxprice*e.value;
			},
			//立即购买卡片
			buycard(cardId, price){
				var that = this;
				let ye = 0;
				ye = that.looye;
				if (price * 1 > ye * 1) {
					that.Utils.tools.showmsg(that.$t("tips.sorry"));
					return false;
				}
				let url = "/card/buycard"
				let data = {
					paymoney: price,
					userId: that.userId,
					cardId: cardId,
					buynum:1,
				}
				that.Utils.tools.luch_get(url, data)
				that.Utils.tools.showmsg(that.$t("tips.buysucc"));
				that.showdefine=false;
			},
			//立即购买盲盒-用代币
			buybbox(bboxtype){
				var that = this;
				let paymoneys = parseFloat(this.paymoney);
				let ye = 0;
				ye = that.looye;
				if (paymoneys * 1 > ye * 1) {
					that.Utils.tools.showmsg(that.$t("tips.sorry"));
					return false;
				}
				let url = "/bbox/buybbox";
				let data = {
					paymoney: paymoneys,
					userId: that.userId,
					buynum: that.buynum,
					bboxfee: that.bboxfee,
					blindboxprice: that.blindboxprice,
					isusdt: that.isusdt,
					bboxtype: bboxtype,
				};
				that.Utils.tools.luch_post(url, data)
				that.Utils.tools.showmsg(that.$t("tips.buysucc"));
				that.showbuynum=false;
				that.buynum=1;
			},
			async buycard111(cardId, price) {
				var that = this;
				uni.showLoading({
					title: that.$t("tips.querying")
				})
				let to = uni.getStorageSync("incomeaddress");
				let prices = price;
				// let prices=parseFloat(this.price);
				let wallet = uni.getStorageSync("wallet");
				let ye = 0;
				let abi20 = uni.getStorageSync("abi20");
				let contract = await tronWeb.contract(abi20, 'TMGTa4gaEW9rMmjaQgH7WiRmPXWHAtuepB');
				await contract.balanceOf(wallet).call().then(res => {
					// 精度18
					// ye = that.Utils.tools.fromanywei(res,18);
					ye = web3.utils.hexToNumberString(res._hex) / 1000000;
					console.log("余额" + ye);
				}).catch(err => {
					uni.showToast({
						title: that.$t("tips.error"),
					})
					console.log(err);
					uni.hideLoading();
					return false;
				});

				if (prices * 1 > ye * 1) {
					that.Utils.tools.showmsg(that.$t("tips.sorry"));
					return false;
				}

				uni.hideLoading();
				uni.showLoading({
					title: that.$t("tips.paid")
				})
				prices = prices.toFixed(2);
				// let amount=this.Utils.tools.towei(prices,8);
				// 精度18
				let amount = that.Utils.tools.toanywei(prices + '', 6);
				contract.transfer(to, amount).send({
					from: this.wallet,
					gas: 210000
				}).then(async (transactionHash) => {
					// if(!error) {
					uni.hideLoading();
					uni.showLoading({
						title: that.$t("tips.waiting")
					})
					let url = "/card/buycard"
					let data = {
						transactionHash: transactionHash,
						fromacc: that.wallet,
						toacc: to,
						foracc: that.foracc,
						paymoney: price,
						userId: that.userId,
						cardId: cardId,
					}
					
					
					
					that.Utils.tools.luch_post(url, data)
					// }else{
					// 	uni.hideLoading();
					// 	uni.showLoading({
					// 		title:that.$t("tips.block")
					// 	})
					// }
				}).then(async (res) => {
					console.log(res);
					setTimeout(async () => {
						await that.Utils.tools.taskpost("/Task384", {})
					}, 2000)
				}).then(async res => {
					console.log(res);
					//执行购买结果查询
					setTimeout(async () => {
						await that.Utils.tools.taskpost("/Task384", {})
					}, 2000)
					// that.Tools.luch_post("/Task440",{})
					uni.hideLoading();
					that.Utils.tools.showmsg(that.$t("tips.buysucc"));
					setTimeout(function() {
						that.pageinit();
					}, 2000)
					// that.pageinit();
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showLoading({
						title: that.$t("tips.block")
					})
					uni.hideLoading();
				})
			},
			//立即购买盲盒-用代币
			async buybbox111(bboxtype) {
				this.showbuynum=false;
				let that = this;
				uni.showLoading({
					title: that.$t("tips.querying")
				})
				//钱包地址打印
				let to = uni.getStorageSync("incomeaddress");
				let wallet = uni.getStorageSync("wallet");
				let paymoneys = parseFloat(this.paymoney);
				console.log('盲盒价格'+paymoneys)
				let ye = 0;
				let abi20 = uni.getStorageSync("abi20");
				let contract = await tronWeb.contract(abi20, 'TMGTa4gaEW9rMmjaQgH7WiRmPXWHAtuepB');
				await contract.balanceOf(wallet).call().then(res => {
					// 精度18
					// ye = that.Utils.tools.fromanywei(res,18);
					ye = web3.utils.hexToNumberString(res._hex) / 1000000;
					console.log("余额" + ye);
				}).catch(err => {
					uni.showToast({
						title: that.$t("tips.error"),
					})
					console.log(err);
					uni.hideLoading();
				 return false;
				});
				if (paymoneys > ye) {
					that.Utils.tools.showmsg(that.$t("tips.sorry"));
					return false;
				}
				paymoneys = paymoneys.toFixed(2);
				// let amount=this.Utils.tools.towei(paymoneys,8);
				// 精度18
				console.log(paymoneys)
				let amount = that.Utils.tools.toanywei(paymoneys + '', 6);
				console.log('盲盒价格'+amount)
				//检查是否开放购买
				let openbuybox = that.openbuybox;
				if (openbuybox == 0) {
					that.Utils.tools.showmsg(that.$t("shop.openbuybox0"));
					return false;
				}

				uni.hideLoading();
				uni.showLoading({
					title: that.$t("tips.paid")
				})
				contract.transfer(to, amount).send({
					from: this.wallet,
					gas: 210000
				}).then(transactionHash => {
					// if(!error) {
					uni.hideLoading();
					uni.showLoading({
						title: that.$t("tips.waiting")
					})
					let url = "/bbox/buybbox";
					let data = {
						transactionHash: transactionHash,
						fromacc: that.wallet,
						toacc: to,
						foracc: that.foracc,
						paymoney: paymoneys,
						userId: that.userId,
						buynum: that.buynum,
						bboxfee: that.bboxfee,
						blindboxprice: that.blindboxprice,
						isusdt: that.isusdt,
						bboxtype: bboxtype,
					};
					console.log(data)
					that.Utils.tools.luch_post(url, data)
					// that.pageinit();
					// } else {
					//    uni.hideLoading();
					//    uni.showLoading({
					//    	title:that.$t("tips.block")
					//    })
					// }
				}).then(async (res) => {
					setTimeout(async () => {
						await that.Utils.tools.taskpost("/Task383", {})
					}, 3000)
					// await that.Utils.tools.taskpost("/Task383",{})
				}).then(async (res) => {
					//执行购买结果查询
					setTimeout(async () => {
						await that.Utils.tools.taskpost("/Task383", {})
					}, 3000)
					// await that.Utils.tools.taskpost("/Task383",{})
					setTimeout(function() {
						that.pageinit();
					}, 2000)
					uni.hideLoading();
					that.Utils.tools.showmsg(that.$t("tips.buysucc"));
					// that.pageinit();
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showLoading({
						title: that.$t("tips.block")
					})
					uni.hideLoading();
				})

			},
			
			//页面初始化
			pageinit() {
				var that = this;
				uni.showLoading({
					title: 'loading'
				});
				//锤炼属性点
				var url = "/pageinit/shop";
				var data = {
					lang: this.$i18n.locale,
				};

				function fnSuc(res) {
					console.log(res.data)
					that.blindboxprice = res.data.blindboxprice;
					that.bboxfee = parseFloat(res.data.bboxfee);
					that.contractabi3 = res.data.contractabi3;
					that.contractaddress3 = res.data.contractaddress3;
					that.incomeaddress = res.data.incomeaddress;
					that.cardlist = res.data.cardlist;
					that.mecard = res.data.mecard;
					that.bbox = res.data.bbox;
					that.allcard = res.data.allcard;
					that.openbuybox = res.data.openbuybox;
					that.isusdt = res.data.isusdt;
					// that.isusdt=0;
					that.wallet = uni.getStorageSync('wallet')
					that.userId = uni.getStorageSync('userId')
					// that.paymoneychange();
					console.log('页面初始化成功');
					// that._initweb3();
					uni.hideLoading();
				}
				that.Utils.tools.post(url, data, that, fnSuc);
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
					console.log(res.contractaddress_20)
					uni.setStorageSync("contractaddress_usdt", res.contractaddress_usdt);
					//一些常量
					uni.setStorageSync("symbol", res.symbol);
					that.mindefije = res.mindefije;
					console.log('系统初始化完成');
				}).then(async () => {
					//RPC通讯得到钱包
					console.log('RPC通讯')
					// await that.initweb3()
				}).then(async () => {
					console.log('获取当前钱包')
					// await that.getMetaMask();
					await that.linkWallet();
				}).catch((err) => {
					console.log(err)
				});
				// that.pageinit();
				// that.looye();
				console.log('初始化用户信息')
				uni.hideLoading();
			},
			// 连接钱包
			linkWallet() {
				this.initWallet()
				setTimeout(() => {
					if (window.tronWeb) {
						this.tronWeb = window.tronWeb;
						this.defaultAddress = this.tronWeb.defaultAddress.base58;
						console.log('地址=>', this.defaultAddress)
						uni.setStorageSync('wallet', this.defaultAddress)
					} else {
						console.log('连接钱包失败');
						return;
					}
				}, 500)
			},
			// 关闭弹出层
			close() {
				this.showtype = false;
			},
			//跳转页面
			toPage(pagekey) {
				
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

	.content_bg {
		width: 750rpx;
		height: 1462rpx;
		background: url(../../static/h/mgshop/content_bg.png) no-repeat;
		background-size: 750rpx 1462rpx;
		margin: 20rpx auto 0;
	}

	.content_top {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin: 0rpx auto 16rpx;
	}

	.content_top .type_box {
		display: flex;
		justify-content: center;
	}

	.content_top .type_box .type_name {
		font-size: 32rpx;
		font-weight: 400;
		color: #C79A52;
	}

	.content_top .type_box .xjt_img {
		width: 21rpx;
		height: 15rpx;
		background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
		background-size: 21rpx 15rpx;
		margin: 18rpx 0 0 10rpx;
	}

	.content_top .list_btn {
		font-size: 28rpx;
		font-weight: 500;
		color: #B7B7B7;
	}

	.content_bg .line {
		width: 654rpx;
		height: 4rpx;
		background: #433E3D;
		box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(142, 140, 140, 0.16);
		margin: 0 auto;
	}

	.shop_content {
		height: 1330rpx;
		overflow: auto;
		margin-top: 50rpx;
	}

	// 宝箱
	.bx_box {
		display: flex;
		justify-content: center;
		// width: 80%;
		// margin: 0 auto;
	}

	.bx_box .sx_box {
		padding: 16rpx 20rpx;
		// padding-top: 16rpx;
		box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
		border: 2rpx solid rgba(67, 62, 61, 0.2);
	}

	.bx_box .sx_box .sx_img {
		width: 264rpx;
		height: 236rpx;
		margin: 0 auto;
	}

	.bx_box .sx_box .sx_img image {
		width: 264rpx;
		height: 236rpx;
	}

	.sx_box .price_box {
		margin: 34rpx 0 24rpx 0;
		width: 284rpx;
		height: 98rpx;
		background: url(../../static/h/mgshop/price_bg.png) no-repeat;
		background-size: 284rpx 98rpx;
	}

	.sx_box .price_box .price_name {
		width: 90%;
		margin: 0 auto;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		height: 48rpx;
		line-height: 48rpx;
	}

	.sx_box .price_box .price_line {
		margin: 0 auto;
		width: 272rpx;
		height: 2rpx;
		background: #707070;
	}

	.sx_box .price_box .price_info {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: 400;
		color: #C79A52;
		height: 48rpx;
		line-height: 48rpx;
	}

	.sx_box .buy_btn {
		width: 280rpx;
		height: 66rpx;
		background: url(../../static/h/mgshop/buy_bg.png) no-repeat;
		background-size: 280rpx 66rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		line-height: 66rpx;
	}

	// 星座宝箱
	.sx_box .xz_img {
		width: 252rpx;
		height: 236rpx;
		margin: 0 auto;
	}

	.sx_box .xz_img image {
		width: 252rpx;
		height: 236rpx;
	}

	// 卡牌
	.content_box {
		width: 664rpx;
		margin: 0 auto;
		display: flex;
		// justify-content: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.card_content {
		position: relative;
		padding: 16rpx 6rpx 16rpx 20rpx;
		box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
		border: 2rpx solid rgba(67, 62, 61, 0.2);
	}

	.card_box {
		// margin: 0 6rpx;
		// margin-top: 16rpx;
		width: 300rpx;
		height: 470rpx;
		position: relative;
		z-index: 10;
	}

	.card_box .super_img {
		width: 100rpx;
		height: 32rpx;
		background: url(../../static/h/cards/super.png) no-repeat;
		background-size: 100rpx 32rpx;
		position: absolute;
		top: 30rpx;
	}

	.card_box .card_rat {
		position: absolute;
		top: 40rpx;
		left: 126rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #C79A52;
		transform: scale(0.7);
	}

	.card_box .card_name {
		position: absolute;
		top: 40rpx;
		left: 100rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #C79A52;
		transform: scale(0.7);
	}

	.card_box .card_dj {
		position: absolute;
		top: 36rpx;
		right: 40rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #ffc847;
	}

	.card_box .info_box {
		width: 189rpx;
		height: 56rpx;
		background: url(../../static/h/cards/info_bg.png) no-repeat;
		background-size: 189rpx 56rpx;
		position: absolute;
		bottom: 44rpx;
		left: 42rpx;
		overflow: auto;
	}

	.card_box .info_box .info_data {
		padding: 6rpx;
		font-size: 24rpx;
		line-height: 28rpx;
		text-align: center;
		color: #C79A52;
	}

	.card_box .atk_box {
		width: 160rpx;
		height: 30rpx;
		background: url(../../static/h/cards/atk_bg.png) no-repeat;
		background-size: 160rpx 30rpx;
		position: absolute;
		bottom: 0;
		left: 50rpx;
	}

	.card_box .atk_box .atk_data {
		font-size: 24rpx;
		text-align: center;
		color: #C79A52;
		transform: scale(0.6);
	}


	.card_img {
		width: 266rpx;
		height: 280rpx;
		position: absolute;
		top: 70rpx;
		left: 24rpx;
	}

	.card_img image {
		width: 266rpx;
		height: 280rpx;
	}

	.card_content .price_box {
		margin: 34rpx 0 24rpx 0;
		width: 284rpx;
		height: 98rpx;
		background: url(../../static/h/mgshop/price_bg.png) no-repeat;
		background-size: 284rpx 98rpx;
	}

	.card_content .price_box .price_name {
		width: 90%;
		margin: 0 auto;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		height: 48rpx;
		line-height: 48rpx;
	}

	.card_content .price_box .price_line {
		margin: 0 auto;
		width: 272rpx;
		height: 2rpx;
		background: #707070;
	}

	.card_content .price_box .price_info {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: 400;
		color: #C79A52;
		height: 48rpx;
		line-height: 48rpx;
	}

	.card_content .buy_btn {
		width: 280rpx;
		height: 66rpx;
		background: url(../../static/h/mgshop/buy_bg.png) no-repeat;
		background-size: 280rpx 66rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		line-height: 66rpx;
	}

	// 选择类型弹出层
	.type_popup {
		width: 750rpx;
		height: 1230rpx;
		background: #282422;
		background-size: 750rpx 1230rpx;
	}

	.type_popup .type_bg {
		width: 750rpx;
		height: 1230rpx;
		background: url(../../static/h/cards/type_bg.png) no-repeat;
		background-size: 750rpx 1230rpx;
	}

	.type_bg .type_top {
		width: 95%;
		margin: 20rpx auto 40rpx;
		display: flex;
		justify-content: space-between;
	}

	.type_top .space {
		width: 54rpx;
		height: 54rpx;
	}

	.type_top .popup_name {
		font-size: 32rpx;
		font-weight: 400;
		color: #C79A52;
	}

	.type_top .close_img {
		width: 54rpx;
		height: 54rpx;
	}

	.type_top .close_img image {
		width: 54rpx;
		height: 54rpx;
	}

	.type_bg .type_name {
		width: 90%;
		margin: 0 auto;
		font-size: 32rpx;
		font-weight: 400;
		color: #C79A52;
	}

	.type_bg .opts_box {
		width: 90%;
		margin: 20rpx auto 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.type_bg .type_opt {
		width: 192rpx;
		height: 60rpx;
		background: url(../../static/h/cards/opt_no.png) no-repeat;
		background-size: 192rpx 60rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 50rpx;
		margin: 0 30rpx 16rpx 0;
	}

	.type_bg .popup_line {
		width: 680rpx;
		height: 4rpx;
		background: rgba(67, 62, 61, 0.5);
		// box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(142, 140, 140, 0.16);
		margin: 20rpx auto;
	}

	.type_bg .ok_btn {
		width: 286rpx;
		height: 86rpx;
		background: url(../../static/h/cards/ok_btn.png) no-repeat;
		background-size: 286rpx 86rpx;
		font-size: 44rpx;
		font-weight: bold;
		color: #F7D38B;
		line-height: 86rpx;
		text-align: center;
		margin: 0 auto;
	}
	
	// 购买盲盒数量
	.buymp_popup{
		margin: auto 0;
	}
	.buymp_popup .buymp_bg{
		width: 700rpx;
		height: 1200rpx;
		background: url(../../static/h/boss/buymp_bg.png) no-repeat;
		background-size: 700rpx 1200rpx;
		margin: 0 auto;
	}
	.buymp_bg .popup_top{
		display: flex;
		justify-content: flex-end;
	}
	.buymp_bg .close_img{
		width: 54rpx;
		height: 54rpx;
		background: url(../../static/h/boss/close_img.png) no-repeat;
		background-size: 54rpx 54rpx;
	}
	.buymp_bg .sx_img{
		width: 264rpx;
		height: 236rpx;
		margin: 120rpx auto 14rpx;
	}
	.buymp_bg .sx_img image{
		width: 264rpx;
		height: 236rpx;
	}
	.buymp_bg .xz_img{
		width: 252rpx;
		height: 236rpx;
		margin: 120rpx auto 14rpx;
	}
	.buymp_bg .xz_img image{
		width: 252rpx;
		height: 236rpx;
	}
	.buymp_bg .mp_name{
		font-size: 40rpx;
		font-weight: 400;
		color: #D5D5D5;
		text-align: center;
	}
	.buymp_bg .input_box{
		margin : 48rpx 0 0 250rpx;
	}
	.buymp_bg .price_box{
		margin: 40rpx auto;
		width: 394rpx;
		height: 136rpx;
		background: url(../../static/h/mgshop/price_bg.png) no-repeat;
		background-size: 394rpx 136rpx;
	}
	.buymp_bg .price_box .price_name{
		width: 90%;
		margin: 0 auto;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		height: 68rpx;
		line-height: 68rpx;
	}
	.buymp_bg .price_box .price_line{
		margin: 0 auto;
		width: 360rpx;
		height: 2rpx;
		background: #707070;
	}
	.buymp_bg .price_box .price_info{
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: 400;
		color: #C79A52;
		height: 68rpx;
		line-height: 68rpx;
	}
	.buymp_bg .buymp_btn{
		width: 286rpx;
		height: 86rpx;
		background: url(../../static/h/boss/buymp_btn.png) no-repeat;
		background-size: 286rpx 86rpx;
		font-size: 44rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		line-height: 86rpx;
		margin: 0 auto;
	}
	// 确定弹出层
	.define_popup{
		margin: auto 0;
	}
	.define_popup .define_bg{
		width: 654rpx;
		height: 374rpx;
		background: url(../../static/h/index/set_bg.png) no-repeat;
		background-size: 654rpx 374rpx;
		margin: 0 auto;
	}
	.define_bg .define_tit{
		font-size: 36rpx;
		font-weight: bold;
		color: #F7D38B;
		text-align: center;
		margin-top: 100rpx;
	}
	.define_bg .popup_btn{
		width: 80%;
		margin: 60rpx auto 0;
		display: flex;
		justify-content: space-between;
	}
	.define_bg .popup_btn .no_btn{
		width: 246rpx;
		height: 66rpx;
		background: url(../../static/h/boss/other_btn.png) no-repeat;
		background-size: 246rpx 66rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 66rpx;
		color: #838383;
	}
	.define_bg .popup_btn .yes_btn{
		width: 246rpx;
		height: 66rpx;
		background: url(../../static/h/boss/pk_btn.png) no-repeat;
		background-size: 246rpx 66rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 66rpx;
		color: #F7D38B;
	}
	
	
</style>
