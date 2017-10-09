<template>
<transition name="slide" transition-mode="out-in">
<div class="category-detail-wrap">
	<head-title :title="currentCategory.label"></head-title>
	<scroll class="category-detail" :data="bookList" :pullUp="pullUp" @scrollEnd="loadMore">
		<div>
			<category-tag :tags="tags" :currentTag="currentTag" :currentState="currentState" @selectTag="selectTag" @selectState="selectState"></category-tag>
			<book-list :bookList="bookList" @selectBook="selectBook"></book-list>
			<loading v-show="hasMore"></loading>
			<div class="result-wrap">
				<no-result v-show="!hasMore && !bookList.length" title="小编努力种菜中~·"></no-result>
			</div>
		</div>
	</scroll>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import NoResult from "base/no-result/no-result";
import HeadTitle from "components/title/title";
import CategoryTag from "components/category-tag/category-tag";
import BookList from "components/book-list/book-list";
import Loading from "base/loading/loading";
import {selectCurrentBook} from "common/js/mixin";
import {ERR_OK} from "api/config";
import {mapGetters} from "vuex";
import {getCategoryDetail} from "api/bookstore";
export default {
mixins: [selectCurrentBook],
data() {
	return {
		bookList: [],
		start: 0,
		hasMore: true,
		currentTag: 0,
		currentState: 0,
		name: "click",
		pullUp: true

	}
},
created() {
	this._initedCategoryDetail()
},
computed: {
	tags() {
		let arr=[]
		let {category_id, label, fiction_count}=this.currentCategory
		arr.push({category_id, label, fiction_count})
		return arr.concat(this.currentCategory.children)
	},
	...mapGetters([
		'currentCategory'
	])	
},
watch: {
	currentTag(newVal, oldVal) {
		if(newVal===oldVal) {
			return;
		}
		this.start=0;
		this.bookList=[]
		this._ajaxData()
	},
	currentState(newVal, oldVal) {
		if(newVal===oldVal) {
			return;
		}
		this.start=0;
		this.bookList=[]
		this._ajaxData()
	}
},
methods: {
	selectTag(item, index) {
		this.category_id=item.category_id;
		this.currentTag=index;
	},
	selectState(item, index) {
		this.name=item.name
		this.currentState=index;
	},
	loadMore() {
		if(!this.hasMore) {
			return;
		}
		this.start+=10;
		this._ajaxData();
	},
	_initedCategoryDetail() {
		if(!this.currentCategory.category_id) {
			this.$router.push('/category')
			return;
		}
		this._ajaxData();
		
	},
	_ajaxData() {
		let id=this.tags[this.currentTag].category_id
		getCategoryDetail(id, this.start, this.name).then(res=>{
			if(res.result===ERR_OK) {
				this.bookList=this.bookList.concat(res.items);
				this.hasMore=res.more;
			}
		}).catch(err=>{
			console.log(err)
		})
	}
},
components: {
	Scroll,
	HeadTitle,
	CategoryTag,
	BookList,
	Loading,
	NoResult

}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.category-detail-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.category-detail {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		.result-wrap {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
			background-color: $color-background;
		}
	}
}
</style>