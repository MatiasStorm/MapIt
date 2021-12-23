export default class Item{
    constructor(id){
        this.container = document.getElementById(id);
        this.item = {};
    }

    setItem(item){
        this.item = item;
        return this;
    }

    getHtml(){
        return `
            <h1 class="text-3xl text-center text-white">
                ${this.item.title}
            </h1>
            <div class="flex">
                <img class="max-h-96 rounded-2xl p-2" src="${this.item.imageUrl}" alt="">
                <p class="text-white w-1/2 p-2">
                    ${this.item.description || ""}
                </p>
            </div>
        `
    }

    render(){
        this.container.innerHTML = this.getHtml();
        return this;
    }
}
