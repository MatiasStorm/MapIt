import Input from "../input.js";
import Button from "../button.js";

export default class TastingForm {
    constructor(id, tasting = {}) {
        this.id = id;
        this.titleId = `${id}-title`;
        this.imageId = `${id}-image`;
        this.inputs = {
            title: new Input(this.titleId),
            image: new Input(this.imageId, { type: "file" }),
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
            <input id="${this.titleId}" type="text" value="${this.tasting.title || ""}">

            <label for="image" class="mt-2">
                <b>
                    Cover Image
                </b>
            </label>
            <input id="${this.imageId}" type="file" value="${this.tasting.imageUrl || ""}">
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
        const container = document.getElementById(this.id);
        container.innerHTML = this.getHtml();
        container.className = "flex flex-col px-4";

        this.renderInputs();
    }
}
