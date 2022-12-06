<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('invite.tit')" urlline="index"></topnav>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn" @click="toPage('extend')">{{$t('invite.extension')}}</view>
					<view class="nav_btn" @click="toPage('new')">{{$t('invite.new')}}</view>
					<view class="nav_btn active">{{$t('invite.team')}}</view>
				</view>
			</view>
			<!-- 公示 -->
			<view class="gs_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="box_tit">
					{{$t('invite.gongshi')}}<br>1{{$t('invite.integral')}}={{teamlist.price}}{{$t('invite.a')}}LOO
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.grgx')}}</view>
						<view class="info_num">{{teamlist.s8023}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.grmh')}}</view>
						<view class="info_num">{{teamlist.buybbox}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.jrqw')}}</view>
						<view class="info_num">{{teamlist.alls8022}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.jrgr')}}</view>
						<view class="info_num">{{teamlist.s8022}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.zrgr')}}</view>
						<view class="info_num">{{teamlist.lastJfSy}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.zrgx')}}</view>
						<view class="info_num">{{teamlist.lastGxdSy}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.gxlj')}}</view>
						<view class="info_num">{{teamlist.allGxdSy}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.tdyx')}}</view>
						<view class="info_num">{{teamlist.teamyxnum}}</view>
					</view>
				</view>
				<view class="data_box">
					<view class="info_box">
						<view class="info_name">{{$t('invite.tdlj')}}</view>
						<view class="info_num">{{teamlist.teamnum}}</view>
					</view>
				</view>
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
			teamlist:{},
		}
	},
	mounted() {
		this.teaminfor();
	},
	methods: {
		// 团队页面数据
		teaminfor(){
			var that=this;
			var url="/Tj/getteamjj";
			var data={lang:this.$i18n.locale,};
			function fnSuc(res){
				console.log(res.data)
				that.teamlist=res.data;
				// that.ztnum=res.data.ztnum;
			}
			that.Utils.tools.post(url,data,that,fnSuc);
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
	margin: 50rpx 0 90rpx 0;
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
// 公示
.gs_box{
	width: 750rpx;
	height: 1308rpx;
	background: url(../../static/h/invite/notice_bg.png) no-repeat;
	background-size: 750rpx 1308rpx;
}
.gs_box .box_tit{
	font-size: 36rpx;
	font-weight: 400;
	color: #F3A508;
	text-align: center;
	margin-top: 200rpx;
	margin-bottom: 50rpx;
}
.gs_box .data_box{
	width: 632rpx;
	height: 66rpx;
	background: url(../../static/h/invite/data_bg.png) no-repeat;
	background-size: 632rpx 66rpx;
	margin: 0 auto 32rpx;
}
.gs_box .data_box .info_box{
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	line-height: 66rpx;
}
.gs_box .data_box .info_box .info_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.gs_box .data_box .info_box .info_num{
	font-size: 36rpx;
	font-weight: 400;
	color: #F7D38B;
}





</style>
