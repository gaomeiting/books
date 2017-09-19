<template>
<transition name="slideDown" mode="out-in">
<div class="read-font" v-show="flag">
	<div class="size">
		<span>字号</span>
		<strong v-for="(item, index) in fontSize" @click.stop="switchFontSize(index)">{{item}}</strong>
	</div>
	<div class="bg-color">
		<span>背景</span>
		<strong v-for="(item, index) in bgColor" :class="{'active' : currentBgColor == index}" @click.stop="switchBgColor(item, index)"><small ref="radius"></small></strong>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	flag: {
		type: Boolean,
		default: false
	},
	fontSize: {
		type: Array,
		default() {
			return ['大', '小']
		}
	},
	bgColor: {
		type: Array,
		default() {
			return [{ bg: '#f7eee5', color: '#333333' }, { bg: '#e9dfc7', color: '#333333' }, { bg: '#a4a4a4', color: '#333333' }, { bg: '#cdefce', color: '#333333' }, { bg: '#283548', color: '#7685a2'}, {bg: '#0f1410', color: '#4e534f' }]
		}
	},
	currentBgColor: {
		type: Number,
		default: 0
	}
},
created() {
	//console.log("created")
	this.$nextTick(()=>{
		this.setGgColor()
	})
},
methods: {
	switchFontSize(index) {
		this.$emit('switchFontSize', index)
	},
	setGgColor() {
		this.$refs.radius&&this.$refs.radius.forEach((color,index)=>{
			color.style.background=this.bgColor[index].bg
		})
	},
	switchBgColor(item, index) {
		this.$emit('switchBgColor', item, index)
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.read-font {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 82px;
	background-color: $color-read-background;
	font-size: $font-size-medium;
	color: $color-background;
	padding: 20px 24px;
	span {
		width: 40px;
		flex: 0 0 40px;
	}
	.size {
		display: flex;
		align-items: center;
		strong {
			width: 60px;
			flex: 0 0 60px;
			text-align: center;
			height: 28px;
			line-height: 28px;
			border: 1px solid rgba(255,255,255,0.5);
			border-radius: 28px;
			&:last-of-type {
				margin-left: 10px;
			}
		}
	}
	.bg-color {
		display: flex;
		align-items: center;
		padding: 16px 0 0;
		strong {
			width: 26px;
			flex: 0 0 26px;
			height: 26px;
			border-radius: 50%;
			margin-right: 6px;
			overflow: hidden;
			padding: 2px;
			small {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			&:last-of-type {
				margin-right: 0;
			}
			&.active {
				border: 1px solid $color-theme;
			}
		}
	}
}
.slideDown-enter-active, .slideDown-leave-active {
	transition: all .1s ease-in-out;	
}
.slideDown-enter, .slideDown-leave-to {
	transform: translate3d(0, 50%, 0);
	opacity: 0;
}
</style>