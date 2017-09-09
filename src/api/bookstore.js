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
export function getChannel(id) {
	const url=`/hs/v3/channel/${id}`;
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getSubject(start) {
	const url=`/store/v0/ad/persistent?start=${start}&count=10&type=4`;
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getSubjectDetail(id,start) {
	const url=`/store/v0/fiction/list/${id}?start=${start}&count=10`;
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getTimeFree() {
	const url='hs/v3/channel/371';
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getRank() {
	const url='/store/v0/ad/ranks';
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getRankDetail(start, id) {
	const url=`/store/v0/fiction/rank?start=${start}&count=10&r=${id}`;
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}