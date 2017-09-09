import Vue from 'vue'
import Router from 'vue-router'
const Bookstore=(resolve =>{
	import('components/bookstore/bookstore').then((module)=> {
		resolve(module)
	})
})
const WeekHotMain=(resolve=>{
	import('components/week-hot-main/week-hot-main').then( module=> {
		resolve(module)
	})
})
const Subject=(resolve=>{
	import('components/subject/subject').then( module=> {
		resolve(module)
	})
})
const SubjectDetail=(resolve=>{
	import('components/subject-detail/subject-detail').then( module=> {
		resolve(module)
	})
})
const Channel=(resolve=>{
	import('components/channel/channel').then( module=> {
		resolve(module)
	})
})
const TimeFree=(resolve=>{
	import('components/time-free-main/time-free-main').then( module=> {
		resolve(module)
	})
})
const Rank=(resolve=>{
	import('components/rank/rank').then( module=> {
		resolve(module)
	})
})
const RankDetail=(resolve=>{
	import('components/rank-detail/rank-detail').then( module=> {
		resolve(module)
	})
})
Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', redirect: '/bookstore' },
		{ path: '/bookstore', component: Bookstore },
		{ path: '/weekHotMain', component: WeekHotMain },
		{ path: '/channel', component: Channel },
		{ path: '/timeFree', component: TimeFree },
		{ path: '/rank', component: Rank, children: [
			{path: ':id', component: RankDetail}
		] },
		{ path: '/subject', component: Subject, children:[
			{ path: ':id', component: SubjectDetail }
		] }
	]
})
