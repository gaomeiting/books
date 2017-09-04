export const switchRangeMixin = {
	data() {
		return {
			minIndex: 0,
			currentList: [],
			currentIndex: 1,
			sortList: []
		}
	},
	methods: {
		switchIndexRange(count, list) {
			let ret=[]
			let minIndex=this.minIndex
			let remainder=list.length%count
			let maxLen=remainder ? list.length - remainder :list.length-count
			minIndex+=count;
			if(minIndex>maxLen) minIndex=0;
			let maxIndex=remainder && minIndex===list.length - remainder ?minIndex+remainder : minIndex+count
			for(let i=minIndex; i<maxIndex; i++) {
				ret.push(list[i])
			}
			this.minIndex=minIndex
			this.currentList=ret;

		}
	}
};
