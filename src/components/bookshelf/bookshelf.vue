<template>
<transition name="fade" mode="out-in">
<div class="bookshelf">
	<div class="search-wrap">
		<search-box placeholder="请输入书名/作者/关键字"></search-box>
		<i class="iconfont icon-caidan1" @click.stop="offList"></i>
	</div>
	<div class="bookshelf-con-wrap" v-show="load">
		<scroll class="bookshelf-con" :data="items" ref="scroll">
			<div>
				<book-list :bookList="items" v-if="off" @selectBook="selectBook"></book-list>
				<week-list :list="items" @selectBook="selectBook" v-else></week-list>
			</div>
		</scroll>
	</div>
	<div class="load-wrap" v-show="!load">
		<loading></loading>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import SearchBox from "base/search-box/search-box";
import Loading from "base/loading/loading";
import Scroll from "base/scroll/scroll";
import BookList from "components/book-list/book-list";
import WeekList from "components/week-list/week-list";
import {getBookshelfByIds} from "api/bookstore";
import {ERR_OK} from "api/config";
import {selectCurrentBook} from "common/js/mixin";
import {mapGetters} from "vuex";
export default {
	mixins: [selectCurrentBook],
	data() {
		return {
			load: false,
			items: [],
			off: true
		}
	},
	activated() {
		let ids=this.bookList.join(",")
		getBookshelfByIds(ids).then(res=>{
			if(res.result===ERR_OK) {
				this.items=res.items
				this.load=true
			}
		}).catch(err=>{
			console.log(err)
		})
	},
	computed: {
		bookList() {
			let ids=[];
			this.books.forEach(item=>{
				ids.push(item.fiction_id)
			})
			return ids;
		},
		...mapGetters(['books'])
	},
	methods: {
		offList() {
			this.off=!this.off
			this.$nextTick(()=>{
				this.$refs.scroll.refresh()
				this.$refs.scroll.scrollTo(0,0,0);
			})
		}
	},
 	components: {
		SearchBox,
		Loading,
		Scroll,
		BookList,
		WeekList
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
.bookshelf {
	position: fixed;
	top: 46px;
	bottom: 0;
	left: 0;
	right: 0;
	.search-wrap {
		position: fixed;
		top: 46px;
		left: 15px;
		right: 15px;
		padding: 15px; 
		display: flex;
		align-items: center;
		i {
			padding-left: 8px;
		}
	}
	.bookshelf-con-wrap, .result-wrap {
		position: fixed;
		top: 110px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.bookshelf-con {
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