<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<topnav :title="$t('pack.tit')" urlline="index"></topnav>
			<!-- 记录框 -->
			<view class="list_box">
				<!-- <view class="trade_list" @click="toPage('pmlist')">拍卖记录 ></view> -->
				<view class="up_list" @click="toPage('uplist')">{{$t('pack.uplist')}} ></view>
			</view>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn"  @click="toPage('backpack')">{{$t('pack.card')}}</view>
					<view class="nav_btn active">{{$t('pack.up')}}</view>
					<view class="nav_btn" @click="toPage('zhiya')">{{$t('pack.zhiya')}}</view>
				</view>
			</view>
			<!-- 选中框 -->
			<view class="xz_bg">
				<view class="xz_box" v-for="(item,i) in slelist_show">
					<view class="card_content">
						<view class="card_box" :style="'background-image: url(../../static/h/cards_bg/'+item.bg+'.png);background-size: 180rpx 282rpx;'">
							<view class="card_info">
								<view class="super_img" v-if="item.cardName=='LOONG'"></view>
								<view class="card_name" v-if="item.cardName!='RAT'&&item.cardName!='DOG'&&item.cardName!='OX'&&item.cardName!='GOAT'&&item.cardName!='PIG'&&item.cardName!='LEO'">{{item.cardName}}</view>
								<view class="card_rat" v-if="item.cardName=='RAT'||item.cardName=='DOG'||item.cardName=='OX'||item.cardName=='GOAT'||item.cardName=='PIG'||item.cardName=='LEO'">{{item.cardName}}</view>
								<!-- <view class="card_dj">Ⅻ</view> -->
							</view>
							<view class="atk_box" v-if="item.atk>0">
								<view class="atk_data">ATK:{{item.atk}}</view>
							</view>
						</view>
						<view class="card_img">
							<image :src="item.cnImg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 合成按钮 -->
			<view class="hc_btn" @click="goldhc()">{{$t('pack.syn')}}</view>
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
							<view class="sel_name">{{$t('pack.type')}}</view>
							<view class="xjt_img"></view>
						</view>
					</view>
					<view class="list_btn"></view>
				</view>
				<view class="line"></view>
				<scroll-view class="ka_box" scroll-y="true" @scrolltolower="dddd()">
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
							<view class="tj_btn" @click="slecard(item.id)">
								<view class="" v-if="item.id!=cardIds[0]&&item.id!=cardIds[1]&&item.id!=cardIds[2]">{{$t('pack.addto')}}</view>
								<view class="" v-if="item.id==cardIds[0]||item.id==cardIds[1]||item.id==cardIds[2]">{{$t('pack.sele')}}</view>
							</view>
							<!-- <view class="qx_btn">取消</view> -->
						</view>
						
					</view>
					<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"   :nomore-text="nomoreText" @loadmore="loadmore" />
				</scroll-view>
				
			</view>
			
			
			<!-- 选择类型弹出层 -->
			<u-popup :show="showtype" @close="close" @open="open" mode="bottom">
				<view class="type_popup">
					<view class="type_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="type_top">
							<view :class="baseCardId==0?'xzspace':'space'" @click="baseCardId=0">{{$t('pack.whole')}}</view>
							<view class="popup_name">{{$t('pack.type')}}</view>
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
						<view class="ok_btn" @click="xztype()">{{$t('pack.ok')}}</view>
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
			
			<!-- 过渡效果 -->
			<u-overlay :show="showgd" opacity="0.8">
				<view class="gd_popup">
					<view class="rollbox" :class="{'box_rolling':isRolling}">
						<view class="zm">
							<view class="cardimg">
								<image src="../../static/h/cards/kaxz.png" mode=""></image>
							</view>
						</view>
						<view class="fm">
							<view class="cardimg">
								<image src="../../static/h/cards/kasx.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</u-overlay>
			
			<!-- 开启一个 -->
			<u-overlay :show="showopenone" opacity="0.8">
				<view class="openone_popup">
					<!-- <view class="popup_tips">{{$t('index.ok')}}</view> -->
					<view class="openone_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="card_content">
							<view class="card_box" :style="'background: url(../../static/h/cards_bg/'+newcard.bg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img"></view>
									<view class="card_name">{{newcard.cardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<view class="info_box">
									<view class="info_data" v-if="lang=='en'">
										{{newcard.desEn}}
									</view>
									<view class="info_data" v-else>
										{{newcard.desCn}}
									</view>
								</view>
								<view class="atk_box">
									<view class="atk_data">
										ATK:{{newcard.atk}}
									</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="newcard.cnImg" mode=""></image>
							</view>
							
						</view>
						
						<view class="okbtn_bg" @click="showopenone=false">领取卡牌</view>
					</view>
				</view>
			</u-overlay>
			
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
			lang:this.$i18n.locale,
			xzcardbg:'',
			urlbg:'../../static/h/cards/cards_bg.png',
			showtype:false,
			cardbg:'',
			
			atkpx:0,//战斗力排序
			showjt:false,
			typelist:'',
			baseCardId:0,
			cardlist:'',
			
			slelist: [], //选中的
			slelist_show: [], //显示的
			cardIds:[],//合成的id
			maxsle: 4, //最大可选卡牌
			hcfee:'',//合成费用
			userId: 0,
			wallet: '',
			
			showdj:false,
			cardRank:0,//级别排序
			
			imgbg:'f_bg',
			showgd:false,
			isRolling:false,
			showopenone:false,
			newcard:'',
			
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
		this.xzcardbg='background: url('+this.urlbg+');background-size: 180rpx 282rpx;';
		this.cardbg='background: url('+this.urlbg+');background-size: 300rpx 470rpx;';
		this.getcardlist();
		this.getsx();
		this.opengold();
		this.sledo();
		this.sysinit();
		// this.gb();
	},
	methods: {
		gb(){
			var that=this
			this.isRolling = !this.isRolling
			setTimeout (function(){
				that.isRolling = false
			},1000)
			setTimeout (function(){
				that.isRolling = false;
				that.showgd=false;
				that.showopenone=true;
			},2000)
		},
		// 合成
		goldhc(){
			var that=this;
			// that.awaitnow();
			//判断卡张数是否足够
			if (this.slelist.length < 3) {
				this.Utils.tools.showmsg(that.$t("tips.mustb"));
				return;
			}
			let url = "/bag/hc";
			let data = {userId: that.userId,lang: that.$i18n.locale,cardIds:that.cardIds,};
			let fnSuc = function(res) {
				console.log(res);
				if (res.data.status == 1) {
					//清除卡牌
					// that.clearsle();
					// that.nowpage=1;
					// that.cardlist=[];
					//初始化卡牌列表
					// that.getcardlist();
					that.newCardId = res.data.newCardId;
					that.goldOrderId = res.data.goldOrderId;
					that.newcard = res.data.cardinfo;
					uni.hideLoading();
					// that.Utils.tools.showmsg(that.$t("tips.hccg"));
					that.showgd=true;
					that.gb();
					setTimeout(function() {
						that.nowpage=1;
						that.getcardlist();
						that.clearsle();
					}, 1000)
				} else {
					that.clearsle(); //清除卡牌
					uni.hideLoading();
					that.Utils.tools.showmsg(that.$t("tips.unfor"));
				}
			}
			that.Utils.tools.post(url, data, that, fnSuc)
			// setTimeout(function() {
			// 	that.nowpage=1;
			// 	that.getcardlist();
			// 	that.clearsle();
			// }, 1000)
		},
		
		//合成
		async gold() {
			var that=this;
			// that.awaitnow();
			//判断卡张数是否足够
			if (this.slelist.length < 3) {
				this.Utils.tools.showmsg(that.$t("tips.mustb"));
				return;
			}
		
			//钱包地址打印
			// var that = this;
			var to = uni.getStorageSync('incomeaddress');
			//获取要合成的卡
			// this.getslecardId(); 
			// let hcfees = parseFloat(that.hcfee);
			let hcfees = that.hcfee.toFixed(2);
			//检测余额是否足够
			let wallet = this.wallet
			uni.showLoading({
				title: that.$t("tips.querying")
			})
			let ye = 0;
			let abi20 = uni.getStorageSync("abi20");
			let contract = await tronWeb.contract(abi20, 'TMGTa4gaEW9rMmjaQgH7WiRmPXWHAtuepB');
			await contract.balanceOf(wallet).call().then(res => {
				// ye = this.Utils.tools.weito(res, 8);
				// ye = that.Utils.tools.fromanywei(res,18);
				ye = web3.utils.hexToNumberString(res._hex) / 1000000;
				console.log("余额" + ye);
			}).catch(err => {
				uni.showToast({
					title: that.$t("tips.error")
				})
				console.log(err);
				uni.hideLoading();
				return false;
			});
			if (hcfees * 1 > ye * 1) {
				this.Utils.tools.showmsg(that.$t("tips.sorry"));
				uni.hideLoading();
				return false;
			}
			// let amount = this.Utils.tools.towei(hcfees, 8);
			let amount=that.Utils.tools.toanywei(hcfees,6);
			uni.hideLoading();
			uni.showLoading({
				title: that.$t("tips.paid")
			})
		
			contract.transfer(to, amount).send({
				from: this.wallet,
				gas: 210000
			}).then(async (transactionHash) => {
				// if (error) {
				// 	console.log(error);
				// 	return;
				// }
				uni.hideLoading();
				uni.showLoading({
					title: that.$t("tips.waiting"),
				})
				let url = "/bag/hc";
				let data = {
					// transactionHash: transactionHash,
					// fromacc: that.wallet,
					// toacc: to,
					// paymoney: that.hcfee,
					userId: that.userId,
					// cardId: that.cardId,
					lang: that.$i18n.locale,
					cardIds:that.cardIds,
				};
				let fnSuc = function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.clearsle(); //清除卡牌
						// that.nowpage=1;
						// that.cardlist=[];
						that.getcardlist();//初始化卡牌列表
						that.newCardId = res.data.newCardId;
						that.goldOrderId = res.data.goldOrderId;
						uni.hideLoading();
						that.Utils.tools.showmsg(res.data.msg);
					} else {
						that.clearsle(); //清除卡牌
						uni.hideLoading();
						that.Utils.tools.showmsg(that.$t("tips.unfor"));
					}
				}
				that.Utils.tools.post(url, data, that, fnSuc)
			}).then(async (res) => {
				console.log(res)
				// await that.Utils.tools.taskpost("/Task388", {});
				setTimeout(async () => {
					await that.Utils.tools.taskpost("/Task388", {})
				}, 3000)
			}).then(async res=>{
				setTimeout(async () => {
					await that.Utils.tools.taskpost("/Task388", {})
				}, 3000)
				setTimeout(function() {
					that.getcardlist();
				}, 2000)
				uni.hideLoading();
				
			}).catch(err=>{
				uni.hideLoading();
				that.Utils.tools.showmsg(that.$t("tips.unfor"));
			})
			
			
			// .then(res => {
			// 	//合成成功
			// 	uni.hideLoading();
			// 	if (that.newCardId !== 0) {
			// 		let fnSuc = function(res) {
			// 			uni.hideLoading();
			// 			uni.navigateTo({
			// 				url: '../nftlist/nftlist?goldOrderId=' + that.goldOrderId,
			// 			})
			// 		}
			// 		that.Utils.tools.taskpost("/Task388", {}, fnSuc);
			// 		setTimeout(function() {
			// 			that.getcardlist();
			// 		}, 2000)
			// 	} else {
			// 		uni.hideLoading();
			// 		that.Utils.tools.showmsg(that.$t("tips.unfor"));
			// 	}
			// })
		},
		//合成金卡选择器打开
		opengold() {
			this.rightbtn = '合成金卡';
			//关闭价格窗口
			this.showhireprice = false;
			if (this.$i18n.locale == 'en') {
				this.rightbtn = 'Synthetic';
			}
			this.maxsle = 3;
			// this.clearsle();
			//this.$refs.popup.open('bottom');
			this.hireboxshow = 1;
		},
		//清空选中
		clearsle() {
			var that = this;
			that.slelist = [];
			that.slelist_show = [];
			for (var i = 0; i < that.cardlist.length; i++) {
				that.cardlist[i].hp = 0;
			}
			this.sledo();
			this.cardIds=[];
		},
		//选中卡牌
		slecard(cardId) {
			var that = this;
			console.log(cardId);
			//已选中ID列表
			var sleranks = []; //已选的级别
			for (var i = 0; i < that.slelist.length; i++) {
				sleranks.push(that.slelist[i].cardRank);
			}
		
			for (var i = 0; i < that.cardlist.length; i++) {
				if (cardId == that.cardlist[i].id && that.cardlist[i].hp == 0) {
					//判断是否是同种族
					if (that.slelist.length > 0 && that.cardlist[i].cardRace != that.slelist[0].cardRace) {
						that.Utils.tools.showmsg(that.$t("tips.must"));
						return false;
					}
					// 判断是否是同一等级
					if (that.slelist.length > 0 && that.cardlist[i].bg != that.slelist[0].bg) {
						that.Utils.tools.showmsg(that.$t("tips.dj"));
						return false;
					}
					//如果是卡牌合成 必须是相同baseCardId卡牌
					if (that.maxsle == 3 && that.slelist.length > 0 && that.slelist[0].baseCardId != that.cardlist[i]
						.baseCardId) {
						that.Utils.tools.showmsg(that.$t("tips.must"));
						return false;
					}
					//如果是卡牌合成 金卡不能合成
					// if (that.maxsle == 3 && that.cardlist[i].cardColor == 378) {
					// 	that.Utils.tools.showmsg(that.$t("money.goldisnot"));
					// 	return false;
					// }
					//判断数量
					if (that.slelist.length > that.maxsle - 1) {
						that.Utils.tools.showmsg(that.$t("tips.full"));
						return false;
					}
					that.cardlist[i].hp = 1;
				} else if (cardId == that.cardlist[i].id && that.cardlist[i].hp == 1) {
					that.cardlist[i].hp = 0;
				}
				// 神话和金色神话不能合成
				// if (that.cardlist[i].cardRank=="377"){
				// 	that.Utils.tools.showmsg(that.$t("mypack.mythNo"));
				// 	return false;
				// }
				// if (that.cardlist[i].bg=="e_bg"){
				// 	that.Utils.tools.showmsg(that.$t("mypack.goldenNo"));
				// 	return false;
				// }
			}
			// console.log(that.cardlist)
			//已选中
			var slelist = [];
			var cardIds= [];
			for (var i = 0; i < that.cardlist.length; i++) {
				if (that.cardlist[i].hp == 1) {
					slelist.push(that.cardlist[i]);
					cardIds.push(that.cardlist[i].id)
				}
			}
			console.log(slelist);
			console.log(cardIds);
			// 
			that.slelist = slelist;
			that.cardIds = cardIds;
			this.sledo()
		},
		//选中卡牌显示处理
		sledo() {
			var that = this;
			var slelist_show = [];
			for (var i = 1; i <= that.maxsle; i++) {
				if (i > that.slelist.length) {
					slelist_show.push({
						id: 0,
						// enImg: '../../static/img/slecardbg.svg',
						// cnImg: '../../static/img/slecardbg.svg'
					});
				} else {
					slelist_show.push(that.slelist[i - 1])
				}
			}
			console.log(that.slelist);
			that.slelist_show = slelist_show;
			console.log(slelist_show);
		},
		//获取选中卡牌ID
		getslecardId() {
			var that = this;
			var arr = new Array();
			for (var i = 0; i < that.slelist.length; i++) {
				arr.push(that.slelist[i].id);
			}
			that.cardId = arr.join(',');
		},
		// 战斗力排序
		atklist(){
			this.nowpage=1;
			var that=this;
			this.showjt=!this.showjt;
			this.atkpx=!this.atkpx;
			this.cardlist=[]
			this.getcardlist();
		},
		// 选择类型
		xztype(){
			this.nowpage=1;
			this.getcardlist();
			this.showtype=false;
		},
		// 选择等级
		xzdengji(){
			this.nowpage=1;
			this.getcardlist();
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
		// 获取我的卡牌列表
		getcardlist(){
			var that=this;
			if(this.nowpage==1){
				that.cardlist=[];
			}
			var url = "/bag/getucardlist";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,baseCardId:that.baseCardId,atk:this.atkpx,cardRank:this.cardRank,}
			var fnSuc = function(res){
				console.log(res)
				that.cardlist=that.cardlist.concat(res.data.data);
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
			this.getcardlist();
		},
		// 点击加载
		loadmore() {
			console.log('loadmore');
			// uni.$u.toast('加载更多')
			if(this.nowpage>=this.maxpage){
				return false;
			}
			this.nowpage++;
			this.getcardlist();
		},
		//获取系统参数
		async sysinit() {
			uni.showLoading({
				title: this.$t("tips.wait"),
			})
			var that = this
			let url = "/Init"
			let data = {}
			await that.Utils.tools.luch_get(url, data).then(res => {
				console.log(res)
				that.userId = uni.getStorageSync("userId");
				that.wallet = uni.getStorageSync("wallet");
				//获取系统信息
				uni.setStorageSync("sysinfo", res);
				//收付款账号
				uni.setStorageSync("incomeaddress", res.incomeaddress);
				uni.setStorageSync("income_hire", res.income_hire);
				uni.setStorageSync("income_trade", res.income_trade);
				uni.setStorageSync("pay_trade", res.pay_trade);
				//合约地址
				uni.setStorageSync("contractaddress_721", res.contractaddress_721);
				uni.setStorageSync("contractaddress_20", res.contractaddress_20);
				console.log(res.contractaddress_20)
				uni.setStorageSync("contractaddress_usdt", res.contractaddress_usdt);
				//一些常量
				uni.setStorageSync("symbol", res.symbol);
				that.mindefije = res.mindefije;
				uni.setStorageSync("hcfee",res.hcfee);
				that.hcfee = parseFloat(res.hcfee);
				console.log('系统初始化完成');
			}).then(async () => {
				//RPC通讯得到钱包
				console.log('RPC通讯')
				// await that.initweb3()
			}).then(async () => {
				console.log('获取当前钱包')
				// await that.getMetaMask();
				// await that.linkWallet();
			}).catch((err) => {
				console.log(err)
			});
			// that.pageinit();
			// that.looye();
			console.log('初始化用户信息')
			uni.hideLoading();
		},
		// 连接钱包
		linkWallet() {
			this.initWallet()
			setTimeout(() => {
				if (window.tronWeb) {
					this.tronWeb = window.tronWeb;
					this.defaultAddress = this.tronWeb.defaultAddress.base58;
					console.log('地址=>', this.defaultAddress)
					uni.setStorageSync('wallet', this.defaultAddress)
				} else {
					console.log('连接钱包失败');
					return;
				}
			}, 500)
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
// 记录框
.list_box{
	display: flex;
	justify-content: space-between;
	width: 90%;
	margin: 40rpx auto 0;
	font-size: 30rpx;
	font-weight: 400;
	color: #F7D38B;
}
// 导航栏
.nav_bg{
	width: 710rpx;
	height: 158rpx;
	background: url(../../static/h/packs/nav_bg.png) no-repeat;
	background-size: 710rpx 158rpx;
	margin: 0 auto;
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
	margin-top: 80rpx;
	line-height: 76rpx;
}
.nav_bg .nav_box .nav_btn.active{
	width: 416rpx;
	height: 70rpx;
	background: url(../../static/h/packs/active_bg.png) no-repeat;
	background-size: 260rpx 70rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F3A508;
}
// 选中框
.xz_bg{
	width: 750rpx;
	height: 394rpx;
	background: url(../../static/h/packs/xz_box.png) no-repeat;
	background-size: 750rpx 394rpx;
	display: flex;
	justify-content: center;
}
.xz_bg .xz_box{
	margin: 40rpx 10rpx 0;
	width: 166rpx;
	height: 254rpx;
	background: url(../../static/h/packs/add_bg.png) no-repeat;
	background-size: 166rpx 254rpx;
}
.xz_bg .card_content{
	position: relative;
	// padding: 16rpx 6rpx 16rpx 20rpx;
	margin-top: -20rpx;
}
.xz_bg .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 180rpx;
	height: 282rpx;
	position: relative;
	z-index: 10;
}
.xz_bg .card_box .super_img{
	width: 60rpx;
	height: 19rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 60rpx 19rpx;
	position: absolute;
	top: 20rpx;
}
.xz_bg .card_box .card_name{
	position: absolute;
	top: 20rpx;
	left: 50rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.4);
}
.xz_bg .card_box .card_rat{
	position: absolute;
	top: 20rpx;
	left: 64rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.4);
}
.xz_bg .card_box .card_dj{
	position: absolute;
	top: 12rpx;
	right: 18rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
	transform: scale(0.6);
}
.xz_bg .card_box .atk_box{
	width: 96rpx;
	height: 18rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 96rpx 18rpx;
	position: absolute;
	bottom: 0;
	left: 30rpx;
}
.xz_bg .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.4);
	line-height: 20rpx;
}
.xz_bg .card_img{
	width: 160rpx;
	height: 168rpx;
	position: absolute;
	top: 40rpx;
	// left: 24rpx;
}
.xz_bg .card_img image{
	width: 160rpx;
	height: 168rpx;
}
// 合成按钮
.hc_btn{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/packs/hc_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	margin: 0 auto;
	font-size: 44rpx;
	font-weight: 500;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
}
// 中间内容
.content_box{
	width: 750rpx;
	height: 1328rpx;
	background: url(../../static/h/mgshop/content_bg.png) no-repeat;
	background-size: 750rpx 1328rpx;
}
.content_box .content_top{
	display: flex;
	justify-content: space-between;
	width: 80%;
	margin: 50rpx auto 16rpx;
}
.content_box .content_top .choose_box{
	display: flex;
	justify-content: flex-start;
}
.content_box .content_top .sel_box{
	display: flex;
	justify-content: center;
	margin-right: 30rpx;
}
.content_box .content_top .sel_box .sel_name{
	font-size: 32rpx;
	font-weight: 400;
	color: #C79A52;
}
.content_box .content_top .sel_box .xjt_img{
	width: 21rpx;
	height: 15rpx;
	background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
	background-size: 21rpx 15rpx;
	margin: 18rpx 0 0 10rpx;
}
.content_box .content_top .sel_box .fxjt_img{
	width: 21rpx;
	height: 15rpx;
	background: url(../../static/h/mgshop/xjt_img.png) no-repeat;
	background-size: 21rpx 15rpx;
	margin: 18rpx 0 0 10rpx;
	transform: rotate(180deg);
	
}
.content_box .content_top .list_btn{
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
.content_box .ka_box{
	height: 1100rpx;
	overflow: auto;
}
// 卡牌
.content_box .ka_content{
	display: flex;
	// justify-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 664rpx;
	margin: 0 auto;
}
.content_box .card_content{
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.content_box .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.content_box .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.content_box .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.content_box .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.content_box .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.content_box .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.content_box .card_box .info_box .info_data{
	padding: 6rpx;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
// 我的出售
.content_box .card_box .mysale{
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
.content_box .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.content_box .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}


.content_box .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.content_box .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.content_box .card_content .tj_btn{
	width: 226rpx;
	height: 68rpx;
	background: url(../../static/h/packs/tj_btn.png) no-repeat;
	background-size: 226rpx 68rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
	margin-left: 24rpx;
	margin-top: 10rpx;
}
.content_box .card_content .qx_btn{
	width: 226rpx;
	height: 68rpx;
	background: url(../../static/h/packs/qx_btn.png) no-repeat;
	background-size: 226rpx 68rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
	margin-left: 24rpx;
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
// 过渡效果
.gd_popup{
	margin: auto 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.rollbox{
	position: relative;
	perspective: 1000px;
	width:300rpx;
	height: 470rpx;
	// margin:100px auto;
	// margin-left: 220rpx;
}
.rollbox .zm{
	transform-style: preserve-3d; //表示所有子元素在3D空间中呈现
	backface-visibility: hidden;  //元素背面向屏幕时是否可见
	transition-duration:1s;
	transition-timing-function:'ease-in';
	// background:#008080;
}
.rollbox .fm{
	transform-style: preserve-3d; //表示所有子元素在3D空间中呈现
	backface-visibility: hidden;  //元素背面向屏幕时是否可见
	transition-duration:1s;
	transition-timing-function:'ease-in';
	// background:#008080;
}
.rollbox .cardimg{
	width:300rpx;
	height: 470rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.rollbox .cardimg image{
	width:300rpx;
	height: 470rpx;
}
.fm{
	transform: rotateY(180deg);
	visibility:hidden;  //元素不可见，但占据空间
	position: absolute;
	top:0;
	bottom:0;
	right: 0;
	left: 0;
	// transition: all 3s;
}
.box_rolling .zm{
	transform: rotateY(180deg);
	visibility:hidden;
	// transition: all 3s;
}
.box_rolling .fm{
	transform: rotateY(0deg);
	visibility:visible;
	// transition: all 3.3s;
}

// 开启一个
.openone_popup{
	margin: auto 0;
}
.openone_popup .popup_tips{
	font-size: 32rpx;
	font-weight: 500;
	color: #FFFFFF;
	text-align: center;
}
.openone_popup .openone_bg{
	width: 700rpx;
	height: 815rpx;
	// background: url(../../static/h/index/gx_bg.png) no-repeat;
	// background-size: 700rpx 815rpx;
	margin: 0 auto;
}
.openone_popup .card_content{
	margin: 100rpx 0 0 200rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	// box-shadow: 0px 1px 3px 1px rgba(142, 140, 140, 0.16);
	// border: 2rpx solid  rgba(67, 62, 61, 0.2);
}
.openone_popup .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.openone_popup .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.openone_popup .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.openone_popup .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.openone_popup .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.openone_popup .card_box .info_box .info_data{
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
.openone_popup .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.openone_popup .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}
.openone_popup .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	left: 24rpx;
}
.openone_popup .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.openone_popup .okbtn_bg{
	margin: 48rpx auto 0;
	width: 280rpx;
	height: 66rpx;
	background: url(../../static/h/index/okbtn_bg.png) no-repeat;
	background-size: 280rpx 66rpx;
	font-size: 28rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 66rpx;
}


</style>
