import {loadCategory, loadCategoryHash, loadBooks} from "common/js/catch";
const state= {
	subject: {},
	channel: 369,
	rank: [],
	category: loadCategory(),
	currentCategory: {},
	currentBook: {},
	books: loadBooks()
}
export default state;