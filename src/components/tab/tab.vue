<template>
<div class="tab">
	<p></p>
	<p v-for="(item, index) in tab" @click.stop="selectItem(index)"><span :class="{'active': index===currentIndex}">{{item.name}}</span></p>
	<p></p>
	
</div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		tab: {
			type: Array,
			default() {
				return [{name: '书城'}, {name: '书架'}]
			} 
		},
		currentIndex: {
			type: Number,
			default: 0
		}
	},
	methods: {
		selectItem(i) {
			this.$emit('selectItem', i)
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.tab {
	background: $color-background;
	height: 44px;
	line-height: 44px;
	font-size: $font-size-medium-x;
	display: flex;
	text-align: center;
	/* @include border-1px($color-highlight-background); */
	p {
		flex: 1;
		span {
			padding-bottom: 12px;
			&.active{
				color: $color-theme;
				border-bottom: 2px solid $color-theme;
			}
		}
	}
}	
</style>