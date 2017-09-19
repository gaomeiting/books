<template>
<transition name="slide" mode="out-in">
<div class="read-wrap">
	<div class="read-scroll-wrap" @click.stop="switchMenu">
	<scroll :data="chapter" :pullUp="pullUp" @scrollEnd="loadMore" class="read" ref="read">
		<div class="read-con">
			<h3 class="read-title">
				{{chapter.t}}
			</h3>
			<p class="read-text" v-for="(item, index) in chapter.p" ref="text">{{item}}</p>

		</div>
	</scroll>
	</div>
	<read-title title="返回" :flag="flag"></read-title>
	<read-settings :flag="flag" :settings="settings" @selectItem="selectItem"></read-settings>
	<read-font :flag="fontFlag" :currentBgColor="currentBgColor" @switchFontSize='switchFontSize' @switchBgColor='switchBgColor'></read-font>
	<router-view></router-view>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import ReadTitle from "components/read-title/read-title";
import ReadFont from "components/read-font/read-font";
import ReadSettings from "components/read-settings/read-settings";
import { Base64 } from "js-base64";
import {mapGetters} from "vuex";
export default {
data() {
	return {
		chapter: {},
		pullUp: true,
		flag: false,
		fontFlag: false,
		fontSize: 16,
		currentBgColor: 0,
		settings: [
				{icon: 'iconfont icon-caidan2', text: '目录' },
				{icon: 'iconfont icon-MobilePortraitCopy', text: '字体' },
				{icon: 'iconfont icon-night', text: '夜间' },
				{icon: 'iconfont icon-xiazai', text: '下载' }
			]
	}
},
activated() {
	console.log('activated')
	this.initedChapter()
},
computed: {
	...mapGetters(['currentRead'])
},
methods: {
	initedChapter() {
		if(!this.currentRead.data) {
			this.$router.back();
			return ;
		};
		const index=this.currentRead.chapter_id
		this.chapter=JSON.parse(Base64.decode(this.currentRead.data[index]))
	},
	loadMore() {

	},
	switchMenu() {
		this.flag=!this.flag
		if(!this.flag) {
			if(this.fontFlag) this.fontFlag=false;
		}
	},
	switchFontSize(index) {
		let size=!index ? Math.min(++this.fontSize, 20) : Math.max(--this.fontSize, 12);
		this.fontSize=size;
		if(this.fontSize>20 || this.fontSize < 12) return;
		
		let texts=this.$refs.text;
		texts.forEach(text => {
			text.style.fontSize=size+"px"
		})
		
	},
	switchBgColor(item, index) {
		this.$refs.read.$el.style.backgroundColor=item.bg;
		let texts=this.$refs.text;
		texts.forEach(text => {
			text.style.color=item.color;
		})
		this.currentBgColor=index;
	},
	selectItem(index) {
		console.log(index)
		switch(index) {
			case 0:
				this.$router.push('/read/catalog')
				break;
			case 1:
				this.fontFlag=!this.fontFlag
				break;
			case 2: 
				if(this.settings[index].text=='白天') {
					this.settings[index].icon='iconfont icon-night'
					this.settings[index].text='夜间'

				}
				else {
					this.settings[index].icon='iconfont icon-baitian'
					this.settings[index].text='白天'
				}
				console.log(this.settings)
				break;
		}

	}
},
components: {
	Scroll,
	ReadTitle,
	ReadSettings,
	ReadFont
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.read-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.read {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $color-read-theme;
		overflow: hidden;
		.read-con {
			padding: 12px;
			font-size: $font-size-medium-x;
			line-height: 1.6;
			.read-title {
				font-size: $font-size-large;
				line-height: 2.5;
				color: $color-read-text;
				font-weight: bold;
				@include border-1px ($color-read-text);
				margin-bottom: 12px;
			}
			.read-text {
				padding-bottom: 10px;
			}
		}
	}
}
</style>