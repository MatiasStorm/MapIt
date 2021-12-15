export default class TastingCard {
    constructor(id, tasting, options){
        this.id = id;
        this.tasting = tasting;
        this.options = options;
    }

    on(type, listener){
        if(!this.element){
            throw new Error("You have to call the render method before adding on events.");
        }
        this.element.addEventListener(type, listener);
    }

    getHtml(){
        return `
            <img 
                class="w-full rounded-t-2xl" 
                style="aspect-ratio: 16 / 9"
                src="${this.tasting.imagePath ? this.tasting.imageUrl : "/assets/default_tasting.jpeg" }" 
                alt="${this.tasting.title}"
            >
            <div class="w-full">
                <h1 class="lg:text-4xl md:text-2xl text-center">
                    ${this.tasting.title}
                </h1>
            </div>
        `;
    }

    render(){
        this.element = document.getElementById(this.id);
        this.element.className = "cursor-pointer flex border-2 border-gray-300 flex-col rounded-2xl w-full"
        this.element.innerHTML = this.getHtml();
    }
}
