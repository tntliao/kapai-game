<template>
	<view class="drop-box" @click="isShow = !isShow">
		<view class="drop-top">
			<text>{{title}}</text>
			<u-icon size="16" color="#b39057" :name=" isShow ? 'arrow-up' : 'arrow-down' "></u-icon>
		</view>
		<view class="drop-chion" v-show="isShow">
			<view v-for="(item) in arr1.length" class="chion-list">
				<text>{{arr1[item-1]}}</text>
				<text>{{arr2[item-1]}}</text>
			</view>
			<!-- <view class="chion-list">
				<text>{{arr1[1]}}</text>
				<text>{{arr2[1]}}</text>
			</view>
			<view class="chion-list">
				<text>{{arr1[2]}}</text>
				<text>{{arr2[2]}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "drow",
		props:{
			title:{
				default:"暂无"
			},
			arr1:{
				default(){
					return []
				}
			},
			arr2:{
				default(){
					return []
				}
			},
		},
		data() {
			return {
				isShow: true
			};
		}
	}
</script>

<style lang="scss" scoped>
	.drop-box {
		width: 700rpx;
		margin: 0 auto 8rpx;
		font-size: 24rpx;
		color: #fff;
		

		.drop-top {
			width: 700rpx;
			height: 66rpx;
			background: url(/static/img/data_bg.f222c443.png)center/cover no-repeat;
			padding:0 60rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.drop-chion {
			width: 85%;
			// height: 50rpx;
			padding: 15rpx 15rpx;
			box-sizing: border-box;
			margin: 0 auto;
			background: #5a4e46;

			.chion-list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text:last-child{
					color: #F7D38B;
				}
			}
			.chion-list:not(:last-child){
				margin-bottom: 15rpx;
			}
		}

	}
</style>
