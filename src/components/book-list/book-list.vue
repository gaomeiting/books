<template>
<ul class="book-list">
	<li class="item" v-for="(item, index) in bookList" @click.stop="selectBook(item)">
		<figure>
			<img v-lazy="item.cover">
		</figure>
		<div class="favorite-text">
			<h4>{{item.title}}</h4>
			<p class="text">{{item.authors}}</p>
			<p class="text">{{ item.summary }}</p>
			<p class="tag">
				<span v-for="(tag,index) in item.tags" v-if="index<2">{{tag}}</span>
				<span>{{ wordCount(item.word_count) }}</span>
			</p>
		</div>
	</li>
</ul>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	bookList: {
		type: Array,
		default: null
	}
},
methods: {
	selectBook(item) {
		this.$emit('selectBook', item)
	},
	wordCount(count) {
		if(count>10000) {
			return ((count / 10000) | 0) + '万字'
		}
		else {
			return count + '字';
		}
		
	}
}	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.book-list {
	.item {
		display: flex;
		align-items: center;
		padding: 10px 15px;
		@include border-1px($color-background-d);
		&:last-of-type {
			@include border-1px($color-background)
		}
		figure {
			flex: 0 0 31%;
			@include placeholder(31%, 133.3300%);
			box-shadow: none;
		}
		.favorite-text {
			flex: 1;
			font-size: $font-size-small;
			line-height: 1.5;
			padding-left: 10px;
			h4 {
				font-size: $font-size-medium-x;
				padding-bottom: 6px;
			}
			> .text {
				color: $color-text-l;
				@include ellipsis(2);
				&:first-of-type {
					font-size: $font-size-medium;
				}
				&:nth-of-type(2) {
					margin: 6px 0 12px;
				}
			}
			.tag {
				display: flex;
				>span {
					color: $color-sub-theme;
					border: 1px solid $color-sub-theme;
					border-radius: 2px;
					padding: 2px;
					font-size: $font-size-small-s;
					margin-right: 4px;
					line-height: 1em;
				}
			}
		}
	}
}
</style>