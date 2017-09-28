import * as types from "./mutation-types";


const mutations = {
	[types.SET_SUBJECT](state, subject) {
		state.subject=subject
	},
	[types.SET_CHANNEL](state, channel) {
		state.channel=channel
	},
	[types.SET_RANK](state, rank) {
		state.rank=rank
	},
	[types.SET_CATEGORY](state, category) {
		state.category=category
	},
	[types.SET_CURRENT_CATEGORY](state, json) {
		state.currentCategory=json
	},
	[types.SET_CURRENT_BOOK](state, json) {
		state.currentBook=json
	},
	[types.SET_BOOKS](state, books) {
		state.books=books
	}
}
export default mutations