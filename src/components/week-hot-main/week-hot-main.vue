<template>
<transition name="fade">
<div class="hot-main-wrap">
	<head-title title="本周最火"></head-title>
	<div class="hot-main">
		<scroll :data="list" :pullUp="pullUp" @scrollEnd="loadMore" class="book-list-wrap">
			<div>
				<book-list :bookList="list"></book-list>
				<see-more more="更多专题 &gt;&gt;" @seeMore="seeMore" v-show="!hasMore"></see-more>
				<loading v-show="hasMore"></loading>
			</div>
		</scroll>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import HeadTitle from "components/title/title";
import BookList from "components/book-list/book-list";
import Scroll from "base/scroll/scroll";
import SeeMore from "components/see-more/see-more";
import Loading from "base/loading/loading";
import { getHotMain } from "api/bookstore";
import { ERR_OK } from "api/config";
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
	this._initHotMain(this.start)
},
methods: {
	loadMore() {
		if(!this.hasMore) return;
		this.start+=10;
		this._initHotMain(this.start);
		
	},
	seeMore() {
		this.$router.push('/subject')
	},
	_initHotMain(start) {
		getHotMain(start).then(res=>{
			if(res.result===ERR_OK) {
				this.list=this.list.concat(res.items)
				this.hasMore=res.more
			}
		}).catch(err=>{
			console.log(err)
		})
	}
},
components: {
	HeadTitle,
	BookList,
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
	/* background-color: red; */
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