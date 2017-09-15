<template>
<ul class="week-list">
	<li v-for="item in list">
		<figure>
			<img v-lazy="item.cover">
			<i v-if="hasFree" class="iconfont icon-xianmian icon"></i>
		</figure>
		<p>{{item.title}}</p>
	</li>

</ul>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	
	list : {
		type: Array,
		default: null
	},
	hasFree: {
		type: Boolean,
		default: false
	}
},
methods: {
}

}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.week-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10px 15px 0;
	@include border-1px($color-highlight-background)
	> li {
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
</style>