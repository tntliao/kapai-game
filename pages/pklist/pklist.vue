<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('list.ranking')" urlline="pk"></topnav>
			<view class="line"></view>
			<!-- 排行榜 -->
			<view class="pklist_box">
				<view class="pk_list" v-for="(item,i) in phlist">
					<view class="pk_data">
						<view class="pk_name">{{$t('list.player')}}：{{item.address | ellipsis}}</view>
						<view class="pk_num">{{$t('list.pm')}}:{{item.pm}}  {{$t('list.jl')}}:{{item.jlje}}LOO</view>
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
			cardbg:'',
			urlbg:'../../static/h/cards/cards_bg.png',
			showtype:false,
			phlist:'',
		}
	},
	filters:{
		ellipsis(value){
			if (!value) return '';
			if (value.length > 12) {
				return value.slice(0,12) + '...'
			}
			return value
		}
	},
	mounted() {
		this.cardbg='background: url('+this.urlbg+');background-size:  150rpx 235rpx;';
		this.getpklist();
	},
	methods: {
		// 获取排行列表
		getpklist(){
			var that=this;
			var url="/wjpk/phb";
			var data={mode:1};
			function fnSuc(res){
				console.log(res.data)
				that.phlist=res.data;
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		// 关闭弹出层
		close(){
			this.showtype=false;
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
	margin: 20rpx 0 40rpx;
}
// 排行榜
.pklist_box{
	margin-top: 50rpx;
}
.pklist_box .pk_list{
	margin-top: 20rpx;
	width: 750rpx;
	height: 88rpx;
	background: url(../../static/h/invite/nav_bg.png) no-repeat;
	background-size: 750rpx 88rpx;
}
.pk_list .pk_data{
	width: 88%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.pk_list .pk_data .pk_name{
	font-size: 26rpx;
	color: #FFFFFF;
	line-height: 88rpx;
}
.pk_list .pk_data .pk_num{
	font-size: 26rpx;
	color: #F3A508;
	font-weight: bold;
	line-height: 88rpx;
}




</style>
