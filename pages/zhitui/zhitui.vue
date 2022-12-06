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
					<view class="nav_btn active">{{$t('zhitui.team')}}</view>
				</view>
			</view>
			<scroll-view scroll-top="0" scroll-y="true" class="scroll-Y">

				<!-- 公示 推荐奖励总收益-->
				<view class="gs_box">
					<view class="zhan" style="height: 1px;"></view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.recomm')}}</view>
							<view class="info_num">{{sqsy}}LOO</view>
						</view>
						<view class="info_box">
							<view class="info_name">{{ $t('zcz') }}</view>
							<view class="info_num">{{allcz}}</view>
						</view>
						<view class="info_box">
							<view class="info_name">{{ $t('ztx') }}</view>
							<view class="info_num">{{alltx}}</view>
						</view>
					</view>
					<!-- 团队总人数 -->
					<drow :title="$t('tdt')" :arr1="type" :arr2="number" @click.native='reqList(true)'></drow>
					<!-- 团队总充值 -->
					<drow :title="$t('tdc')" :arr1="type1" :arr2="number1" @click.native='reqList(false)'></drow>
					<!-- 团队总提现 -->
					<!-- <drow title="团队总提现" :arr1="type2" :arr2="number2"></drow> -->
					<!-- 团队总人数 -->
					<!-- <view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.size')}}</view>
							<view class="info_num">{{allPeople}}</view>
							<u-icon size="16" color="#b39057" name="arrow-down"></u-icon>
						</view>
					</view> -->

					<!-- <view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.allcz')}}</view>
							<view class="info_num">{{allcz}}</view>
						</view>
					</view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.alltx')}}</view>
							<view class="info_num">{{alltx}}</view>
						</view>
					</view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.ztnum')}}</view>
							<view class="info_num">{{ztnum}}</view>
						</view>
					</view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.p1allcz')}}</view>
							<view class="info_num">{{p1allcz}}</view>
						</view>
					</view> -->

					<!-- <view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.p1alltx')}}</view>
							<view class="info_num">{{p1alltx}}</view>
						</view>
					</view> -->
					<!-- 直推列表 -->
					<view class="list_box">
						<view class="list_top">{{types==0?$t('ydt'):$t('ydc')}}</view>
						<view class="list_infor">
							<view class="infor_title">
								<view class="tit_name time">{{$t('zhitui.time')}}</view>
								<view class="tit_name dizhi">{{$t('zhitui.add')}}</view>
								<view class="tit_name profit">{{types==0?$t('zhitui.income'):$t('czje')}}(LOO)</view>
							</view>
							<scroll-view class="data_desc" scroll-y="true">
								<view class="data_bg act_x" v-for="(item,i) in ztarr" :key="i"
									@click="jup(`/pages/zhitui/secondLevel/secondLevel`,item.userId,types)">
									<view class="data_infor">
										<view class="data_num time">{{item.addtime}}</view>
										<view class="data_num dizhi">{{item.userId}}</view>
										<view class="data_num profit">{{types==0?item.dlsy:item.je}}</view>
										<view class="" style='margin-left:5rpx'>
											>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>

					<!-- <view class="data_box" style="margin-top: 30rpx;">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.zt2num')}}</view>
							<view class="info_num">{{zt2list.length}}</view>
						</view>
					</view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.p2allcz')}}</view>
							<view class="info_num">{{p2allcz}}</view>
						</view>
					</view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">{{$t('zhitui.p2alltx')}}</view>
							<view class="info_num">{{p2alltx}}</view>
						</view>
					</view> -->
					<!-- 直推列表 2代列表-->
					<!-- <view class="list_box">
						<view class="list_top">{{$t('zhitui.zt2list')}}</view>
						<view class="list_infor">
							<view class="infor_title">
								<view class="tit_name time">{{$t('zhitui.time')}}</view>
								<view class="tit_name dizhi">{{$t('zhitui.add')}}</view>
								<view class="tit_name profit">{{$t('zhitui.income')}}(LOO)</view>
							</view>
							<scroll-view class="data_desc" scroll-y="true">
								<view class="data_bg act_x" v-for="(item,i) in zt2list" :key="i">
									<view class="data_infor">
										<view class="data_num time">{{item.addtime}}</view>
										<view class="data_num dizhi">{{item.address}}</view>
										<view class="data_num profit">{{item.dlsy}}</view>
									</view>
								</view>
					
							</scroll-view>
						</view>
					</view> -->

					<!-- <view class="data_box" style="margin-top: 30rpx;">
						<view class="info_box">
							<view class="info_name">三代总人数</view>
							<view class="info_num">{{zt3list.length}}</view>
						</view>
					</view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">三代总充值</view>
							<view class="info_num">{{p3allcz}}</view>
						</view>
					</view>
					<view class="data_box">
						<view class="info_box">
							<view class="info_name">三代总提现</view>
							<view class="info_num">{{p3alltx}}</view>
						</view>
					</view> -->
					<!-- 直推列表 -->
					<!-- <view class="list_box">
						<view class="list_top">三代列表</view>
						<view class="list_infor">
							<view class="infor_title">
								<view class="tit_name time">{{$t('zhitui.time')}}</view>
								<view class="tit_name dizhi">{{$t('zhitui.add')}}</view>
								<view class="tit_name profit">{{$t('zhitui.income')}}(LOO)</view>
							</view>
							<scroll-view class="data_desc" scroll-y="true">
								<view class="data_bg act_x" v-for="(item,i) in zt3list" :key="i">
									<view class="data_infor">
										<view class="data_num time">{{item.addtime}}</view>
										<view class="data_num dizhi">{{item.address}}</view>
										<view class="data_num profit">{{item.dlsy}}</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import topnav from '@/components/topnav/topnav.vue';
	import drow from "@/components/drow/drow.vue"
	export default {
		components: {
			topnav,
			drow
		},
		data() {
			return {
				
				types: 0,
				title: '一代推荐列表',
				ztnum: '',
				teamnum: '', //团队人数
				sqsy: '',
				ztlist: '',
				p1allcz: 0,
				p1alltx: 0,
				zt2list: '',
				p2allcz: 0,
				p2alltx: 0,
				zt3list: '',
				p3allcz: 0,
				p3alltx: 0,
				allcz: 0,
				alltx: 0,

				// 一代人数
				ztarr: [],
				// 二代人数
				zt2arr: [],
				// 三带人数
				zt3arr3: [],
				// 团队总人数
				// allPeople: 0,
				// 团队列表
				type: [this.$t('zrs'),this.$t('ydrs'), this.$t('edrs'), this.$t('sdrs')],
				number: [],
				//团队总充值
				type1: [this.$t('zcz'),this.$t('ydcz'), this.$t('edcz'), this.$t('sdcz')],
				number1: [],
				// 团队总提现
				type2: ["一代提现", "二代提现", "三代提现"],
				number2: [],
			}
		},
		mounted() {
			this.reqList(true);
		},
		methods: {
			// 团队页面数据
			reqList(type) {
				if(type){
					this.types=0
					var that = this;
					var url = "/Pageinit/clgame";
					var data = {
						lang: this.$i18n.locale,
					};
					
					function fnSuc(res) {
						console.log("数据", res.data);
						that.ztarr = res.data.ztarr //一代人数列表
						that.zt2arr = res.data.zt2arr //二代人数列表
						that.zt3arr = res.data.zt3arr //三代人数列表
						that.number.push(res.data.allrs,res.data.p1allrs, res.data.p2allrs, res.data.p3allrs, ) //团队总人数列表
						that.number1.push(res.data.allcz,res.data.p1allcz, res.data.p2allcz, res.data.p3allcz)
						that.number2.push(res.data.p1alltx, res.data.p2alltx, res.data.p3alltx)
						// that.number2.push(that)
					
						that.ztnum = res.data.ztnum;
						that.teamnum = res.data.teamnum;
						that.sqsy = res.data.sqsy;
						that.ztlist = res.data.ztarr;
						that.p1allcz = res.data.p1allcz;
						that.p1alltx = res.data.p1alltx;
						that.zt2list = res.data.zt2arr;
						that.p2allcz = res.data.p2allcz;
						that.p2alltx = res.data.p2alltx;
						that.zt3list = res.data.zt3arr;
						that.p3allcz = res.data.p3allcz;
						that.p3alltx = res.data.p3alltx;
						that.allcz = res.data.allcz;
						that.alltx = res.data.alltx;
					}
					that.Utils.tools.post(url, data, that, fnSuc);
					
				}else {
					this.types=1
					var that=this
					var url='/Pageinit/clgamecz'
					var data = {
						lang: this.$i18n.locale,
						pid:0
					};
					function czList(res){
						console.log(res.data)
						that.ztarr=res.data.czArr
					}
					
					that.Utils.tools.post(url, data, that, czList);
					
				}
			
			},

			//跳转页面
			toPage(pagekey) {
				
				var that = this;
				uni.redirectTo({
					url: `../${pagekey}/${pagekey}`
				})
			},
		},
	}
