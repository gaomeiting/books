<template>
<transition name="slide" mode="out-in">
<div class="read-wrap">
	<div class="read-scroll-wrap" @click.stop="switchMenu">
		<scroll :data="chapters" :pullUp="pullUp" :beforeScroll="beforeScroll" @beforeScrollStart="beforeScrollStart" @scrollEnd="loadMore" class="read" ref="read">
			<div class="read-con">
				<div class="read-article" v-for="chapter in chapters" ref="article">
					<h3 class="read-title" v-if="chapter.t">
						{{chapter.t}}
					</h3>
					<p class="read-text" v-for="(item, index) in chapter.p" ref="text">{{item}}</p>
				</div>
				<div class="read-load" v-show="hasMore && chapters.length>0">
					<loading></loading>
				</div>
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
	<book-catalog :flag="flagCatalog" @back="back" @selectCurrentCatalog="selectCurrentCatalog" :catalog="catalogList" :current="books[0].chapter_id"></book-catalog>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import ReadTitle from "components/read-title/read-title";
import ReadFont from "components/read-font/read-font";
import ReadSettings from "components/read-settings/read-settings";
import BookCatalog from "components/book-catalog/book-catalog";
import BottomTip from "base/bottom-tip/bottom-tip";
import {mapGetters} from "vuex";
import {getCatalog} from "api/bookstore";
import {ERR_OK} from "api/config";
import { bookContentMixin } from "common/js/mixin";
import {CreateBook} from "common/js/book.js";
export default {
mixins: [ bookContentMixin ],
data() {
	return {
		pullUp: true,
		flag: false,
		fontFlag: false,
		fontSize: 16,
		currentBgColor: 0,
		catalogList: [],
		hasMore: true,
		chapters: [],
		flagCatalog: false,
		beforeScroll: true,
		settings: [
				{icon: 'iconfont icon-caidan2', text: '目录' },
				{icon: 'iconfont icon-MobilePortraitCopy', text: '字体' },
				{icon: 'iconfont icon-night', text: '夜间' },
				{icon: 'iconfont icon-xiazai', text: '下载' }
			]
	}
},
activated() {
	this.initReadBook();
	this.hasMore=true;
	this.flag=false;
	this.chapters=[];
},
watch: {
	chapter(newVal, oldVal) {
		if(newVal === oldVal || !newVal ) return;
		let index=this.chapters.findIndex(chapter=> {
			return chapter.t===newVal.t
		})
		if(index === -1) {
			this.chapters.push(newVal)
		}
	}
},
methods: {
	back() {
		this.flagCatalog=false;
	},
	loadMore() {
		this._nextChapter()
	},
	
	initReadBook() {
		let fiction_id=this.currentBook.fiction_id
		let chapter_id=0;
		this._hasCatchCurrentChapter(fiction_id, chapter_id);
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
		this.chapters=[];
		let fiction_id=this.currentBook.fiction_id;
		let {index}=this._checkCatchBook(fiction_id);
		if(index!==-1) {
			this._hasCatchAnyChapter(index, item.chapter_id)
		}
		else {

			this._getDownBook(fiction_id, item.chapter_id);
		}
		this.flagCatalog=false;
	},
	selectItem(index) {
		switch(index) {
			case 0:
				this.getCatalogs();
				this.flag=false;
				this.flagCatalog=true;
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
				this.flag=false;
				break;
			case 3:
				this.settings[index].text=this.loadTxt;
				this.downBook();
				this.flag=false;
				break;
		}

	},
	getCatalogs() {
		let fiction_id=this.currentBook.fiction_id;
		let books=this.books.slice();
		let index=books.findIndex(item=> {
			return item.fiction_id===fiction_id
		})
		if(index!==-1) {
			if(!books[index].catalog) {
				getCatalog(fiction_id).then(res=>{
					if(res.result===ERR_OK) {
						this.catalogList=res.item.toc;
						let ret_book=Object.assign({}, books[index], {catalog: this.catalogList});
						this.savedBookList(ret_book);
					}
				}).catch(err=>{
					console.log(err)
				})
				
			}
			else {
				this.catalogList=books[index].catalog;
			}
		}
		else {
			this.catalogList=this._getCatalogs(fiction_id);
		}
	},
	_getCatalogs(fiction_id) {
		getCatalog(fiction_id).then(res=>{
			if(res.result===ERR_OK) {
				return res.item.toc;
			}
		}).catch(err=>{
			console.log(err)
		})
	},
	nextChapter() {
		this.chapters=[];
		let index=this._nextChapter()
		this.flag=false;
		// 需要做边境处理；
		/*this.$refs.read.scrollTo(0, 0, 0)*/
	},
	prevChapter() {
		this.chapters=[];
		this.flag=false;
		let fiction_id=this.currentBook.fiction_id;
		let {index, chapter_id}=this._checkCatchBook(fiction_id);
		let ret_chapter_id=chapter_id-1
		if(ret_chapter_id<0) {
			ret_chapter_id=0;
		}
		if(chapter_id) {
			this._hasCatchAnyChapter(index,  ret_chapter_id)
		}
		else {

			this._getDownBook(fiction_id,  ret_chapter_id);
		}

	},
	beforeScrollStart() {
		if(this.flag) {
			this.flag=false;
		}
		if(this.fontFlag) {
			this.fontFlag=false;
		}
	},
	_nextChapter() {
		let fiction_id=this.currentBook.fiction_id;
		let {index, chapter_id}=this._checkCatchBook(fiction_id);
		if(chapter_id) {
			this._hasCatchAnyChapter(index, chapter_id+1)
		}
		else {

			this._getDownBook(fiction_id, chapter_id+1);
		}
	},
	_checkCatchBook(fiction_id) {
		let chapter_id=0;
		let index=this.books.findIndex(book=>{
			return book.fiction_id===fiction_id
		}) 
		if(index===-1) {
			chapter_id=0;
		}
		else {
			chapter_id=this.books[index].chapter_id
		}
		return { index, chapter_id };
	},
	
	_hasCatchAnyChapter(index, chapter_id) {
		let bBtn=false;
		let fiction_id=this.currentBook.fiction_id;
		let books=this.books.slice();
		let chapter_index=books[index].chapters.findIndex(chapter=>{
			return chapter.c===chapter_id
		})
		if(chapter_index===-1) {
			//发送请求；
			this._getDownBook(fiction_id, chapter_id);
		}
		else {
			//读取缓存
			let book=Object.assign({}, books[index], {chapter_id})
			let ret_book=CreateBook(book)
			this.savedBookList(ret_book);
			this.parseCurrentChapter(ret_book)
		}
		
	},
	_hasCatchCurrentChapter(fiction_id, chapter_id) {
		let bBtn=false;
		let books=this.books.slice()
		books.forEach(item=>{
			if(item.fiction_id===fiction_id) {
				bBtn=true;
				//从缓存中读数据
				let book=CreateBook(item)
				this.parseCurrentChapter(book)
				return false;
			}
		})
		if(!bBtn) {
			console.log("发送请求")
			//发起请求；
			this._getDownBook(fiction_id, chapter_id);
			this._getCatalog(fiction_id);
		}
	}
},
components: {
	Scroll,
	ReadTitle,
	ReadSettings,
	ReadFont,
	BottomTip,
	Loading,
	BookCatalog
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