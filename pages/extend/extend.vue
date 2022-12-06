<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('invite.tit')" urlline="index"></topnav>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn active">{{$t('invite.extension')}}</view>
					<view class="nav_btn" @click="toPage('new')">{{$t('invite.new')}}</view>
					<view class="nav_btn" @click="toPage('zhitui')">{{$t('zhitui.team')}}</view>
				</view>
			</view>
			<view class="tips_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="tips_info">
					25%{{$t('invite.tg')}}=<br>{{$t('invite.gena')}} 18%、{{$t('invite.genb')}} 4%、{{$t('invite.genc')}} 3%.
				</view>
			</view>
			<view class="tips_name">{{$t('invite.condition')}}</view>
			<view class="tips_ing">
				<view class="box_info">
					<view class="info_name">{{$t('invite.tja')}}</view>
					<view class="info_data">{{$t('invite.buyone')}}</view>
				</view>
				<!-- <view class="box_type">未完成</view> -->
			</view>
			<!-- <view class="tips_ed">
				<view class="box_info">
					<view class="info_name">条件一</view>
					<view class="info_data">购买盲盒（1/1）</view>
				</view>
				<view class="box_type">已完成</view>
			</view> -->
			<view class="tips_ing">
				<view class="box_info">
					<view class="info_name">{{$t('invite.tjb')}}</view>
					<view class="info_data">{{$t('invite.buyten')}}</view>
				</view>
				<!-- <view class="box_type">已完成</view> -->
			</view>
			<!-- 获得的收益 -->
			<view class="sy_box">
				{{$t('invite.get')}} {{sy}} {{$t('invite.box')}}
			</view>
			<!-- <view class="link_box">
				<view class="link_desc">{{yqurl | ellipsis}}</view>
				<view class="copy_box">
					<view class="copy_img"></view>
					<view class="copy_desc" @click="copyToClipBoard('yqurl')">{{$t('invite.copy')}}</view>
				</view>
			</view> -->
			
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
			yqurl:this.config.baseUrl,
			buybbox:'',
			sy:'',
		}
	},
	filters:{
		ellipsis(value){
			if (!value) return '';
			if (value.length > 24) {
				return value.slice(0,24) + '...'
			}
			return value
		}
	},
	mounted() {
		this.pageinit();
		this.getfuliinfor();
	},
	methods: {
		// 获取福利基础信息
		getfuliinfor(){
			var that=this;
			var url="/Fuli/getflinfo";
			var data={lang:this.$i18n.locale};
			function fnSuc(res){
				console.log(res.data)
				that.buybbox=res.data.buybbox;
				console.log("页面初始化完成");
				uni.hideLoading();
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//页面初始化
		pageinit(){
			var that=this;
			//锤炼属性点
			var url="/tj/getteaminfo";
			var data={lang:this.$i18n.locale,};
			function fnSuc(res){
				console.log(res)
				// that.ztnum=res.data.ztnum;
				// that.teamnum=res.data.teamnum;
				that.sy=res.data.sy;
				// that.qr=res.data.qr;
				that.yqurl = that.config.baseUrl+"/#/?pid="+uni.getStorageSync("userId");
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		// 复制链接
		copyToClipBoard(id){
			this.Utils.tools.copyToClipBoard(this.yqurl);
			uni.showToast({
				title:'succcess',
				icon:'success',
				duration:2000
			})
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
.tips_box{
	width: 692rpx;
	height: 160rpx;
	background: url(../../static/h/invite/tips_bg.png) no-repeat;
	background-size: 692rpx 160rpx;
	margin: 30rpx auto 20rpx;
	font-size: 32rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
}
.tips_box .tips_info{
	margin-top: 34rpx;
}
.tips_name{
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
}
// 去完成
.tips_ing{
	width: 686rpx;
	height: 124rpx;
	background: url(../../static/h/invite/ing_bg.png) no-repeat;
	background-size: 686rpx 124rpx;
	margin: 30rpx auto 0;
	display: flex;
	justify-content: space-between;
}
.tips_ing .box_info{
	margin: 0 0 0 20rpx;
}
.tips_ing .box_info .info_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #CFCFCF;
	margin: 12rpx 0;
}
.tips_ing .box_info .info_data{
	font-size: 32rpx;
	font-weight: 400;
	color: #F3A508;
	margin: 24rpx 0;
}
.tips_ing .box_type{
	width: 238rpx;
	height: 96rpx;
	background: url(../../static/h/invite/ing_type.png) no-repeat;
	background-size: 238rpx 96rpx;
	margin: auto 0;
	font-size: 32rpx;
	font-weight: 600;
	color: #F7D38B;
	text-align: center;
	line-height: 96rpx;
}
// 已完成
.tips_ed{
	width: 686rpx;
	height: 124rpx;
	background: url(../../static/h/invite/ed_bg.png) no-repeat;
	background-size: 686rpx 124rpx;
	margin: 30rpx auto 0;
	display: flex;
	justify-content: space-between;
}
.tips_ed .box_info{
	margin: 0 0 0 20rpx;
}
.tips_ed .box_info .info_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #CFCFCF;
	margin: 12rpx 0;
}
.tips_ed .box_info .info_data{
	font-size: 32rpx;
	font-weight: 400;
	color: #CFCFCF;
	margin: 24rpx 0;
}
.tips_ed .box_type{
	width: 238rpx;
	height: 96rpx;
	background: url(../../static/h/invite/ed_type.png) no-repeat;
	background-size: 238rpx 96rpx;
	margin: auto 0;
	font-size: 32rpx;
	font-weight: 600;
	color: #FFFFFF;
	text-align: center;
	line-height: 96rpx;
}
// 获得的收益
.sy_box{
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


.link_box{
	margin: 50rpx auto 0;
	width: 686rpx;
	height: 76rpx;
	background: url(../../static/h/invite/link_bg.png) no-repeat;
	background-size: 686rpx 76rpx;
	display: flex;
	justify-content: space-between;
}
.link_box .link_desc{
	margin-left: 20rpx;
	font-size: 28rpx;
	font-weight: 500;
	color: #F3A508 ;
	line-height: 66rpx;
}
.link_box .copy_box{
	margin: 16rpx 20rpx 0 0;
	display: flex;
	justify-content: flex-start;
}
.link_box .copy_box .copy_img{
	margin-right: 10rpx;
	width: 32rpx;
	height: 32rpx;
	background: url(../../static/h/invite/copy.png) no-repeat;
	background-size: 32rpx 32rpx;
}
.link_box .copy_box .copy_desc{
	font-size: 28rpx;
	font-weight: 500;
	color: #F3A508 ;
}





</style>
