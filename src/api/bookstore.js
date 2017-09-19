import jsonp from "jsonp";
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
export function getCategory(url) {
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getCategoryDetail(id, start, name) {
	const url=`/store/v0/fiction/category/${id}?start=${start}&count=10&${name}=1`
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getBookDetail(id) {
	const url=`/hs/v0/android/fiction/book/${id}`
	return axios(url).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function getDownBook(fiction_id, chapter_id) {
	let url ="/api/multi_link";
	let data= {
		fiction_id,
		chapter_id,
		format: 'jsonp'
	}
	return axios( url, {
		params: data
	}).then((res)=> {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	});
}

export function ajaxDownBook(url, opts) {
	return new Promise((resolve, reject) => {
		jsonp(url, opts, (err, data) => {
			if(!err){
				resolve(data);
			}
			else {
				reject(err)
			}
		})
	});
}
//http://dushu.xiaomi.com/store/v0/fiction/detail/352876?chapter_id=0
//http://dushu.xiaomi.com/drm/v0/fiction/link?fiction_id=352876&chapter_id=0&format=jsonp
export function startReadUrl( fiction_id, chapter_id) {
	const url=`http://dushu.xiaomi.com/drm/v0/fiction/link?fiction_id=${fiction_id}&chapter_id=${chapter_id}&format=jsonp`
	return axios(url).then(res=>{
		return new Promis.resolve(res.data)
	}).catch(err=>{
		return new Promis.reject(err)
	})
}
export function getCatalog(fiction_id) {
	const url=`/api/catalog`
	let data={
		fiction_id,
	}
	return axios(url, {
		params: data
	}).then(res=>{
		return Promise.resolve(res.data);
	}).catch(err=>{
		return Promise.reject(err)
	})
}