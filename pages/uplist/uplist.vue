<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('list.uplist')" urlline="upgrade"></topnav>
			<view class="line"></view>
			<view class="tit_box">
				<view class="">{{$t('list.material')}}</view>
				<view class="">{{$t('list.syn')}}</view>
			</view>
			<!-- 出售记录 -->
			<scroll-view class="cs_list" scroll-y="true" @scrolltolower="dddd()">
				<view class="list_info" v-for="(item,i) in hclist" v-if="hclist.length>0">
					<!-- 0 -->
					<view class="card_jc">
						<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.cardlist[0].bg+'.png);background-size:  100rpx 156rpx;'">
							<view class="card_info">
								<view class="super_img"></view>
								<view class="card_name" v-if="item.cardlist[0].cardName!='RAT'&&item.cardlist[0].cardName!='DOG'&&item.cardlist[0].cardName!='OX'&&item.cardlist[0].cardName!='GOAT'&&item.cardlist[0].cardName!='PIG'&&item.cardlist[0].cardName!='LEO'">{{item.cardlist[0].cardName}}</view>
								<view class="card_rat" v-if="item.cardlist[0].cardName=='RAT'||item.cardlist[0].cardName=='DOG'||item.cardlist[0].cardName=='OX'||item.cardlist[0].cardName=='GOAT'||item.cardlist[0].cardName=='PIG'||item.cardlist[0].cardName=='LEO'">{{item.cardlist[0].cardName}}</view>
								<!-- <view class="card_dj">Ⅻ</view> -->
							</view>
							<!-- <view class="info_box">
								<view class="info_data">
									ss sss ssssss s sssssssssss ssssss
								</view>
							</view> -->
							<!-- <view class="atk_box">
								<view class="atk_data">
									ATK:2654551.45
								</view>
							</view> -->
						</view>
						<view class="card_img">
							<image :src="item.cardlist[0].img" mode=""></image>
						</view>
						
					</view>
					<view class="add_img"></view>
					<!-- 1 -->
					<view class="card_jc">
						<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.cardlist[1].bg+'.png);background-size:  100rpx 156rpx;'">
							<view class="card_info">
								<view class="super_img"></view>
								<view class="card_name" v-if="item.cardlist[1].cardName!='RAT'&&item.cardlist[1].cardName!='DOG'&&item.cardlist[1].cardName!='OX'&&item.cardlist[1].cardName!='GOAT'&&item.cardlist[1].cardName!='PIG'&&item.cardlist[1].cardName!='LEO'">{{item.cardlist[1].cardName}}</view>
								<view class="card_rat" v-if="item.cardlist[1].cardName=='RAT'||item.cardlist[1].cardName=='DOG'||item.cardlist[1].cardName=='OX'||item.cardlist[1].cardName=='GOAT'||item.cardlist[1].cardName=='PIG'||item.cardlist[1].cardName=='LEO'">{{item.cardlist[1].cardName}}</view>
								<!-- <view class="card_dj">Ⅻ</view> -->
							</view>
							<!-- <view class="info_box">
								<view class="info_data">
									ss sss ssssss s sssssssssss ssssss
								</view>
							</view> -->
							<!-- <view class="atk_box">
								<view class="atk_data">
									ATK:2654551.45
								</view>
							</view> -->
						</view>
						<view class="card_img">
							<image :src="item.cardlist[1].img" mode=""></image>
						</view>
						
					</view>
					<view class="add_img"></view>
					<!-- 2 -->
					<view class="card_jc">
						<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.cardlist[2].bg+'.png);background-size:  100rpx 156rpx;'">
							<view class="card_info">
								<view class="super_img"></view>
								<view class="card_name" v-if="item.cardlist[2].cardName!='RAT'&&item.cardlist[2].cardName!='DOG'&&item.cardlist[2].cardName!='OX'&&item.cardlist[2].cardName!='GOAT'&&item.cardlist[2].cardName!='PIG'&&item.cardlist[2].cardName!='LEO'">{{item.cardlist[2].cardName}}</view>
								<view class="card_rat" v-if="item.cardlist[2].cardName=='RAT'||item.cardlist[2].cardName=='DOG'||item.cardlist[2].cardName=='OX'||item.cardlist[2].cardName=='GOAT'||item.cardlist[2].cardName=='PIG'||item.cardlist[2].cardName=='LEO'">{{item.cardlist[2].cardName}}</view>
								<!-- <view class="card_dj">Ⅻ</view> -->
							</view>
							<!-- <view class="info_box">
								<view class="info_data">
									ss sss ssssss s sssssssssss ssssss
								</view>
							</view> -->
							<!-- <view class="atk_box">
								<view class="atk_data">
									ATK:2654551.45
								</view>
							</view> -->
						</view>
						<view class="card_img">
							<image :src="item.cardlist[2].img" mode=""></image>
						</view>
						
					</view>
					<view class="deng_img"></view>
					<!-- 合成得到卡 -->
					<view class="card_content">
						<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.newCard.bg+'.png);background-size:  150rpx 235rpx;'">
							<view class="card_info">
								<view class="super_img"></view>
								<view class="card_name" v-if="item.newCard.cardName!='RAT'&&item.newCard.cardName!='DOG'&&item.newCard.cardName!='OX'&&item.newCard.cardName!='GOAT'&&item.newCard.cardName!='PIG'&&item.newCard.cardName!='LEO'">{{item.newCard.cardName}}</view>
								<view class="card_rat"  v-if="item.newCard.cardName=='RAT'||item.newCard.cardName=='DOG'||item.newCard.cardName=='OX'||item.newCard.cardName=='GOAT'||item.newCard.cardName=='PIG'||item.newCard.cardName=='LEO'">{{item.newCard.cardName}}</view>
								<!-- <view class="card_dj">Ⅻ</view> -->
							</view>
							<!-- <view class="info_box">
								<view class="info_data">
									ss sss ssssss s sssssssssss ssssss
								</view>
							</view> -->
							<view class="atk_box">
								<view class="atk_data">
									ATK:{{item.newCard.atk}}
								</view>
							</view>
						</view>
						<view class="card_img">
							<image :src="item.newCard.img" mode=""></image>
						</view>
						
					</view>
					
				</view>
				
				
				<!-- 加载更多动画 -->
				<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText1"   :nomore-text="nomoreText" @loadmore="loadmore" />
			</scroll-view>
			
			
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
			mmbg:'',
			cardbg:'',
			urlbg:'../../static/h/cards/cards_bg.png',
			hclist:[],
			
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
		this.cardbg='background: url('+this.urlbg+');background-size:  150rpx 235rpx;';
		this.mmbg='background: url('+this.urlbg+');background-size:  100rpx 156rpx;';
		this.pageinit();
	},
	methods: {
		//页面初始化
		pageinit(){
			var that=this;
			if(this.nowpage==1){
				that.hclist=[];
			}
			var url = "/Gold/nftlist";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,}
			var fnSuc = function(res){
				console.log(res.data)
				console.log(res.data.data[0].cardlist[0].bg)
				that.hclist=that.hclist.concat(res.data.data);
				if(res.data.last_page<=that.nowpage){
					that.status='nomore'
				}else{
					that.status='loadmore'
				}
				that.maxpage=res.data.last_page
			}
			that.Utils.tools.post(url,data,that,fnSuc);
			
		},
		//拉到底部
		dddd(){
			if(this.nowpage>=this.maxpage){
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
			if(this.nowpage>=this.maxpage){
				return false;
			}
			this.nowpage++;
			this.pageinit();
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
.line{
	width: 750rpx;
	height: 2rpx;
	background: #F7D38B;
	margin: 20rpx 0 36rpx;
}
.tit_box{
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	font-size: 24rpx;
	font-weight: 800;
	color: #000000;
}
// 出售记录
.cs_list{
	height: 88vh;
}
.cs_list .list_info{
	width: 700rpx;
	height: 260rpx;
	background-color: rgba(0,0,0,0.5);
	margin: 0 auto 20rpx;
	display: flex;
	justify-content: flex-start;
}
.add_img{
	width: 38rpx;
	height: 38rpx;
	background: url(../../static/h/packs/add_img.png) no-repeat;
	background-size: 38rpx 38rpx;
	margin: auto 10rpx;
}
.deng_img{
	width: 52rpx;
	height: 52rpx;
	background: url(../../static/h/packs/deng_img.png) no-repeat;
	background-size: 52rpx 52rpx;
	margin: auto 10rpx;
}
.list_info .card_content{
	position: relative;
	padding: 8rpx 3rpx 8rpx 10rpx;
}
.card_content .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 150rpx;
	height: 235rpx;
	position: relative;
	z-index: 10;
}
.card_content .card_box .super_img{
	width: 50rpx;
	height: 16rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 50rpx 16rpx;
	position: absolute;
	top: 15rpx;
}
.card_content .card_box .card_rat{
	position: absolute;
	top: 10rpx;
	left: 52rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.3);
}
.card_content .card_box .card_name{
	position: absolute;
	top: 10rpx;
	left: 28rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.3);
}
.card_content .card_box .card_dj{
	position: absolute;
	top: 6rpx;
	right: 14rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #ffc847;
	transform: scale(0.8);
}
.card_content .card_box .info_box{
	width: 95rpx;
	height: 28rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 95rpx 28rpx;
	position: absolute;
	bottom: 22rpx;
	left: 21rpx;
	overflow: auto;
}
.card_content .card_box .info_box .info_data{
	font-size: 24rpx;
	line-height: 11rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.8);
}
.card_content .card_box .atk_box{
	width: 80rpx;
	height: 15rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 80rpx 15rpx;
	position: absolute;
	bottom: 0;
	left: 25rpx;
}
.card_content .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.4);
	position: absolute;
	top: -8rpx;
	left: 2rpx;
}
.card_content .card_img{
	width: 133rpx;
	height: 140rpx;
	position: absolute;
	top: 35rpx;
	left: 12rpx;
}
.card_content .card_img image{
	width: 133rpx;
	height: 140rpx;
}
// 基础
.list_info .card_jc{
	margin-top: 50rpx;
	position: relative;
	padding: 6rpx 2rpx 6rpx 8rpx;
}
.card_jc .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 100rpx;
	height: 156rpx;
	position: relative;
	z-index: 10;
}
.card_jc .card_box .super_img{
	width: 36rpx;
	height: 10rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 36rpx 10rpx;
	position: absolute;
	top: 10rpx;
}
.card_jc .card_box .card_rat{
	position: absolute;
	top: 2rpx;
	left: 32rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.3);
}
.card_jc .card_box .card_name{
	position: absolute;
	top: 2rpx;
	left: 16rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.3);
}
.card_jc .card_box .card_dj{
	position: absolute;
	top: 4rpx;
	right: 10rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #ffc847;
	transform: scale(0.8);
}
.card_jc .card_box .info_box{
	width: 64rpx;
	height: 18rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 64rpx 18rpx;
	position: absolute;
	bottom: 14rpx;
	left: 14rpx;
	overflow: auto;
}
.card_jc .card_box .info_box .info_data{
	font-size: 24rpx;
	line-height: 11rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.8);
}
.card_jc .card_box .atk_box{
	width: 54rpx;
	height: 10rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 54rpx 10rpx;
	position: absolute;
	bottom: 0;
	left: 16rpx;
}
.card_jc .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.4);
}
.card_jc .card_img{
	width: 88rpx;
	height: 94rpx;
	position: absolute;
	top: 22rpx;
	left: 8rpx;
}
.card_jc .card_img image{
	width: 88rpx;
	height: 94rpx;
}






</style>