</script>

<style lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background: #191716;
		overflow: auto;
	}

	.app_bg {
		width: 750rpx;
		height: 800rpx;
		background: url(../../static/h/mgshop/pages_bg.png) no-repeat;
		background-size: 750rpx 800rpx;
	}

	.scroll-Y {
		width: 100%;
		height: 78vh;
	}

	// 导航栏
	.nav_bg {
		margin: 50rpx 0 50rpx 0;
		width: 750rpx;
		height: 88rpx;
		background: url(../../static/h/invite/nav_bg.png) no-repeat;
		background-size: 750rpx 88rpx;
	}

	.nav_bg .nav_box {
		display: flex;
		justify-content: space-between;
		width: 90%;
		margin: 0 auto;
	}

	.nav_bg .nav_box .nav_btn {
		width: 33%;
		text-align: center;
		font-size: 32rpx;
		font-weight: 400;
		color: #F7D38B;
		line-height: 88rpx;
	}

	.nav_bg .nav_box .nav_btn.active {
		width: 222rpx;
		height: 84rpx;
		background: url(../../static/h/invite/xz_bg.png) no-repeat;
		background-size: 222rpx 84rpx;
	}

	// 公示
	.gs_box {
		// width: 750rpx;
		// height: 1308rpx;
		// background: url(../../static/h/invite/notice_bg.png) no-repeat;
		// background-size: 750rpx 1308rpx;
	}

	.gs_box .data_box {
		width: 700rpx;
		margin: 0 auto 16rpx;
	}

	.gs_box .data_box .info_box {
		// width: 80%;
		margin: 0 auto;
		display: flex;
		padding:0 70rpx;
		background: url(../../static/h/invite/data_bg.png) no-repeat center/0;
		background-size: 700rpx 66rpx;
		justify-content: space-between;
		line-height: 66rpx;
	}

	.gs_box .data_box .info_box .info_name {
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.gs_box .data_box .info_box .info_num {
		font-size: 32rpx;
		font-weight: 400;
		color: #F7D38B;
	}

	// 直推列表
	.list_box {
		padding-bottom: 16rpx;
		margin: 0 auto;
		width: 632rpx;

		padding-top: 20rpx;
		height: auto;
		background: url(../../static/h/cards/type_bg.png) no-repeat;
		background-size: 632rpx 100%;
		box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, .08);
		border-radius: 16rpx;
	}

	.list_box .list_top {
		width: 632rpx;
		height: 76rpx;
		// background: rgba(69,120,209,.8);
		// border-radius: 16rpx 16rpx 0rpx 0rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 76rpx;
	}

	.list_box .list_infor {
		font-size: 24rpx;
		font-weight: 500;
		color: #FFFFFF;
	}

	.list_box .list_infor .infor_title {
		margin: 18rpx auto;
		width: 95%;
		display: flex;
		justify-content: space-between;
	}

	.list_box .list_infor .infor_title .time {
		width: 40%;
	}

	.list_box .list_infor .infor_title .dizhi {
		text-align: center;
		width: 30%;
	}

	.list_box .list_infor .infor_title .profit {
		text-align: right;
		width: 30%;
	}

	.data_desc {
		padding: 20rpx 0;
	}

	.data_desc .data_bg {
		width: 632rpx;
		height: 42rpx;
		line-height: 42rpx;
	}

	.data_desc .data_bg.act_y {
		background: #F3F3F3;
	}

	.data_desc .data_infor {
		margin: 0rpx auto;
		width: 95%;
		height: 42rpx;
		display: flex;
		justify-content: space-between;
	}

	// .data_desc .data_infor .data_num{
	// 	width: 33%;
	// }
	.data_desc .data_infor .time {
		width: 40%;
	}

	.data_desc .data_infor .dizhi {
		text-align: center;
		width: 30%;
	}

	.data_desc .data_infor .profit {
		text-align: right;
		width: 30%;
	}
</style>
