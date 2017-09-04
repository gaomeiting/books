<template>
<h3 class="more">
	<span @click.stop="switchList">换一换</span>
	<span>{{ more }}</span>
</h3>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		more: {
			type: String,
			default: '女生频道'
		}
	},
	methods: {
		switchList() {
			this.$emit('switchList')
		}
	}
	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.more {
	display: flex;
	height: 44px;
	line-height: 44px;
	color: $color-text-l;
	font-size: $font-size-small;
	span {
		flex: 1;
		text-align: center;
		&:first-of-type {
			border-right: 1px solid $color-background-d
		}
	}
}	
</style>