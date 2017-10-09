<template>
<div class="week-hot">
	<hot-title :title="title"></hot-title>
	<div class="week-con">
		<week-list :list="list" :hasFree="hasFree" @selectBook="selectBook"></week-list>
		<see-more title="查看更多&gt;&gt;" @seeMore="seeMore" v-if="checkMore"></see-more>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import SeeMore from "components/see-more/see-more";
import HotTitle from "components/hot-title/hot-title";
import WeekList from "components/week-list/week-list";
export default {
props: {
	title: {
		type: String,
		default: '本周最火'
	},
	list : {
		type: Array,
		default: null
	},
	more: {
		type: String,
		default: '查看更多'
	},
	checkMore: {
		type: Boolean,
		default: true
	},
	hasFree: {
		type: Boolean,
		default: false
	}
},
methods: {
	seeMore() {
		this.$emit('seeMore')
	},
	selectBook(item) {
		this.$emit('selectBook', item)
	}
},
components: {
	SeeMore,
	HotTitle,
	WeekList
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.week-hot {
	border-bottom: 8px solid $color-background-d;
	.week-con {
		
	}
}

</style>