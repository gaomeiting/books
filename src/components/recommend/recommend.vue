<template>
<div class="recommend">
	<h3>
		 <span>{{title}} </span>
		 <strong :class="{'active': currentIndex==1}" @click.stop="switchChannel(1)">男&nbsp;&nbsp;</strong>
		 <strong>|</strong>
		 <strong :class="{'active': currentIndex==2}" @click.stop="switchChannel(2)">&nbsp;&nbsp;女</strong>
	</h3>
	<div class="favorite-con">
		<div class="favorite-list-wrap" v-if="list.length">
			<book-list :bookList="currentList.slice(0,1)"></book-list>
			<ol>
				<li v-for="(item, index) in currentList.slice(1)">
					<span>0{{index+2}}</span>
					<strong>{{item.title}}</strong>
					<small>{{item.authors}}</small>
				</li>
			</ol>
		</div>
		<more @switchList="switchIndexRange(5, sortList)" :more="more"></more>
		
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import BookList from "components/book-list/book-list";
import More from "components/more/more";
import { switchRangeMixin } from "common/js/mixin";
export default {
mixins: [switchRangeMixin],
props: {
	title: {
		type: String,
		default: '本周最火'
	},
	list : {
		type: Array,
		default: null
	},
	more: {
		type: String,
		default: '女生频道'
	}
},
data() {
	return {
		currentIndex: 1
	}
},
computed: {
	
},
watch : {
	list(newList) {
		this._initList(newList)
	},
	currentIndex(newVal, oldVal) {
		if(newVal===oldVal) return;
		this._initList(this.list)
	}
},
methods: {
	switchChannel(index) {
		this.currentIndex=index;
		let ret=this._sortChannel(this.list)
		this.currentList=ret;
	},
	_initList(list) {
		this.minIndex=0;
		this.sortList=this._sortChannel(list)
		this.currentList=this.sortList.slice(0,5)
	},
	_sortChannel(data) {
		let ret=[]
		let index=this.currentIndex;
		data.forEach(item => {
			if(item.channel[0]==index) {
				ret.push(item)
			}
		})
		return ret;
	}
},
components: {
	BookList,
	More
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.recommend {
	border-bottom: 8px solid $color-background-d;
	> h3 {
		display: flex;
		height: 44px;
		line-height: 44px;
		font-size: $font-size-medium;
		font-weight: bold;
		color: $color-text-ll;
		padding: 0 15px;
		@include border-1px($color-background-d)
		span {
			flex: 1;
		}
		strong {
			@include extend-click();
		}
		.active {
			color: $color-theme;
		}
	}
	.favorite-con {
		.favorite-list-wrap {
			padding: 0 10px;
		}
		ol {
			li {
				display: flex;
				font-size: $font-size-medium;
				color: $color-text-ll;
				height: 40px;
				line-height: 40px;
				@include border-1px($color-background-d);
				span {
					color: $color-theme-d;
					padding-right: 8px;
				}
				strong {
					flex: 1;

				}
				small {

				}
			}
		}
		
	}
	
}

</style>