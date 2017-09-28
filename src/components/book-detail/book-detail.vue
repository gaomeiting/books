<template>
<transition name="slide" mode="out-in">
<div class="book-detail-wrap">
	<head-title :title="currentBook.title"></head-title>
	<scroll :data="bookDetails" class="book-detail" ref="scroll">
		<div>
			<div class="comment-wrap">
				<div class="comment">
					<figure>
						<img v-lazy="currentBook.cover">
					</figure>
					<div class="text-wrap">
						<h3>{{currentBook.title}}</h3>
						<p>{{ currentBook.authors }}</p>
						<p>
							<i class="iconfont" v-for="item in starCls" :class="item"></i>
							<strong>{{ currentBook.score_count }}个评价</strong>
						</p>
						<p>价格：{{currentBook.price}}书币/千字</p>
						<p>字数：{{wordCount(currentBook.word_count)}}
							<span>{{ !currentBook.finish ? "连载中" : "完结"}}</span>
						</p>
					</div>
				</div>
				<div class="btn-wrap">
					<a href="javascript:;" class="btn" @click.stop="goRead">开始阅读</a>
					<a href="javascript:;" class="btn" @click.stop="downBook">{{ loadTxt }}</a>
				</div>
				<p class="introduce ellipsis" @click.stop="hasEllipsis($event)">
					 {{ content }} 
				</p>
				<div class="see-more-wrap">
					<see-more :more="more" @seeMore="seeMore"></see-more>
				</div>
			</div>
			<div class="tags-wrap">
				<h3>类别标签</h3>
				<p>
					<span v-for="tag in currentBook.tags">{{tag}}</span>
				</p>
			</div>
			<div class="author-books-wrap" v-if="list.length">
				<h4>作者其它图书</h4>
				<week-list :list="list"></week-list>
				<div class="see-more-wrap" v-if="totalBooks.length > 3">
					<see-more more="查看全部" @seeMore="seeMore"></see-more>
				</div>
			</div>
			<div class="books-footer">
				<h3>图书信息</h3>
				<p>版权：{{currentBook.rights}}</p>
			</div>
		</div>
	</scroll>
	<bottom-tip ref="bottomTip">
		<div class="tip-wrap">
			<h3 v-if="!hasLoaded">下载完成</h3>
			<p>{{ hasLoaded ? '您已下载过本书无需重复下载' : '已下载所有可读章节,没网也能读啦~~' }}</p>
			<a href="javascript:;" class="btn" @click.stop="hideBottomTip">确定</a>
		</div>
	</bottom-tip>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
