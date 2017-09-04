import * as types from "./mutation-types";


const mutations = {
	[types.SET_SUBJECT](state, subject) {
		state.subject=subject
	}
}
export default mutations