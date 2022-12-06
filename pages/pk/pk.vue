<template>
	<view class="app">
		<view class="app_bg">
			<!-- xxx -->
			<view class="zhan" style="height: 10rpx;"></view>
			<!-- 顶部 -->
			<view class="topnav_box">
				<view class="zhan" style="height: 1px;"></view>
				<view class="nav_box">
					<view class="back_img" @click="toPage('index')">
						<image src="../../static/h/topnav/back_img.png" mode=""></image>
					</view>
					<view class="nav_name">{{$t('pvp.tit')}}</view>
					<view class="help_img">
						<!-- <view class="" @click="toPage('pklist')">{{$t('pvp.list')}}</view> -->
					</view>
				</view>
			</view>
			<!-- 选择 -->
			<view class="sel_bg">
				<view class="zhan" style="height: 1px;"></view>
				<view class="sle_top">
					<view class="sle_right" @click="toPage('pkjilu')">{{$t('pvp.jilu')}}</view>
					<!--<view class="sel_tit">{{$t('pvp.mode')}}</view>-->
					<view class="space" @click="showrule=true">{{$t('pvp.rule')}}</view>
				</view>
				
				<view class="mode_box">
					<!--<view :class="pkmode ==1?'mode_y':'mode_x'" @click="selmode(1)">1V1</view>
					<view :class="pkmode ==2?'mode_y':'mode_x'" @click="selmode(2)">2V2</view>
					<view :class="pkmode ==3?'type_y':'type_x'" @click="selmode(3)">3V3</view>-->
				</view>
				<view class="selcard_box">
					<view class="nocard_bg" v-if="havecard==false"></view>
					<view class="xzcard_box" v-if="havecard==true">
						<view class="card_content">
							<view class="card_box" :style="'background-image: url(../../static/h/cards_bg/'+xzcard.bg+'.png);background-size: 300rpx 470rpx;'">
								<view class="card_info">
									<view class="super_img" v-if="xzcard.cardName=='LOONG'"></view>
									<view class="card_rat" v-if="xzcard.cardName=='RAT'||xzcard.cardName=='DOG'||xzcard.cardName=='OX'||xzcard.cardName=='GOAT'||xzcard.cardName=='PIG'||xzcard.cardName=='LEO'">{{xzcard.cardName}}</view>
									<view class="card_name" v-if="xzcard.cardName!='RAT'&&xzcard.cardName!='DOG'&&xzcard.cardName!='OX'&&xzcard.cardName!='GOAT'&&xzcard.cardName!='PIG'&&xzcard.cardName!='LEO'">{{xzcard.cardName}}</view>
									<!-- <view class="card_dj">Ⅻ</view> -->
								</view>
								<view class="info_box">
									<view class="info_data" v-if="lang=='en'">
										{{xzcard.desEn}} 
									</view>
									<view class="info_data" v-else>
										{{xzcard.desCn}} 
									</view>
								</view>
								<!-- 我的出售 -->
								<!-- <view class="mysale">我的出售</view> -->
								<view class="atk_box">
									<view class="atk_data">
										ATK:{{xzcard.atk}}
									</view>
								</view>
							</view>
							<view class="card_img">
								<image :src="xzcard.cnImg" mode=""></image>
							</view>
						</view>
					</view>
					<view class="sel_btn" @click="selcard=true">{{$t('pvp.cards')}}</view>
				</view>
				
			</view>
			<!-- 邀请玩家 -->
			<view class="invite_box" v-if="pkmode!=1">
				<view class="yq_box">
					<view class="yq_tit">{{$t('pvp.playa')}}</view>
					<view class="yq_input">
						 <u--input :placeholder="$t('pvp.enter')" border="node" clearable color="#F7D38B " v-model="yqa"></u--input>
					</view>
				</view>
				<view class="yq_box" v-if="pkmode>2">
					<view class="yq_tit">{{$t('pvp.playb')}}</view>
					<view class="yq_input">
						 <u--input :placeholder="$t('pvp.enter')" border="node" clearable color="#F7D38B "  v-model="yqb"></u--input>
					</view>
				</view>
				<view class="yq_btn" @click="yqhy()" v-if="sendyq==0">{{$t('pvp.copy')}}</view>
				<view class="yq_btn"  v-if="sendyq==1">{{$t('pvp.isyq')}}</view>
			</view>
			<!-- 购买血量 -->
			<view class="buyxl_box">
				<view class="buyxl_top">
					<view class="top_tit">{{$t('pvp.add')}}</view>
					<view class="top_tips">50LOO<span>=</span>100ATK{{$t('fen')}}</view>
				</view>
				<view class="buyxl_input" v-if="pkinit.buyaktnum==0">
					 <u--input :placeholder="$t('pvp.please')" border="node" color="#F7D38B " v-model="atkval" @change="changeatk">
						<view class="icon_box" slot="suffix">{{$t('pvp.fs')}}</view>
					 </u--input>
				</view>
				<view class="buyxl_input" v-if="pkinit.buyaktnum>0">
					 <u--input :placeholder="$t('pvp.please')" border="node" color="#F7D38B " :value="pkinit.buyaktnum" @change="changeatk" :readonly="true">
						<view class="icon_box" slot="suffix">{{$t('pvp.fs')}}</view>
					 </u--input>
				</view>
				<!-- <view class="buyxl_btn" @click="buyatk()">{{$t('pvp.buy')}}</view> -->
				<view class="buyxl_btn" @click="qrbuy(1)" v-if="pkinit.buyaktnum==0">{{$t('pvp.buy')}}</view>
				<view class="buyxl_btn" v-if="pkinit.buyaktnum > 0">{{$t('pvp.buyed')}}</view>
			</view>
			<!-- 购买门票 -->
			<view class="buymp_box">
				<view class="buymp_tit">{{$t('pvp.pay')}}</view>
				<view class="buymp_input">
					<view class="buymp_num">{{mpfee}}</view>
					<view class="icon_box">LOO</view>
				</view>
				<!-- <view class="buymp_btn" @click="buymp()" v-if="havemp==0||infodesc==''">{{$t('pvp.buy')}}</view> -->
				<view class="buymp_btn" @click="qrbuy(2)" v-if="pkinit.isbuymp!=1">{{$t('pvp.buy')}}</view>
				<view class="buymp_btn" v-if="pkinit.isbuymp==1">{{$t('pvp.buyed')}}</view>
			</view>
			<!-- 开始挑战 -->
			<view class="ks_btn" @click="playdo()">{{$t('pvp.challenge')}}</view>
			
			
			<!-- 选择卡牌弹出层 -->
			<u-popup :show="selcard" @close="close" @open="open" mode="bottom">
				<view class="selcard_popup">
					<view class="selcard_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="selcard_top">
							<view class="space"></view>
							<view class="popup_name">{{$t('pvp.cards')}}</view>
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
									<view class="tj_btn" @click="slecard(item.id,item.cnImg)">{{$t('pvp.sel')}}</view>
								</view>
								
							</view>
						</scroll-view>
					</view>
				</view>
			</u-popup>
			
			<!-- 等待队友准备弹出层 -->
			<u-overlay :show="showwait" opacity="0.8">
				<view class="pp_popup">
					<view class="pp_bg">
						<view class="loading_name">{{$t('pvp.waiting')}}</view>
						<view class="loading_img">
							<u-loading-icon color="#DAA20B"></u-loading-icon>
						</view>
					</view>
					<view class="btn_off" @click="showwait = false">{{$t('pvp.cancel')}}</view>
				</view>
			</u-overlay>
			
			<!-- 正在匹配中弹出层 -->
			<u-overlay :show="showpp" opacity="0.8">
				<view class="pp_popup">
					<view class="pp_bg">
						<view class="loading_name">{{$t('pvp.match')}}</view>
						<view class="loading_img">
							<u-loading-icon color="#DAA20B"></u-loading-icon>
						</view>
					</view>
					<view class="btn_off" @click="offpp()">{{$t('pvp.unmatch')}}</view>
				</view>
			</u-overlay>
			
			<!-- 战斗中弹出层 -->
			<u-overlay :show="showpking" opacity="0.9">
				<view class="pking_popup">
					<view class="jian_img"></view>
					<view class="pking_bg">
						<view class="loading_name">{{$t('pvp.battle')}}</view>
						<!-- <view class="loading_img">
							<u-loading-icon color="#DAA20B"></u-loading-icon>
						</view> -->
					</view>
				</view>
			</u-overlay>
			
			<!-- 战斗成功弹出层 -->
			<u-overlay :show="showsucc" opacity="0.8">
				<view class="succ_popup">
					<view class="succ_img"></view>
					<view class="succ_tit">{{$t('pvp.victory')}}</view>
					<view class="succ_btn" @click="getmoney()" >{{$t('pvp.reward')}}</view>
				</view>
			</u-overlay>
			
			<!-- 战斗失败弹出层 -->
			<u-overlay :show="showlose" opacity="0.8">
				<view class="lose_popup">
					<view class="lose_img"></view>
					<view class="lose_tit">{{$t('pvp.fail')}}</view>
					<view class="lose_btn" @click="showlose=false">{{$t('pvp.ok')}}</view>
				</view>
			</u-overlay>
			
			<!-- 奖励弹出层 -->
			<u-overlay :show="showjl" opacity="0.8">
				<view class="reward_popup">
					<view class="reward_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="s_img">
							<image src="../../static/h/boss/sss.png" mode=""></image>
						</view>
						
						<view class="reward_tips">{{$t('pvp.win')}}</view>
						<view class="award_box">
							<view class="award_tit">{{$t('pvp.get')}}</view>
							<view class="award_num">{{money}}<span>LOO</span></view>
						</view>
						<view class="btn_get" @click="showjl=false">{{$t('pvp.ok')}}</view>
					</view>
				</view>
			</u-overlay>
			
			<!-- 确认购买 -->
			<u-overlay :show="showdefine" opacity="0.8">
				<view class="define_popup">
					<view class="define_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="define_tit">{{$t('shop.qrbuy')}}</view>
						<view class="popup_btn">
							<view class="no_btn" @click="showdefine=false">{{$t('shop.no')}}</view>
							<view class="yes_btn" v-if="buytype==1" @click="buyakt()">{{$t('shop.yes')}}</view>
							<view class="yes_btn" v-if="buytype==2" @click="buymp()">{{$t('shop.yes')}}</view>
						</view>
					</view>
				</view>
			</u-overlay>
			<!-- 确认或拒绝邀请 -->
			<u-overlay :show="showinvite" opacity="0.8">
				<view class="define_popup">
					<view class="define_bg">
						<view class="zhan" style="height: 1px;"></view>
						<view class="define_tit">{{$t('pvp.recevinvt')}}</view>
						<view class="popup_btn">
							<view class="no_btn" @click="showinvite=false">{{$t('shop.no')}}</view>
							<view class="yes_btn" v-if="buytype==1" @click="topkyq()">{{$t('shop.yes')}}</view>
						</view>
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
							{{$t('pvp.tipa')}}<br>
							1V1<br>
							{{$t('pvp.tipb')}}<br>
							{{$t('pvp.tipc')}}<br>
							{{$t('pvp.tipd')}}<br>
							<!-- 2V2<br>
							{{$t('pvp.tipe')}}<br>
							{{$t('pvp.tipf')}}<br>
							{{$t('pvp.tipg')}}<br>
							3V3<br>
							{{$t('pvp.tiph')}}<br>
							{{$t('pvp.tipi')}}<br>
							{{$t('pvp.tipj')}}<br>
							{{$t('pvp.tipk')}}<br>
							{{$t('pvp.tipl')}}<br>
							{{$t('pvp.tipm')}}<br>
							{{$t('pvp.tipn')}}<br>
							{{$t('pvp.tipo')}}<br>
							{{$t('pvp.tipp')}}<br>
							{{$t('pvp.tipq')}}<br>
							{{$t('pvp.tipr')}} -->
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
			urlbg:'../../static/h/cards/cards_bg.png',
			cardbg:'',
			selcard:false,
			modenum:1,
			havecard:false,
			showpp:false,
			showwait:false,
			showpking:false,
			showsucc:false,
			showlose:false,
			showjl:false,
			showdefine:false,
			showrule:false,
			prop:'',//1-战斗力 2-门票
			looye:0,//我的余额
			winidb:'',
			winidc:'',
			
			melist:'',
			xzcard:{},
			mpfee:100,
			userId:'',
			wallet:'',
			havemp:'',//是否有门票
			infoida:'',
			infoidb:'',
			infoidc:'',
			infodesc:'',
			atkval:'',
			atknum:'',
			atkprice:'',
			astate:'',//pv1挑战后状态
			ppstate:'',
			gameid:'',
			pkjg:'',//1v1pk结果
			ppoff:null,//定时请求
			money:0,//1v1奖励
			jlstate:'',//领取奖励是否成功
			yqurl:'',//邀请链接
			yqa:'',//邀请伙伴1
			yqb:'',//邀请伙伴2
			
			
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
			
			//新改
			pvp1init:'',
			pvp2init:'',
			pvp3init:'',
			pkmode:1,
			pkinit:{buyaktnum: 0,isbuymp: 0,pvpid: 0,cardId:0},
			buytype:0,
			xzkaid:'',//选中卡id
			roomid:0,
			figthid:0,
			ispp:0,//是否进行匹配
			sendyq:0,
			yqinfo:'',
			showinvite:false,
		}
	},
	mounted() {
		this.cardbg='background: url('+this.urlbg+');background-size: 300rpx 470rpx;';
		this.userId = uni.getStorageSync("userId");
		this.wallet = uni.getStorageSync('wallet')
		this.getcardlist();
		this.pkinfo();
		this.yminit();
		this.getyq();
	},
	methods: {
		//去邀请页面
		topkyq(yqpvpid){
			var yqinfo=this.yqinfo;
			uni.redirectTo({
				url:'/pages/pkyq/pkyq?yqpvpid='+yqinfo.pvpid+"&yqwallet="+yqinfo.yqwalllet,
			})
		},
		//邀请好友进入pk
		yqhy(){
			var that=this;
			var yqa=that.yqa;
			var yqb=that.yqb;
			var pkmode=that.pkmode;
			var pkinit=this.pkinit;
			var pvpid=pkinit.pvpid;
			if(pvpid==0){
				that.Utils.tools.showmsg(that.$t("tips.buymp"));
				return;
			}
			if(pkmode==2 && yqa==''){
				that.Utils.tools.showmsg(that.$t("pvp.enter"));
				return;
			}
			if(pkmode==3){
				if(yqa=='' && yqb==''){
					that.Utils.tools.showmsg(that.$t("pvp.enter"));
					return;
				}
			}
			var url = "/Pvp/pvpyq";
			var data={pkmode:pkmode,pvpid:pvpid,yqwallet1:yqa,yqwallet2:yqb}
			var fnSuc = function(res){
				if(res.data.status>0){
					that.sendyq=1;
					that.Utils.tools.showmsg('SUCCESS');
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//领取奖励
		getmoney(){
			var that = this;
			var roomid=that.roomid;
			var figthid=that.figthid;
			var url = "/Pvp/getreward";
			var data={roomid:roomid,figthid:figthid}
			var fnSuc = function(res){
				if(res.data.status>0){
					that.showsucc=false;
					that.showjl=true;
					that.money=res.data.reward;
					that.pkinfo();
					that.xzkaid='';//选中卡id
					that.roomid=0;
					that.figthid=0;
					that.ispp=0;//是否进行匹配
					that.atkval=0;
				}else{
					that.Utils.tools.showmsg(res.data.msg);
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//获取战斗结果
		getresult(figthid){
			var that = this;
			var roomid=that.roomid;
			var pkmode=this.pkmode;//pk模式
			var url = "/Pvp/getresult";
			var data={pkmode:pkmode,roomid:roomid,figthid:figthid}
			var fnSuc = function(res){
				if(res.data.status>0){
					that.showpking=false;
					//战斗胜利
					if(res.data.status==1){
						that.showsucc=true;
						that.roomid=res.data.roomid;
						that.figthid=res.data.figthid;
					}
					//战斗失败
					if(res.data.status==2){
						that.showlose=true;
						that.pkinfo();
						that.xzkaid='';//选中卡id
						that.roomid=0;
						that.figthid=0;
						that.ispp=0;//是否进行匹配
						that.atkval=0;
					}
				}else{
					that.Utils.tools.showmsg(res.data.msg);
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//查询匹配结果
		querypp(){
			var that = this;
			var ispp=this.ispp;
			var pkmode=this.pkmode;//pk模式
			var roomid=that.roomid;
			var url = "/Pvp/matchdo";
			var data={pkmode:pkmode,roomid:roomid}
			var fnSuc = function(res){
				if(res.data.status>0){
					//返回状态为匹配中 倒计时5再次查询
					console.log("status=>",res.data.status);
					console.log("ispp=>",ispp);
					if(res.data.status==2 && ispp==1){
						setTimeout(function() {
							that.querypp();
						},5000);
					}
					//返回状态为战斗中
					if(res.data.status==3){
						that.showpp=false;
						that.showpking=true;
						//获取战斗结束倒计时
						let djstime=res.data.djstime;
						let figthid=res.data.figthid;
						that.figthid=figthid;
						setTimeout(function() {
							that.getresult(figthid);
						},djstime);
					}
				}else{
					that.showpp=false;
					that.Utils.tools.showmsg(that.$t("tips.clospp"));
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//取消匹配
		offpp(){
			var that = this;
			var roomid=that.roomid;
			var url = "/Pvp/offpp";
			var data={roomid:roomid}
			var fnSuc = function(res){
				    if(res.data.status>0){
						that.ispp=0;
						that.showpp=false;
					}
				}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//开始挑战进行游戏
		playdo(){
			var that = this;
			var pkmode=this.pkmode;//pk模式
			var pkinit=this.pkinit;
			var pvpid=pkinit.pvpid;
			if(pkinit.isbuymp==0){
				that.Utils.tools.showmsg(that.$t("tips.buymp"));
				return false;
			}
			if(pkinit.cardId==0){
				that.Utils.tools.showmsg(that.$t("tips.selcard"));
				return false;
			}
			var url = "/Pvp/playdo";
			var data={pkmode:pkmode,pvpid:pvpid}
			var fnSuc = function(res){
				if(res.data.status>0){
					that.roomid=res.data.roomid;
					that.showpp=true;
					that.ispp=1;
					that.querypp();
				}else{
					that.Utils.tools.showmsg(res.data.msg);
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//选择卡牌
		slecard(id){
			this.xzkaid=id;
			var that = this;
			var pkmode=this.pkmode;//pk模式
			var pkinit=this.pkinit;
			var pvpid=pkinit.pvpid;
			var url = "/Pvp/chosecard";
			var data={pkmode:pkmode,pvpid:pvpid,cardId:id}
			var fnSuc = function(res){
				uni.hideLoading();
				if(res.data.status>0){
					for (var i = 0; i < that.melist.length; i++) {
						if(that.melist[i].id==id){
							that.xzcard=that.melist[i];
						}
					}
					that.selcard=false;
					that.havecard=true;
					that.pkinit.pvpid=res.data.pvpid;
					that.pkinfo();
				}else{
					that.Utils.tools.showmsg(res.data.msg);
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//购买门票
		buymp(){
			var that=this;
			var ye = that.looye;
			if (100 > ye * 1) {
				that.Utils.tools.showmsg(that.$t("tips.sorry"));
				return false;
			}
			uni.showLoading({
				title:that.$t("tips.wait"),
			})
			var pkmode=this.pkmode;//pk模式
			var pkinit=this.pkinit;
			var pvpid=pkinit.pvpid;
			var url = "/Pvp/buymp";
			var data={pkmode:pkmode,pvpid:pvpid}
			var fnSuc = function(res){
				uni.hideLoading();
				if(res.data.status>0){
					that.showdefine=false;
					that.Utils.tools.showmsg(that.$t("tips.buysucc"));
					that.pkinit.pvpid=res.data.pvpid;
					that.pkinit.isbuymp=1;
					that.pkinfo();
				}else{
					that.Utils.tools.showmsg(res.data.msg);
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//购买战力
		buyakt(){
			var that=this;
			var atkval=this.atkval;//购买数量
			if(atkval==''){
				uni.showToast({
					title: that.$t("tips.entera"),
					duration: 2000,
					icon:'none',
				});
				return false;
			}
			if(atkval==0){
				uni.showToast({
					title: that.$t("tips.enterb"),
					duration: 2000,
					icon:'none',
				});
				return false;
			}
			let ye = that.looye;
			if (atkval*50* 1 > ye * 1) {
				that.Utils.tools.showmsg(that.$t("tips.sorry"));
				return false;
			}
			var pkmode=this.pkmode;//pk模式
			var pkinit=this.pkinit;
			var pvpid=pkinit.pvpid;
			uni.showLoading({
				title:that.$t("tips.wait"),
			})
			var url = "/Pvp/buyakt";
			var data={pkmode:pkmode,buynum:atkval,pvpid:pvpid}
			var fnSuc = function(res){
				uni.hideLoading();
				if(res.data.status>0){
					
					that.showdefine=false;
					that.Utils.tools.showmsg(that.$t("tips.buysucc"));
					that.pkinit.pvpid=res.data.pvpid;
					that.pkinit.buyaktnum=atkval;
					that.pkinfo();
				}else{
					that.Utils.tools.showmsg(res.data.msg);
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		changeatk(e){
			this.atkprice=e*50;
		},
		//显示购买弹窗
		qrbuy(val){
			this.buytype=val;
			this.showdefine=true;
		},
		//选择pk模式
		selmode(val){
			this.pkmode=val;
			if(val==1){
				this.pkinit=this.pvp1init;
			}
			if(val==2){
				this.pkinit=this.pvp2init;
			}
			if(val==3){
				this.pkinit=this.pvp3init;
			}
		},
		//获取是否有邀请
		getyq(){
			var that=this;
			var url = "/Pvp/getpvpinit";
			var data={}
			var fnSuc = function(res){
				if(res.data.yqnum==1){
					that.showinvite=true;
					that.yqinfo=res.data.yqinfo;
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//获取pk页面初始数据
		pkinfo(){
			var that=this;
			var url = "/Pvp/getpvpinit";
			var data={}
			var fnSuc = function(res){
				that.pvp1init=res.data.pvp1init;
				that.pvp2init=res.data.pvp2init;
				that.pvp3init=res.data.pvp3init;
				var pkmode=that.pkmode;
				if(pkmode==1){
					that.pkinit=res.data.pvp1init;
				}
				if(pkmode==2){
					that.pkinit=res.data.pvp2init;
				}
				if(pkmode==3){
					that.pkinit=res.data.pvp3init;
				}
			}
			that.Utils.tools.post(url,data,that,fnSuc);
		},
		//获取LOO余额
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
		// 关闭弹出层
		close(){
			this.selcard=false;
		},
		// 复制邀请链接
		copylink(){
			var that=this;
			that.yqurl= uni.getStorageSync("wallet");
			this.Utils.tools.copyToClipBoard(that.yqurl);
			uni.showToast({
				title:'succcess',
				icon:'success',
				duration:2000
			})
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
	min-height: 2100rpx;
	background: url(../../static/h/pk/pk_bg.png) no-repeat;
	background-size: 750rpx 2600rpx;
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
// 选择
.sel_bg{
	width: 750rpx;
	height: 800rpx;
	background: url(../../static/h/pk/sel_bg.png) no-repeat;
	background-size: 750rpx 1100rpx;
}
.sel_bg .sle_top{
	display: flex;
	justify-content: space-between;
	width: 660rpx;
	margin: 0 auto;
}
.sel_bg .sle_top .space{
	width: 160rpx;
	margin-top: 50rpx;
	color: #F7D38B;
	font-size: 26rpx;
	font-weight: bold;
	text-align: right;
}
.sel_bg .sle_top .sle_right{
	width: 160rpx;
	margin-top: 50rpx;
	color: #F7D38B;
	font-size: 26rpx;
	font-weight: bold;
	text-align: left;
}
.sel_bg .sel_tit{
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	margin-top: 50rpx;
}
.sel_bg .mode_box{
	margin-top: 60rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.sel_bg .mode_box .mode_x{
	width: 335rpx;
	height: 92rpx;
	background: url(../../static/h/pk/mode_x.png) no-repeat;
	background-size: 335rpx 92rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #B7B7B7;
	text-align: center;
	line-height: 84rpx;
	margin-bottom: 10rpx;
}
.sel_bg .mode_box .mode_y{
	width: 335rpx;
	height: 92rpx;
	background: url(../../static/h/pk/mode_y.png) no-repeat;
	background-size: 335rpx 92rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 84rpx;
	margin-bottom: 10rpx;
}
.sel_bg .mode_box .type_x{
	width: 686rpx;
	height: 120rpx;
	background: url(../../static/h/pk/type_x.png) no-repeat;
	background-size: 686rpx 120rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #B7B7B7;
	text-align: center;
	line-height: 110rpx;
	margin: 0 0 10rpx;
}
.sel_bg .mode_box .type_y{
	width: 686rpx;
	height: 120rpx;
	background: url(../../static/h/pk/type_y.png) no-repeat;
	background-size: 686rpx 120rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 110rpx;
	margin: 0 0 10rpx;
}
.sel_bg .selcard_box{
	
}
.sel_bg .selcard_box .nocard_bg{
	width: 300rpx;
	height: 453rpx;
	background: url(../../static/h/pk/add_bg.png) no-repeat;
	background-size: 300rpx 453rpx;
	margin: 36rpx auto;
}
.sel_bg .selcard_box .xzcard_box{
	width: 300rpx;
	height: 453rpx;
	margin: 36rpx 0 36rpx 240rpx;
}
.xzcard_box .card_content{
	position: relative;
	// padding: 16rpx 6rpx 16rpx 20rpx;
	// box-shadow: 0px 1px 3rpx 1px rgba(142, 140, 140, 0.16);
	// border: 2rpx solid  rgba(67, 62, 61, 0.2);
	
}
.xzcard_box .card_box{
	// margin: 0 6rpx;
	// margin-top: 16rpx;
	width: 300rpx;
	height: 470rpx;
	position: relative;
	z-index: 10;
}
.xzcard_box .card_box .super_img{
	width: 100rpx;
	height: 32rpx;
	background: url(../../static/h/cards/super.png) no-repeat;
	background-size: 100rpx 32rpx;
	position: absolute;
	top: 30rpx;
}
.xzcard_box .card_box .card_name{
	position: absolute;
	top: 40rpx;
	left: 100rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.xzcard_box .card_box .card_rat{
	position: absolute;
	top: 40rpx;
	left: 126rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #C79A52;
	transform: scale(0.7);
}
.xzcard_box .card_box .card_dj{
	position: absolute;
	top: 36rpx;
	right: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #ffc847;
}
.xzcard_box .card_box .info_box{
	width: 189rpx;
	height: 56rpx;
	background: url(../../static/h/cards/info_bg.png) no-repeat;
	background-size: 189rpx 56rpx;
	position: absolute;
	bottom: 44rpx;
	left: 42rpx;
	overflow: auto;
}
.xzcard_box .card_box .info_box .info_data{
	padding: 6rpx;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	color: #C79A52;
}
.xzcard_box .card_box .atk_box{
	width: 160rpx;
	height: 30rpx;
	background: url(../../static/h/cards/atk_bg.png) no-repeat;
	background-size: 160rpx 30rpx;
	position: absolute;
	bottom: 0;
	left: 50rpx;
}
.xzcard_box .card_box .atk_box .atk_data{
	font-size: 24rpx;
	text-align: center;
	color: #C79A52;
	transform: scale(0.6);
}
.xzcard_box .card_img{
	width: 266rpx;
	height: 280rpx;
	position: absolute;
	top: 70rpx;
	// left: 0rpx;
}
.xzcard_box .card_img image{
	width: 266rpx;
	height: 280rpx;
}
.sel_bg .selcard_box .sel_btn{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	margin: 0 auto;
	font-size: 38rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
}
// 邀请
.invite_box{
	
}
.invite_box .yq_box{
	margin-top: 50rpx;
}
.invite_box .yq_box .yq_tit{
	width: 85%;
	margin: 0 auto 12rpx;
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.invite_box .yq_box .yq_input{
	width: 686rpx;
	height: 74rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 8rpx;
	border: 2rpx solid #A49F9F;
	margin: 0 auto;
}
.invite_box .yq_btn{
	width: 240rpx;
	height: 68rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 240rpx 68rpx;
	margin: 40rpx auto 0;
	font-size: 32rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
}
// 购买血量
.buyxl_box{
	margin-top: 90rpx;
}
.buyxl_box .buyxl_top{
	display: flex;
	justify-content: space-between;
	width: 85%;
	margin: 0 auto 12rpx;
}
.buyxl_box .buyxl_top .top_tit{
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.buyxl_box .buyxl_top .top_tips{
	font-size: 24rpx;
	font-weight: 400;
	color: #F7D38B;
}
.buyxl_box .buyxl_top .top_tips span{
	font-size: 24rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.buyxl_box .buyxl_input{
	width: 686rpx;
	height: 74rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 8rpx;
	border: 2rpx solid #A49F9F;
	margin: 0 auto;
}
.buyxl_box .buyxl_input .icon_box{
	font-size: 28rpx;
	color: #F7D38B;
}
.buyxl_box .buyxl_btn{
	width: 240rpx;
	height: 68rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 240rpx 68rpx;
	margin: 40rpx auto 0;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
}
// 购买门票
.buymp_box{
	margin-top: 90rpx;
}
.buymp_box .buymp_tit{
	width: 85%;
	margin: 0 auto 12rpx;
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
}
.buymp_box .buymp_input{
	width: 686rpx;
	height: 74rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 8rpx;
	border: 2rpx solid #A49F9F;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.buymp_box .buymp_input .buymp_num{
	font-size: 32rpx;
	font-weight: 400;
	color: #F7D38B;
	line-height: 74rpx;
	margin-left: 10rpx;
}
.buymp_box .buymp_input .icon_box{
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 74rpx;
	margin-right: 10rpx;
}
.buymp_box .buymp_btn{
	width: 240rpx;
	height: 68rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 240rpx 68rpx;
	margin: 40rpx auto 0;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
}
// 开始挑战
.ks_btn{
	padding-bottom: 60rpx;
	margin: 90rpx auto 0;
	width: 328rpx;
	height: 90rpx;
	background: url(../../static/h/pk/ks_btn.png) no-repeat;
	background-size: 328rpx 90rpx;
	font-size: 40rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 84rpx;
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
.selcard_popup .selcard_bg .selcard_top{
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
	display: flex;
	// justify-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 664rpx;
	margin: 0 auto;
}
.selcard_popup .card_content{
	position: relative;
	padding: 16rpx 6rpx 16rpx 20rpx;
	box-shadow: 0px 1px 3rpx 1px rgba(142, 140, 140, 0.16);
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
	width: 240rpx;
	height: 68rpx;
	background: url(../../static/h/packs/tj_btn.png) no-repeat;
	background-size: 240rpx 68rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 68rpx;
	margin: 10rpx 0 10rpx 24rpx;
}
// 正在匹配中弹出层
.pp_popup {
	margin: auto 0;
}
.pp_popup .pp_bg{
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
.pp_popup .pp_bg .loading_img{
	margin: 116rpx 0 0 20rpx;
}
.pp_popup .btn_off{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	margin: 80rpx auto 0;
	font-size: 44rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
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
// 战斗成功弹出层
.succ_popup{
	margin: auto 0;
}
.succ_popup .succ_img{
	width: 426rpx;
	height: 500rpx;
	background: url(../../static/h/pk/succ_img.png) no-repeat;
	background-size: 426rpx 500rpx;
	margin: 0 auto;
}
.succ_popup .succ_tit{
	font-size: 40rpx;
	font-weight: 400;
	color: #DAA20B;
	text-align: center;
}
.succ_popup .succ_btn{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	font-size: 44rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
	margin: 60rpx auto 0;
}
// 战斗失败弹出层
.lose_popup{
	margin: auto 0;
}
.lose_popup .lose_img{
	width: 426rpx;
	height: 500rpx;
	background: url(../../static/h/pk/lose_img.png) no-repeat;
	background-size: 426rpx 500rpx;
	margin: 0 auto;
}
.lose_popup .lose_tit{
	font-size: 40rpx;
	font-weight: 400;
	color: #DAA20B;
	text-align: center;
}
.lose_popup .lose_btn{
	width: 286rpx;
	height: 86rpx;
	background: url(../../static/h/pk/sel_btn.png) no-repeat;
	background-size: 286rpx 86rpx;
	font-size: 44rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	line-height: 86rpx;
	margin: 60rpx auto 0;
}
// 奖励弹出层
.reward_popup{
	margin: auto 0;
}
.reward_popup .reward_bg{
	width: 512rpx;
	height: 860rpx;
	background: url(../../static/h/boss/succ_bg.png) no-repeat;
	background-size: 512rpx 860rpx;
	margin: 0 auto;
}
.reward_bg .s_img{
	width: 170rpx;
	height: 156rpx;
	margin: 140rpx auto 58rpx;
}
.reward_bg .s_img image{
	width: 170rpx;
	height: 156rpx;
}
.reward_bg .reward_tips{
	font-size: 40rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
}
.reward_bg .award_box{
	margin-top: 100rpx;
}
.reward_bg .award_box .award_tit{
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
}
.reward_bg .award_box .award_num{
	font-size: 40rpx;
	font-weight: 400;
	color: #F3A508;
	text-align: center;
}
.reward_bg .award_box .award_num span{
	font-size: 28rpx;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
}
.reward_bg .btn_get{
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

// 确认购买
.define_popup{
	margin: auto 0;
}
.define_popup .define_bg{
	width: 654rpx;
	height: 374rpx;
	background: url(../../static/h/index/set_bg.png) no-repeat;
	background-size: 654rpx 374rpx;
	margin: 0 auto;
}
.define_bg .define_tit{
	font-size: 36rpx;
	font-weight: bold;
	color: #F7D38B;
	text-align: center;
	margin-top: 100rpx;
}
.define_bg .popup_btn{
	width: 80%;
	margin: 60rpx auto 0;
	display: flex;
	justify-content: space-between;
}
.define_bg .popup_btn .no_btn{
	width: 246rpx;
	height: 66rpx;
	background: url(../../static/h/boss/other_btn.png) no-repeat;
	background-size: 246rpx 66rpx;
	font-size: 32rpx;
	text-align: center;
	line-height: 66rpx;
	color: #838383;
}
.define_bg .popup_btn .yes_btn{
	width: 246rpx;
	height: 66rpx;
	background: url(../../static/h/boss/pk_btn.png) no-repeat;
	background-size: 246rpx 66rpx;
	font-size: 32rpx;
	text-align: center;
	line-height: 66rpx;
	color: #F7D38B;
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
