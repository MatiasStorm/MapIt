import Input from "./input.js";

export default class TastingForm {
    constructor(id, tasting = {}) {
        this.id = id;
        this.inputs = {
            title: new Input("title"),
            image: new Input("image", {type: "file"}),
        };
        this.tasting = tasting;
    }

    getHtml() {
        const html = `
            <label for="title">
                <b>
                    Title
                </b>
            </label>
            <input id="title" type="text">

            <label for="image" class="mt-2">
                <b>
                    Cover Image
                </b>
            </label>
            <input id="image" type="file">
            <h1 class="text-2xl mt-4">
                <b>
                    Ratings
                </b>
            </h1>
            <div>
                
            </div>
        `;
        return html;
    }

    updateTasting(key, value) {
        this.tasting[key] = value;
        console.log(this.tasting);
    }

    getTasting() {
        return this.tasting;
    }

    renderInputs() {
        Object.entries(this.inputs).forEach(([key, input]) => {
            input.render();
            this.tasting[key] = input.getValue();
            input.on("input", () => this.updateTasting(key, input.getValue()));
        });
    }

    render() {
        this.container = document.getElementById(this.id);
        this.container.innerHTML = this.getHtml();
        this.container.className = "flex flex-col px-4";

        this.renderInputs();
    }
}
