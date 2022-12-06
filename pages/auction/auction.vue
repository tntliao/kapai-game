<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('trade.trading')"  urlline="index"></topnav>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn" @click="toPage('market')">{{$t('trade.market')}}</view>
					<view class="nav_btn active">{{$t('trade.auctionhall')}}</view>
					<view class="nav_btn" @click="toPage('mysale')">{{$t('trade.sale')}}</view>
				</view>
			</view>
			<!-- 中间内容 -->
			<view class="content_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="content_top">
					<view class="choose_box">
						<view class="sel_box" @click="showdj=true">
							<view class="sel_name">{{$t('trade.dj')}}</view>
							<view class="xjt_img"></view>
							<!-- <view class="fxjt_img" v-if="showjt==true"></view> -->
						</view>
						<view class="sel_box" @click="showtype=true">
							<view class="sel_name">{{$t('trade.type')}}</view>
							<view class="xjt_img"></view>
						</view>
					</view>
					<view class="list_btn" @click="toPage('jmlist')">{{$t('trade.bidlist')}} ></view>
				</view>
				<view class="line"></view>
				<scroll-view class="ka_box" scroll-y="true"  @scrolltolower="dddd()">
					<!-- 卡牌 -->
					<view class="ka_content">
						<view class="card_content" v-for="(item,i) in cardlist">
							<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+item.bg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="item.cardName=='LOONG'"></view>
									<view class="card_name" v-if="item.cardName!='RAT'&&item.cardName!='DOG'&&item.cardName!='OX'&&item.cardName!='GOAT'&&item.cardName!='PIG'&&item.cardName!='LEO'">{{item.cardName}}</view>
									<view class="card_rat" v-if="item.cardName=='RAT'||item.cardName=='DOG'||item.cardName=='OX'||item.cardName=='GOAT'||item.cardName=='PIG'||item.cardName=='LEO'">{{item.cardName}}</view>
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
							<!-- <view class="time_box">
								<view class="time_name">倒计时：</view>
								<view class="time_num">
									<u-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" @change="onChange">
										<view class="time">
											<view class="time__custom">
												<text class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
											</view>
											<text class="time__doc">:</text>
											<view class="time__custom">
												<text class="time__custom__item">{{ timeData.minutes }}</text>
											</view>
											<text class="time__doc">:</text>
											<view class="time__custom">
												<text class="time__custom__item">{{ timeData.seconds }}</text>
											</view>
										</view>
									</u-count-down>
								</view>
							</view> -->
							<view class="buy_btn"  @click="showauction(item.id,item.sn,item.bg,item.cnImg,item.atk,item.cardName,item.qpPrice,item.endtime,item.id,item.stepPrice,item.nowprice)" v-if="item.userId!=userId">{{$t('trade.auction')}}</view>
							<view class="buy_btn" v-if="item.userId==userId">{{$t('trade.my')}}</view>
							<!-- <view class="buy_btn" @click="showauction(item.id,item.sn,item.bg,item.cnImg,item.atk,item.cardName,item.qpPrice,item.endtime,item.id,item.stepPrice,item.nowprice)">竞拍</view> -->
							<!-- <view class="buy_btn">撤回</view> -->
						</view>
						
					</view>
					<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"   :nomore-text="nomoreText" @loadmore="loadmore" />
				</scroll-view>
				
			</view>
			
			<!-- 竞买弹出层 -->
			<u-overlay :show="showpai" opacity="0.8">
				<view class="pai_popup">
					<view class="pai_bg">
						<view class="popup_top">
							<view class="close_img" @click="showpai=false"></view>
						</view>
						<view class="card_content">
							<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+tcbg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="tccardName=='LOONG'"></view>
									<view class="card_rat" v-if="tccardName=='RAT'||tccardName=='DOG'||tccardName=='OX'||tccardName=='GOAT'||tccardName=='PIG'||tccardName=='LEO'">{{tccardName}}</view>
									<view class="card_name" v-if="tccardName!='RAT'&&tccardName!='DOG'&&tccardName!='OX'&&tccardName!='GOAT'&&tccardName!='PIG'&&tccardName!='LEO'">{{tccardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<!-- <view class="info_box">
									<view class="info_data">
										ss sss 
									</view>
								</view> -->
								<view class="atk_box">
									<view class="atk_data">ATK:{{tcatk}}</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="tccnImg" mode=""></image>
							</view>
							
						</view>
						<view class="input_bg">
							<view class="zhan" style="height: 1px;"></view>
							<view class="">
								<view class="input_name">{{$t('trade.now')}}</view>
								<view class="input_box">
									<u--input placeholder="" border="node"  color="#C79A52" disabled disabledColor="rgba(0,0,0,0)" v-model="jiage">
										<view class="coin_name" slot="suffix">LOO</view>
									</u--input>
								</view>
								<view class="line"></view>
							</view>
							<view class="">
								<view class="input_name">{{$t('trade.endtime')}}</view>
								<view class="input_box">
									<u--input placeholder="" border="node" color="#C79A52" disabled disabledColor="rgba(0,0,0,0)" v-model="shijian">
										<view class="coin_name" slot="suffix"></view>
									</u--input>
								</view>
								<view class="line"></view>
							</view>
							<view class="">
								<view class="input_name">{{$t('trade.add')}}</view>
								<view class="input_box">
									<u--input placeholder="" border="node" v-model="step" color="#C79A52" disabled disabledColor="rgba(0,0,0,0)">
										<view class="coin_name" slot="suffix">LOO</view>
									</u--input>
								</view>
								<view class="line"></view>
							</view>
							<view class="">
								<view class="input_name">{{$t('trade.mybid')}}</view>
								<view class="input_box">
									<u--input :placeholder="$t('trade.mybid')" border="node" v-model="csnum" @change="change" color="#C79A52">
										<view class="coin_name" slot="suffix">LOO</view>
									</u--input>
								</view>
								<view class="line"></view>
							</view>
							
						</view>
						
						<view class="btnok_bg" @click="jingjia()">{{$t('trade.okbid')}}</view>
					</view>
				</view>
			</u-overlay>
			
			<!-- 选择类型弹出层 -->
			<u-popup :show="showtype" @close="close" @open="open" mode="bottom">
				<view class="type_popup">
					<view class="type_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="type_top">
							<view :class="baseCardId==0?'xzspace':'space'" @click="baseCardId=0">{{$t('trade.all')}}</view>
							<view class="popup_name">{{$t('trade.type')}}</view>
							<view class="close_img" @click="close()">
								<image src="../../static/h/cards/close_img.png" mode=""></image>
							</view>
						</view>
						<block v-for="(vo,i) in typelist">
							<view class="type_name">{{vo.tagname}}</view>
							<view class="opts_box">
								<view :class="va.id==baseCardId?'xz_opt':'type_opt'" v-for="(va,x) in vo.namelist" @click="baseCardId=va.id">{{va.cardName}}</view>
							</view>
							<view class="popup_line"></view>
						</block>
						<view class="ok_btn" @click="xztype()">{{$t('trade.confirm')}}</view>
					</view>
				</view>
			</u-popup>
			
			<!-- 等级弹出层 -->
			<u-popup :show="showdj" @close="close" @open="open" mode="bottom">
				<view class="type_popup">
					<view class="type_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="type_top">
							<view :class="cardRank==0?'xzspace':'space'" @click="cardRank=0">{{$t('trade.all')}}</view>
							<view class="popup_name">{{$t('trade.dj')}}</view>
							<view class="close_img" @click="close()">
								<image src="../../static/h/cards/close_img.png" mode=""></image>
							</view>
						</view>
						<view class="opts_box">
							<view :class="370==cardRank?'xz_opt':'type_opt'"  @click="cardRank=370">I</view>
							<view :class="375==cardRank?'xz_opt':'type_opt'"  @click="cardRank=375">II</view>
							<view :class="376==cardRank?'xz_opt':'type_opt'"  @click="cardRank=376">III</view>
							<view :class="377==cardRank?'xz_opt':'type_opt'"  @click="cardRank=377">IV</view>
							<view :class="484==cardRank?'xz_opt':'type_opt'"  @click="cardRank=484">V</view>
							<view :class="512==cardRank?'xz_opt':'type_opt'"  @click="cardRank=512">VI</view>
							<view :class="513==cardRank?'xz_opt':'type_opt'"  @click="cardRank=513">VII</view>
							<view :class="514==cardRank?'xz_opt':'type_opt'"  @click="cardRank=514">VIII</view>
							<view :class="515==cardRank?'xz_opt':'type_opt'"  @click="cardRank=515">IX</view>
							<view :class="516==cardRank?'xz_opt':'type_opt'"  @click="cardRank=516">X</view>
							<view :class="517==cardRank?'xz_opt':'type_opt'"  @click="cardRank=517">XI</view>
							<view :class="518==cardRank?'xz_opt':'type_opt'"  @click="cardRank=518">XII</view>
							<view :class="519==cardRank?'xz_opt':'type_opt'"  @click="cardRank=519">XIII</view>
						</view>
						<view class="ok_btn" @click="xzdengji()">{{$t('trade.confirm')}}</view>
						
					</view>
				</view>
			</u-popup>
			
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
			userId:'',
			cardbg:'',
			urlbg:'../../static/h/cards/cards_bg.png',
			timeData:{},
			showpai:false,
			csnum:'',
			step:0,
			cardlist:'',
			
			typelist:'',
			baseCardId:0,
			showtype:false,
			atkpx:0,//战斗力排序
			showjt:false,
			rtpFlag:false,
			shijian:'',
			showdj:false,
			cardRank:0,//级别排序
			
			tcbg:'',
			tccnImg:'',
			tcatk:'',
			tccardName:'',
			pmOrderId:'',//订单id
			jiage:'0',
			shijian:'',
			
			//加载更多
			pageSize:12,
			nowpage:1,
			maxpage:1,
			status: 'loading',
			lowerThreshold:50,
			loadingText:this.$t('all.loadingText'),
			loadmoreText:this.$t('all.loadmoreText'),
			nomoreText:this.$t('all.nomoreText'),
			scrollable:false,
			height:500,
		}
	},
	mounted() {
		this.cardbg='background: url('+this.urlbg+');background-size: 300rpx 470rpx;';
		this.userId=uni.getStorageSync("userId");
		this.getmoneylist();
		this.getsx();
	},
	methods: {
		//查询授权额度
		async chkallowance() {
			let that = this
			let wallet = uni.getStorageSync('wallet')
			let address = uni.getStorageSync('payaddress')
			let abi20 = uni.getStorageSync("abi20");
			let contract = await tronWeb.contract(abi20, 'TMGTa4gaEW9rMmjaQgH7WiRmPXWHAtuepB');
			uni.showLoading({
				title: this.$t("tips.getting")
			})
			let amount = await contract.allowance(wallet, address).call()
			amount = this.Utils.tools.fromanywei(amount, 6) //授权额度
			if (amount <= 0) {
				console.log('授权额度不足')
				uni.hideLoading()
				return false;
			} else {
				that.rtpFlag = true
			}
			uni.hideLoading()
			return true;
		},
		// 打开拍卖弹出层
		showauction(cardId,tokenId,tcbg,tcImg,tcatk,tccardName,qpPrice,endtime,pmOrderId,step,xzprice){
			let that=this;
			let wallet = uni.getStorageSync('wallet');
			// let shou=0;
			// let sqdz=uni.getStorageSync('payaddress');
			// let abi20 = uni.getStorageSync("abi20");
			// let contract = tronWeb.contract(abi20, 'TMGTa4gaEW9rMmjaQgH7WiRmPXWHAtuepB');
			// if (!that.rtpFlag) {
			// 	uni.showLoading({
			// 		title: this.$t("tips.under")
			// 	})
			// 	shou=that.Utils.tools.toanywei('500000000',6)
			// 	contract.approve(sqdz,shou)
			// 	.send({
			// 		from: wallet
			// 	}).then(res => {
			// 		that.rtpFlag=true
			// 		that.chkallowance()
			// 		uni.hideLoading()
			// 	})
			// 	return
			// }
			if(this.$i18n.locale=='en'){
				this.step='Minimum markup'+step;
			}else{
				this.step=step;
			}
			// this.step='最低加价'+step;
			this.tcbg=tcbg;
			this.tccnImg=tcImg;
			this.tcatk=tcatk;
			this.tccardName=tccardName;
			this.jiage=xzprice;
			this.pmOrderId=pmOrderId;
			// this.xzprice=xzprice;
			// let date=new Date(endtime)
			// this.shijian=date.getHours();
			this.shijian=endtime;
			this.showpai=true;
		},
		// 竞价
		jingjia(){
			var that = this;
			let url="/Pm/pmchujia"
			let data={pmOrderId:this.pmOrderId,paymoney:that.csnum,}
			this.Utils.tools.luch_post(url,data).then(res=>{
				console.log(res)
				if(res.status==1){
					this.Utils.tools.showmsg(that.$t('tips.cjyes'));
					that.showpai=false;
				}else if(res.status==-1){
					this.Utils.tools.showmsg(that.$t('tips.cjno'));
				}
				that.showpai=false;
			}).catch(err=>{console.log})
			setTimeout(function() {
				that.getmoneylist();
				that.csnum='';
			}, 1000)
		},
		// 战斗力排序
		atklist(){
			this.nowpage=1;
			var that=this;
			this.showjt=!this.showjt;
			this.atkpx=!this.atkpx;
			this.cardlist=[]
			this.getmoneylist();
		},
		// 选择类型
		xztype(){
			this.nowpage=1;
			this.getmoneylist();
			this.showtype=false;
		},
		// 选择等级
		xzdengji(){
			this.nowpage=1;
			this.getmoneylist();
			this.showdj=false;
		},
		// 获取筛选列表
		getsx(){
			var that=this;
			var url="/Pageinit/getcardtype";
			var data={lang:this.$i18n.locale,};
			function fnSuc(res){
				console.log(res.data)
				that.typelist=res.data;
				// that.czlist=res.data.imglist;
				// that.cznum=res.data.cznum;
			}
			that.Utils.tools.post(url,data,that,fnSuc);
			
			// this.showopenten=true;
		},
		//页面初始化-获取卡牌列表
		getmoneylist(){
			var that=this;
			let url="/Pm/getpmingcard"
			if(this.nowpage==1){
				that.cardlist=[];
			}
			let data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,cardRace:this.cardRace,cardRank:this.cardRank,baseCardId:that.baseCardId,atk:this.atkpx};
			var fnSuc = function(res){
				console.log(res);
				that.cardlist = that.cardlist.concat(res.data.data);
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
			this.getmoneylist();
		},
		change(){
			console.log(1)
		},
		onChange(e) {
			this.timeData = e
		},
		// 关闭弹出层
		close(){
			this.showtype=false;
			this.showdj=false;
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
// 中间内容
.content_box{
	width: 750rpx;
	height: 1328rpx;
	background: url(../../static/h/mgshop/content_bg.png) no-repeat;
	background-size: 750rpx 1328rpx;
}
.content_top{
	display: flex;
	justify-content: space-between;
	width: 80%;
	margin: 50rpx auto 16rpx;
}
.content_top .choose_box{
	display: flex;
	justify-content: flex-start;
}
.content_top .sel_box{
	display: flex;
	justify-content: center;
	margin-right: 30rpx;
}
.content_top .sel_box .sel_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.content_top .sel_box .xjt_img{
	width: 21rpx;
	height: 15rpx;
	background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
	background-size: 21rpx 15rpx;
	margin: 18rpx 0 0 10rpx;
}
.content_top .sel_box .fxjt_img{
	width: 21rpx;
	height: 15rpx;
	background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
	background-size: 21rpx 15rpx;
	margin: 18rpx 0 0 10rpx;
	transform: rotate(180deg);
	
}
.content_top .list_btn{
	font-size: 28rpx;
	font-weight: 500;
	color: #B7B7B7;
}
.content_box .line{
	width: 654rpx;
	height: 4rpx;
	background: #433E3D;
	box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(142, 140, 140, 0.16);
	margin: 0 auto;
}
.ka_box{
	height: 1100rpx;
	overflow: auto;
}
// 卡牌
.ka_content{
	width: 660rpx;
	margin: 0 auto;
	display: flex;
	// justify-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
}
.ka_content .card_content{
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.ka_content .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.ka_content .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.ka_content .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.ka_content .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.ka_content .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.ka_content .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.ka_content .card_box .info_box .info_data{
	padding: 6rpx;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
// 我的出售
.ka_content .card_box .mysale{
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
.ka_content .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.ka_content .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}


.ka_content .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.ka_content .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.ka_content .card_content .time_box{
	margin: 34rpx 12rpx 24rpx 0;
	width: 262rpx;
	height: 51rpx;
	background: url(../../static/h/mgshop/time_bg.png) no-repeat;
	background-size: 262rpx 51rpx;
	display: flex;
	justify-content: flex-start;
}
.ka_content .card_content .time{
	display: flex;
	margin-top: 6rpx;
}
.ka_content .card_content .time_box .time_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	line-height: 51rpx;
	margin-left: 20rpx;
}
.ka_content .card_content .time_box .time_num{
	font-size: 24rpx;
	font-weight: bold;
	color: #F7D38B;
	margin-top: 4rpx;
}
.ka_content .card_content .buy_btn{
	width: 226rpx;
	height: 68rpx;
	background: url(../../static/h/mgshop/buy_bg.png) no-repeat;
	background-size: 226rpx 68rpx;
	font-size: 28rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
	margin: 10rpx 0 0 20rpx;
}
// 竞买弹出层
.pai_popup{
	margin: auto 0;
}
.pai_popup .pai_bg{
	width: 700rpx;
	height: 1200rpx;
	background: url(../../static/h/packs/salepopup_bg.png) no-repeat;
	background-size: 700rpx 1200rpx;
	margin: 0 auto;
}
.pai_popup .popup_top{
	display: flex;
	justify-content: flex-end;
}
.pai_popup .close_img{
	width: 54rpx;
	height: 54rpx;
	background: url(../../static/h/boss/close_img.png) no-repeat;
	background-size: 54rpx 54rpx;
}
.pai_popup .card_content{
	margin: -30rpx auto 0;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	// box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	// border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.pai_popup .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.pai_popup .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.pai_popup .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.pai_popup .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.pai_popup .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.pai_popup .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.pai_popup .card_box .info_box .info_data{
	font-size: 24rpx;
	line-height: 22rpx;
	text-align: center;
	color: #C79A52;
}
.pai_popup .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.pai_popup .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}
.pai_popup .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.pai_popup .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.pai_popup .input_bg{
	width: 600rpx;
	height: 530rpx;
	background: url(../../static/h/trade/jminfo_bg.png) no-repeat;
	background-size: 600rpx 530rpx;
	margin: 30rpx auto;
}
.pai_popup .input_bg .input_name{
	width: 466rpx;
	margin: 14rpx auto 0;
	font-size: 24rpx;
	font-weight: 400;
	color: #999999;
}
.pai_popup .input_bg .input_box{
	width: 500rpx;
	margin: 0 auto;
}
.pai_popup .input_bg .line{
	width: 466rpx;
	height: 2rpx;
	margin: 0 auto;
	background-color: #C8C5C5;
}
.pai_popup .input_bg .coin_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.pai_popup .btnok_bg{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/packs/hc_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	margin: 0 auto;
	font-size: 40rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
}
// 选择类型弹出层
.type_popup{
	width: 750rpx;
	height: 1230rpx;
	background: #282422;
	background-size: 750rpx 1230rpx;
}
.type_popup .type_bg{
	width: 750rpx;
	height: 1230rpx;
	background: url(../../static/h/cards/type_bg.png) no-repeat;
	background-size: 750rpx 1230rpx;
}
.type_bg .type_top{
	width: 95%;
	margin: 20rpx auto 40rpx;
	display: flex;
	justify-content: space-between;
}
.type_top .space{
	// width: 54rpx;
	// height: 54rpx;
	color: #FFFFFF;
}
.type_top .xzspace{
	color: #C79A52;
}
.type_top .popup_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.type_top .close_img{
	width: 54rpx;
	height: 54rpx;
}
.type_top .close_img image{
	width: 54rpx;
	height: 54rpx;
}
.type_bg .type_name{
	width: 90%;
	margin: 0 auto;
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.type_bg .opts_box{
	width: 90%;
	margin: 20rpx auto 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.type_bg .xz_opt{
	width: 192rpx;
	height: 60rpx;
	background: url(../../static/h/cards/opt_yes.png) no-repeat;
	background-size: 192rpx 60rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	line-height: 50rpx;
	margin: 0 30rpx 16rpx 0;
}
.type_bg .type_opt{
	width: 192rpx;
	height: 60rpx;
	background: url(../../static/h/cards/opt_no.png) no-repeat;
	background-size: 192rpx 60rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	line-height: 50rpx;
	margin: 0 30rpx 16rpx 0;
}
.type_bg .popup_line{
	width: 680rpx;
	height: 4rpx;
	background: rgba(67,62,61,0.5);
	// box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(142, 140, 140, 0.16);
	margin: 20rpx auto;
}
.type_bg .ok_btn{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/cards/ok_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	font-size: 44rpx;
	font-weight: bold;
	color: #F7D38B;
	line-height: 86rpx;
	text-align: center;
	margin: 0 auto;
}




</style>
