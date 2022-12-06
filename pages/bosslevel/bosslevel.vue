<template>
	<view class="app">
		<view class="app_bg">
			<!-- 顶部 -->
			<!-- <topnav :title="$t('boss.tit')" urlline="index"></topnav> -->
			<!-- xxx -->
			<view class="zhan" style="height: 10rpx;"></view>
			<!-- 顶部 -->
			<view class="topnav_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="nav_box">
					<view class="back_img" @click="toPage('index')">
						<image src="../../static/h/topnav/back_img.png" mode=""></image>
					</view>
					<view class="nav_name">{{$t('boss.tit')}}</view>
					<view class="help_img">
						<view class="" @click="showrule=true">{{$t('boss.rule')}}</view>
					</view>
				</view>
			</view>
			<!-- 导航栏 -->
			<view class="nav_bg">
				<view class="nav_box">
					<view class="nav_btn active">{{$t('boss.tit')}}</view>
					<view class="nav_btn"  @click="toPage('sjboss')">{{$t('boss.world')}}</view>
				</view>
			</view>
			<!-- BOSS关卡 -->
			<view class="all_boss" v-if="showboss==0">
				<!-- 关卡1 -->
				<view class="boss_a" @click="showboss=1">
					<view class="s_img">
						<image src="../../static/h/boss/s.png" mode=""></image>
					</view>
					<view class="info_box">
						<view class="info_data">
							<view class="data_name">{{$t('boss.I')}}</view>
							<view class="data_num">{{$t('boss.consume')}}：<span>{{bossmp1}}{{$t('boss.ticket')}}</span></view>
						</view>
						<view class="info_name">{{$t('boss.jungle')}}</view>
					</view>
					<view class="pk_img">
						<image src="../../static/h/boss/pk_logo.png" mode=""></image>
					</view>
				</view>
				<!-- 关卡2 -->
				<view class="boss_b" @click="showboss=2">
					<view class="s_img">
						<image src="../../static/h/boss/ss.png" mode=""></image>
					</view>
					<view class="info_box">
						<view class="info_data">
							<view class="data_name">{{$t('boss.II')}}</view>
							<view class="data_num">{{$t('boss.consume')}}：<span>{{bossmp2}}{{$t('boss.ticket')}}</span></view>
						</view>
						<view class="info_name">{{$t('boss.ice')}}</view>
					</view>
					<view class="pk_img">
						<image src="../../static/h/boss/pk_logo.png" mode=""></image>
					</view>
				</view>
				<!-- 关卡3 -->
				<view class="boss_c" @click="showboss=3">
					<view class="s_img">
						<image src="../../static/h/boss/sss.png" mode=""></image>
					</view>
					<view class="info_box">
						<view class="info_data">
							<view class="data_name">{{$t('boss.III')}}</view>
							<view class="data_num">{{$t('boss.consume')}}：<span>{{bossmp3}}{{$t('boss.ticket')}}</span></view>
						</view>
						<view class="info_name">{{$t('boss.Ajatar')}}</view>
					</view>
					<view class="pk_img">
						<image src="../../static/h/boss/pk_logo.png" mode=""></image>
					</view>
				</view>
				<!-- 购买门票 -->
				<view class="buymp_btn" @click="showbuymp=true">{{$t('boss.buymp')}}</view>
			</view>
			<!-- 丛林宝库 -->
			<view class="bossa_box" v-if="showboss==1">
				<view class="bossa_bg">
					<view class="boss_top">
						<view class="mymp_box">
							<view class="add_img">
								<image src="../../static/h/boss/add_img.png" mode=""></image>
							</view>
							<view class="mpnum_bg">{{$t('boss.ticket')}}：{{mymp}}</view>
						</view>
						<view class="boss_list" @click="toPage('pvelist')">{{$t('boss.tzlist')}}</view>
					</view>
					<view class="boss_a">
						<view class="s_img">
							<image src="../../static/h/boss/s.png" mode=""></image>
						</view>
						<view class="info_box">
							<view class="info_data">
								<view class="data_name">{{$t('boss.I')}}</view>
								<view class="data_num">{{$t('boss.consume')}}：<span>{{bossmp1}}{{$t('boss.ticket')}}</span></view>
							</view>
							<view class="info_name">{{$t('boss.jungle')}}</view>
						</view>
						<view class="pk_img">
							<image src="../../static/h/boss/pk_logo.png" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 按钮框 -->
				<view class="btn_box">
					<view class="other_btn" @click="showboss=0">{{$t('boss.other')}}</view>
					<view class="sel_btn" @click="selcard=true">{{$t('boss.sel')}}</view>
				</view>
			</view>
			<!-- 冰雪宝库 -->
			<view class="bossb_box" v-if="showboss==2">
				<view class="bossb_bg">
					<view class="boss_top">
						<view class="mymp_box">
							<view class="add_img">
								<image src="../../static/h/boss/add_img.png" mode=""></image>
							</view>
							<view class="mpnum_bg">{{$t('boss.ticket')}}：{{mymp}}</view>
						</view>
						<view class="boss_list" @click="toPage('pvelist')">{{$t('boss.tzlist')}}</view>
					</view>
					
					<view class="boss_b">
						<view class="s_img">
							<image src="../../static/h/boss/ss.png" mode=""></image>
						</view>
						<view class="info_box">
							<view class="info_data">
								<view class="data_name">{{$t('boss.II')}}</view>
								<view class="data_num">{{$t('boss.consume')}}：<span>{{bossmp2}}{{$t('boss.ticket')}}</span></view>
							</view>
							<view class="info_name">{{$t('boss.ice')}}</view>
						</view>
						<view class="pk_img">
							<image src="../../static/h/boss/pk_logo.png" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 按钮框 -->
				<view class="btn_box">
					<view class="other_btn" @click="showboss=0">{{$t('boss.other')}}</view>
					<view class="sel_btn" @click="selcard=true">{{$t('boss.sel')}}</view>
				</view>
			</view>
			<!-- 恶龙宝库 -->
			<view class="bossc_box" v-if="showboss==3">
				<view class="bossc_bg">
					<view class="boss_top">
						<view class="mymp_box">
							<view class="add_img">
								<image src="../../static/h/boss/add_img.png" mode=""></image>
							</view>
							<view class="mpnum_bg">{{$t('boss.ticket')}}：{{mymp}}</view>
						</view>
						<view class="boss_list" @click="toPage('pvelist')">{{$t('boss.tzlist')}}</view>
					</view>
					<view class="boss_c">
						<view class="s_img">
							<image src="../../static/h/boss/sss.png" mode=""></image>
						</view>
						<view class="info_box">
							<view class="info_data">
								<view class="data_name">{{$t('boss.III')}}</view>
								<view class="data_num">{{$t('boss.consume')}}：<span>{{bossmp3}}{{$t('boss.ticket')}}</span></view>
							</view>
							<view class="info_name">{{$t('boss.Ajatar')}}</view>
						</view>
						<view class="pk_img">
							<image src="../../static/h/boss/pk_logo.png" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 按钮框 -->
				<view class="btn_box">
					<view class="other_btn" @click="showboss=0">{{$t('boss.other')}}</view>
					<view class="sel_btn" @click="selcard=true">{{$t('boss.sel')}}</view>
				</view>
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
									<view class="tj_btn" v-if="showboss==1" @click="tzbossa(item.id)">{{$t('boss.challenge')}}</view>
									<view class="tj_btn" v-if="showboss==2" @click="tzbossb(item.id)">{{$t('boss.challenge')}}</view>
									<view class="tj_btn" v-if="showboss==3" @click="tzbossc(item.id)">{{$t('boss.challenge')}}</view>
								</view>
								
							</view>
						</scroll-view>
					</view>
				</view>
			</u-popup>
			<!-- 挑战成功弹出层 -->
			<u-overlay :show="showsucc" opacity="0.8">
				<view class="succ_popup">
					<view class="succ_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="s_img" v-if="showboss==1">
							<image src="../../static/h/boss/s.png" mode=""></image>
						</view>
						<view class="s_img" v-if="showboss==2">
							<image src="../../static/h/boss/ss.png" mode=""></image>
						</view>
						<view class="s_img" v-if="showboss==3">
							<image src="../../static/h/boss/sss.png" mode=""></image>
						</view>
						
						<view class="succ_tips">{{$t('boss.succ')}}</view>
						<view class="award_box">
							<view class="award_tit">{{txt}}</view>
							<!-- <view class="award_num">15215445<span>LOO</span></view> -->
						</view>
						<view class="btn_get" @click="showsucc=false">{{$t('boss.receive')}}</view>
					</view>
				</view>
			</u-overlay>
			<!-- 挑战失败弹出层 -->
			<u-overlay :show="showfail" opacity="0.8">
				<view class="fail_popup">
					<view class="fail_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="s_img" v-if="showboss==1">
							<image src="../../static/h/boss/s.png" mode=""></image>
						</view>
						<view class="s_img" v-if="showboss==2">
							<image src="../../static/h/boss/ss.png" mode=""></image>
						</view>
						<view class="s_img" v-if="showboss==3">
							<image src="../../static/h/boss/sss.png" mode=""></image>
						</view>
						
						<view class="fail_tips">{{$t('boss.fail')}}</view>
						<view class="award_box">{{$t('boss.no')}}</view>
						<view class="btn_fail" @click="showfail=false">{{$t('boss.confirm')}}</view>
					</view>
				</view>
			</u-overlay>
			<!-- 购买门票弹出层 -->
			<u-overlay :show="showbuymp" opacity="0.8">
				<view class="buymp_popup">
					<view class="buymp_bg">
						<view class="popup_top">
							<view class="close_img" @click="showbuymp=false"></view>
						</view>
						<view class="mp_img">
							<image src="../../static/h/boss/mp_img.png" mode=""></image>
						</view>
						<view class="mp_name">{{$t('boss.ticket')}}</view>
						<view class="input_box">
							<u-number-box integer v-model="buympnum" @change="valChange"></u-number-box>
						</view>
						<view class="price_box">
							<view class="price_name">{{$t('boss.price')}}</view>
							<view class="price_line"></view>
							<view class="price_info">
								<view class="info_num">{{tddnum}}</view>
								<view class="info_name">LOO</view>
							</view>
						</view>
						<view class="buymp_btn" @click="buymp()">{{$t('boss.buy')}}</view>
					</view>
				</view>
			</u-overlay>
			<!-- 战斗中弹出层 -->
			<u-overlay :show="showpking" opacity="0.9">
				<view class="pking_popup">
					<view class="jian_img"></view>
					<view class="pking_bg">
						<view class="loading_name">{{$t('boss.battleing')}}</view>
						<!-- <view class="loading_img">
							<u-loading-icon color="#DAA20B"></u-loading-icon>
						</view> -->
					</view>
				</view>
			</u-overlay>
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
import web3 from 'web3'
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
			showboss:0,
			selcard:false,
			showsucc:false,
			showfail:false,
			showbuymp:false,
			showpking:false,
			mymp:'',
			melist:'',
			bossmp1:'',
			bossmp2:'',
			bossmp3:'',
			buympnum:1,
			mpprice:0,
			tddnum:0,
			txt:'',
			looye:0,//我的余额
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
		this.cardbg='background: url('+this.urlbg+');background-size: 300rpx 470rpx;';
		this.gainmpnum();
		this.getcardlist();
		this.sysinit();
		this.bossmp1 = uni.getStorageSync("bossmp1");
		this.bossmp2 = uni.getStorageSync("bossmp2");
		this.bossmp3 = uni.getStorageSync("bossmp3");
		this.mpprice = uni.getStorageSync('sysinfo')['mpprice'];
		this.yminit();
		this.getrule();
		this.tddnum=this.mpprice;
	},
	methods: {
		yminit(){
			var that=this;
			var url = "/Qianbao/zcinfo";
			var data={nowpage:this.nowpage,pageSize:this.pageSize,lang:this.$i18n.locale,}
			var fnSuc = function(res){
				console.log(res.data)
				that.looye=res.data.loo;
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		valChange(e){
			this.tddnum=this.mpprice*e.value;
		},
		// 购买门票
		buymp(){
			var that = this;
			let prices = this.tddnum;
			let ye = 0;
			ye = that.looye;
			if (prices * 1 > ye * 1) {
				that.Utils.tools.showmsg(that.$t("tips.sorry"));
				return false;
			}
			let url="/Qianbao/buytool"
			let data={
				paymoney:prices,
				buynum:that.buympnum,
				scode:806,
			}
			that.Utils.tools.luch_post(url,data)
			that.Utils.tools.showmsg(that.$t("tips.buysucc"));
			that.showbuymp=false;
			setTimeout(function() {
				that.gainmpnum();
			}, 1000)
		},
		async buymp111(){
			let that = this;
			let to=uni.getStorageSync("incomeaddress");
			let wallet = uni.getStorageSync('wallet')
			let prices = this.tddnum;
			//检测余额是否足够
			uni.showLoading({
				title:that.$t("tips.querying"),
			})
			let ye=0;
			let abi20 = uni.getStorageSync("abi20");
			let contract = await tronWeb.contract(abi20, 'TMGTa4gaEW9rMmjaQgH7WiRmPXWHAtuepB');
			await contract.balanceOf(wallet).call().then(res => {
				// ye = this.Utils.tools.weito(res,8);
				// ye = that.Utils.tools.fromanywei(res,18);
				ye = web3.utils.hexToNumberString(res._hex) / 1000000;
				console.log("余额"+ye);
			}).catch(err=>{
				 uni.showToast({
				 	title:that.$t("tips.error"),
				 })
				 console.log(err);
				 uni.hideLoading();
			});
			if(prices*1>ye*1){
				this.Utils.tools.showmsg(that.$t("tips.sorry")); 
				return false;
			}
			prices=prices.toFixed(2);
			// let amount=this.Utils.tools.towei(prices,8);
			let amount=that.Utils.tools.toanywei(prices,6);
			// let amount=web3.utils.toWei(prices.toString(),'ether')
			uni.hideLoading();
			uni.showLoading({
				title:that.$t("tips.paid"),
			})
			//购买
			contract.transfer(to,amount).send({from:wallet,gas:210000}).then(async (transactionHash)=>{
				// if(!err){
					uni.hideLoading();
					uni.showLoading({
						title:that.$t("tips.waiting")
					})
					let url="/Qianbao/buytool"
					let data={
						transactionHash:transactionHash,
						fromacc:wallet,
						toacc:to,
						paymoney:prices,
						buynum:that.buympnum,
						scode:806,
					}
					that.Utils.tools.luch_post(url,data)
				// }else{
				// 	uni.hideLoading();
				// 	uni.showLoading({
				// 		title:that.$t("tips.block")
				// 	})
				// }
				
			}).then(async (res)=>{
				console.log(res);
				// await that.Utils.tools.taskpost("/Task481",{})
				setTimeout(async () => {
					await that.Utils.tools.taskpost("/Task481", {})
				}, 3000)
			}).then(async res=>{
				console.log(res);
				//执行购买结果查询
				// await that.Utils.tools.taskpost("/Task481",{})
				setTimeout(async () => {
					await that.Utils.tools.taskpost("/Task481", {})
				}, 3000)
				setTimeout(function() {
					that.gainmpnum();
				}, 2000)
				// that.Tools.luch_post("/Task440",{})
				uni.hideLoading();
				that.Utils.tools.showmsg(that.$t("tips.buysucc"));
			}).catch(err=>{
				console.log(err);
				uni.hideLoading();
				uni.showLoading({
					title:that.$t("tips.block")
				})
				uni.hideLoading();
			})
		},
		//获取系统参数
		async sysinit(){
			uni.showLoading({
				title:this.$t("tips.wait"),
			})
			var that = this
			let url = "/Init"
			let data = {}
			await that.Utils.tools.luch_get(url,data).then(res=>{
				console.log(res)
				//获取系统信息
				uni.setStorageSync("sysinfo",res);
				//收付款账号
				uni.setStorageSync("incomeaddress",res.incomeaddress);
				uni.setStorageSync("income_hire",res.income_hire);
				uni.setStorageSync("income_trade",res.income_trade);
				uni.setStorageSync("pay_trade",res.pay_trade);
				//合约地址
				uni.setStorageSync("contractaddress_721",res.contractaddress_721);
				uni.setStorageSync("contractaddress_20",res.contractaddress_20);
				uni.setStorageSync("contractaddress_usdt",res.contractaddress_usdt);
				//一些常量
				uni.setStorageSync("symbol",res.symbol);
				uni.setStorageSync("bossmp1",res.bossmp1);
				uni.setStorageSync("bossmp2",res.bossmp2);
				uni.setStorageSync("bossmp3",res.bossmp3);
				console.log('系统初始化完成');
			}).then(async ()=>{
				//RPC通讯得到钱包
				console.log('RPC通讯')
				// await that.initweb3()
			}).then(async()=>{
				console.log('获取当前钱包')
				// await that.getMetaMask();
				// await that.linkWallet();
			}).catch((err)=>{
				console.log(err)
			});
			// that.pageinit();
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
		// 获取游戏规则
		getrule(){
			var that=this;
			let url = "/Arc/getinfo";
			let data = {id:13,lang:this.$i18n.locale};
			this.Utils.tools.luch_get(url,data).then(res=>{
				console.log(res)
				that.showguize=res;
			});
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
		
		tzbossa(cardsId){
			console.log('开始挑战');
			var that=this;
			//校验门票是否够
			if(this.mymp<this.bossmp1){
				this.Utils.tools.showmsg(that.$t("tips.mpbz"));
				return false;
			}
			let url="/Fantasy/dota";
			let data={
					cardId:cardsId,
					lang:this.$i18n.locale,
					taId:1
			};
			this.Utils.tools.luch_get(url,data).then(res=>{
				console.log(res)
				if(res.status==-2){
					this.Utils.tools.showmsg(that.$t("tips.levelno"));
					return false
				}
				that.showpking=true;
				if(res.isok==0||res.status==-1){
					// this.Utils.tools.showmsg(this.$t('error.'+res.errcode));
					// this.Utils.tools.showmsg('挑战失败');
					setTimeout (function(){
						that.showpking=false;
						that.showfail=true;
					},20000)
				}else{
					// let txt = this.$t('error.1018') + res.num + this.$t('error.10182');
					// this.Utils.tools.showmsg(txt);
					that.isok=1;
					let toolname="";
					switch (res.scode){
						case "801":toolname=that.$t('all.s801')
						break;
						case "802":toolname=that.$t('all.s802')
						break;
						case "803":toolname=that.$t('all.s803')
						break;
						case "804":toolname=that.$t('all.s804')
						break;
						case "805":toolname=that.$t('all.s805')
						break;
						case "806":toolname=that.$t('all.s806')
						break;
						case "807":toolname=that.$t('all.s807')
						break;
						case "808":toolname=that.$t('all.s808')
						break;
					}
					let txt = this.$t('boss.get') + res.num + toolname;
					that.txt = txt;
					// that.Utils.tools.showmsg(txt);
					setTimeout (function(){
						that.showpking=false;
						that.showsucc=true;
					},20000)
				}
				that.gainmpnum();
			}).catch(err=>{console.log})
			console.log('a');
			this.selcard=false;
			// this.showsucc=true;
		},
		tzbossb(cardsId){
			console.log('开始挑战');
			var that=this;
			//校验门票是否够
			if(this.mymp<this.bossmp2){
				this.Utils.tools.showmsg(that.$t("tips.mpbz"));
				return false;
			}
			let url="/Fantasy/dota";
			let data={
					cardId:cardsId,
					lang:this.$i18n.locale,
					taId:2
			};
			this.Utils.tools.luch_get(url,data).then(res=>{
				console.log(res)
				if(res.status==-2){
					this.Utils.tools.showmsg(that.$t("tips.levelno"));
					return false
				}
				that.showpking=true
				if(res.isok==0||res.status==-1){
					// this.Utils.tools.showmsg(this.$t('error.'+res.errcode));
					// this.Utils.tools.showmsg('挑战失败');
					setTimeout (function(){
						that.showfail()
					},20000)
				}else{
					// let txt = this.$t('error.1018') + res.num + this.$t('error.10182');
					// this.Utils.tools.showmsg(txt);
					that.isok=1;
					let toolname="";
					switch (res.scode){
						case "801":toolname=that.$t('all.s801')
						break;
						case "802":toolname=that.$t('all.s802')
						break;
						case "803":toolname=that.$t('all.s803')
						break;
						case "804":toolname=that.$t('all.s804')
						break;
						case "805":toolname=that.$t('all.s805')
						break;
						case "806":toolname=that.$t('all.s806')
						break;
						case "807":toolname=that.$t('all.s807')
						break;
						case "808":toolname=that.$t('all.s808')
						break;
					}
					let txt = this.$t('boss.get') + res.num + toolname;
					that.txt = txt;
					// that.Utils.tools.showmsg(txt);
					setTimeout (function(){
						that.showpking=false;
						that.showsucc=true;
					},20000)
				}
				that.gainmpnum();
			}).catch(err=>{console.log})
			console.log('b');
			this.selcard=false;
			// this.showsucc=true;
		},
		tzbossc(cardsId){
			console.log('开始挑战');
			var that=this;
			//校验门票是否够
			if(this.mymp<this.bossmp3){
				this.Utils.tools.showmsg(that.$t("tips.mpbz"));
				return false;
			}
			let url="/Fantasy/dota";
			let data={
					cardId:cardsId,
					lang:this.$i18n.locale,
					taId:3
			};
			this.Utils.tools.luch_get(url,data).then(res=>{
				console.log(res)
				if(res.status==-2){
					this.Utils.tools.showmsg(that.$t("tips.levelno"));
					return false
				}
				that.showpking=true
				if(res.isok==0||res.status==-1){
					// this.Utils.tools.showmsg(this.$t('error.'+res.errcode));
					// this.Utils.tools.showmsg('挑战失败');
					setTimeout (function(){
						that.showfail()
					},20000)
				}else{
					// let txt = this.$t('error.1018') + res.num + this.$t('error.10182');
					// this.Utils.tools.showmsg(txt);
					that.isok=1;
					let toolname="";
					switch (res.scode){
						case "801":toolname=that.$t('all.s801')
						break;
						case "802":toolname=that.$t('all.s802')
						break;
						case "803":toolname=that.$t('all.s803')
						break;
						case "804":toolname=that.$t('all.s804')
						break;
						case "805":toolname=that.$t('all.s805')
						break;
						case "806":toolname=that.$t('all.s806')
						break;
						case "807":toolname=that.$t('all.s807')
						break;
						case "808":toolname=that.$t('all.s808')
						break;
					}
					let txt = this.$t('boss.get') + res.num + toolname;
					that.txt = txt;
					// that.Utils.tools.showmsg(txt);
					setTimeout (function(){
						that.showpking=false;
						that.showsucc=true;
					},20000)
				}
				that.gainmpnum();
			}).catch(err=>{console.log})
			console.log('c');
			this.selcard=false;
			// this.showsucc=true;
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
// BOSS关卡
// 关卡1
.all_boss .boss_a{
	width: 672rpx;
	height: 140rpx;
	background: url(../../static/h/boss/s_bg.png) no-repeat;
	background-size: 672rpx 140rpx;
	margin: 0 auto 50rpx;
	display: flex;
	justify-content: flex-start;
}
.all_boss .boss_a .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: -8rpx 0 0 30rpx;
}
.all_boss .boss_a .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.all_boss .boss_a .info_box{
	width: 304rpx;
}
.all_boss .boss_a .info_box .info_data{
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
}
.all_boss .boss_a .info_box .info_data .data_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
}
.all_boss .boss_a .info_box .info_data .data_num{
	font-size: 26rpx;
	font-weight: 400;
	color: #B7B7B7;
}
.all_boss .boss_a .info_box .info_data .data_num span{
	font-size: 26rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.all_boss .boss_a .info_box .info_name{
	font-size: 30rpx;
	font-weight: bold;
	color: #3CCE98;
	margin-top: 20rpx;
}
.all_boss .boss_a .pk_img{
	width: 106rpx;
	height: 104rpx;
	margin: 20rpx 0 0 0;
}
.all_boss .boss_a .pk_img image{
	width: 106rpx;
	height: 104rpx;
}
// 关卡2
.all_boss .boss_b{
	width: 672rpx;
	height: 140rpx;
	background: url(../../static/h/boss/ss_bg.png) no-repeat;
	background-size: 672rpx 140rpx;
	margin: 0 auto 50rpx;
	display: flex;
	justify-content: flex-start;
}
.all_boss .boss_b .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: -8rpx 0 0 30rpx;
}
.all_boss .boss_b .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.all_boss .boss_b .info_box{
	width: 304rpx;
}
.all_boss .boss_b .info_box .info_data{
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
}
.all_boss .boss_b .info_box .info_data .data_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
}
.all_boss .boss_b .info_box .info_data .data_num{
	font-size: 26rpx;
	font-weight: 400;
	color: #B7B7B7;
}
.all_boss .boss_b .info_box .info_data .data_num span{
	font-size: 26rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.all_boss .boss_b .info_box .info_name{
	font-size: 30rpx;
	font-weight: bold;
	color: #6BADEC;
	margin-top: 20rpx;
}
.all_boss .boss_b .pk_img{
	width: 106rpx;
	height: 104rpx;
	margin: 20rpx 0 0 0;
}
.all_boss .boss_b .pk_img image{
	width: 106rpx;
	height: 104rpx;
}
// 关卡3
.all_boss .boss_c{
	width: 672rpx;
	height: 140rpx;
	background: url(../../static/h/boss/sss_bg.png) no-repeat;
	background-size: 672rpx 140rpx;
	margin: 0 auto 50rpx;
	display: flex;
	justify-content: flex-start;
}
.all_boss .boss_c .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: -8rpx 0 0 30rpx;
}
.all_boss .boss_c .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.all_boss .boss_c .info_box{
	width: 304rpx;
}
.all_boss .boss_c .info_box .info_data{
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
}
.all_boss .boss_c .info_box .info_data .data_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
}
.all_boss .boss_c .info_box .info_data .data_num{
	font-size: 26rpx;
	font-weight: 400;
	color: #B7B7B7;
}
.all_boss .boss_c .info_box .info_data .data_num span{
	font-size: 26rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.all_boss .boss_c .info_box .info_name{
	font-size: 30rpx;
	font-weight: bold;
	color: #F3A508;
	margin-top: 20rpx;
}
.all_boss .boss_c .pk_img{
	width: 106rpx;
	height: 104rpx;
	margin: 20rpx 0 0 0;
}
.all_boss .boss_c .pk_img image{
	width: 106rpx;
	height: 104rpx;
}
// 购买门票
.all_boss .buymp_btn{
	width: 328rpx;
	height: 90rpx;
	background: url(../../static/h/boss/pk_btn.png) no-repeat;
	background-size: 328rpx 90rpx;
	margin: 0 auto;
	font-size: 40rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 84rpx;
}
// 丛林宝库
.bossa_box{
	
}
.bossa_box .bossa_bg{
	width: 686rpx;
	height: 890rpx;
	background: url(../../static/h/boss/bossa_img.png) no-repeat;
	background-size: 686rpx 890rpx;
	margin: 0 auto;
	position: relative;
}
.bossa_bg .boss_top{
	display: flex;
	justify-content: space-between;
}
.bossa_bg .boss_top .boss_list{
	font-size: 32rpx;
	color: #FFFFFF;
	line-height: 56rpx;
	border-bottom: 1px solid #FFFFFF;
}
.bossa_box .mymp_box{
	display: flex;
	justify-content: flex-start;
}
.bossa_box .mymp_box .add_img{
	width: 70rpx;
	height: 68rpx;
}
.bossa_box .mymp_box .add_img image{
	width: 70rpx;
	height: 68rpx;
}
.bossa_box .mymp_box .mpnum_bg{
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
.bossa_box .boss_a{
	position: absolute;
	bottom: 10rpx;
	width: 672rpx;
	height: 140rpx;
	background: url(../../static/h/boss/s_bg.png) no-repeat;
	background-size: 672rpx 140rpx;
	margin: 0 0 0 7rpx;
	display: flex;
	justify-content: flex-start;
}
.bossa_box .boss_a .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: -8rpx 0 0 30rpx;
}
.bossa_box .boss_a .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.bossa_box .boss_a .info_box{
	width: 304rpx;
}
.bossa_box .boss_a .info_box .info_data{
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
}
.bossa_box .boss_a .info_box .info_data .data_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
}
.bossa_box .boss_a .info_box .info_data .data_num{
	font-size: 26rpx;
	font-weight: 400;
	color: #B7B7B7;
}
.bossa_box .boss_a .info_box .info_data .data_num span{
	font-size: 26rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.bossa_box .boss_a .info_box .info_name{
	font-size: 30rpx;
	font-weight: bold;
	color: #3CCE98;
	margin-top: 20rpx;
}
.bossa_box .boss_a .pk_img{
	width: 106rpx;
	height: 104rpx;
	margin: 20rpx 0 0 0;
}
.bossa_box .boss_a .pk_img image{
	width: 106rpx;
	height: 104rpx;
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
// 冰雪宝库
.bossb_box{}
.bossb_box .bossb_bg{
	width: 686rpx;
	height: 918rpx;
	background: url(../../static/h/boss/bossb_img.png) no-repeat;
	background-size: 686rpx 918rpx;
	margin: 0 auto;
	position: relative;
}
.bossb_bg .boss_top{
	display: flex;
	justify-content: space-between;
}
.bossb_bg .boss_top .boss_list{
	font-size: 32rpx;
	color: #FFFFFF;
	line-height: 56rpx;
	border-bottom: 1px solid #FFFFFF;
}
.bossb_box .mymp_box{
	display: flex;
	justify-content: flex-start;
}
.bossb_box .mymp_box .add_img{
	width: 70rpx;
	height: 68rpx;
}
.bossb_box .mymp_box .add_img image{
	width: 70rpx;
	height: 68rpx;
}
.bossb_box .mymp_box .mpnum_bg{
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
.bossb_box .boss_b{
	width: 672rpx;
	height: 140rpx;
	background: url(../../static/h/boss/ss_bg.png) no-repeat;
	background-size: 672rpx 140rpx;
	margin: 0 0 0 7rpx;
	display: flex;
	justify-content: flex-start;
	position: absolute;
	bottom: 10rpx;
}
.bossb_box .boss_b .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: -8rpx 0 0 30rpx;
}
.bossb_box .boss_b .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.bossb_box .boss_b .info_box{
	width: 304rpx;
}
.bossb_box .boss_b .info_box .info_data{
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
}
.bossb_box .boss_b .info_box .info_data .data_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
}
.bossb_box .boss_b .info_box .info_data .data_num{
	font-size: 26rpx;
	font-weight: 400;
	color: #B7B7B7;
}
.bossb_box .boss_b .info_box .info_data .data_num span{
	font-size: 26rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.bossb_box .boss_b .info_box .info_name{
	font-size: 30rpx;
	font-weight: bold;
	color: #6BADEC;
	margin-top: 20rpx;
}
.bossb_box .boss_b .pk_img{
	width: 106rpx;
	height: 104rpx;
	margin: 20rpx 0 0 0;
}
.bossb_box .boss_b .pk_img image{
	width: 106rpx;
	height: 104rpx;
}
// 恶龙宝库
.bossc_box{
	
}
.bossc_box .bossc_bg{
	width: 686rpx;
	height: 954rpx;
	background: url(../../static/h/boss/bossc_img.png) no-repeat;
	background-size: 686rpx 954rpx;
	margin: 0 auto;
	position: relative;
}
.bossc_bg .boss_top{
	display: flex;
	justify-content: space-between;
}
.bossc_bg .boss_top .boss_list{
	font-size: 32rpx;
	color: #FFFFFF;
	line-height: 56rpx;
	border-bottom: 1px solid #FFFFFF;
}
.bossc_box .mymp_box{
	display: flex;
	justify-content: flex-start;
}
.bossc_box .mymp_box .add_img{
	width: 70rpx;
	height: 68rpx;
}
.bossc_box .mymp_box .add_img image{
	width: 70rpx;
	height: 68rpx;
}
.bossc_box .mymp_box .mpnum_bg{
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
.bossc_box .boss_c{
	width: 672rpx;
	height: 140rpx;
	background: url(../../static/h/boss/sss_bg.png) no-repeat;
	background-size: 672rpx 140rpx;
	margin: 0 0 0 7rpx;
	display: flex;
	justify-content: flex-start;
	position: absolute;
	bottom: 10rpx;
}
.bossc_box .boss_c .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: -8rpx 0 0 30rpx;
}
.bossc_box .boss_c .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.bossc_box .boss_c .info_box{
	width: 304rpx;
}
.bossc_box .boss_c .info_box .info_data{
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
}
.bossc_box .boss_c .info_box .info_data .data_name{
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
}
.bossc_box .boss_c .info_box .info_data .data_num{
	font-size: 26rpx;
	font-weight: 400;
	color: #B7B7B7;
}
.bossc_box .boss_c .info_box .info_data .data_num span{
	font-size: 26rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.bossc_box .boss_c .info_box .info_name{
	font-size: 30rpx;
	font-weight: bold;
	color: #F3A508;
	margin-top: 20rpx;
}
.bossc_box .boss_c .pk_img{
	width: 106rpx;
	height: 104rpx;
	margin: 20rpx 0 0 0;
}
.bossc_box .boss_c .pk_img image{
	width: 106rpx;
	height: 104rpx;
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
	width: 660rpx;
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
	color: #FF9000;
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
// 挑战成功弹出层
.succ_popup{
	margin: auto 0;
}
.succ_popup .succ_bg{
	width: 512rpx;
	height: 860rpx;
	background: url(../../static/h/boss/succ_bg.png) no-repeat;
	background-size: 512rpx 860rpx;
	margin: 0 auto;
}
.succ_bg .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: 140rpx auto 58rpx;
}
.succ_bg .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.succ_bg .succ_tips{
	font-size: 40rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
}
.succ_bg .award_box{
	margin-top: 100rpx;
}
.succ_bg .award_box .award_tit{
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	width: 240rpx;
	margin: 0 auto;
	word-wrap:break-word;
}
.succ_bg .award_box .award_num{
	font-size: 40rpx;
	font-weight: 400;
	color: #F3A508;
	text-align: center;
}
.succ_bg .award_box .award_num span{
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
}
.succ_bg .btn_get{
	width: 328rpx;
	height: 90rpx;
	background: url(../../static/h/boss/pk_btn.png) no-repeat;
	background-size: 328rpx 90rpx;
	margin: 100rpx auto 0;
	font-size: 40rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 80rpx;
}
// 挑战失败弹出层
.fail_popup{
	margin: auto 0;
}
.fail_popup .fail_bg{
	width: 512rpx;
	height: 860rpx;
	background: url(../../static/h/boss/fail_bg.png) no-repeat;
	background-size: 512rpx 860rpx;
	margin: 0 auto;
}
.fail_bg .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: 140rpx auto 58rpx;
}
.fail_bg .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.fail_bg .fail_tips{
	font-size: 40rpx;
	font-weight: bold;
	color: #FFFFFF;
	text-align: center;
}
.fail_bg .award_box{
	font-size: 40rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	margin: 120rpx 0 100rpx;
}
.fail_bg .btn_fail{
	width: 328rpx;
	height: 90rpx;
	background: url(../../static/h/boss/other_btn.png) no-repeat;
	background-size: 328rpx 90rpx;
	margin: 0 auto;
	font-size: 40rpx;
	font-weight: bold;
	color: #BCBCBC;
	text-align: center;
	line-height: 80rpx;
}
// 购买门票弹出层
.buymp_popup{
	margin: auto 0;
}
.buymp_popup .buymp_bg{
	width: 700rpx;
	height: 1200rpx;
	background: url(../../static/h/boss/buymp_bg.png) no-repeat;
	background-size: 700rpx 1200rpx;
	margin: 0 auto;
}
.buymp_bg .popup_top{
	display: flex;
	justify-content: flex-end;
}
.buymp_bg .close_img{
	width: 54rpx;
	height: 54rpx;
	background: url(../../static/h/boss/close_img.png) no-repeat;
	background-size: 54rpx 54rpx;
}
.buymp_bg .mp_img{
	width: 304rpx;
	height: 358rpx;
	margin: 120rpx auto 14rpx;
}
.buymp_bg .mp_img image{
	width: 304rpx;
	height: 358rpx;
}
.buymp_bg .mp_name{
	font-size: 40rpx;
	font-weight: 400;
	color: #D5D5D5;
	text-align: center;
}
.buymp_bg .input_box{
	margin : 48rpx 0 0 250rpx;
}
.buymp_bg .price_box{
	margin: 40rpx auto;
	width: 394rpx;
	height: 136rpx;
	background: url(../../static/h/mgshop/price_bg.png) no-repeat;
	background-size: 394rpx 136rpx;
}
.buymp_bg .price_box .price_name{
	width: 90%;
	margin: 0 auto;
	font-size: 24rpx;
	font-weight: 400;
	color: #999999;
	height: 68rpx;
	line-height: 68rpx;
}
.buymp_bg .price_box .price_line{
	margin: 0 auto;
	width: 360rpx;
	height: 2rpx;
	background: #707070;
}
.buymp_bg .price_box .price_info{
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	font-size: 28rpx;
	font-weight: 400;
	color: #C79A52;
	height: 68rpx;
	line-height: 68rpx;
}
.buymp_bg .buymp_btn{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/boss/buymp_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	font-size: 44rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
	margin: 0 auto;
}
// 战斗中弹出层
.pking_popup{
	margin: auto 0;
}
.pking_popup .jian_img{
	width: 300rpx;
	height: 330rpx;
	// background: url(../../static/h/pk/jian.png) no-repeat;
	background: url(../../static/h/pk/vs.gif) no-repeat;
	background-size: 300rpx 330rpx;
	margin: 0 auto;
}
.pking_popup .pking_bg{
	width: 442rpx;
	height: 264rpx;
	background: url(../../static/h/pk/pp_bg.png) no-repeat;
	background-size: 442rpx 264rpx;
	margin: 0 auto;
	font-size: 40rpx;
	font-weight: 400;
	color: #DAA20B;
	text-align: center;
	line-height: 280rpx;
	display: flex;
	justify-content: center;
}
.pking_popup .pking_bg .loading_img{
	margin: 116rpx 0 0 20rpx;
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
