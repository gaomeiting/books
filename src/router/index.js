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
Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', redirect: '/bookstore' },
		{ path: '/bookstore', component: Bookstore },
		{ path: '/weekHotMain', component: WeekHotMain },
		{ path: '/subject', component: Subject }
	]
})
