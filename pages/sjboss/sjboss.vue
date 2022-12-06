<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<!-- <topnav :title="$t('boss.world')" urlline="index"></topnav> -->
			<!-- xxx -->
			<view class="zhan" style="height: 10rpx;"></view>
			<!-- 顶部 -->
			<view class="topnav_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="nav_box">
					<view class="back_img" @click="toPage('index')">
						<image src="../../static/h/topnav/back_img.png" mode=""></image>
					</view>
					<view class="nav_name">{{$t('boss.world')}}</view>
					<view class="help_img">
						<!-- <view class="" @click="showrule=true">{{$t('boss.rule')}}</view> -->
					</view>
				</view>
			</view>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn" @click="toPage('bosslevel')">{{$t('boss.tit')}}</view>
					<view class="nav_btn active">{{$t('boss.world')}}</view>
				</view>
			</view>
			<!-- BOSS -->
			<view class="boss_bg">
				<view class="boss_top">
					<view class="mymp_box">
						<view class="add_img">
							<image src="../../static/h/boss/add_img.png" mode=""></image>
						</view>
						<view class="mpnum_bg">{{$t('boss.ticket')}}：{{mymp}}</view>
					</view>
					<view class="boss_list" @click="toPage('sjbosslist')">{{$t('boss.tzlist')}}</view>
				</view>
				
				<view class="info_bg">
					<view class="sjboss_logo">
						<image src="../../static/h/boss/WuTi_0094_1.png" mode=""></image>
					</view>
					<view class="info_data">
						<view class="data_num">{{$t('boss.consume')}}：<span>1{{$t('boss.ticket')}}</span></view>
						<view class="data_name">{{$t('boss.ndhg')}}</view>
					</view>
				</view>
			</view>
			<!-- BOSS血量 -->
			<view class="blood_box">
				<view class="boss_xl" :style="bossxl">
					<view class="" v-if="syhp>=40">{{syhp}}%</view>
				</view>
				<view class="xl_num" v-if="syhp<40">{{syhp}}%</view>
			</view>
			<!-- 按钮框 -->
			<view class="btn_box">
				<view class="other_btn" @click="selcard=true">{{$t('boss.sel')}}</view>
				<!-- <view class="sel_btn" @click="tzsjboss()">开始挑战</view> -->
			</view>
			
			<!-- 选择卡牌弹出层 -->
			<u-popup :show="selcard" @close="close" @open="open" mode="bottom">
				<view class="selcard_popup">
					<view class="selcard_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="selcard_top">
							<view class="space"></view>
							<view class="popup_name">{{$t('boss.sel')}}</view>
							<view class="close_img" @click="close()">
								<image src="../../static/h/boss/close_img.png" mode=""></image>
							</view>
						</view>
						<scroll-view class="ka_box" scroll-y="true" @scrolltolower="dddd()">
							<!-- 卡牌 -->
							<view class="ka_content">
								<view class="card_content" v-for="(item,i) in melist">
									<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.bg+'.png);background-size: 300rpx 470rpx;'">
										<view class="card_info">
											<view class="super_img" v-if="item.cardName=='LOONG'"></view>
											<view class="card_rat" v-if="item.cardName=='RAT'">{{item.cardName}}</view>
											<view class="card_name" v-if="item.cardName!='RAT'">{{item.cardName}}</view>
											<!-- <view class="card_dj">Ⅻ</view> -->
										</view>
										<view class="info_box">
											<view class="info_data" v-if="lang=='en'">
												{{item.desEn}} 
											</view>
											<view class="info_data" v-else>
												{{item.desCn}} 
											</view>
										</view>
										<!-- 我的出售 -->
										<!-- <view class="mysale">我的出售</view> -->
										<view class="atk_box">
											<view class="atk_data">ATK:{{item.atk}}</view>
										</view>
									</view>
									<view class="card_img">
										<image :src="item.cnImg" mode=""></image>
									</view>
									<view class="tj_btn" @click="tzsjboss(item.id)">{{$t('boss.challenge')}}</view>
								</view>
								
							</view>
						</scroll-view>
					</view>
				</view>
			</u-popup>
			
			<!-- 游戏规则 -->
			<u-overlay :show="showrule" opacity="0.8">
				<view class="rule_popup">
					<view class="rule_bg">
						<view class="popup_top">
							<view class="close_img" @click="showrule=false"></view>
						</view>
						<view class="rule_desc">
							<u-parse :content="showguize"></u-parse>
						</view>
						
					</view>
				</view>
			</u-overlay>
			
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
			lang:this.$i18n.locale,
			showrule:false,
			urlbg:'../../static/h/cards/cards_bg.png',
			cardbg:'',
			selcard:false,
			
			bossxl:'',
			mymp:'',
			melist:'',//我的卡牌
			bossId:'',
			syhp:'',
			showguize:'',
			
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
		this.getrule();
		this.gainmpnum();
		this.getcardlist();
		this.bossinfor();
		this.cardbg='background: url('+this.urlbg+');background-size: 300rpx 470rpx;';
		this.bossxl='background: url(../../static/h/boss/blood_y.png) no-repeat;background-size: '+this.syhp+'% 95rpx;';
	},
	methods: {
		// 获取boss信息
		bossinfor(){
			var that=this;
			let url = "/Boss/getbossinfo";
			let data = {token:that.token,}
			let fnSuc = function(res){
				that.syhp=res.data.syhp/100;
				that.bossId=res.data.bossId;
				console.log(res.data)
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		// 获取我的卡牌列表
		getcardlist(){
			var that=this;
			if(this.nowpage==1){
				that.melist=[];
			}
			var url = "/bag/getucardlist";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,baseCardId:that.baseCardId}
			var fnSuc = function(res){
				console.log(res)
				that.melist=that.melist.concat(res.data.data);
				if(res.data.last_page<=that.nowpage){
					that.status='nomore'
				}else{
					that.status='loadmore'
				}
				that.maxpage=res.data.last_page
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		dddd(){
			if(this.nowpage>=this.maxpage){
				return false;
			}
			this.nowpage++;
			console.log('加载更多');
			this.getcardlist();
		},
		//获取我的门票数量
		gainmpnum(){
			var that=this;
			let url = "/Pageinit/qianbao";
			let data = {};
			this.Utils.tools.luch_get(url,data).then(res=>{
				console.log(res)
				that.mymp=res[5].num;
				//门票
				// console.log(res[5].num)
			});
		},
		// 挑战世界BOSS
		tzsjboss(cardsId){
			console.log('开始挑战');
			var that=this;
			//校验门票是否够
			if(this.mymp<1){
				this.Utils.tools.showmsg(that.$t("tips.mpbz"));
				return false;
			}
			
			//挑战
			let url="/boss/pkboss";
			let data={
				lang:that.$i18n.locale,
				cardId:cardsId,
				bossId:that.bossId,
			};
			this.Utils.tools.luch_post(url,data).then(res=>{
				console.log(res)
				if(res.status==1){
					// this.Utils.tools.showmsg(this.$t('error.'+res.errcode));
					this.Utils.tools.showmsg(that.$t('sjboss.'+res.errcode));
				}else if(res.status==-1){
					// let txt = this.$t('error.1018') + res.num + this.$t('error.10182');
					// this.Utils.tools.showmsg(txt);
					this.Utils.tools.showmsg(that.$t('sjboss.'+res.errcode));
				}
				that.bossinfor();
				that.gainmpnum();
			}).catch(err=>{console.log})
			this.selcard=false;
		},
		// 获取游戏规则
		getrule(){
			var that=this;
			let url = "/Arc/getinfo";
			let data = {id:19,lang:this.$i18n.locale};
			this.Utils.tools.luch_get(url,data).then(res=>{
				console.log(res)
				that.showguize=res;
			});
		},
		// 关闭弹出层
		close(){
			this.selcard=false;
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
	height: 1624rpx;
	background: url(../../static/h/boss/sjboss_bg.png) no-repeat;
	background-size: 750rpx 1624rpx;
}
// 顶部
.topnav_box{}
.topnav_box .nav_box{
	display: flex;
	justify-content: space-between;
	width: 95%;
	margin: 20rpx auto 0;
}
.topnav_box .nav_box .back_img{
	// width: 60rpx;
	width: 120rpx;
	height: 60rpx;
}
.topnav_box .nav_box .back_img image{
	width: 60rpx;
	height: 60rpx;
}
.topnav_box .nav_box .help_img{
	width: 120rpx;
	height: 60rpx;
	font-size: 24rpx;
	color: #F7D38B;
	line-height: 60rpx;
	text-align: right;
	
}
.topnav_box .nav_box .help_img image{
	width: 60rpx;
	height: 60rpx;
}
.topnav_box .nav_name{
	font-size: 36rpx;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 60rpx;
}

// 导航栏
.nav_bg{
	width: 750rpx;
	height: 88rpx;
	background: url(../../static/h/boss/nav_bg.png) no-repeat;
	background-size: 750rpx 88rpx;
	margin: 70rpx 0 34rpx;
}
.nav_bg .nav_box{
	display: flex;
	justify-content: center;
}
.nav_bg .nav_box .nav_btn{
	width: 50%;
	font-size: 32rpx;
	font-weight: 400;
	color: #F7D38B;
	text-align: center;
	line-height: 88rpx;
}
.nav_bg .nav_box .nav_btn.active{
	width: 375rpx;
	height: 84rpx;
	background: url(../../static/h/boss/active_bg.png) no-repeat;
	background-size: 375rpx 84rpx;
}
// BOSS
.boss_bg{
	width: 686rpx;
	height: 928rpx;
	background: url(../../static/h/boss/sjboss_img.png) no-repeat;
	background-size: 686rpx 928rpx;
	margin: 0 auto;
	position: relative;
}
.boss_bg .boss_top{
	display: flex;
	justify-content: space-between;
}
.boss_bg .boss_top .boss_list{
	font-size: 32rpx;
	color: #FFFFFF;
	line-height: 56rpx;
	border-bottom: 1px solid #FFFFFF;
}
.boss_bg .mymp_box{
	display: flex;
	justify-content: flex-start;
}
.boss_bg .mymp_box .add_img{
	width: 70rpx;
	height: 68rpx;
}
.boss_bg .mymp_box .add_img image{
	width: 70rpx;
	height: 68rpx;
}
.boss_bg .mymp_box .mpnum_bg{
	margin-left: -40rpx;
	width: 192rpx;
	height: 64rpx;
	background: url(../../static/h/boss/mpnum_bg.png) no-repeat;
	background-size: 192rpx 64rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
	text-align: center;
	line-height: 64rpx;
}
.boss_bg .info_bg{
	width: 672rpx;
	height: 140rpx;
	background: url(../../static/h/boss/info_bg.png) no-repeat;
	background-size: 672rpx 140rpx;
	margin: 0 auto;
	position: absolute;
	bottom: 10rpx;
	display: flex;
	justify-content: flex-start;
}
.boss_bg .info_bg .sjboss_logo{
	width: 112rpx;
	height: 112rpx;
	margin: 14rpx 0 0 64rpx;
}
.boss_bg .info_bg .sjboss_logo image{
	width: 112rpx;
	height: 112rpx;
}
.boss_bg .info_bg .info_data{
	width: 400rpx;
}
.boss_bg .info_bg .info_data .data_num{
	font-size: 24rpx;
	font-weight: 400;
	color: #B7B7B7;
	margin-top: 26rpx;
	text-align: center;
}
.boss_bg .info_bg .info_data .data_num span{
	font-size: 32rpx;
	font-weight: 400;
	color: #FF7171;
}
.boss_bg .info_bg .info_data .data_name{
	font-size: 32rpx;
	font-weight: bold;
	color: #FF7171;
	margin-top: 12rpx;
	text-align: center;
}
// BOSS血量
.blood_box{
	width: 600rpx;
	height: 95rpx;
	background: url(../../static/h/boss/blood_x.png) no-repeat;
	background-size: 600rpx 95rpx;
	margin: 52rpx auto;
	display: flex;
	justify-content: flex-start;
}
.blood_box .boss_xl{
	width: 100%;
	height: 95rpx;
	font-size: 38rpx;
	font-weight: 400;
	color: #F7D38B;
	line-height: 95rpx;
	text-align: right;
}
.blood_box .xl_num{
	font-size: 38rpx;
	font-weight: 400;
	color: #F7D38B;
	line-height: 95rpx;
}
// 按钮框
.btn_box{
	display: flex;
	justify-content: center;
	margin-top: 76rpx;
}
.btn_box .other_btn{
	width: 328rpx;
	height: 90rpx;
	background: url(../../static/h/boss/pk_btn.png) no-repeat;
	background-size: 328rpx 90rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
}
.btn_box .sel_btn{
	width: 328rpx;
	height: 90rpx;
	background: url(../../static/h/boss/pk_btn.png) no-repeat;
	background-size: 328rpx 90rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
}
// 选择卡牌弹出层
.selcard_popup{
	width: 750rpx;
	height: 1230rpx;
	background: #282422;
	background-size: 750rpx 1230rpx;
}
.selcard_popup .selcard_bg{
	width: 750rpx;
	height: 1230rpx;
	background: url(../../static/h/boss/popup_bg.png) no-repeat;
	background-size: 750rpx 1230rpx;
}
.selcard_bg .selcard_top{
	width: 95%;
	margin: 20rpx auto 40rpx;
	display: flex;
	justify-content: space-between;
}
.selcard_top .space{
	width: 54rpx;
	height: 54rpx;
}
.selcard_top .popup_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.selcard_top .close_img{
	width: 54rpx;
	height: 54rpx;
}
.selcard_top .close_img image{
	width: 54rpx;
	height: 54rpx;
}
.selcard_popup .ka_box{
	height: 1100rpx;
	overflow: auto;
}
// 卡牌
.selcard_popup .ka_content{
	width: 664rpx;
	margin: 0 auto;
	display: flex;
	// justify-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
}
.selcard_popup .card_content{
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.selcard_popup .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.selcard_popup .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
// 鼠
.selcard_popup .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.selcard_popup .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.selcard_popup .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.selcard_popup .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.selcard_popup .card_box .info_box .info_data{
	padding: 6rpx;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
// 我的出售
.selcard_popup .card_box .mysale{
	width: 194rpx;
	height: 52rpx;
	background: url(../../static/h/mgshop/mysale_bg.png) no-repeat;
	background-size: 194rpx 52rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #FFFFFF;
	text-align: center;
	line-height: 52rpx;
	position: absolute;
	bottom: 44rpx;
	left: 44rpx;
}
.selcard_popup .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.selcard_popup .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}
.selcard_popup .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.selcard_popup .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.selcard_popup .card_content .tj_btn{
	width: 226rpx;
	height: 68rpx;
	background: url(../../static/h/packs/tj_btn.png) no-repeat;
	background-size: 226rpx 68rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
	margin: 10rpx 0 10rpx 24rpx;
}
// 游戏规则
.rule_popup{
	margin: auto 0;
}
.rule_popup .rule_bg{
	width: 560rpx;
	height: 960rpx;
	background: url(../../static/h/packs/salepopup_bg.png) no-repeat;
	background-size: 560rpx 960rpx;
	margin: 0 auto;
}
.rule_popup .popup_top{
	display: flex;
	justify-content: flex-end;
}
.rule_popup .close_img{
	width: 54rpx;
	height: 54rpx;
	background: url(../../static/h/boss/close_img.png) no-repeat;
	background-size: 54rpx 54rpx;
}
.rule_popup .rule_desc{
	width: 460rpx;
	max-height: 740rpx;
	margin: 20rpx auto 0;
	overflow-y: auto;
	color: #F7D38B;
	font-size: 26rpx;
}


</style>
