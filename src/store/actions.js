import * as types from "./mutation-types";
import {loadCategory, savedCategory} from "common/js/catch";
export const savedCategoryData=function({commit}, {hash, female, male}) {
	let category=loadCategory();
	if(hash!=category.hash) {
		category=savedCategory(hash, female, male)
	}
	commit(types.SET_CATEGORY,category)
}
export const savedCurrentBookData=function({commit, state}, arr) {
	let currentBook=state.currentBook;
	if(currentBook.data && currentBook.data.length)  return;
	let ret=Object.assign({},currentBook, {data: arr});
	commit(types.SET_CURRENT_BOOK, ret)
}