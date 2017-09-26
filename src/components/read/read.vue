<template>
<transition name="slide" mode="out-in">
<div class="read-wrap">
	<div class="read-scroll-wrap" @click.stop="switchMenu">
	<scroll :data="chapter.p" :pullUp="pullUp" @scrollEnd="loadMore" class="read" ref="read">
		<div class="read-con">
			<h3 class="read-title">
				{{chapter.t}}
			</h3>
			<p class="read-text" v-for="(item, index) in chapter.p" ref="text">{{item}}</p>
		</div>
	</scroll>
	</div>
	<read-title title="返回" :flag="flag"></read-title>
	<read-settings :flag="flag" :settings="settings" @selectItem="selectItem" @nextChapter="nextChapter" @prevChapter="prevChapter"></read-settings>
	<read-font :flag="fontFlag" :currentBgColor="currentBgColor" @switchFontSize='switchFontSize' @switchBgColor='switchBgColor'></read-font>
	<bottom-tip ref="bottomTip">
		<div class="tip-wrap">
			<h3 v-if="!hasLoaded">下载完成</h3>
			<p>{{ hasLoaded ? '您已下载过本书无需重复下载' : '已下载所有可读章节,没网也能读啦~~' }}</p>
			<a href="javascript:;" class="btn" @click.stop="hideBottomTip">确定</a>
		</div>
	</bottom-tip>
	<router-view @selectCurrentCatalog="selectCurrentCatalog"></router-view>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import ReadTitle from "components/read-title/read-title";
import ReadFont from "components/read-font/read-font";
import ReadSettings from "components/read-settings/read-settings";
import BottomTip from "base/bottom-tip/bottom-tip";
import {mapGetters} from "vuex";
import { bookContentMixin } from "common/js/mixin";
export default {
mixins: [ bookContentMixin ],
data() {
	return {
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
	//console.log('activated')
	this.startRead()
},
watch: {
	currentRead(newVal, oldVal) {
		if(newVal.chapter_id===oldVal.chapter_id) return;
		this.startRead()
	}
},
computed: {
	...mapGetters(['currentRead'])
},
methods: {
	
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
	selectCurrentCatalog(item) {
		this.savedCurrentBookChapterId(item.chapter_id)
	},
	selectItem(index) {
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
			case 3:
				this.settings[index].text=this.loadTxt;
				this.downBook();
				break;
		}

	},
	nextChapter() {
		let chapter_id=this.currentRead.chapter_id +1
		// 需要做边境处理；
		console.log(chapter_id, 'nextChapter')
		this.savedCurrentBookChapterId(chapter_id)
		/*this.startRead()*/
		this.$refs.read.scrollTo(0, 0, 0)
	},
	prevChapter() {
		let chapter_id=this.currentRead.chapter_id -1
		if(chapter_id<0) {
			chapter_id=0;
			return;
		}
		this.savedCurrentBookChapterId(chapter_id)
		/*this.startRead()*/
		this.$refs.read.scrollTo(0, 0, 0)
	}
},
components: {
	Scroll,
	ReadTitle,
	ReadSettings,
	ReadFont,
	BottomTip
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
	.tip-wrap {
		text-align: center;
		padding-top: 10px;
		h3 {
			font-size: $font-size-medium-x;
			color: $color-text;
			font-weight: bold;
			line-height: 3;
		}
		p {
			font-size: $font-size-medium;
			color: $color-text-d;
			line-height: 1.5;
			padding-bottom: 20px;
		}
		.btn {
			display: block;
			width: 100%;
			height: 44px;
			line-height: 44px;
			background-color: $color-sub-theme;
			color: $color-background;
		}
	}
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