<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('invite.tit')" urlline="index"></topnav>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn" @click="toPage('extend')">{{$t('invite.extension')}}</view>
					<view class="nav_btn active">{{$t('invite.new')}}</view>
					<view class="nav_btn" @click="toPage('zhitui')">{{$t('zhitui.team')}}</view>
				</view>
			</view>
			<view class="tips_ing" v-if="fl1==0">
				<view class="box_info">
					<view class="info_name">{{$t('invite.buybox')}}（{{this.boxa}}/1）</view>
					<!-- <view class="info_data">赠送<span>1点体力</span>+赠送<span>1张门票</span></view> -->
					<view class="info_data">{{$t('invite.give')}}<span>1{{$t('invite.ticket')}}</span></view>
				</view>
				<view class="go_type" v-if="this.buybbox<1">{{$t('invite.not')}}</view>
				<view class="box_type" v-if="this.buybbox>=1" @click="lingqu1()">{{$t('invite.receive')}}</view>
			</view>
			<view class="tips_ed" v-if="fl1==1">
				<view class="box_info">
					<view class="info_name">{{$t('invite.buybox')}}（{{this.boxa}}/1）</view>
					<!-- <view class="info_data">赠送<span>1点体力</span>+赠送<span>1张门票</span></view> -->
					<view class="info_data">{{$t('invite.give')}}<span>1{{$t('invite.ticket')}}</span></view>
				</view>
				<view class="box_type">{{$t('invite.received')}}</view>
			</view>
			<view class="tips_ing"  v-if="fl2==0">
				<view class="box_info">
					<view class="info_name">{{$t('invite.buybox')}}（{{this.boxb}}/10）</view>
					<!-- <view class="info_data">赠送<span>5点体力</span>+赠送<span>5张门票</span></view> -->
					<view class="info_data">{{$t('invite.give')}}<span>5{{$t('invite.ticket')}}</span></view>
				</view>
				<view class="go_type" v-if="this.buybbox<10">{{$t('invite.not')}}</view>
				<view class="box_type" v-if="this.buybbox>=10" @click="lingqu2()">{{$t('invite.receive')}}</view>
			</view>
			<view class="tips_ed"  v-if="fl2==5">
				<view class="box_info">
					<view class="info_name">{{$t('invite.buybox')}}（{{this.boxb}}/10）</view>
					<!-- <view class="info_data">赠送<span>5点体力</span>+赠送<span>5张门票</span></view> -->
					<view class="info_data">{{$t('invite.give')}}<span>5{{$t('invite.ticket')}}</span></view>
				</view>
				<view class="box_type">{{$t('invite.received')}}</view>
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
			buybbox:'',
			boxa:0,
			boxb:0,
			fl1:'',
			fl2:'',
		}
	},
	mounted() {
		this.getfuliinfor();
		this.boxnum();
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
				that.fl1=res.data.fl1;
				that.fl2=res.data.fl2;
				console.log("页面初始化完成");
				uni.hideLoading();
				that.boxnum();
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		// 盲盒数量显示
		boxnum(){
			var that=this;
			if(that.buybbox>1){
				that.boxa=1;
			}else{
				that.boxa=that.buybbox;
			};
			if(that.buybbox>10){
				that.boxb=10;
			}else{
				that.boxb=that.buybbox;
			}
		},
		// 领取福利1
		lingqu1(){
			var that=this;
			var url="/Fuli/getfl1";
			var data={lang:this.$i18n.locale};
			function fnSuc(res){
				console.log(res.data)
				that.msg=res.data.msg;
				// console.log(that.msg)
				console.log("页面初始化完成");
				uni.hideLoading();
				uni.showToast({
					title:that.msg,
					icon:'none'
				})
			}
			that.Utils.tools.post(url,data,that,fnSuc);
			setTimeout (function(){
				that.getfuliinfor();
			},2000)
		},
		// 领取福利2
		lingqu2(){
			var that=this;
			var url="/Fuli/getfl2";
			var data={lang:this.$i18n.locale};
			function fnSuc(res){
				console.log(res.data)
				that.msg=res.data.msg;
				// console.log(that.msg)
				console.log("页面初始化完成");
				uni.hideLoading();
				uni.showToast({
					title:that.msg,
					icon:'none'
				})
			}
			that.Utils.tools.post(url,data,that,fnSuc);
			setTimeout (function(){
				that.getfuliinfor();
			},2000)
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
	font-size: 28rpx;
	font-weight: 400;
	color: #CFCFCF;
	margin: 24rpx 0;
}
.tips_ing .box_info .info_data span{
	font-size: 36rpx;
	font-weight: 400;
	color: #F3A508;
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
.tips_ing .go_type{
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
	font-size: 28rpx;
	font-weight: 400;
	color: #CFCFCF;
	margin: 24rpx 0;
}
.tips_ed .box_info .info_data span{
	font-size: 36rpx;
	font-weight: 400;
	color: #F3A508;
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






</style>
