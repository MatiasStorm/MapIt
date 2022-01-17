import Input from "../input.js";
import Button from "../button.js";

export default class TastingForm {
    constructor(id, tasting = {}) {
        this.id = id;
        this.inputs = {
            title: new Input("title"),
            description: new Input("description"),
            image: new Input("image", { type: "file" }),
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
            <label for="description">
                <b>
                    Description
                </b>
            </label>
            <textarea id="description" > </textarea>

            <label for="image" class="mt-2">
                <b>
                    Cover Image
                </b>
            </label>
            <input id="image" type="file">
        `;
        return html;
    }

    updateTasting(key, value) {
        this.tasting[key] = value;
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
