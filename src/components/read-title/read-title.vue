<template>
<transition name="slideUp" mode="out-in">
<div class="title" v-if="flag">
	<i @click.stop="back" class="iconfont icon-fanhui"></i>
	<span>{{title}}</span>
	<i @click.stop="home" class="iconfont icon-caidan"></i>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	title: {
		type: String,
		default: ''
	},
	flag: {
		type: Boolean,
		default: false
	}
},
methods: {
	back() {
		this.$router.back()
	},
	home() {
		/*this.$router.push('/bookstore')*/
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
	background-color: $color-read-background;
	display: flex;
	align-items: center;
	font-size: $font-size-medium-x;
	color: $color-background;
	i {
		padding: 4px 15px;
	}
	span {
		flex: 1;
		@include no-wrap();
	}
}
.slideUp-enter-active, .slideUp-leave-active {
	transition: all .1s ease-in-out;	
}
.slideUp-enter, .slideUp-leave-to {
	transform: translate3d(0, -100%, 0);
}
</style>