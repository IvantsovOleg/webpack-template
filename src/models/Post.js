export class Post {
    constructor(title, img) {
        this.title = title;
        this.img = img;
        this.date = new Date();
    }
    toString(){
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            img: this.img
        }, null, 1)
    }
    get upperCaseTitle () {
        return this.title.toUpperCase();
    }
}