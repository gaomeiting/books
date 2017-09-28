import {  getDownBook, ajaxDownBook, getCatalog } from "api/bookstore";
import { Base64 } from "js-base64";
import { uniqueArray } from "common/js/catch";
import { mapGetters, mapActions } from "vuex";
import {CreateBook} from "common/js/book.js";
import {ERR_OK} from "api/config";
export const switchRangeMixin = {
	data() {
		return {
			minIndex: 0,
			currentList: [],
			currentIndex: 1,
			sortList: []
		}
	},
	methods: {
		switchIndexRange(count, list) {
			let ret=[]
			let minIndex=this.minIndex
			let remainder=list.length%count
			let maxLen=remainder ? list.length - remainder :list.length-count
			minIndex+=count;
			if(minIndex>maxLen) minIndex=0;
			let maxIndex=remainder && minIndex===list.length - remainder ?minIndex+remainder : minIndex+count
			for(let i=minIndex; i<maxIndex; i++) {
				ret.push(list[i])
			}
			this.minIndex=minIndex
			this.currentList=ret;

		}
	}
};
export const bookContentMixin= {
	data() {
		return {
			len: 0,
			count: 0,
			currentBookContent: [],
			hasLoaded: false,
			chapter: {},
			book: {},
			catalog: []
			
		}
	},
	activated() {
		this.len= 0
		this.count= 0
		this.currentBookContent= []
		this.hasLoaded= false
		this.chapter= {}
		this.book= {}
		this.catalog= []
	},
	computed: {
		loadTxt() {
			return this.count ? `${this.count} / ${this.len}` : '下载'
		},
		...mapGetters(['books', 'currentBook'])
	},
	methods: {
		downBook() {
			let id=this.books[0].fiction_id;
			if(!this.books[0].catalog) {
				this._getCatalog(id);
			}
			// 这里有问题
			if(this.books[0].chapters&&this.books[0].chapters.length) {
				this.hasLoaded=true;
				this.bottomTipShow()
				return;
			}
			this.hasLoaded=false;
			this._getDownBook(id);
			
		},
		bottomTipShow() {
			this.$refs.bottomTip.show()
		},
		hideBottomTip() {
			this.$refs.bottomTip.hide()
		},
		
		
		_findIndex() {
			return this.books[0].chapters.findIndex(item=>{
				return item.c===item.chapter_id;
			})
		},
		parseCurrentChapter(book) {
			book.getChapter().then(res=>{
				//console.log(res)
				this.chapter=JSON.parse(res);
			})
		},
		_getCatalog(id) {
			if(this.book.catalog) return;
			getCatalog(id).then(res=>{
				if(res.result===ERR_OK) {
					this.book.catalog=res.item.toc;
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		_getDownBook(fiction_id, chapter_id) {
			getDownBook(fiction_id, chapter_id).then(res=>{
				if(res.result===ERR_OK) {
					this.len=res.data.length;
					this.book.fiction_id=fiction_id;
					this.book.chapter_id=chapter_id;
					this._ajaxDownBook(res.data)
				}
			}).catch(err => {
				console.log(err);
			})
		},
		_ajaxDownBook(list) {
			this.count=0;
			list.forEach((item)=> {
				this._loopAjax(item)
			})
		},
		_loopAjax(item) {
			if(this.count>=this.len) {
				//加入弹框；
				if(!this.book.chapters) {
					this.book.chapters=[];
					let res=this.book.chapters.concat(this.currentBookContent);
					this.book.chapters=this._uniqueSortArray(res)
				}
				else{
					let res=this.book.chapters.concat(this.currentBookContent);
					this.book.chapters=this._uniqueSortArray(res)
				}
				
				let book=CreateBook(this.book);
				//提交commit book;
				this.savedBookList(book)
				this.parseCurrentChapter(book)
				if(this.len>1) {
					this.bottomTipShow()
				}
				else {
					if( this.$route.path!=='/read' ) this.$router.push('/read')
				}
				this.currentBookContent=[];
				this.count=0;
				this.len=0;
				return;
			}
			let url=item.url;
			ajaxDownBook(url, {name: 'duokan_fiction_chapter'}).then(res=>{
				this.count++;
				//存储数据；
				item.res=res;
				this.currentBookContent.push(item)
				this._loopAjax(url)
			}).catch(err=>{
				this.count++;
				console.log(err)
			})
		},
		_uniqueSortArray(arr) {
			return uniqueArray(arr).sort((a, b)=>{
					return a.c - b.c;
				})
		},
		...mapActions(['savedBookList'])
	}
}
