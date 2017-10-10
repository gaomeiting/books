<template>
<div class="tags-wrap">
	<h3 v-if="title">{{title}}</h3>
	<p>
		<span v-for="tag in tags">{{tag}}</span>
	</p> 
</div>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	tags: {
		type: Array,
		default: null
	},
	title: {
		type: String,
		default: ''
	}
}	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.tags-wrap {
	h3 {
		font-size: $font-size-medium-x;
		line-height: 1.5;
		padding-top: 15px;
		font-weight: bold;
		color: $color-text-l;
	}
	p {
		font-size: $font-size-medium;
		color: $color-text-l;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20px;
		span {
			padding: 4px 16px;
			border: 1px solid $color-background-d;
			border-radius: 4px;
			margin-right: 6px;
			margin-top: 10px;
			&:nth-of-type(3n+1) {
				background-color: #fbebe8;
			}
			&:nth-of-type(3n+2) {
				background-color: #fcedda;
			}
			&:nth-of-type(3n) {
				background-color: #e8f9db;
			}
		}
	}
}
</style>