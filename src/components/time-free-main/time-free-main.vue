<template>
<transition name="fade">
<div class="time-free-wrap">
	<head-title title="限时免费"></head-title>
	<div class="time-free-main">
		<scroll :data="list" class="book-list-wrap">
			<div>
				<div v-for="(item, index) in list">
					<div v-if="index % 2" class="time-free-list">
						<hot-title :title="titles[index ]"></hot-title>
						<book-list :bookList="item" @selectBook="selectBook"></book-list>
					</div>
					<week-hot :list="item" :title="titles[index]" :hasFree="index==0" :checkMore="checkMore" @selectBook="selectBook" v-else></week-hot>
				</div>
				<loading v-show="loading"></loading>
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
import WeekHot from "components/week-hot/week-hot";
import SeeMore from "components/see-more/see-more";
import HotTitle from "components/hot-title/hot-title";
import Loading from "base/loading/loading";
import { selectCurrentBook } from "common/js/mixin";
import { getTimeFree } from "api/bookstore";
import { ERR_OK } from "api/config";
export default {
mixins:	[selectCurrentBook],
data() {
	return {
		list: [],
		titles: [],
		loading: true,
		checkMore: false,
	}
},
created() {
	this._initTimeFree()
},
methods: {
	
	_initTimeFree() {
		getTimeFree().then(res=>{
			this.loading=false;
			if(res.result===ERR_OK) {
				this.list=this._normalTimeFree(res.items);
			}
		}).catch(err=>{
			console.log(err)
		})
	},
	_normalTimeFree(list) {
		let ret=[];
		list.forEach(item=> {
			let data=item.data.data;
			let arr=[];
			data.forEach(t=>{
				arr.push(t.data)
			})
			this.titles.push(item.ad_name)
			ret.push(arr)
			
		})
		return ret;
	}
},
components: {
	HeadTitle,
	BookList,
	Scroll,
	Loading,
	SeeMore,
	WeekHot,
	HotTitle
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.time-free-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	/* background-color: red; */
	background-color: $color-background;
	.time-free-main {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		.book-list-wrap {
			width: 100%;
			height: 100%;
			.time-free-list {
				border-bottom: 8px solid $color-background-d;
			}
		}
	}
}

</style>