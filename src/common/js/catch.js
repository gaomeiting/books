import storage from "good-storage";
const CATEGORY_KEY='__category__';
const CATEGORY_HASH_KEY='__category_hash__';
const CHAPTER_KEY='__CHAPTER__';
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
function uniqueArray(arr) {
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
export function savedCurrentReadBook(chapters) {
	let arr=storage.get(BCHAPTER_KEY, {})
	let ret=[]
	if(chapters instanceof Array) {
		ret=arr.concat(chapters)
	}
	else {
		console.log('isnotArray')
		ret=arr.push(chapters)
	}

	//数组去重，按照章节排序
	let res=uniqueArray(ret).sort((a, b)=>{
		return a.c - b.c;
	})
	storage.set(CHAPTER_KEY, res)
	return res;
}
export function loadCurrentReadBook(chapters) {
	return storage.get(CHAPTER_KEY, []);
}
export function savedReadBooks(book) {
	
}