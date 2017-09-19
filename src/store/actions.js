import * as types from "./mutation-types";
import {loadCategory, savedCategory} from "common/js/catch";
export const savedCategoryData=function({commit}, {hash, female, male}) {
	let category=loadCategory();
	if(hash!=category.hash) {
		category=savedCategory(hash, female, male)
	}
	commit(types.SET_CATEGORY,category)
}
export const savedCurrentRead=function({commit, state}) {
	let currentBook=state.currentBook;
	let fiction_id=state.currentBook.fiction_id;
	//chapter_id 从缓存中拿到；
	let chapter_id=0;
	let ret={
		fiction_id,
		chapter_id
	};
	commit(types.SET_CURRENT_READ, ret)
}
export const savedCurrentBookData=function({commit, state}, arr) {
	let currentRead=state.currentRead;
	if(currentRead.data && currentRead.data.length)  return;
	let ret=Object.assign({},currentRead, {data: arr});
	commit(types.SET_CURRENT_READ, ret)
}
export const savedCurrentBookCatalog=function({commit, state}, arr) {
	let currentRead=state.currentRead;
	if(currentRead.catalog && currentRead.catalog.length)  return;
	let ret=Object.assign({},currentRead, {catalog: arr});
	commit(types.SET_CURRENT_READ, ret)
}