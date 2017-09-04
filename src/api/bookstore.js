import { jsonp } from "common/js/jsonp";
import { commonParams, options } from "api/config";
import axios from 'axios';
export function getBookstore() {
	const url='/hs/v3/channel/418';
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getHotMain(start) {
	const url=`/store/v0/fiction/list/11059?start=${start}&count=10`;
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}

export function getSubject(start) {
	const url=`/store/v0/ad/persistent?start=${start}&count=10`;
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}