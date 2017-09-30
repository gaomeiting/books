import {ERR_OK} from "api/config";
import {startReadUrl} from "api/bookstore";
import {Base64} from "js-base64";

export class Book {
	constructor({fiction_id, chapter_id, catalog, chapters}) {
		this.fiction_id=fiction_id;
		this.chapter_id=chapter_id;
		this.catalog=catalog;
		this.chapters=chapters;
	}
	getChapter() {
		if(this.chapter) {
			return 
		}
		let index=findIndex(this.chapters, this.chapter_id);
		this.chapter=this.chapters[index];
		console.log(this.chapter.c)
		return Promise.resolve(Base64.decode(this.chapter.res))
	}
}
export function CreateBook(data) {
	return new Book({
		fiction_id: data.fiction_id,
		chapter_id: data.chapter_id,
		catalog: data.catalog,
		chapters: data.chapters
	})
}
function findIndex(chapters, id) {
	return chapters.findIndex((item)=>{
		return item.c===id
	})
}
