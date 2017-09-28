import * as types from "./mutation-types";
import {loadCategory, savedCategory, savedBooks, savedBook} from "common/js/catch";
export const savedCategoryData=function({commit}, {hash, female, male}) {
	let category=loadCategory();
	if(hash!=category.hash) {
		category=savedCategory(hash, female, male)
	}
	commit(types.SET_CATEGORY,category)
}

export const savedBookList=function({commit, state}, book) {
	let books=savedBooks(book);
	commit(types.SET_BOOKS, books)
}

