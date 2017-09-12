<template>
<div class="category-tags">
	<ul>
		<li v-for="(item, index) in tags" :class="{'active' : currentTag==index}" @click.stop="selectTag(item, index)">{{index==0? "全部" : item.label}}</li>
	</ul>
	<ul>
		<li v-for="(item, index) in  states" :class="{'active' : currentState==index}" @click.stop="selectState(item, index)">{{item.label}}</li>
	</ul>
</div>
</template>

<script type="text/ecmascript-6">
/*import {getCategoryDetail} from "api/bookstore";*/
export default {
props: {
	tags: {
		type: Array,
		default: null
	},
	currentTag: {
		type: Number,
		default: 0
	},
	states: {
		type: Array,
		default() {
			return [
				{label: '热门', name: 'click' }, 
				{label: '最新', name: 'latest'},
				{label: '完结', name: 'finish'}
			]
		}
	},
	currentState: {
		type: Number,
		default: 0
	}
},
methods: {
	selectTag(item, index) {
		this.$emit('selectTag', item, index)
	},
	selectState(item, index) {
		this.$emit('selectState', item, index)
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.category-tags {
	border-bottom: 8px solid $color-background-d;
	ul {
		display: flex;
		flex-wrap: wrap;
		padding: 6px 15px;
		&:first-of-type {
			@include border-1px($color-background-d)
		}
		li {
			padding: 0 6px;
			font-size: $font-size-medium;
			line-height: 2.5;
			&.active {
				color: $color-theme;
			}
		}
	}
}
</style>