import HeadTitle from "components/title/title";
import Scroll from "base/scroll/scroll";
import SeeMore from "components/see-more/see-more";
import WeekList from "components/week-list/week-list";
import BottomTip from "base/bottom-tip/bottom-tip";
import {getBookDetail, startReadUrl } from "api/bookstore";
import {ERR_OK} from "api/config";
import {bookContentMixin} from "common/js/mixin";
import {mapGetters} from "vuex";
import {formatDate} from "common/js/data";
export default {
mixins: [bookContentMixin],
data() {
	return {
		content: "",
		totalBooks: 0,
		list: [],
		showCount: false
	}
},
activated() {
	if(!this.currentBook.fiction_id) {
		this.$router.back();
		return;
	}
	this._initedBookDetail(this.currentBook.fiction_id);
	this.url='';
	
},
computed: {
	more() {
		let time=formatDate(new Date(this.currentBook.updated*1000), "yyyy-MM-dd hh:mm")
		return '最新：'+ this.currentBook.latest + ' 更新于 '+time
	},
	starCls() {
		let ret=[];
		let score=Math.round(this.currentBook.score) / 2;
		let num=(score | 0);
		for(let i=0; i<5; i++) {
			ret.push('icon-pingfen')
			if(i<num) {
				ret[i]=ret[i]+' icon'
			}
		}
		if(score % 1) {
			let decimal=score % 1 > 5 ? 'icon-pingfen' : 'icon-pingfen-ban';
			ret[num]=decimal;
			ret[num]=ret[num]+' icon';
		}
		return ret;
	},
	bookDetails() {
		let book=[];
		book.push(this.content)
		return book.concat(this.list);
	}
},

methods: {
	seeMore() {},
	wordCount(count) {
		if(count>10000) {
			return ((count / 10000) | 0) + '万字'
		}
		else {
			return count + '字';
		}
		
	},
	hasEllipsis(ev) {
		let el=ev.target
		if(el.classList.contains('ellipsis')) {
			el.classList.remove('ellipsis')
		}
		else{
			el.classList.add('ellipsis')
		}
	},
	goRead() {
		this.$router.push('/read')
	},
	
	
	_initedBookDetail(id) {
		getBookDetail(id).then(res=>{
			if(res.result===ERR_OK) {
				this.content=res.item.content
				this.list=res.author_books;
				this.totalBooks=res.item.author_books_total
			}

		}).catch(err=>{
			console.log(err)
		})
	}
},
components: {
	HeadTitle,
	Scroll,
	SeeMore,
	WeekList,
	BottomTip
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.book-detail-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: $color-background;	
	.book-detail {
		position: fixed;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		
		.comment-wrap {
			border-bottom: 8px solid $color-background-d;
			font-size: $font-size-medium;
			color: $color-text-l;
			line-height: 1.5;
			padding-top: 10px;
			.comment {
				display: flex;
				align-items: center;
				padding: 0 15px 20px;
				figure {
					flex: 0 0 31%;
					@include placeholder(31%, 133.3300%);
					box-shadow: none;
				}
				.text-wrap {
					flex: 1;
					padding-left: 12px;
					h3 {
						font-size: $font-size-medium-x;
						color: $color-text-ll;
						line-height: 1.5;
					}
					p {
						&:first-of-type {
							color: $color-theme;
						}
						strong {

						}
						span {
							border: 1px solid $color-sub-theme;
							border-radius: 3px;
							font-size: $font-size-small-s;
							padding: 1px;
							color: $color-sub-theme;
						}
						i {
							color: $color-background-d;
							&.icon {
								color: $color-theme-d;
							}
						}
					}
				}
			}
			.btn-wrap {
				display: flex;
				padding: 0 15px 20px;
				justify-content: space-between;
				.btn {
					flex: 0 0 48.5%;
					width: 48.5%;
					text-align: center;
					height: 40px;
					line-height: 40px;
					background-color: $color-theme;
					color: $color-background;
					border-radius: 4px;
					border: 1px solid $color-theme;
					&:last-of-type {
						background-color: $color-background;
						color: $color-text-ll;
						border: 1px solid $color-highlight-background;
					}
				}
			}
			.introduce {
				padding: 0 15px;
				&.ellipsis {
					@include ellipsis(2);
				}
			}
			
		}
		.tags-wrap {
			padding: 0 15px;
			border-bottom: 8px solid $color-background-d;
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
		.books-footer {
			padding: 10px 15px;
			font-size: $font-size-medium-x;
			color: $color-text-d;
			line-height: 1.5;	
			
		} 
		.author-books-wrap {
			h4 {
				padding: 10px 15px;
				font-size: $font-size-medium-x;
				color: $color-text-d;
				line-height: 1.5;	
			}
		}
		.see-more-wrap {
			margin-top: 10px;
			@include border-top-1px($color-background-d);
		}

	}
	.tip-wrap {
		text-align: center;
		padding-top: 10px;
		h3 {
			font-size: $font-size-medium-x;
			color: $color-text;
			font-weight: bold;
			line-height: 3;
		}
		p {
			font-size: $font-size-medium;
			color: $color-text-d;
			line-height: 1.5;
			padding-bottom: 20px;
		}
		.btn {
			display: block;
			width: 100%;
			height: 44px;
			line-height: 44px;
			background-color: $color-sub-theme;
			color: $color-background;
		}
	}
}
</style>