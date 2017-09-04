<template>
<div class="favorite">
	<h3>{{title}}</h3>
	<div class="favorite-con">
		<div class="favorite-list-wrap" v-if="list.length">
			<book-list :bookList="currentList"></book-list>
		</div>
		<more @switchList="switchIndexRange(3, list)" @selectChannel="selectChannel(more)" :more="more"></more>
		
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import BookList from "components/book-list/book-list";
import More from "components/more/more";
import { switchRangeMixin } from "common/js/mixin";
const RANGE_INDEX=3
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
	}
},
watch : {
	list() {
		this.currentList=this.list.slice(0,3)
	}
},
methods: {
	selectChannel(more) {
		this.$emit('selectChannel', more)
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
.favorite {
	border-bottom: 8px solid $color-background-d;
	> h3 {
		height: 44px;
		line-height: 44px;
		text-indent: 15px;
		font-size: $font-size-medium;
		font-weight: bold;
		color: $color-text-ll;
		@include border-1px($color-background-d)
	}
	.favorite-con {
		.favorite-list-wrap {
			overflow: hidden;
		}
		ul {
			
		}
		
	}
	
}

</style>