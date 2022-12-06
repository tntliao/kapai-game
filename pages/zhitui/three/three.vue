<template>
	<view class="secon-level-page">
		<!-- 顶部 -->
		<view class="secon-level-top">
			<topnav :title="user" urlline='secondLevel'></topnav>
			<scroll-view scroll-top="0" scroll-y="true" class="scroll-Y">
				<view class="secon-level-list-box" cellpadding="0" cellspacing="0">
					<view class="list-box-top">{{type==0?$t('sdt'):$t('sdc')}}</view>
					<view class="table-list">
						<table>
							<tr>
							<td>{{$t('zhitui.time')}}</td>
							<td>{{$t('zhitui.add')}}</td>
							<td>{{type==0?$t('zhitui.income'):$t('czje')}}(LOO)</td>
							</tr>
							<tr v-for="item,index in zt2arr" :key="index">
								<td>{{item.addtime}}</td>
								<td>{{item.userId}}</td>
								<td>{{type==0?item.dlsy:item.je}}</td>
							</tr>
						</table>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import topnav from '@/components/topnav/topnav.vue';
	export default {
		props: [],
		onLoad(option) {
			this.type = option.type
			this.user = option.user
		},
		data() {
			return {
				// 接收外面传进来的用户账号
				type: 0,
				user: '',
				zt2arr: []
			};
		},
		methods: {
			getinfor() {
				if(this.type==0){
					var that = this;
					var url = "/Pageinit/clgame2";
					var data = {
							lang: this.$i18n.locale,
							pid: this.user
						},
						fnSuc = (res) => {
							console.log("数据3", res.data);
							this.zt2arr = res.data.zt2arr
						}
					that.Utils.tools.post(url, data, that, fnSuc);
				}else {
					var that=this
					var url='/Pageinit/clgamecz'
					var data={
						lang:this.$i18n.locale,
						pid:this.user
					}
					function czList(res){
						that.zt2arr=res.data.czArr
					} 
					that.Utils.tools.post(url, data, that, czList);
				}
			
			},
		},
		onShow() {
			this.getinfor();
		}
	}
</script>

<style lang="scss">
	.secon-level-page {
		width: 100%;
		height: 100vh;
		background: #181513;
		color: #fff;
	}

	.secon-level-top {
		width: 100%;
		height: 800rpx;
		background: url(@/static/h/mgshop/pages_bg.png)center/cover no-repeat;
	}

	.scroll-Y {
		width: 100%;
		height: 78vh;
		margin-top: 90rpx;
	}

	.secon-level-list-box {
		width: 632rpx;

		padding: 20rpx 0;
		margin: 0 auto;
		background: url(@/static/h/cards/type_bg.png) no-repeat;
		background-size: 100% 100%;

		.list-box-top {
			width: 100%;
			height: 76rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36rpx;
		}

		table {
			width: 100%;
			text-align: center;
			font-size: 26rpx;
		}

		.table-list {
			width: 100%;
			height: 904rpx;
			overflow-y: scroll;
		}
	}
</style>
