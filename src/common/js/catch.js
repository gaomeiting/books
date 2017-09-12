import storage from "good-storage";
const CATEGORY_KEY='__category__';
const CATEGORY_HASH_KEY='__category_hash__';
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