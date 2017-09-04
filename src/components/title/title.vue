<template>
<div class="title">
	<i @click.stop="back">返回</i>
	<span>{{title}}</span>
	<i>主页</i>
</div>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	title: {
		type: String,
		default: ''
	}
},
methods: {
	back() {
		this.$router.back()
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.title {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 44px;
	background-color: $color-background-d;
	display: flex;
	align-items: center;
	font-size: $font-size-medium-x;
	i {
		padding: 0 15px;
	}
	span {
		flex: 1;
		@include no-wrap();
	}
}

</style>