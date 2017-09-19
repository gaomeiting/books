import {loadCategory, loadCategoryHash} from "common/js/catch";
const state= {
	subject: {},
	channel: 369,
	rank: [],
	category: loadCategory(),
	currentCategory: {},
	currentBook: {},
	currentRead: {chapter_id: 0}
}
export default state;