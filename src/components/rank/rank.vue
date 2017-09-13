<template>
<transition name="slide" mode="out-in">
<div class="rank-wrap">
	<head-title title=""></head-title>
	<scroll :data="list" class="rank">
		<div>
			<ul>
				<li v-for="item in list" :key="item.id" @click.stop="linkRankDetail(item)">
					<figure>
					 	<img  v-lazy="item.cover">
					 </figure>
					<ol>
						<li v-for="(name, index) in item.descriptions">{{index+1}}.{{name}}</li>
					</ol>
				</li>
			</ul>
		</div>
	</scroll>
	<router-view></router-view>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import HeadTitle from "components/title/title";
import Scroll from "base/scroll/scroll";
import {getRank} from "api/bookstore";
import {ERR_OK} from "api/config";
import {mapMutations} from "vuex";
export default {
data() {
	return {
		list: []
	}
},
created() {
	this._initedRank()
},
methods: {
	linkRankDetail(item) {
		let ids=item.ranks.split(",");
		let rank=ids.concat(item.name)
		this.setRank(rank)
		this.$router.push(`/rank/${ids[1]}`)
	},
	_initedRank() {
		getRank().then(res=>{
			if(res.result===ERR_OK) {
				this.list=this._normalRank(res.items)
			}
		}).catch(err=>{
			console.log(err)
		})
	},
	_normalRank(list) {
		let ret=[];
		list.forEach(item=>{
			item.descriptions=this._splitStr(item.description)
		})
		ret=list.splice(18)
		return ret;
	},
	_splitStr(str) {
		let arr=[]
		arr=str.split("\n");
		return arr;
	},
	...mapMutations({
		setRank: 'SET_RANK'
	})
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
.rank-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.rank {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		ul {
			>li {
				padding: 10px 15px;
				display: flex;
				align-items: center;
				@include border-1px($color-background-d);
				>figure {
					flex: 0 0 90px;
					width: 90px;
					height: 90px;
					overflow: hidden;
					img {
						width: 100%;
						min-height: 100%;
					}
				}
				>ol {
					list-style: none;
					>li {
						padding-left: 14px;
						font-size: $font-size-medium;
						color: $color-text-ll;
						line-height: 2;
					}
				}
			}
		}
	}
}
</style>