<template>
<transition name="slideLeft" mode="out-in">
<div class="book-catalog-wrap">
	<head-title></head-title>
	<scroll :data="currentRead.catalog" class="book-catalog">
		<ul>
			<li v-for="item in currentRead.catalog" :class="{'active' : item.chapter_id===currentRead.chapter_id}" :key="item.html_sha1">
				<span>{{item.title}}</span>
				<strong :class="{'active' : item.chapter_id===currentRead.chapter_id}" v-if="item.free">免费</strong>
			</li>
		</ul>
	</scroll>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import HeadTitle from "components/title/title";
import Scroll from "base/scroll/scroll";
import {mapGetters} from "vuex";
export default {
props: {
},
computed: {
	...mapGetters(['currentRead'])
},
methods: {
		
},
components: {
	HeadTitle,
	Scroll
}	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.book-catalog-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.book-catalog {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		li {
			display: flex;
			padding: 12px 14px;
			@include border-1px($color-background-d);
			&:last-of-type {
				@include border-1px($color-background);
			}
			&.active {
				color: $color-theme;
			}
			span {
				flex: 1;
				@include no-wrap();
			}
			strong {
				text-align: right;
				color: $color-sub-theme;
				&.active {
					color: $color-theme;
				}
			}
		}
	}
}
</style>