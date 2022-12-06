<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('trade.trading')" urlline="index"></topnav>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn active">{{$t('trade.market')}}</view>
					<view class="nav_btn" @click="toPage('auction')">{{$t('trade.auctionhall')}}</view>
					<view class="nav_btn" @click="toPage('mysale')">{{$t('trade.sale')}}</view>
				</view>
			</view>
			<!-- 中间内容 -->
			<view class="content_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="content_top">
					<view class="choose_box">
						<view class="sel_box" @click="showdj=true">
							<view class="sel_name">{{$t('trade.dj')}}</view>
							<view class="xjt_img"></view>
							<!-- <view class="fxjt_img" v-if="showjt==true"></view> -->
						</view>
						<view class="sel_box" @click="showtype=true">
							<view class="sel_name">{{$t('trade.type')}}</view>
							<view class="xjt_img"></view>
						</view>
					</view>
					<view class="list_btn" @click="toPage('buylist')">{{$t('trade.purchase')}} ></view>
				</view>
				<view class="line"></view>
				<scroll-view class="ka_box" scroll-y="true" @scrolltolower="dddd()">
					<!-- 卡牌 -->
					<view class="ka_content">
						<view class="card_content" v-for="(item,i) in cardlist">
							<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.bg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="item.cardName=='LOONG'"></view>
									<view class="card_name" v-if="item.cardName!='RAT'&&item.cardName!='DOG'&&item.cardName!='OX'&&item.cardName!='GOAT'&&item.cardName!='PIG'&&item.cardName!='LEO'">{{item.cardName}}</view>
									<view class="card_rat" v-if="item.cardName=='RAT'||item.cardName=='DOG'||item.cardName=='OX'||item.cardName=='GOAT'||item.cardName=='PIG'||item.cardName=='LEO'">{{item.cardName}}</view>
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
								<!-- 我的出售 -->
								<!-- <view class="mysale">我的出售</view> -->
								<view class="atk_box">
									<view class="atk_data">ATK:{{item.atk}}</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="item.cnImg" mode=""></image>
							</view>
							<view class="price_box">
								<view class="price_name">{{$t('trade.price')}}</view>
								<view class="price_line"></view>
								<view class="price_info">
									<view class="info_num">{{item.price}}</view>
									<view class="info_name">LOO</view>
								</view>
							</view>
							<view class="buy_btn" v-if="item.userId!=userId" @click="qrbuycard(item.id,item.price)">{{$t('trade.buy')}}</view>
							<view class="buy_btn" v-if="item.userId==userId" @click="showche(item.id,item.cardId,item.atk,item.cardName,item.bg,item.cnImg,item.price)">{{$t('trade.recall')}}</view>
						</view>
						
					</view>
					<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"   :nomore-text="nomoreText" @loadmore="loadmore" />
				</scroll-view>
				
			</view>
			
			<!-- 撤回卡牌弹出层 -->
			<u-overlay :show="showsale" opacity="0.8">
				<view class="sale_popup">
					<view class="sale_bg">
						<view class="popup_top">
							<view class="close_img" @click="showsale=false"></view>
						</view>
						<view class="card_content">
							<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+chebg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="checardName=='LOONG'"></view>
									<view class="card_rat" v-if="checardName=='RAT'||checardName=='DOG'||checardName=='OX'||checardName=='GOAT'||checardName=='PIG'||checardName=='LEO'">{{checardName}}</view>
									<view class="card_name" v-if="checardName!='RAT'&&checardName!='DOG'&&checardName!='OX'&&checardName!='GOAT'&&checardName!='PIG'&&checardName!='LEO'">{{checardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<!-- <view class="info_box">
									<view class="info_data">
										ss sss ssssss s sssssssssss ssssss ssssssssssss sssssss sss ssss sss
									</view>
								</view> -->
								<view class="atk_box">
									<view class="atk_data">ATK:{{cheatk}}</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="checnImg" mode=""></image>
							</view>
							
						</view>
						<view class="input_box">
							<u--input :placeholder="$t('trade.sell')" border="node" v-model="cheprice" @change="change" color="#FFFFFF" disabled disabledColor="rgba(255,255,255,0)">
								<view class="coin_name" slot="suffix">LOO</view>
							</u--input>
						</view>
						<view class="btnok_bg" @click="removecard11(cheid,checardId)">{{$t('trade.ch')}}</view>
					</view>
				</view>
			</u-overlay>
			
			<!-- 选择类型弹出层 -->
			<u-popup :show="showtype" @close="close" @open="open" mode="bottom">
				<view class="type_popup">
					<view class="type_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="type_top">
							<view :class="baseCardId==0?'xzspace':'space'" @click="baseCardId=0">{{$t('trade.all')}}</view>
							<view class="popup_name">{{$t('trade.type')}}</view>
							<view class="close_img" @click="close()">
								<image src="../../static/h/cards/close_img.png" mode=""></image>
							</view>
						</view>
						<block v-for="(vo,i) in typelist">
							<view class="type_name">{{vo.tagname}}</view>
							<view class="opts_box">
								<view :class="va.id==baseCardId?'xz_opt':'type_opt'" v-for="(va,x) in vo.namelist" @click="baseCardId=va.id">{{va.cardName}}</view>
							</view>
							<view class="popup_line"></view>
						</block>
						<view class="ok_btn" @click="xztype()">{{$t('trade.confirm')}}</view>
					</view>
				</view>
			</u-popup>
			<!-- 等级弹出层 -->
			<u-popup :show="showdj" @close="close" @open="open" mode="bottom">
				<view class="type_popup">
					<view class="type_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="type_top">
							<view :class="cardRank==0?'xzspace':'space'" @click="cardRank=0">{{$t('trade.all')}}</view>
							<view class="popup_name">{{$t('trade.dj')}}</view>
							<view class="close_img" @click="close()">
								<image src="../../static/h/cards/close_img.png" mode=""></image>
							</view>
						</view>
						<view class="opts_box">
							<view :class="370==cardRank?'xz_opt':'type_opt'"  @click="cardRank=370">I</view>
							<view :class="375==cardRank?'xz_opt':'type_opt'"  @click="cardRank=375">II</view>
							<view :class="376==cardRank?'xz_opt':'type_opt'"  @click="cardRank=376">III</view>
							<view :class="377==cardRank?'xz_opt':'type_opt'"  @click="cardRank=377">IV</view>
							<view :class="484==cardRank?'xz_opt':'type_opt'"  @click="cardRank=484">V</view>
							<view :class="512==cardRank?'xz_opt':'type_opt'"  @click="cardRank=512">VI</view>
							<view :class="513==cardRank?'xz_opt':'type_opt'"  @click="cardRank=513">VII</view>
							<view :class="514==cardRank?'xz_opt':'type_opt'"  @click="cardRank=514">VIII</view>
							<view :class="515==cardRank?'xz_opt':'type_opt'"  @click="cardRank=515">IX</view>
							<view :class="516==cardRank?'xz_opt':'type_opt'"  @click="cardRank=516">X</view>
							<view :class="517==cardRank?'xz_opt':'type_opt'"  @click="cardRank=517">XI</view>
							<view :class="518==cardRank?'xz_opt':'type_opt'"  @click="cardRank=518">XII</view>
							<view :class="519==cardRank?'xz_opt':'type_opt'"  @click="cardRank=519">XIII</view>
						</view>
						<view class="ok_btn" @click="xzdengji()">{{$t('trade.confirm')}}</view>
						
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
							<view class="yes_btn" @click="buycard12(buyid,buyprice)">{{$t('shop.yes')}}</view>
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
	components:{
		topnav
	},
	data() {
		return {
			lang:this.$i18n.locale,
			cardbg:'',
			urlbg:'../../static/h/cards/cards_bg.png',
			cardlist:'',
			userId:0,
			showsale:false,
			// 撤回
			cheid:'',
			checardId:'',
			cheatk:'',
			checardName:'',
			chebg:'',
			checnImg:'',
			cheprice:'',
			
			typelist:'',
			baseCardId:0,
			showtype:false,
			atkpx:0,//战斗力排序
			showjt:false,
			cardRank:0,//级别排序
			showdj:false,
			
			showdefine:false,
			buyid:'',
			buyprice:'',
			looye:0,//我的余额
			
			//加载更多
			pageSize:12,
			nowpage:1,
			maxpage:1,
			status: 'loading',
			lowerThreshold:50,
			loadingText:this.$t('all.loadingText'),
			loadmoreText:this.$t('all.loadmoreText'),
			nomoreText:this.$t('all.nomoreText'),
			scrollable:false,
			height:500,
		}
	},
	mounted() {
		this.cardbg='background: url('+this.urlbg+');background-size: 300rpx 470rpx;';
		this.userId=uni.getStorageSync("userId");
		this.getmoneylist();
		this.sysinit();
		this.getsx();
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
		qrbuycard(id,price){
			this.showdefine=true;
			this.buyid=id;
			this.buyprice=price;
		},
		// 战斗力排序
		atklist(){
			this.nowpage=1;
			var that=this;
			this.showjt=!this.showjt;
			this.atkpx=!this.atkpx;
			this.cardlist=[]
			this.getmoneylist();
		},
		// 选择类型
		xztype(){
			this.nowpage=1;
			this.getmoneylist();
			this.showtype=false;
		},
		// 选择等级
		xzdengji(){
			this.nowpage=1;
			this.getmoneylist();
			this.showdj=false;
		},
		// 获取筛选列表
		getsx(){
			var that=this;
			var url="/Pageinit/getcardtype";
			var data={lang:this.$i18n.locale,};
			function fnSuc(res){
				console.log(res.data)
				that.typelist=res.data;
				// that.czlist=res.data.imglist;
				// that.cznum=res.data.cznum;
			}
			that.Utils.tools.post(url,data,that,fnSuc);
			
			// this.showopenten=true;
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
		//购买卡牌
		buycard12(id,price){
			var that = this;
			let ye = 0;
			ye = that.looye;
			if (price * 1 > ye * 1) {
				that.Utils.tools.showmsg(that.$t("tips.sorry"));
				return false;
			}
			let url="/Card/buysalecard"
			let data={
				paymoney:price,
				userId:that.userId,
				id:id,
			}
			that.Utils.tools.luch_post(url,data);
			that.Utils.tools.showmsg(that.$t("tips.buysucc"));
			that.showdefine=false;
			setTimeout(function() {
				that.getmoneylist();
			}, 1000)
		},
		async buycard1212(id,price){
			let that = this;
			let to=uni.getStorageSync("income_trade");
			let wallet = uni.getStorageSync('wallet');
			let prices = price*1;
			// let prices = price;
			prices=prices.toFixed(2);
			//检测余额是否足够
			uni.showLoading({title:that.$t("tips.querying")})
			let ye=0;
			let abi20 = uni.getStorageSync("abi20");
			let contract = await tronWeb.contract(abi20, 'TMGTa4gaEW9rMmjaQgH7WiRmPXWHAtuepB');
			await contract.balanceOf(wallet).call().then(res => {
				// ye = that.Utils.tools.fromanywei(res,18);
				ye = web3.utils.hexToNumberString(res._hex) / 1000000;
				console.log("余额"+ye);
			}).catch(err=>{
				 uni.showToast({
				 	title:that.$t("tips.error"),
				 })
				 console.log(err);
				 uni.hideLoading();
				 return false;
			});
			if(prices*1>ye*1){
				this.Utils.tools.showmsg(that.$t("tips.sorry")); 
				uni.hideLoading();
				return false;
			}
			// let amount=this.Utils.tools.towei(prices,8);
			let amount=that.Utils.tools.toanywei(prices,6);
			// let amount=web3.utils.toWei(prices.toString(),'ether')
			uni.hideLoading();
			uni.showLoading({title:that.$t("tips.paid")})
			//购买
			contract.transfer(to,amount).send({from:wallet,gas:210000}).then(async (transactionHash)=>{
				// if(!err){
					uni.hideLoading();
					uni.showLoading({
						title:that.$t("tips.waiting")
					})
					let url="/Card/buysalecard"
					let data={
						transactionHash:transactionHash,
						fromacc:that.wallet,
						toacc:to,
						paymoney:price,
						userId:that.userId,
						id:id,
					}
					that.Utils.tools.luch_post(url,data)
				// }else{
				// 	uni.hideLoading();
				// 	uni.showLoading({
				// 		title:that.$t("tips.block")
				// 	})
				// }
			}).then(async (res)=>{
				console.log(res);
				// await that.Utils.tools.taskpost("/Task385",{})
				setTimeout(async () => {
					await that.Utils.tools.taskpost("/Task385", {})
				}, 3000)
			}).then(async res=>{
				console.log(res);
				//执行购买结果查询
				// await that.Utils.tools.taskpost("/Task385",{})
				setTimeout(async () => {
					await that.Utils.tools.taskpost("/Task385", {})
				}, 3000)
				setTimeout(function() {
					that.getmoneylist();
				}, 2000)
				// that.Tools.luch_post("/Task440",{})
				uni.hideLoading();
				that.Utils.tools.showmsg(that.$t("tips.buysucc"));
			}).catch(err=>{
				console.log(err);
				uni.hideLoading();
				uni.showLoading({
					title:that.$t("tips.block")
				})
				uni.hideLoading();
			})
		},
		// 打开撤回弹出层
		showche(id,cardId,atk,cardName,bg,cnImg,price){
			this.cheid=id;
			this.checardId=cardId;
			this.cheatk=atk;
			this.checardName=cardName;
			this.chebg=bg;
			this.checnImg=cnImg;
			this.cheprice=price;
			this.showsale=true;
		},
		//挂售用户撤下挂售卡牌
		removecard11(saleOrderId,cardId){
			var that = this;
			that.showsale=false;
			let url="/Card/removesalecard";//移除挂售中卡牌
			let data={
				saleOrderId:saleOrderId,
				cardId:cardId,
			}
			let fnSuc=function(res){
				console.log(res)
				if(res.data.status==1){
					that.Utils.tools.showmsg(that.$t("tips.chsucc"));
					setTimeout(function() {
						that.getmoneylist();
					}, 2000)
				}else{
					that.Utils.tools.showmsg(that.$t("tips.chfail"));
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//页面初始化-获取卡牌列表
		getmoneylist(){
			var that=this;
			let url="/Pm/getsalingcard";
			if(this.nowpage==1){
				that.cardlist=[];
			}
			let data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,cardRace:this.cardRace,cardRank:this.cardRank,baseCardId:that.baseCardId,atk:this.atkpx,};
			var fnSuc = function(res){
				console.log(res);
				that.cardlist = that.cardlist.concat(res.data.data);
				if(res.data.last_page<=that.nowpage){
					that.status='nomore'
				}else{
					that.status='loadmore'
				}
				that.maxpage=res.data.last_page
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		dddd(){
			if(this.nowpage>=this.maxpage){
				return false;
			}
			this.nowpage++;
			console.log('加载更多');
			this.getmoneylist();
		},
		// 关闭弹出层
		close(){
			this.showtype=false;
			this.showdj=false;
		},
		//跳转页面
		toPage(pagekey){
			
			var that=this;
			uni.redirectTo({
				url:'../'+pagekey+'/'+pagekey,
			})
		},
	},
}
</script>

<style lang="scss">
.app{
	width: 750rpx;
	min-height: 100vh;
	background: #191716;
	overflow: auto;
}
.app_bg{
	width: 750rpx;
	height: 800rpx;
	background: url(../../static/h/mgshop/pages_bg.png) no-repeat;
	background-size: 750rpx 800rpx;
}
// 导航栏
.nav_bg{
	margin-top: 50rpx;
	width: 750rpx;
	height: 88rpx;
	background: url(../../static/h/invite/nav_bg.png) no-repeat;
	background-size: 750rpx 88rpx;
}
.nav_bg .nav_box{
	display: flex;
	justify-content: space-between;
	width: 90%;
	margin: 0 auto;
}
.nav_bg .nav_box .nav_btn{
	width: 33%;
	text-align: center;
	font-size: 32rpx;
	font-weight: 400;
	color: #F7D38B;
	line-height: 88rpx;
}
.nav_bg .nav_box .nav_btn.active{
	width: 222rpx;
	height: 84rpx;
	background: url(../../static/h/invite/xz_bg.png) no-repeat;
	background-size: 222rpx 84rpx;
}
// 中间内容
.content_box{
	width: 750rpx;
	height: 1328rpx;
	background: url(../../static/h/mgshop/content_bg.png) no-repeat;
	background-size: 750rpx 1328rpx;
}
.content_top{
	display: flex;
	justify-content: space-between;
	width: 80%;
	margin: 50rpx auto 16rpx;
}
.content_top .choose_box{
	display: flex;
	justify-content: flex-start;
}
.content_top .sel_box{
	display: flex;
	justify-content: center;
	margin-right: 30rpx;
}
.content_top .sel_box .sel_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.content_top .sel_box .xjt_img{
	width: 21rpx;
	height: 15rpx;
	background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
	background-size: 21rpx 15rpx;
	margin: 18rpx 0 0 10rpx;
}
.content_top .sel_box .fxjt_img{
	width: 21rpx;
	height: 15rpx;
	background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
	background-size: 21rpx 15rpx;
	margin: 18rpx 0 0 10rpx;
	transform: rotate(180deg);
	
}
.content_top .list_btn{
	font-size: 28rpx;
	font-weight: 500;
	color: #B7B7B7;
}
.content_box .line{
	width: 654rpx;
	height: 4rpx;
	background: #433E3D;
	box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(142, 140, 140, 0.16);
	margin: 0 auto;
}
.ka_box{
	height: 1100rpx;
	overflow: auto;
}
// 卡牌
.ka_content{
	width: 660rpx;
	margin: 0 auto;
	display: flex;
	// justify-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
}
.card_content{
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.card_box .info_box .info_data{
	padding: 6rpx;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
// 我的出售
.card_box .mysale{
	width: 194rpx;
	height: 52rpx;
	background: url(../../static/h/mgshop/mysale_bg.png) no-repeat;
	background-size: 194rpx 52rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #FFFFFF;
	text-align: center;
	line-height: 52rpx;
	position: absolute;
	bottom: 44rpx;
	left: 44rpx;
}
.card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}


.card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.card_img image{
	width: 266rpx;
	height: 280rpx;
}
.card_content .price_box{
	margin: 34rpx 0 24rpx 0;
	width: 284rpx;
	height: 98rpx;
	background: url(../../static/h/mgshop/price_bg.png) no-repeat;
	background-size: 284rpx 98rpx;
}
.card_content .price_box .price_name{
	width: 90%;
	margin: 0 auto;
	font-size: 24rpx;
	font-weight: 400;
	color: #999999;
	height: 48rpx;
	line-height: 48rpx;
}
.card_content .price_box .price_line{
	margin: 0 auto;
	width: 272rpx;
	height: 2rpx;
	background: #707070;
}
.card_content .price_box .price_info{
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
.card_content .buy_btn{
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
// 撤回卡牌弹出层
// 出售弹出层
.sale_popup{
	margin: auto 0;
}
.sale_popup .sale_bg{
	width: 560rpx;
	height: 960rpx;
	background: url(../../static/h/packs/salepopup_bg.png) no-repeat;
	background-size: 560rpx 960rpx;
	margin: 0 auto;
}
.sale_popup .popup_top{
	display: flex;
	justify-content: flex-end;
}
.sale_popup .close_img{
	width: 54rpx;
	height: 54rpx;
	background: url(../../static/h/boss/close_img.png) no-repeat;
	background-size: 54rpx 54rpx;
}
.sale_popup .card_content{
	margin: 0rpx auto 0;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	// box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	// border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.sale_popup .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.sale_popup .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.sale_popup .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.sale_popup .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.sale_popup .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.sale_popup .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.sale_popup .card_box .info_box .info_data{
	font-size: 24rpx;
	line-height: 22rpx;
	text-align: center;
	color: #C79A52;
}
.sale_popup .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.sale_popup .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #FF9000;
	transform: scale(0.6);
}
.sale_popup .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.sale_popup .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.sale_popup .input_box{
	width: 380rpx;
	height: 68rpx;
	background: url(../../static/h/packs/input_bg.png) no-repeat;
	background-size: 380rpx 68rpx;
	margin: 30rpx auto;
}
.sale_popup .input_box .coin_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.sale_popup .btnok_bg{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/packs/hc_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	margin: 0 auto;
	font-size: 40rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
}
// 选择类型弹出层
.type_popup{
	width: 750rpx;
	height: 1230rpx;
	background: #282422;
	background-size: 750rpx 1230rpx;
}
.type_popup .type_bg{
	width: 750rpx;
	height: 1230rpx;
	background: url(../../static/h/cards/type_bg.png) no-repeat;
	background-size: 750rpx 1230rpx;
}
.type_bg .type_top{
	width: 95%;
	margin: 20rpx auto 40rpx;
	display: flex;
	justify-content: space-between;
}
.type_top .space{
	// width: 54rpx;
	// height: 54rpx;
	color: #FFFFFF;
}
.type_top .xzspace{
	color: #C79A52;
}
.type_top .popup_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.type_top .close_img{
	width: 54rpx;
	height: 54rpx;
}
.type_top .close_img image{
	width: 54rpx;
	height: 54rpx;
}
.type_bg .type_name{
	width: 90%;
	margin: 0 auto;
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.type_bg .opts_box{
	width: 90%;
	margin: 20rpx auto 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.type_bg .xz_opt{
	width: 192rpx;
	height: 60rpx;
	background: url(../../static/h/cards/opt_yes.png) no-repeat;
	background-size: 192rpx 60rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	line-height: 50rpx;
	margin: 0 30rpx 16rpx 0;
}
.type_bg .type_opt{
	width: 192rpx;
	height: 60rpx;
	background: url(../../static/h/cards/opt_no.png) no-repeat;
	background-size: 192rpx 60rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	line-height: 50rpx;
	margin: 0 30rpx 16rpx 0;
}
.type_bg .popup_line{
	width: 680rpx;
	height: 4rpx;
	background: rgba(67,62,61,0.5);
	// box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(142, 140, 140, 0.16);
	margin: 20rpx auto;
}
.type_bg .ok_btn{
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
