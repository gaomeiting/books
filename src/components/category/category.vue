<template>
<transition name="fade">
<div class="category-wrap">
	<head-title title="分类"></head-title>
	<scroll :data="categorylist" class="category">
		<div>
		<hot-title title="男生小说"></hot-title>
		<category-list :list="category.male" @selectCategory="selectCategory"></category-list>
		<hot-title title="女生小说"></hot-title>
		<category-list :list="category.female" @selectCategory="selectCategory"></category-list>
		</div>
	</scroll>
	<router-view></router-view>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import CategoryList from "components/category-list/category-list";
import HotTitle from "components/hot-title/hot-title";
import {ERR_OK} from "api/config";
import {getCategory} from "api/bookstore";
import HeadTitle from "components/title/title";
import {mapGetters, mapMutations, mapActions} from "vuex";
export default {
data() {
	return {
		list: []
	}
},
created() {
	this._initedCategory();
},
computed: {
	categorylist() {
		return this.category.female.concat(this.category.male)
	},
	...mapGetters(['category'])
},
methods: {
	_initedCategory() {
		let url=this.category.hash ? `hs/v0/android/store/category?hash=${this.category.hash}` : 'hs/v0/android/store/category';
		getCategory(url).then(res=>{
			let { hash, female, male }=res;
			this.savedCategoryData({hash, female, male})
		}).catch(err=>{
			console.log(err)
		})
	},
	selectCategory(item) {
		this.setCurrentCategory(item)
		this.$router.push(`/category/${item.category_id}`);
	},
	...mapActions(['savedCategoryData']),
	...mapMutations({
		'setCurrentCategory' : 'SET_CURRENT_CATEGORY'
	})
},
components: {
	Scroll,
	CategoryList,
	HeadTitle,
	HotTitle
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.category-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.category {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
}
</style>