<template>
<!-- <transition name="slide" transition-mode="out-in"> -->
<ul class="rank-list">
	<li class="item" v-for="(item, index) in list">
		<figure>
			<img v-lazy="item.cover">
		</figure>
		<div class="favorite-text">
			<h4>{{item.title}}</h4>
			<p class="text">{{item.authors}}</p>
			<p class="text">{{ item.summary }}</p>
			<p class="tag">
				<span>{{ rankTitle(item.ex) }}</span>
			</p>
		</div>
	</li>
</ul>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	list: {
		type: Array,
		default: null
	},
	type: {
		type: Number,
		default: 0
	}
},
methods: {
	wordCount(count) {
		if(count>10000) {
			return ((count / 10000) | 0) 
		}
		else {
			return count ;
		}
		
	},
	rankTitle(num) {
		let count=this.wordCount(num);
		let str=!this.type ? `本周${count}W人在读` : this.type===1 ? `本月${count}W人在读` : `共有${count}W人读过`
		return str;
	}
}	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.rank-list {
	.item {
		display: flex;
		align-items: center;
		padding: 10px 15px;
		@include border-1px($color-background-d)
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
					color: $color-theme;
					border-radius: 2px;
					padding: 2px;
					font-size: $font-size-small;
					margin-right: 4px;
					line-height: 1em;
				}
			}
		}
	}
}
</style>