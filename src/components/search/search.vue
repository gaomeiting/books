<template>
<transition name="slide" mode="out-in">
<div class="search">
	<div class="search-wrap">
		<search-box placeholder="请输入书名/作者/关键字" @queryChange="queryChange" ref="searchBox"></search-box>
	</div>
	<div class="search-con-wrap">
		<scroll class="search-con" :data="items" ref="scroll" :beforeScroll="beforeScroll" @beforeScrollStart="beforeScrollStart" :pullUp="pullUp" @scrollEnd="loadMore">
			<div>
				<div class="book-tags-wrap" v-if="tags.length>0 && !query">
					<book-tags :tags="tags" @selectTag="searchTag"></book-tags>
				</div>
				<book-list :bookList="items" @selectBook="selectBook" v-else></book-list>
				<loading v-show="more && load"></loading>
			</div>
		</scroll>
	</div>
	<div class="result-wrap" v-if="!items.length && query && load">
		<no-result title="空空如也~看下其他书籍吧~"></no-result>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import SearchBox from "base/search-box/search-box";
import Loading from "base/loading/loading";
import Scroll from "base/scroll/scroll";
import NoResult from "base/no-result/no-result";
import BookList from "components/book-list/book-list";
import WeekList from "components/week-list/week-list";
import BookTags from "components/book-tags/book-tags";
import {getSearchByKeys, getSearchTags} from "api/bookstore";
import {selectCurrentBook, searchMixin} from "common/js/mixin";
import {ERR_OK} from "api/config";
export default {
	mixins: [selectCurrentBook, searchMixin],
	data() {
		return {
			
			noResult: false,
			tags: [],
			query: '',
			beforeScroll: true,
			pullUp: true

		}
	},
	activated() {
		this._getSearchTags()
	},
	watch: {
		query(newVal, oldVal) {
			if(newVal!==oldVal) {
				this.start=0;
				this.items=[];
			}
		}
	},
	methods: {
		offList() {
			this.off=!this.off
			this.$nextTick(()=>{
				this.$refs.scroll.refresh()
				this.$refs.scroll.scrollTo(0,0,0);
			})
		},
		
		searchTag(tag) {
			this.$refs.searchBox.setQuery(tag);
		},
		beforeScrollStart() {
			this.$refs.searchBox.blur()
		}, 
		loadMore() {
			if(!this.more) return;
			this.start+=10;
			this.load=true;
			this.queryChange(this.query)
		},
		_normalData(arr) {
			let ret=[];
			arr.forEach(item=>{
				if(!isNaN(item.source_id)) {
					item.summary=item.intro
					item.authors=item.role[0][1]
					item.fiction_id=item.source_id;
					ret.push(item);
				}
			})
			return ret;
		},
		_getSearchTags() {
			getSearchTags().then(res=>{
				if(res.code===ERR_OK) {
					this.tags=this._normalTags(res.ads)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		_normalTags(tags) {
			let res=[]
			tags.forEach(tag=>{
				res.push(tag.ad_name)
			})
			return res;
		}
	},
 	components: {
		SearchBox,
		Loading,
		Scroll,
		BookList,
		WeekList,
		NoResult,
		BookTags
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
.search {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: $color-background;
	.search-wrap {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 15px; 
		display: flex;
		align-items: center;
		i {
			padding-left: 8px;
		}
	}
	.search-con-wrap, .result-wrap {
		position: fixed;
		top: 66px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.book-tags-wrap {
		padding: 0 15px;
	}
	.result-wrap {
		top: 50%;
		transform: translate3d(0, -40%, 0);
	}
	.search-con {
		width: 100%;
		height: 100%;
	}
	.load-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%,0);
		display: flex;
	}	
}

</style>