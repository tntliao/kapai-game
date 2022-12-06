<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav title="PK记录" urlline="pk"></topnav>
			<view class="line"></view>
			<!-- 资产明细 -->
			<scroll-view class="cs_list" scroll-y="true" @scrolltolower="dddd()">
				<view class="list_info" v-for="(item,i) in hclist">
					<view class="zhan" style="height: 5px;"></view>
					<view class="list_data">
						<view class="data_name">{{$t('list.pkresult')}}</view>
						<view class="data_num data_yes" v-if="item.result==1">{{$t('list.pkwin')}}</view>
						<view class="data_num data_no" v-if="item.result==-1">{{$t('list.pkfail')}}</view>
					</view>
					<!--<view class="list_data">
						<view class="data_name">{{$t('list.pktype')}}</view>
						<view class="data_num" v-if="item.pkmode==1">1V1</view>
						<view class="data_num" v-if="item.pkmode==2">2V2</view>
						<view class="data_num" v-if="item.pkmode==3">3V3</view>
					</view>-->
					<view class="list_data">
						<view class="data_name">{{$t('list.pkreward')}}</view>
						<view class="data_num" v-if="item.result==1">{{item.reward}} LOO</view>
						<view class="data_num" v-if="item.result==-1">{{$t('list.nothing')}}</view>
					</view>
					<view class="list_data">
						<view class="data_name">{{$t('list.pktime')}}</view>
						<view class="data_num">{{item.addtime}}</view>
					</view>
					
				</view>
				<!-- 加载更多动画 -->
				<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText1"   :nomore-text="nomoreText" @loadmore="loadmore" />
			</scroll-view>
			
			
			
			
			
			
			
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
			var url = "/Listall/getpvplist";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,}
			var fnSuc = function(res){
				console.log(res.data)
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

// 资产明细
.cs_list{
	height: 88vh;
}
.cs_list .list_info{
	width: 700rpx;
	height: 200rpx;
	background-color: rgba(0,0,0,0.5);
	margin: 0 auto 20rpx;
}
.cs_list .list_info .list_data{
	width: 90%;
	margin: 6rpx auto 0;
	display: flex;
	justify-content: space-between;
}
.cs_list .list_info .data_name{
	color: #d3d3d3;
	font-size: 28rpx;
}
.cs_list .list_info .data_num{
	color: #d3d3d3;
	font-size: 28rpx;
}
.cs_list .list_info .data_yes{
	color: #F7D38B;
	font-size: 28rpx;
}
.cs_list .list_info .data_no{
	color: #808080;
	font-size: 28rpx;
}




</style>
