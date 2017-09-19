<template>
<transition name="slideDown" mode="out-in">
<div class="read-settings" v-if="flag">
	<div class="setting-top">
		<strong>上一章</strong>
		<span>1/6541</span>
		<strong>下一章</strong>
	</div>
	<div class="setting-bot">
		<ul>
			<li v-for="(item, index) in settings" @click.stop="selectItem(index)">
				<i :class="item.icon"></i>
				<span>{{item.text}}</span>
			</li>
		</ul>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	settings: {
		type: Array,
		default() {
			return [
			{icon: 'iconfont icon-caidan2', text: '目录' },
			{icon: 'iconfont icon-MobilePortraitCopy', text: '字体' },
			{icon: 'iconfont icon-night', text: '夜间' },
			{icon: 'iconfont icon-xiazai', text: '下载' }
			]
		}
	},
	flag: {
		type: Boolean,
		default: false
	}
},
methods: {
	selectItem(index) {
		this.$emit('selectItem', index)
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.read-settings {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: $color-read-background;
	font-size: $font-size-medium-x;
	color: $color-background;
	.setting-top {
		display: flex;
		line-height: 3.5;
		padding: 0 24px;
		margin-bottom: 18px;
		@include border-1px(rgba(255,255,255,0.4));
		strong {
		}
		span {
			flex: 1;
			text-align: center;
		}
	}
	.setting-bot {
		padding-bottom: 10px;
		ul {
			display: flex;
			align-items: center;
			li {
				flex: 1;
				text-align: center;
				span, i {
					display: block;
				}
				i {
				}
				span {
					font-size: $font-size-medium;
					line-height: 2.5;
				}
			}
		}
	}
}
.slideDown-enter-active, .slideDown-leave-active {
	transition: all .1s ease-in-out;	
}
.slideDown-enter, .slideDown-leave-to {
	transform: translate3d(0, 100%, 0);
}
</style>