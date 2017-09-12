<template>
<ul class="category-list">
	<li class="item" v-for="(item, index) in list" @click.stop.prevent="selectItem(item)">
		<figure>
			<img v-lazy="item.new_image">
		</figure>
		<div class="category-text">
			<h4>{{item.label}}</h4>
			<p class="text">{{item.fiction_count}}</p>
		</div>
	</li>
</ul>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	list: {
		type: Array,
		default: null
	},
	type: {
		type: Number,
		default: 0
	}
},

methods: {
	selectItem(item) {
		this.$emit('selectCategory',item)
	}
}	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.category-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 8px 15px 0;
	.item {
		flex: 1 1 50%;
		width: 50%;
		padding-bottom: 8px;
		position: relative;
		&:nth-of-type(2n) {
			padding-left: 4px;
			box-sizing: border-box;
		}
		&:nth-of-type(2n-1) {
			padding-right: 4px;
			box-sizing: border-box;
		}
		figure {
			@include placeholder(100%, 41.6%);
			box-shadow: none;
		}
		.category-text {
			position: absolute;
			top: 0;
			left: 10px;
			h4 {
				font-size: $font-size-medium;
				line-height: 2;
			}
			p {
				font-size: $font-size-small;
				color: $color-text-l;
			}
		}
		
	}
}
</style>