<template>
<div>
<transition name="drop">
<div class="bottom-tip" v-if="flag">
	<slot></slot>
</div>
</transition>
<transition name="fade"> -->
<div class="mask" @click.stop="hide()" v-if="flag"></div>
</transition>

</div>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	delay: {
		type: Number,
		default: 2000
	}
},
data() {
	return {
		flag: false
	}
},
methods: {
	show() {
		this.flag=true;
		/*clearTimeout(this.timer)
		this.timer=setTimeout(()=>{
			this.flag=false
		}, this.delay)*/
	},
	hide() {
		this.flag=false;
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
.mask {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 499;
	background: rgba(0,0,0,0.5);
}
.bottom-tip {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 500;
	background: $color-dialog-background;
	&.drop-enter-active, &.drop-leave-active {
	  transition: all 0.3s;
	}
	&.drop-enter, &.drop-leave-to {
	  transform: translate3d(0, 100%, 0);
	}
}
</style>