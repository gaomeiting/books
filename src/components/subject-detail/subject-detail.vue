<template>
<transition name="slide">
<div class="subject-detail-wrap">
	<head-title :title="subject.name"></head-title>
	<scroll :data="list" ref="scroll" :pullUp="pullUp" @scrollEnd="loadMore" class="subject-detail">
		<div class="container">
			<figure>
				<img v-lazy="subject.url" @load="imgLoad">
			</figure>
			<p class="text">{{subject.desc}}</p>
			<book-list :bookList="list"></book-list>
			<loading v-show="hasMore"></loading>
			<div class="result-wrap">
				<no-result v-show="!hasMore && !list.length" title="小编努力种菜中~·"></no-result>
			</div>
		</div>
	</scroll>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from "vuex";
import {getSubjectDetail} from "api/bookstore";
import { ERR_OK } from "api/config";
import Scroll from "base/scroll/scroll";
import HeadTitle from "components/title/title";
import BookList from "components/book-list/book-list";
import Loading from "base/loading/loading";
import noResult from "base/no-result/no-result";
export default {
props: {
	
},
data() {
	return {
		list: [],
		start: 0,
		hasMore: true,
		pullUp: true,
	}
},
created() {
	this._initedSubjectDetail()
},
computed: {
...mapGetters([
	'subject'
])
},
methods: {
	imgLoad() {
		if(!this.imgChecked) {
			this.imgChecked=true;
			if(this.$refs.scroll) this.$refs.scroll.refresh()
		}
	},
	_initedSubjectDetail() {
		if(!this.subject.id) {
			this.$router.push('/subject')
			return;
		}
		this._initedData()
	},
	loadMore() {
		if(!this.hasMore) {
			return;
		}
		this.start+=10;
		this._initedData()
		
	},
	_initedData() {
		getSubjectDetail(this.subject.id, this.start).then(res => {
			if(res.result===ERR_OK) {
				this.list=res.items;
				this.hasMore=res.more
			}
		}).catch(err => {
			console.log(err)
		})
	}
},
components: {
	Scroll,
	 HeadTitle,
	 BookList,
	 Loading,
	 noResult
}	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.subject-detail-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.subject-detail {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		>.container {
			> figure, img {
				width: 100%;
			}
			>.text {
				padding: 10px 15px;
				line-height: 1.5;
				font-size: $font-size-medium;
				color: $color-text-l;
				border-bottom: 8px solid $color-background-d;
			}
			.result-wrap {
				padding-top: 40px;
			}
		}
		
	}
	
}
</style>