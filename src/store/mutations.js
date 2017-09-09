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
	}
}
export default mutations