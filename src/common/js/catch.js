import storage from "good-storage";
const CATEGORY_KEY='__category__';
const CATEGORY_HASH_KEY='__category_hash__';
const BOOKS_KEY='__books__';
const BOOK_KEY='__book__';
const MAX_LEN=50;
function insertArray(arr, item, compare, maxLen) {
	let index=arr.findIndex(compare)
	if(index !== -1) {
		arr.splice(index, 1)
	}
	arr.unshift(item)
	if(maxLen && arr.length > maxLen) {
		arr.pop()
	}
	return arr;
}
export function uniqueArray(arr) {
	let res = arr.slice();
	let ret = [];
	let json = {};
	 for(let i = 0; i < res.length; i++){
	 	let key=res[i]['c'] ?res[i]['c'] : res[i];
		if(!json[key]){
			ret.push(res[i]);
			json[key] = 1;
		}
	 }
	 return ret;
}
export function savedCategory(hash, arr1, arr2) {
	let category=storage.get(CATEGORY_KEY, {});
	category.hash=hash;
	category.female=arr1;
	category.male=arr2;

	storage.set(CATEGORY_KEY, category)
	return category;
}
export function loadCategory() {
	return storage.get(CATEGORY_KEY, {});
}
export function savedBooks(book) {
	let arr=storage.get(BOOKS_KEY, [])
	let res=insertArray(arr, book, (item)=>{
		return item.fiction_id===book.fiction_id;
	}, MAX_LEN)
	
	storage.set(BOOKS_KEY, res)
	return res;
}
export function loadBooks() {
	return storage.get(BOOKS_KEY, []);
}
export function savedBook(book) {
	let json=storage.get(BOOK_KEY, {})
	json=book
	storage.set(BOOK_KEY, res)
	return json;
}

export function savedReadBooks(book) {
	
}