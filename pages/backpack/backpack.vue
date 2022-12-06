<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('pack.tit')" urlline="index"></topnav>
			<!-- 记录框 -->
			<view class="list_box">
				<view class="trade_list" @click="toPage('pmlist')">{{$t('pack.auctionlist')}} ></view>
				<!-- <view class="up_list" @click="toPage('uplist')">升级记录 ></view> -->
			</view>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn active">{{$t('pack.card')}}</view>
					<view class="nav_btn" @click="toPage('upgrade')">{{$t('pack.up')}}</view>
					<view class="nav_btn" @click="toPage('zhiya')">{{$t('pack.zhiya')}}</view>
				</view>
			</view>
			<!-- <view class="allatk_box">{{$t('pack.total')}}：{{allatk}}</view> -->
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
							<view class="sel_name">{{$t('pack.type')}}</view>
							<view class="xjt_img"></view>
						</view>
					</view>
					<view class="list_btn"></view>
				</view>
				<view class="line"></view>
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
							<view class="btn_box">
								<view class="btn_bg"  @click="openshou(item.id,item.sn,item.bg,item.cnImg,item.atk,item.cardName)">{{$t('pack.sell')}}</view>
								<view class="btn_bg" @click="openpai(item.id,item.sn,item.bg,item.cnImg,item.atk,item.cardName)">{{$t('pack.auction')}}</view>
							</view>
						</view>
						
					</view>
					<!-- 加载更多动画 -->
					<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"   :nomore-text="nomoreText" @loadmore="loadmore" />
				</scroll-view>
				
			</view>
			
			<!-- 出售弹出层 -->
			<u-overlay :show="showsale" opacity="0.8">
				<view class="sale_popup">
					<view class="sale_bg">
						<view class="popup_top">
							<view class="close_img" @click="showsale=false"></view>
						</view>
						<view class="card_content">
							<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+shoubg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="shoucardName=='LOONG'"></view>
									<view class="card_rat" v-if="shoucardName=='RAT'||shoucardName=='DOG'||shoucardName=='OX'||shoucardName=='GOAT'||shoucardName=='PIG'||shoucardName=='LEO'">{{shoucardName}}</view>
									<view class="card_name" v-if="shoucardName!='RAT'&&shoucardName!='DOG'&&shoucardName!='OX'&&shoucardName!='GOAT'&&shoucardName!='PIG'&&shoucardName!='LEO'">{{shoucardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<!-- <view class="info_box">
									<view class="info_data">
										ss sss ssssss s sssssssssss
									</view>
								</view> -->
								<view class="atk_box">
									<view class="atk_data">ATK:{{shouatk}}</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="shouImg" mode=""></image>
							</view>
							
						</view>
						<view class="input_box">
							<u--input :placeholder="$t('pack.sellprice')" border="node" v-model="csnum" @change="change" color="#FFFFFF">
								<view class="coin_name" slot="suffix">LOO</view>
							</u--input>
						</view>
						<view class="btnok_bg" @click="saledo()">{{$t('pack.confirm')}}</view>
					</view>
				</view>
			</u-overlay>
			<!-- 挂拍弹出层 -->
			<u-overlay :show="showpai" opacity="0.8">
				<view class="pai_popup">
					<view class="pai_bg">
						<view class="popup_top">
							<view class="close_img" @click="showpai=false"></view>
						</view>
						<view class="card_content">
							<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+shoubg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="shoucardName=='LOONG'"></view>
									<view class="card_rat" v-if="shoucardName=='RAT'||shoucardName=='DOG'||shoucardName=='OX'||shoucardName=='GOAT'||shoucardName=='PIG'||shoucardName=='LEO'">{{shoucardName}}</view>
									<view class="card_name" v-if="shoucardName!='RAT'&&shoucardName!='DOG'&&shoucardName!='OX'&&shoucardName!='GOAT'&&shoucardName!='PIG'&&shoucardName!='LEO'">{{shoucardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<!-- <view class="info_box">
									<view class="info_data">
										ss sss ssssss s sssssssssss
									</view>
								</view> -->
								<view class="atk_box">
									<view class="atk_data">ATK:{{shouatk}}</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="shouImg" mode=""></image>
							</view>
							
						</view>
						<view class="input_box">
							<u--input :placeholder="$t('pack.sellprice')" border="node" v-model="qpPrice" @change="change" color="#FFFFFF">
								<view class="coin_name" slot="suffix">LOO</view>
							</u--input>
						</view>
						<view class="input_box">
							<u--input :placeholder="$t('pack.time')" border="node" v-model="endtime" @change="change" color="#FFFFFF">
								<view class="coin_name" slot="suffix">{{$t('pack.hour')}}</view>
							</u--input>
						</view>
						<view class="input_box">
							<u--input :placeholder="$t('pack.add')" border="node" v-model="stepPrice" @change="change" color="#FFFFFF">
								<view class="coin_name" slot="suffix">LOO</view>
							</u--input>
						</view>
						<view class="btnok_bg" @click="paimai()">{{$t('pack.ok')}}</view>
					</view>
				</view>
			</u-overlay>
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
			showtype:false,
			showsale:false,
			csnum:'',
			showpai:false,
			melist:'',
			typelist:'',
			baseCardId:0,
			allatk:'',
			tokenId:'',
			cardId:'',//售卖卡id
			shoubg:'',//背景
			shouImg:'',//img
			shouatk:'',//atk
			shoucardName:'',//name
			qpPrice:'',//拍卖底价
			stepPrice:'',//最低加价
			endtime:'',//拍卖时间
			
			atkpx:0,//战斗力排序
			showjt:false,
			showdj:false,
			cardRank:0,//级别排序
			
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
		this.getcardlist();
		this.getsx();
		this.pageinit();
	},
	methods: {
		// 选择等级
		xzdengji(){
			this.nowpage=1;
			this.getcardlist();
			this.showdj=false;
		},
		// 战斗力排序
		atklist(){
			this.nowpage=1;
			var that=this;
			this.showjt=!this.showjt;
			this.atkpx=!this.atkpx;
			this.melist=[]
			this.getcardlist();
		},
		// 打开拍卖
		openpai(cardId,tokenId,shoubg,shouImg,shouatk,shoucardName){
			this.cardId=cardId;
			this.tokenId=tokenId;
			this.shoubg=shoubg;
			this.shouImg=shouImg;
			this.shouatk=shouatk;
			this.shoucardName=shoucardName;
			// this.shouquan();
			// if (this.isSell) {
			// 	this.showpai=true;
			// }
			this.showpai=true;
		},
		// 拍卖
		paimai(){
			var that = this;
			let url="/bag/pmcard"
			let data={cardId:that.cardId,qpPrice:that.qpPrice,stepPrice:that.stepPrice,endtime:that.endtime}
			this.Utils.tools.luch_post(url,data).then(res=>{
				console.log(res)
				if(res.status==1){
					this.Utils.tools.showmsg(that.$t("tips.listing"));
				}else if(res.status==-1){
					this.Utils.tools.showmsg(that.$t("tips.nosale"));
				}
			}).catch(err=>{console.log})
			this.showpai=false;
			this.getcardlist();
		},
		// 打开售卖
		openshou(cardId,tokenId,shoubg,shouImg,shouatk,shoucardName){
			this.cardId=cardId;
			this.tokenId=tokenId;
			this.shoubg=shoubg;
			this.shouImg=shouImg;
			this.shouatk=shouatk;
			this.shoucardName=shoucardName;
			// this.shouquan();
			// if (this.isSell) {
			// 	this.showshou=true;
			// }
			this.showsale=true;
		},
		// 售卖
		saledo(){
			var that = this;
			let url="/bag/salecard"
			let data={price:that.csnum,cardId:that.cardId,}
			this.Utils.tools.luch_post(url,data).then(res=>{
				console.log(res)
				if(res.status==1){
					this.Utils.tools.showmsg(that.$t("tips.listing"));
				}else if(res.status==-1){
					this.Utils.tools.showmsg(that.$t("tips.nosale"));
				}
			}).catch(err=>{console.log})
			this.showsale=false;
			this.getcardlist();
		},
		//页面初始化
		pageinit(){
			var that=this;
			//锤炼属性点
			var url="/pageinit/home";
			var pid=uni.getStorageSync('pid');
			let wallet=uni.getStorageSync('wallet')
			let walletname=uni.getStorageSync('walletname')
			this.wallet = wallet;
			this.walletname = walletname;
			var data={lang:this.$i18n.locale,pid:pid,wallet:wallet};
			function fnSuc(res){
				console.log(res.data)
				that.userId=res.data.userId;
				that.symbol=res.data.symbol;
				that.allatk=res.data.allatk;
				//用户ID token
				uni.setStorageSync("userId",that.userId);
				uni.setStorageSync("token",res.data.token);
				that.symbol = uni.getStorageSync('symbol')
				
				console.log("页面初始化完成");
				uni.hideLoading();
			}
			that.Utils.tools.post(url,data,that,fnSuc);
			// that.sysinit();
			// this.getcardlist();
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
		// 获取我的卡牌列表
		getcardlist(){
			var that=this;
			if(this.nowpage==1){
				that.melist=[];
			}
			var url = "/bag/getucardlist";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,baseCardId:that.baseCardId,atk:this.atkpx,cardRank:this.cardRank,}
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
		change(){
			console.log(1)
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
// 记录框
.list_box{
	display: flex;
	justify-content: space-between;
	width: 90%;
	margin: 40rpx auto 0;
	font-size: 30rpx;
	font-weight: 400;
	color: #F7D38B;
}
// 导航栏
.nav_bg{
	width: 710rpx;
	height: 158rpx;
	background: url(../../static/h/packs/nav_bg.png) no-repeat;
	background-size: 710rpx 158rpx;
	margin: 0 auto;
}
.nav_bg .nav_box{
	display: flex;
	justify-content: center;
}
.nav_bg .nav_box .nav_btn{
	width: 50%;
	font-size: 32rpx;
	font-weight: 400;
	color: #F7D38B;
	text-align: center;
	margin-top: 80rpx;
	line-height: 76rpx;
}
.nav_bg .nav_box .nav_btn.active{
	width: 416rpx;
	height: 70rpx;
	background: url(../../static/h/packs/active_bg.png) no-repeat;
	background-size: 260rpx 70rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F3A508;
}
.allatk_box{
	width: 620rpx;
	height: 125rpx;
	background: url(../../static/h/packs/allatk_bg.png) no-repeat;
	background-size: 620rpx 125rpx;
	margin: 26rpx auto 12rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #D99E28;
	text-align: center;
	line-height: 150rpx;
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
	width: 664rpx;
	margin: 0 auto;
	display: flex;
	// justify-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
}
.content_box .card_content{
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.content_box .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.content_box .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.content_box .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
// 鼠
.content_box .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.content_box .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.content_box .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.content_box .card_box .info_box .info_data{
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
	color: #FF9000;
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
.card_content .btn_box{
	display: flex;
	justify-content: flex-start;
}
.card_content .btn_box .btn_bg{
	width: 120rpx;
	height: 48rpx;
	background: url(../../static/h/packs/btn_bg.png) no-repeat;
	background-size: 120rpx 48rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 48rpx;
	margin: 16rpx 8rpx 0;
}
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
// 挂拍弹出层
.pai_popup{
	margin: auto 0;
}
.pai_popup .pai_bg{
	width: 700rpx;
	height: 1200rpx;
	background: url(../../static/h/packs/salepopup_bg.png) no-repeat;
	background-size: 700rpx 1200rpx;
	margin: 0 auto;
}
.pai_popup .popup_top{
	display: flex;
	justify-content: flex-end;
}
.pai_popup .close_img{
	width: 54rpx;
	height: 54rpx;
	background: url(../../static/h/boss/close_img.png) no-repeat;
	background-size: 54rpx 54rpx;
}
.pai_popup .card_content{
	margin: 0rpx auto 0;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	// box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	// border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.pai_popup .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.pai_popup .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.pai_popup .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.pai_popup .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.pai_popup .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.pai_popup .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.pai_popup .card_box .info_box .info_data{
	font-size: 24rpx;
	line-height: 22rpx;
	text-align: center;
	color: #C79A52;
}
.pai_popup .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.pai_popup .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #FF9000;
	transform: scale(0.6);
}
.pai_popup .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.pai_popup .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.pai_popup .input_box{
	width: 380rpx;
	height: 68rpx;
	background: url(../../static/h/packs/input_bg.png) no-repeat;
	background-size: 380rpx 68rpx;
	margin: 30rpx auto;
}
.pai_popup .input_box .coin_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.pai_popup .btnok_bg{
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




</style>
