<template>
<div class="title">
	<i @click.stop="back" class="iconfont icon-fanhui"></i>
	<span>{{title}}</span>
	<i @click.stop="home" class="iconfont icon-zhuye"></i>
</div>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	title: {
		type: String,
		default: ''
	},
	box: {
		type: Boolean,
		default: false
	}
},
methods: {
	back() {
		if(this.box) {
			this.$emit("back");
			return;
		}
		this.$router.back()
	},
	home() {
		this.$router.push('/bookstore')
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
		padding: 4px 15px;
	}
	span {
		flex: 1;
		@include no-wrap();
	}
}

</style>