<template>
<div class="week-hot">
	<hot-title :title="title"></hot-title>
	<div class="week-con">
		<ul>
			<li v-for="item in list">
				<figure>
					<img v-lazy="item.cover">
					<i v-if="hasFree" class="iconfont icon-xianmian icon"></i>
				</figure>
				<p>{{item.title}}</p>
			</li>
		</ul>
		<see-more title="查看更多&gt;&gt;" @seeMore="seeMore" v-if="checkMore"></see-more>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import SeeMore from "components/see-more/see-more";
import HotTitle from "components/hot-title/hot-title";
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
	}
},
components: {
	SeeMore,
	HotTitle
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.week-hot {
	border-bottom: 8px solid $color-background-d;
	>h3 {
		height: 44px;
		line-height: 44px;
		font-size: $font-size-medium-x;
		color: $color-text-ll;
		text-indent: 15px;
		border-left: 5px solid $color-theme-d;
		@include border-1px($color-highlight-background)
	}
	.week-con {
		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 10px 15px 0;
			@include border-1px($color-highlight-background)
			li {
				flex: 0 0 31%;
				padding-bottom: 8px;
				figure {
					@include placeholder(100%, 133.3300%)
					margin-bottom: 8px;
					>.icon {
						position: absolute;
						right: 0;
						color: $color-sub-theme;
					}
				}
				p {
					font-size: $font-size-medium;
					line-height: 1.5;
					color: $color-text-l;
					overflow: hidden;
					@include ellipsis(2); 
				}

			}
		}
		
	}
}

</style>