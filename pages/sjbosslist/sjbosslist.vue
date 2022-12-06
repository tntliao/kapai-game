<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('list.world')" urlline="sjboss"></topnav>
			<view class="line"></view>
			<!-- 出售记录 -->
			<view class="cs_list">
				<view class="list_info" v-for="(item,i) in tzlist">
					<view class="card_content">
						<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.card.bg+'.png);background-size: 150rpx 235rpx;'">
							<view class="card_info">
								<view class="super_img" v-if="item.card.cardName=='LOONG'"></view>
								<view class="card_name" v-if="item.card.cardName!='RAT'&&item.card.cardName!='DOG'&&item.card.cardName!='OX'&&item.card.cardName!='GOAT'&&item.card.cardName!='PIG'&&item.card.cardName!='LEO'">{{item.card.cardName}}</view>
								<view class="card_rat" v-if="item.card.cardName=='RAT'||item.card.cardName=='DOG'||item.card.cardName=='OX'||item.card.cardName=='GOAT'||item.card.cardName=='PIG'||item.card.cardName=='LEO'">{{item.card.cardName}}</view>
								<!-- <view class="card_dj">Ⅻ</view> -->
							</view>
							<!-- <view class="info_box">
								<view class="info_data">
									ss sss ssssss s sssssssssss ssssss ssssssssssss sssssss sss ssss sss
								</view>
							</view> -->
							<!-- <view class="atk_box">
								<view class="atk_data">
									ATK:2654551.45
								</view>
							</view> -->
						</view>
						<view class="card_img">
							<image :src="item.card.img" mode=""></image>
						</view>
						<!-- 状态 -->
						<view class="list_type" v-if="item.isok==0">{{$t('list.fail')}}</view>
						<view class="succ_type" v-if="item.isok==1">{{$t('list.succ')}}</view>
					</view>
					<view class="info_right">
						<!-- <view class="info_data">
							<view class="data_name">BOSS：</view>
							<view class="data_num" v-if="item.taId==1">丛林宝库</view>
							<view class="data_num" v-if="item.taId==2">冰雪宝库</view>
							<view class="data_num" v-if="item.taId==3">恶龙宝库</view>
						</view> -->
						<view class="info_data">
							<view class="data_name">{{$t('list.time')}}：</view>
							<view class="data_num">{{item.addtime}}</view>
						</view>
						<view class="info_data">
							<view class="data_name" v-if="item.status==0">{{$t('list.join')}}</view>
							<view class="data_name" v-if="item.status==1">{{$t('list.get')}}：</view>
							<!-- <view class="data_num time_box">1000LOO</view> -->
							<view class="data_num time_box" v-if="item.status==1">{{item.je}} LOO</view>
							
						</view>
					</view>
				</view>
				<!-- 加载更多动画 -->
				<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText1"   :nomore-text="nomoreText" @loadmore="loadmore" />
			</view>
			
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
			cardbg:'',
			urlbg:'../../static/h/cards/cards_bg.png',
			tzlist:[],
			
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
		this.cardbg='background: url('+this.urlbg+');background-size:  150rpx 235rpx;'
		this.pageinit();
	},
	methods: {
		//页面初始化
		pageinit(){
			var that=this;
			if(this.nowpage==1){
				that.tzlist=[];
			}
			var url = "/Listall/bosslist";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale}
			var fnSuc = function(res){
				console.log(res)
				that.tzlist=that.tzlist.concat(res.data.data);
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
		onReachBottom(){
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
	// overflow: auto;
}
.app_bg{
	width: 750rpx;
	min-height: 800rpx;
	background: url(../../static/h/mgshop/pages_bg.png) no-repeat;
	background-size: 750rpx 800rpx;
}
.line{
	width: 750rpx;
	height: 2rpx;
	background: #F7D38B;
	margin: 20rpx 0 40rpx;
}
// 出售记录
.cs_list{
	overflow: auto;
}
.cs_list .list_info{
	width: 700rpx;
	height: 260rpx;
	background-color: rgba(0,0,0,0.5);
	margin: 0 auto 20rpx;
	display: flex;
	justify-content: flex-start;
}
.list_info .card_content{
	position: relative;
	padding: 8rpx 3rpx 8rpx 10rpx;
}
.list_info .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 150rpx;
	height: 235rpx;
	position: relative;
	z-index: 10;
}
.list_info .card_box .super_img{
	width: 50rpx;
	height: 16rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 50rpx 16rpx;
	position: absolute;
	top: 15rpx;
}
.list_info .card_box .card_rat{
	position: absolute;
	top: 12rpx;
	left: 48rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.3);
}
.list_info .card_box .card_name{
	position: absolute;
	top: 12rpx;
	left: 26rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.3);
}
.list_info .card_box .card_dj{
	position: absolute;
	top: 6rpx;
	right: 14rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #ffc847;
	transform: scale(0.8);
}
.list_info .card_box .info_box{
	width: 95rpx;
	height: 28rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 95rpx 28rpx;
	position: absolute;
	bottom: 22rpx;
	left: 21rpx;
	overflow: auto;
}
.list_info .card_box .info_box .info_data{
	font-size: 24rpx;
	line-height: 11rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.8);
}
.list_info .card_box .atk_box{
	width: 80rpx;
	height: 15rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 80rpx 15rpx;
	position: absolute;
	bottom: 0;
	left: 25rpx;
}
.list_info .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.4);
}
.list_info .card_img{
	width: 133rpx;
	height: 140rpx;
	position: absolute;
	top: 35rpx;
	left: 12rpx;
}
.list_info .card_img image{
	width: 133rpx;
	height: 140rpx;
}
.list_info .list_type{
	width: 114rpx;
	height: 36rpx;
	background: linear-gradient(360deg, #686767 0%, #BFBFBF 100%);
	border-radius: 12rpx 12rpx 0rpx 0rpx;
	font-size: 24rpx;
	font-weight: 800;
	color: #FFFFFF;
	text-align: center;
	line-height: 36rpx;
	position: absolute;
	bottom: 6rpx;
	left: 22rpx;
	z-index: 10;
}
.list_info .succ_type{
	width: 114rpx;
	height: 36rpx;
	background: linear-gradient(360deg, #F7D38B 0%, #815903 100%);
	border-radius: 12rpx 12rpx 0rpx 0rpx;
	font-size: 24rpx;
	font-weight: 800;
	color: #FFFFFF;
	text-align: center;
	line-height: 36rpx;
	position: absolute;
	bottom: 6rpx;
	left: 22rpx;
	z-index: 10;
}
.list_info .info_right{
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.list_info .info_right .info_data{
	// width: 250rpx;
	width: 500rpx;
	margin-top: 30rpx;
}
.list_info .info_right .info_data .data_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #AEAEAE;
}
.list_info .info_right .info_data .data_num{
	margin-top: 10rpx;
	font-size: 28rpx;
	font-weight: 800;
	color: #F7D38B;
}
.list_info .info_right .info_data .time_box{
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
}





</style>
