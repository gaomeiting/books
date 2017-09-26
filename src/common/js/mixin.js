import {  getDownBook, ajaxDownBook, getCatalog } from "api/bookstore";
import { Base64 } from "js-base64";
import { mapGetters, mapActions } from "vuex";
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
			chapter: {}
			
		}
	},
	computed: {
		loadTxt() {
			return this.count ? `${this.count} / ${this.len}` : '下载'
		},
		...mapGetters(['currentRead', 'currentRead'])
	},
	methods: {
		downBook() {
			let id=this.currentRead.fiction_id;
			console.log(this.currentRead.fiction_id)
			if(!this.currentRead.catalog) {
				this._getCatalog(id);
			}
			if(this.currentRead.data&&this.currentRead.data.length) {
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
		startRead() {
			//获取目录
			let fiction_id=this.currentRead.fiction_id;
			let index=this.currentRead.chapter_id;
			if(!this.currentRead.catalog) {
				this._getCatalog(fiction_id);
			}
			
			if(this.currentRead.data && this._findIndex() !== -1) {
				console.log("从数据中读取")
				this.parseCurrentChapter()
			}
			else {
				console.log("重新发送请求中读取")
				let chapter_id=this.currentRead.chapter_id;
				this._getDownBook(fiction_id, chapter_id);
			}

			/*if( this.$route.path!=='/read' )  this.$router.push('/read')*/
		},
		parseCurrentChapter() {
			let index=this._findIndex();
			if(index===-1) {
				console.log("章节获取失败！")
			}
			console.log(index, 'chapter')
			this.chapter=JSON.parse(Base64.decode(this.currentRead.data[index].res))
		},
		_findIndex() {
			let data=this.currentRead.data;
			console.log(data[0].c)
			return data.findIndex((item)=>{
				return item.c===this.currentRead.chapter_id;
			})
		},
		_getCatalog(id) {
			if(this.currentRead.catelog) return;
			getCatalog(id).then(res=>{
				if(res.result===ERR_OK) {
					this.savedCurrentBookCatalog(res.item.toc);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		_getDownBook(fiction_id, chapter_id) {
			getDownBook(fiction_id, chapter_id).then(res=>{
				if(res.result===ERR_OK) {
					this.len=res.data.length;
					this.savedCurrentBookMultiLink(res.data)
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
				this.savedCurrentBookData(this.currentBookContent)
				this.parseCurrentChapter()
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
		...mapActions(['savedCurrentBookData', 'savedCurrentBookCatalog', 'savedCurrentBookChapterId', 'savedCurrentBookMultiLink'])
	}
}
