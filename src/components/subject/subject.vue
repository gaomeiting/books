<template>
<transition name="fade">
<div class="hot-main-wrap">
	<head-title title="专题书单"></head-title>
	<div class="hot-main">
		<scroll :data="list" :pullUp="pullUp" @scrollEnd="loadMore" class="book-list-wrap">
			<div>
				<subject-list :list="list" @linkSubjectDetail='linkSubjectDetail'></subject-list>
				<see-more title="查看更多&gt;&gt;" @seeMore="seeMore" v-show="!hasMore"></see-more>
				<loading v-show="hasMore"></loading>
			</div>
		</scroll>
	</div>
	<router-view></router-view>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import HeadTitle from "components/title/title";
import SubjectList from "components/subject-list/subject-list";
import Scroll from "base/scroll/scroll";
import SeeMore from "components/see-more/see-more";
import Loading from "base/loading/loading";
import { getSubject } from "api/bookstore";
import { CreatSubject } from "common/js/subject";
import { ERR_OK } from "api/config";
import { mapMutations } from "vuex";
export default {
data() {
	return {
		list: [],
		pullUp: true,
		start: 0,
		hasMore: true
	}
},
created() {
	this._initSubject(this.start)
},
methods: {
	loadMore() {
		if(!this.hasMore) return;
		this.start+=10;
		this._initSubject(this.start);
		
	},
	seeMore() {
		console.log(123)
	},
	linkSubjectDetail(item) {
		this.$router.push(`/subject/${item.id}`);
		this.setSubject(item)
	},
	_initSubject(start) {
		getSubject(start).then(res=>{
			if(res.result===ERR_OK) {
				let arr=this._normalizeSubject(res.items);
				this.list=this.list.concat(arr)
				this.hasMore=res.more
			}
		}).catch(err=>{
			console.log(err)
		})
	},
	_normalizeSubject(data) {
		let ret=[]
		data.forEach(item => {
			ret.push(CreatSubject(item))
		})
		return ret;
	},
	...mapMutations({
		'setSubject': 'SET_SUBJECT'
	})
},
components: {
	HeadTitle,
	SubjectList,
	Scroll,
	Loading,
	SeeMore
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.hot-main-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 900;
	background-color: $color-background;
	.hot-main {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		.book-list-wrap {
			width: 100%;
			height: 100%;
		}
	}
}

</style>