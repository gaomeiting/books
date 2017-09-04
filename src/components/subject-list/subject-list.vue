<template>
<ul class="subject-list">
	<li class="item" v-for="(item, index) in list" @click.stop="linkSubjectDetail(item)" :key="item.id">
		<h4>{{item.name}}</h4>
		<p> {{item.desc}} </p>
		<figure>
			<img v-lazy="item.url">
		</figure>
	</li>
</ul>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	list: {
		type: Array,
		default: null
	}
},
methods: {
	linkSubjectDetail(item) {
		this.$emit('linkSubjectDetail', item)
	}
}	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.subject-list {
	.item {
		display: flex;
		flex-direction: column;
		padding: 10px 15px;
		@include border-1px($color-background-d);
		&:last-of-type{
			@include border-1px($color-background);
		}
		>h4 {
			font-size: $font-size-medium-x;
			color: $color-text-ll;
			line-height: 2;
			@include no-wrap();
		}
		>p {
			font-size: $font-size-medium;
			color: $color-text-l;
			line-height: 1.5;
			@include ellipsis(3)
		}
		>figure {
			@include placeholder(100%, 35.93%);
			box-shadow: none;
			margin-top: 6px;

		}

	}
}
</style>