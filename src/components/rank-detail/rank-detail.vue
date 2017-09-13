<template>
<transition name="slide" mode="out-in">
<div class="rank-detail-wrap">
	<head-title :title="rank[3]"></head-title>
	<div class="rank-detail" v-if="list.length">
		<div class="rank-title">
			<tab :tab="items" @selectItem="selectItem" :currentIndex='currentIndex'></tab>
		</div>
		<scroll :data="list" class="rank-list-wrap" :pullUp="pullUp" @scrollEnd="loadMore">
			<div>
				<rank-list :list="list" :type="currentIndex"></rank-list>
				<loading v-show="hasMore"></loading>
				<div class="result-wrap">
					<no-result v-show="!hasMore && !list.length" title="小编努力种菜中~·"></no-result>
				</div>
			</div>
		</scroll>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import Tab from "components/tab/tab";
import HeadTitle from "components/title/title";
import Scroll from "base/scroll/scroll";
import RankList from "components/rank-list/rank-list";
import Loading from "base/loading/loading";
import NoResult from "base/no-result/no-result";
import {mapGetters} from "vuex";
import {getRankDetail} from "api/bookstore";
import {ERR_OK} from "api/config";
export default {
data() {
	return {
		list: [],
		start: 0,
		currentIndex: 0,
		items: [{name: '周榜'}, {name: '月榜'}, {name: '总榜'}],
		hasMore: true,
		pullUp: true
	} 
},
created() {
	this._initedRankDetail()	
},
computed: {
...mapGetters(['rank'])
},
methods: {
	selectItem(i) {
		this.currentIndex=i;
		this.start=0;
		this.list=[];
		this._ajaxData();
	},
	loadMore() {
		if(!this.hasMore) {
			return;
		}
		this.start+=10;
		this._ajaxData();
	},
	_initedRankDetail() {
		if(!this.rank[1]) {
			this.$router.push('/rank');
			return;
		}
		this._ajaxData();
	},
	_ajaxData() {
		let start=this.start;
		let id=!this.currentIndex ? this.rank[1] : this.currentIndex===1 ? this.rank[2] : this.rank[0];
		getRankDetail(start, id).then(res=>{
			this.loadChecked=false;
			if(res.result===ERR_OK) {
				this.list=this.list.concat(res.items);
				this.hasMore=res.more;
			}
		}).catch(err=>{
			console.log(err)
		})
	}	
},
components: {
	HeadTitle,
	Scroll,
	Tab,
	RankList,
	Loading,
	NoResult
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.rank-detail-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.rank-detail {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		.rank-title {
			border-bottom: 8px solid $color-background-d;
		}
		.result-wrap {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
			background-color: $color-background;
		}
		.rank-list-wrap {
			position: fixed;
			top: 88px;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
		}
	}
}
</style>