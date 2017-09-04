<template>
<transition name="fade">
<div class="channel-wrap">
	<head-title :title="title"></head-title>
	<scroll :data="list" class="channel" ref="scroll">
	<div>
		<div v-for="item in list">
			<hot-title :title="item.ad_name"></hot-title>
			<book-list :bookList="item.data.data"></book-list>
		</div>
	</div>
	</scroll>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import HeadTitle from "components/title/title";
import BookList from "components/book-list/book-list";
import HotTitle from "components/hot-title/hot-title";
import Scroll from "base/scroll/scroll";
import {ERR_OK} from "api/config";
import {getChannel} from "api/bookstore";
import {mapGetters} from "vuex";
export default {

data() {
	return {
		list : []
	}
},
activated() {
	this._initedChannel()
	this.$refs.scroll.scrollTo(0,0)
},
computed: {
	title() {
		return this.channel===370 ? '女生频道' : '男生频道'
	},
	...mapGetters([
		'channel'
	])
},
methods: {
_initedChannel() {
	getChannel(this.channel).then(res=>{
		if(res.result===ERR_OK) {
			this.list=res.items;
		}
	}).catch(err=> {
		console.log(err)
	})
}
},
components: {
	Scroll,
	HeadTitle,
	BookList,
	HotTitle
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.channel-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.channel {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
}
</style>