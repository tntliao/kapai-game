<template>
	<view class="app">
		<view class="app_bg">
			<!-- xxx -->
			<view class="zhan" style="height: 10rpx;"></view>
			<!-- 顶部 -->
			<view class="topnav_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="nav_box">
					<view class="back_img" @click="toPage('backpack')">
						<image src="../../static/h/topnav/back_img.png" mode=""></image>
					</view>
					<view class="nav_name">{{$t('zhiya.cardzy')}}</view>
					<view class="help_img">
						<view class="" @click="showrule=true">{{$t('zhiya.rule')}}</view>
					</view>
				</view>
			</view>
			<!-- 选择 -->
			<view class="sel_bg">
				<view class="zhan" style="height: 1px;"></view>
				<view class="sel_tit">{{$t('zhiya.sel')}}</view>
				<view class="mode_box">
					<!-- <view :class="modenum ==1?'mode_y':'mode_x'" @click="selmode(1)">1{{$t('zhiya.day')}}</view> -->
					<!-- <view :class="modenum ==15?'mode_y':'mode_x'" @click="selmode(15)">15{{$t('zhiya.day')}}</view> -->
					<view :class="modenum ==30?'mode_y':'mode_x'" @click="selmode(30)">30{{$t('zhiya.day')}}</view>
					<!-- <view :class="modenum ==60?'mode_y':'mode_x'" @click="selmode(60)">60{{$t('zhiya.day')}}</view> -->
					<view :class="modenum ==90?'mode_y':'mode_x'" @click="selmode(90)">90{{$t('zhiya.day')}}</view>
					<view :class="modenum ==180?'mode_y':'mode_x'" @click="selmode(180)">180{{$t('zhiya.day')}}</view>
					<view :class="modenum ==360?'mode_y':'mode_x'" @click="selmode(360)">360{{$t('zhiya.day')}}</view>
					<!-- <view :class="modenum ==3?'type_y':'type_x'" @click="selmode(3)">3V3</view> -->
				</view>
				<view class="selcard_box">
					<view class="nocard_bg" v-if="havecard==false"></view>
					<view class="xzcard_box" v-if="havecard==true">
						<view class="card_content">
							<view class="card_box" :style="'background-image: url(../../static/h/cards_bg/'+xzcard.bg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="xzcard.cardName=='LOONG'"></view>
									<view class="card_rat" v-if="xzcard.cardName=='RAT'||xzcard.cardName=='DOG'||xzcard.cardName=='OX'||xzcard.cardName=='GOAT'||xzcard.cardName=='PIG'||xzcard.cardName=='LEO'">{{xzcard.cardName}}</view>
									<view class="card_name" v-if="xzcard.cardName!='RAT'&&xzcard.cardName!='DOG'&&xzcard.cardName!='OX'&&xzcard.cardName!='GOAT'&&xzcard.cardName!='PIG'&&xzcard.cardName!='LEO'">{{xzcard.cardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<!-- <view class="info_box">
									<view class="info_data">
										ss sss ssssss s sssssssssss ssssss ssssssssssss sssssss sss ssss sss
									</view>
								</view> -->
								<!-- 我的出售 -->
								<!-- <view class="mysale">我的出售</view> -->
								<view class="atk_box">
									<view class="atk_data">
										ATK:{{xzcard.atk}}
									</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="xzcard.cnImg" mode=""></image>
							</view>
						</view>
					</view>
					<view class="btn_box">
						<view class="sel_btn" @click="selcard=true">{{$t('zhiya.xzka')}}</view>
						<view class="sel_btn" @click="showdefine=true">{{$t('zhiya.pledge')}}</view>
					</view>
					
				</view>
				
				<view class="list_btn" @click="toPage('zylist')">{{$t('zhiya.record')}}</view>
				
			</view>
			
			
			<!-- 选择卡牌弹出层 -->
			<u-popup :show="selcard" @close="close" @open="open" mode="bottom">
				<view class="selcard_popup">
					<view class="selcard_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="selcard_top">
							<!-- <view class="space"></view> -->
							<!-- <view class="sel_box" @click="showtype=true">
								<view class="sel_name">{{$t('pack.type')}}</view>
								<view class="xjt_img"></view>
							</view> -->
							<view class="choose_box">
								<view class="sel_box" @click="showdj=true">
									<view class="sel_name">{{$t('trade.dj')}}</view>
									<view class="xjt_img"></view>
									<!-- <view class="fxjt_img" v-if="showjt==true"></view> -->
								</view>
								<view class="sel_box" @click="showtype=true">
									<view class="sel_name">{{$t('pack.type')}}</view>
									<view class="xjt_img"></view>
								</view>
							</view>
							<view class="popup_name">{{$t('pvp.cards')}}</view>
							<view class="close_img" @click="close()">
								<image src="../../static/h/boss/close_img.png" mode=""></image>
							</view>
						</view>
						<scroll-view class="ka_box" scroll-y="true" @scrolltolower="dddd()">
							<!-- 卡牌 -->
							<view class="ka_content">
								<view class="card_content" v-for="(item,i) in melist">
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
									<view class="tj_btn" @click="slecard(item.id,item.cnImg)">{{$t('pvp.sel')}}</view>
								</view>
								
							</view>
							<!-- 加载更多动画 -->
							<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"   :nomore-text="nomoreText" @loadmore="loadmore" />
						</scroll-view>
					</view>
				</view>
			</u-popup>
			
			<!-- 选择类型弹出层 -->
			<u-popup :show="showtype" @close="close" @open="open" mode="bottom">
				<view class="type_popup">
					<view class="type_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="type_top">
							<view :class="baseCardId==0?'xzspace':'space'" @click="baseCardId=0">{{$t('pack.whole')}}</view>
							<view class="popup_name">{{$t('pack.type')}}</view>
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
						<view class="ok_btn" @click="xztype()">{{$t('pack.ok')}}</view>
					</view>
				</view>
			</u-popup>
			
			
			<!-- 确定质押弹出层 -->
			<u-overlay :show="showdefine" opacity="0.8">
				<view class="define_popup">
					<view class="define_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="define_tit">{{$t('zhiya.queding')}}</view>
						<view class="popup_btn">
							<view class="no_btn" @click="showdefine=false">{{$t('index.no')}}</view>
							<view class="yes_btn" @click="zycard()">{{$t('index.yes')}}</view>
						</view>
					</view>
				</view>
			</u-overlay>
			
			<!-- 质押规则弹出层 -->
			<u-overlay :show="showrule" opacity="0.8">
				<view class="rule_popup">
					<view class="rule_bg">
						<view class="popup_top">
							<view class="close_img" @click="showrule=false"></view>
						</view>
						<view class="rule_desc">
							1、 {{$t('zhiya.tipa')}}<br>
							2、 {{$t('zhiya.tipb')}}<br>
							{{$t('zhiya.tipc')}}<br>
							3、 {{$t('zhiya.tipd')}}<br>
							4、 {{$t('zhiya.tipe')}}<br>
							5、 {{$t('zhiya.tipf')}}
						</view>
						
					</view>
				</view>
			</u-overlay>
			
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
			urlbg:'../../static/h/cards/cards_bg.png',
			cardbg:'',
			selcard:false,
			modenum:15,
			havecard:false,
			showdefine:false,
			
			showrule:false,
			
			showtype:false,
			typelist:'',
			baseCardId:0,
			
			showdj:false,
			cardRank:0,//级别排序
			
			melist:'',
			xzcard:{},
			mpfee:100,
			userId:'',
			wallet:'',
			xzkaid:'',//选中卡id
			xzkaurl:'',
			cardzyfee:0,//质押手续费
			
			//加载更多
			pageSize:12,
			nowpage:1,
			maxpage:1,
			status: 'loading',
			lowerThreshold:50,
			loadingText:this.$t('all.loadingText'),
			loadmoreText:this.$t('all.loadmoreText'),
			loadmoreText1:this.$t('all.loadmoreText1'),
			nomoreText:this.$t('all.nomoreText'),
			scrollable:false,
			height:500,
		}
	},
	mounted() {
		this.cardbg='background: url('+this.urlbg+');background-size: 300rpx 470rpx;';
		this.userId = uni.getStorageSync("userId");
		this.wallet = uni.getStorageSync('wallet')
		this.getcardlist();
		this.getsx();
		this.sysinit();
		this.sxf();
	},
	methods: {
		// 质押手续费
		sxf(){
			var that=this;
			var url = "/Hire/getcardzyfee";
			var data={lang:this.$i18n.locale,}
			var fnSuc = function(res){
				console.log(res.data)
				that.cardzyfee=res.data.cardzyfee;
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//质押卡牌
		zycard(){
			var that=this;
			that.showdefine=false;
			if(that.xzkaid==''){
				that.Utils.tools.showmsg(that.$t("tips.selcard"));
				return false;
			};
			var url = "/Hire/onlyhire";
			var data={zydays:that.modenum,cardId:that.xzkaid}
			var fnSuc = function(res){
				console.log(res.data)
				if(res.data.status==1){
					that.Utils.tools.showmsg(that.$t("tips.zyyes"));
				}else if(res.data.status==-1){
					that.Utils.tools.showmsg(that.$t("tips.zyno"));
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
			setTimeout (function(){
				that.xzkaid='';
				that.havecard=false;
				that.getcardlist();
			},1000)
		},
		
		// 选择类型
		xztype(){
			var that=this;
			this.nowpage=1;
			this.showtype=false;
			setTimeout(function() {
				that.getcardlist();
			}, 2000)
		},
		// 选择等级
		xzdengji(){
			this.nowpage=1;
			this.getcardlist();
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
			uni.showLoading({
				title: this.$t("tips.wait"),
			})
			var that = this
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
				// that.mindefije = res.mindefije;
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
		slecard(id,url){
			this.xzkaid=id;
			this.xzkaurl=url;
			var that = this;
			for (var i = 0; i < that.melist.length; i++) {
				if(that.melist[i].id==id){
					that.xzcard=that.melist[i];
				}
			}
			console.log(that.xzcard)
			this.selcard=false;
			this.havecard=true;
		},
		// 选择模式
		selmode(e){
			this.modenum=e;
			this.mpfee=100*e;
		},
		// 获取我的卡牌列表
		getcardlist(){
			var that=this;
			if(this.nowpage==1){
				that.melist=[];
			}
			var url = "/bag/getucardlist";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,baseCardId:that.baseCardId,cardRank:this.cardRank,}
			var fnSuc = function(res){
				console.log(res)
				that.melist=that.melist.concat(res.data.data);
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
			this.getcardlist();
		},
		//拉到底部
		// onReachBottom(){
		// 	if(this.nowpage>=this.maxpage){
		// 		return false;
		// 	}
		// 	this.nowpage++;
		// 	console.log('加载更多');
		// 	this.getcardlist();
		// },
		// 点击加载
		loadmore() {
			console.log('loadmore');
			// uni.$u.toast('加载更多')
			if(this.nowpage>=this.maxpage){
				return false;
			}
			this.nowpage++;
			this.getcardlist();
		},
		// 关闭弹出层
		close(){
			this.showdj=false;
			this.selcard=false;
			this.showtype=false;
			this.baseCardId=0;
			this.getcardlist();
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
	min-height: 100vh;
	background: url(../../static/h/pk/pk_bg.png) no-repeat;
	background-size: 750rpx 2600rpx;
}
// 顶部
.topnav_box{}
.topnav_box .nav_box{
	display: flex;
	justify-content: space-between;
	width: 95%;
	margin: 20rpx auto 0;
}
.topnav_box .nav_box .back_img{
	// width: 60rpx;
	width: 120rpx;
	height: 60rpx;
}
.topnav_box .nav_box .back_img image{
	width: 60rpx;
	height: 60rpx;
}
.topnav_box .nav_box .help_img{
	width: 120rpx;
	height: 60rpx;
	font-size: 24rpx;
	color: #F7D38B;
	line-height: 60rpx;
	text-align: right;
}
.topnav_box .nav_box .help_img image{
	width: 60rpx;
	height: 60rpx;
}
.topnav_box .nav_name{
	font-size: 36rpx;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 60rpx;
}
// 选择
.sel_bg{
	width: 750rpx;
	height: 1100rpx;
	background: url(../../static/h/pk/sel_bg.png) no-repeat;
	background-size: 750rpx 1100rpx;
}
.sel_bg .sel_tit{
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	margin-top: 50rpx;
}
.sel_bg .mode_box{
	margin-top: 60rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.sel_bg .mode_box .mode_x{
	width: 335rpx;
	height: 92rpx;
	background: url(../../static/h/pk/mode_x.png) no-repeat;
	background-size: 335rpx 92rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #B7B7B7;
	text-align: center;
	line-height: 84rpx;
	margin-bottom: 10rpx;
}
.sel_bg .mode_box .mode_y{
	width: 335rpx;
	height: 92rpx;
	background: url(../../static/h/pk/mode_y.png) no-repeat;
	background-size: 335rpx 92rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 84rpx;
	margin-bottom: 10rpx;
}
.sel_bg .mode_box .type_x{
	width: 686rpx;
	height: 120rpx;
	background: url(../../static/h/pk/type_x.png) no-repeat;
	background-size: 686rpx 120rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #B7B7B7;
	text-align: center;
	line-height: 110rpx;
	margin: 0 0 10rpx;
}
.sel_bg .mode_box .type_y{
	width: 686rpx;
	height: 120rpx;
	background: url(../../static/h/pk/type_y.png) no-repeat;
	background-size: 686rpx 120rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 110rpx;
	margin: 0 0 10rpx;
}
.sel_bg .selcard_box{
	
}
.sel_bg .selcard_box .nocard_bg{
	width: 300rpx;
	height: 453rpx;
	background: url(../../static/h/pk/add_bg.png) no-repeat;
	background-size: 300rpx 453rpx;
	margin: 36rpx auto;
}
.sel_bg .selcard_box .xzcard_box{
	width: 300rpx;
	height: 453rpx;
	margin: 36rpx 0 36rpx 240rpx;
}
.xzcard_box .card_content{
	position: relative;
	// padding: 16rpx 6rpx 16rpx 20rpx;
	// box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	// border: 2rpx solid  rgba(67, 62, 61, 0.2);
	
}
.xzcard_box .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.xzcard_box .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.xzcard_box .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.xzcard_box .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.xzcard_box .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.xzcard_box .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.xzcard_box .card_box .info_box .info_data{
	padding: 6rpx;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
.xzcard_box .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.xzcard_box .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}
.xzcard_box .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	// left: 0rpx;
}
.xzcard_box .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.sel_bg .btn_box{
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.sel_bg .selcard_box .sel_btn{
	width: 240rpx;
	height: 86rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 240rpx 86rpx;
	margin: 0 auto;
	font-size: 32rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
}
.sel_bg .list_btn{
	width: 150rpx;
	margin: 50rpx auto 0;
	border-bottom: 2rpx solid #F7D38B;
	color: #F7D38B;
	text-align: center;
}


// 选择卡牌弹出层
.selcard_popup{
	width: 750rpx;
	height: 1230rpx;
	background: #282422;
	background-size: 750rpx 1230rpx;
}
.selcard_popup .selcard_bg{
	width: 750rpx;
	height: 1230rpx;
	background: url(../../static/h/boss/popup_bg.png) no-repeat;
	background-size: 750rpx 1230rpx;
}
.selcard_popup .selcard_bg .selcard_top{
	width: 95%;
	margin: 20rpx auto 40rpx;
	display: flex;
	justify-content: space-between;
}
.selcard_top .space{
	width: 54rpx;
	height: 54rpx;
}

.selcard_top .choose_box{
	display: flex;
	justify-content: flex-start;
}


.selcard_top .sel_box{
	width: 40%;
	display: flex;
	justify-content: center;
	margin-right: 30rpx;
}
.selcard_top .sel_box .sel_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.selcard_top .sel_box .xjt_img{
	width: 21rpx;
	height: 15rpx;
	background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
	background-size: 21rpx 15rpx;
	margin: 18rpx 0 0 6rpx;
}
.selcard_top .popup_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
	width: 20%;
}
.selcard_top .close_img{
	// width: 54rpx;
	width: 30%;
	height: 54rpx;
	display: flex;
	justify-content: flex-end;
}
.selcard_top .close_img image{
	width: 54rpx;
	height: 54rpx;
}
.selcard_popup .ka_box{
	height: 1100rpx;
	overflow: auto;
}
// 卡牌
.selcard_popup .ka_content{
	display: flex;
	// justify-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 664rpx;
	margin: 0 auto;
}
.selcard_popup .card_content{
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.selcard_popup .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.selcard_popup .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.selcard_popup .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.selcard_popup .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.selcard_popup .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.selcard_popup .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.selcard_popup .card_box .info_box .info_data{
	padding: 6rpx;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
// 我的出售
.selcard_popup .card_box .mysale{
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
.selcard_popup .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.selcard_popup .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}
.selcard_popup .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.selcard_popup .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.selcard_popup .card_content .tj_btn{
	width: 240rpx;
	height: 68rpx;
	background: url(../../static/h/packs/tj_btn.png) no-repeat;
	background-size: 240rpx 68rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
	margin: 10rpx 0 10rpx 24rpx;
}

// 确定质押弹出层
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
// 质押规则弹出层
.rule_popup{
	margin: auto 0;
}
.rule_popup .rule_bg{
	width: 560rpx;
	height: 960rpx;
	background: url(../../static/h/packs/salepopup_bg.png) no-repeat;
	background-size: 560rpx 960rpx;
	margin: 0 auto;
}
.rule_popup .popup_top{
	display: flex;
	justify-content: flex-end;
}
.rule_popup .close_img{
	width: 54rpx;
	height: 54rpx;
	background: url(../../static/h/boss/close_img.png) no-repeat;
	background-size: 54rpx 54rpx;
}
.rule_popup .rule_desc{
	width: 460rpx;
	max-height: 740rpx;
	margin: 20rpx auto 0;
	overflow-y: auto;
	color: #F7D38B;
	font-size: 32rpx;
}


</style>
