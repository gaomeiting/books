<template>
<transition name="fade">
<div class="bookstore">
	<div class="search-wrap">
		<i>搜</i>
		<!-- <search-box placeholder="请输入书名/作者/关键字"></search-box> -->
	</div>
	<div class="bookstore-con-wrap" v-show="load">
	<scroll class="bookstore-con" :data="items" ref="scroll">
		<div>
			<div class="ad_pic_wrap" v-if="ad_pic.length">
				<slider>
					<div v-for="(item, index) in ad_pic" :key="item.reference_id">
						<!-- <a :href="item.linkUrl"> -->
							<img :src="item.ad_pic_url" @load="imgLoad">
						<!-- </a> -->
					</div>
				</slider>
			</div>
			<div class="customs-wrap" v-if="customs">
				<ul>
					<li v-for="item in customs">
						<img v-lazy="item.url" alt="">
						<span> {{ item.ad_name }} </span>
					</li>
				</ul>
			</div>
			<week-hot :list="weekHot" @seeMore="seeMoreHot"></week-hot>
			<recommend title="重磅推荐" :list="recList" more="查看全部 &gt;&gt;" @selectChannel="selectChannel"></recommend>
			<favorite title="女生最爱" :list="famaleList" @selectChannel="selectChannel" more="女生频道 &gt;&gt;"></favorite>
			<favorite title="男生最爱" :list="maleList" @selectChannel="selectChannel" more="男生频道 &gt;&gt;"></favorite>
			<week-hot title="限时免费" :list="timeFree" more="更多限时免费佳作 &gt;&gt;"></week-hot>
		</div>
	</scroll>
	</div>
	<div class="load-wrap" v-show="!load">
		<loading></loading>
	</div>
	<router-view></router-view>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import SearchBox from "base/search-box/search-box";
import Slider from "base/slider/slider";
import WeekHot from "components/week-hot/week-hot";
import Recommend from "components/recommend/recommend";
import Favorite from "components/favorite/favorite";
import Loading from "base/loading/loading";
import NoResult from "base/no-result/no-result";
import { ERR_OK } from "api/config";
import { getBookstore } from "api/bookstore";
import {mapMutations} from "vuex";
export default {
data() {
	return {
		ad_pic:[],
		customs:[],
		weekHot: [],
		timeFree: [],
		recList: [],
		famaleList: [],
		maleList: [],
		load: false
	}
},
created() {
	this._getBookstore()
},
computed: {
	items() {
		return this.ad_pic.concat(this.customs, this.weekHot, this.timeFree, this.recList, this.famaleList, this.maleList)
	}
},
methods: {
	imgLoad() {
		if(!this.imgChecked) {
			this.$refs.scroll.refresh()
			this.imgChecked=true;
		}
	},
	seeMoreHot() {
		this.$router.push('/weekHotMain')
	},
	selectChannel(more, currentIndex) {
		if(more.indexOf("女生频道")!==-1) {
			this.setChannel(370);
		}
		else if(more.indexOf("男生频道")!==-1) {
			this.setChannel(369);
			
		}
		else if(more.indexOf("查看全部")!==-1) {
			let n=currentIndex===1 ? 369 : 370
			this.setChannel(n)
		}
		this.$router.push('/channel')
	},
	_getBookstore() {
		getBookstore().then((data)=>{
			if(data.result===ERR_OK) {
				this.load=true;
				let ret_data=this._normalData(data.items[0].data.data)
				this.ad_pic=ret_data.ad_pic
				this.customs=ret_data.customs
				this.weekHot=data.items[1].data.data
				this.timeFree=this._normalTimeFree(data.items[5].data.data)
				this.recList=data.items[2].data.data
				this.famaleList=data.items[3].data.data
				this.maleList=data.items[4].data.data
			}
		}).catch(err => {
			console.log(err)
		})
		
	},
	_normalData(data) {
		let ad_pic=[]
		let customs=[]
		data.forEach(item => {
			let json= {}
			if(item.ad_pic_url) {
				let {ad_pic_url, ad_name, reference_id}=item
				json.ad_pic_url=ad_pic_url
				json.ad_name=ad_name
				json.reference_id=reference_id
				ad_pic.push(json)
			}
			else {
				let {ad_copy, ad_name}=item
				let arr=ad_copy.split("|")
				let url=arr[2];
				json.url=url.substring(0,url.indexOf(';url'));
				json.ad_copy=ad_copy;
				json.ad_name=ad_name;
				customs.push(json)
			}
		})
		return {
			ad_pic: ad_pic,
			customs: customs
		}
	},
	_normalTimeFree(data) {
		let ret=[]
		data.forEach(item => {
			ret.push(item.data)
		})
		return ret;
	},
	...mapMutations({
		'setChannel': 'SET_CHANNEL'
	})
},
components: {
	Scroll,
	SearchBox,
	Slider,
	WeekHot,
	Favorite,
	Recommend,
	Loading,
	NoResult
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
.bookstore {
	position: fixed;
	top: 44px;
	bottom: 0;
	left: 0;
	right: 0;
	.search-wrap {
		position: fixed;
		top: 0;
		right: 15px;
		padding: 15px; 
	}
	.bookstore-con-wrap, .result-wrap {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.bookstore-con {
		width: 100%;
		height: 100%;
	}
	.load-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%,0);
		display: flex;
	}
	.ad_pic_wrap {
		position: relative;
	}
	.customs-wrap {
		padding-top: 10px;
		ul {
			display: flex;
			font-size: $font-size-medium;
			color: $color-text-ll;
			text-align: center;
			line-height: 1.5;
			li {
				flex: 1;
				img {
					width: 40%;
					margin: 0 30%;
				}
				span {
					color: $color-text-ll;
					font-size: $font-size-small;
				}
			}
		}
	}	
}

</style>