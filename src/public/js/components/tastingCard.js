export default class TastingCard {
    constructor(id, tasting, options){
        this.id = id;
        this.tasting = tasting;
        this.options = options;
    }

    getHtml(){
        return `
            <div>
                <img src="${this.tasting.imageUrl}" alt="${this.tasting.title}">

                <h1>
                    ${this.tasting.title}
                </h1>
            </div>
        `;
    }

    render(){
        this.element = document.getElementById(this.id);
        this.element.innerHTML = this.getHtml();
    }
}
