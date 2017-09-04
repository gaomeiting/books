<template>
<h3 @click.stop="seeMore" class="see-more">{{more}}</h3>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		more: {
			type: String,
			default: '查看全部'
		}
	},
	methods: {
		seeMore() {
			this.$emit('seeMore')
		}
	}
	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.see-more {
	height: 44px;
	line-height: 44px;
	text-align: center;
	font-size: $font-size-small;
	color: $color-text-l;
}	
</style>