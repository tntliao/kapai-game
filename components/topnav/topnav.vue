<template>
	<view class="topnav_box">
		<!-- xxx -->
		<view class="zhan" style="height: 10rpx;"></view>
		<view class="nav_box">
			<view class="back_img" @click="toPage(fhurl)">
				<image src="../../static/h/topnav/back_img.png" mode=""></image>
			</view>
			<view class="nav_name">{{navTitle}}</view>
			<view class="help_img">
				<!-- <image src="../../static/h/topnav/help_img.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "topnav",
		props: ['title', 'urlline'],
		data() {
			return {
				navTitle: this.title,
				fhurl: this.urlline,
			}
		},
		mounted() {
			console.log(this.urlline)
		},
		methods: {
			//跳转页面
			toPage(pagekey) {

				var that = this;
				uni.navigateBack({
					delta: 1
				})
				// if (pagekey == 'secondLevel') {
				// 	uni.navigateTo({
				// 		url: `/pages/zhitui/${pagekey}/${pagekey}`
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: `/pages/${pagekey}/${pagekey}`
				// 	})
				// }

			},
		},
	}
</script>

<style lang="scss">
	.topnav_box {}

	.topnav_box .nav_box {
		display: flex;
		justify-content: space-between;
		width: 95%;
		margin: 20rpx auto 0;
	}

	.topnav_box .nav_box .back_img {
		width: 60rpx;
		height: 60rpx;
	}

	.topnav_box .nav_box .back_img image {
		width: 60rpx;
		height: 60rpx;
	}

	.topnav_box .nav_box .help_img {
		width: 60rpx;
		height: 60rpx;
	}

	.topnav_box .nav_box .help_img image {
		width: 60rpx;
		height: 60rpx;
	}

	.topnav_box .nav_name {
		font-size: 36rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 60rpx;
	}
</style>
