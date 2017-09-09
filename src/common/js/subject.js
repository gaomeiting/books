export class Subject {
	constructor({id, name, desc, url}) {
		this.id=id;
		this.name=name;
		this.desc=desc;
		this.url=url;
	}
};
export function CreatSubject(item) {
	return new Subject({
		id: item.reference_id,
		name: item.ad_name,
		desc: item.ad_copy,
		url: item.ad_pic_url
	})
}
