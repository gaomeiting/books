<template>
<h3 class="hot-title">{{title}}</h3>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	title: {
		type: String,
		default: '本周最火'
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.hot-title {
	height: 44px;
	line-height: 44px;
	font-size: $font-size-medium-x;
	color: $color-text-ll;
	text-indent: 15px;
	border-left: 5px solid $color-theme-d;
	@include border-1px($color-highlight-background)
}

</style>