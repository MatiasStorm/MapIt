import api from "../../api.js";
import routes from "../../routes.js";
import Button from "../button.js";
import TastingForm from "../forms/tastingForm.js";
import EditSaveCancel from "../editSaveCancel.js";

export default class TastingView {
    constructor(id, tasting) {
        this.id = id;
        this.form = new TastingForm("tasting-form", tasting);
        this.buttons = new EditSaveCancel("tasting-buttons", tasting.title);
        this.tasting = tasting;
        this.buttons.on("edit", () => {
            this.form.render();
        });
        this.buttons.on("save", () => {
            this.postTasting();
        });
        this.buttons.on("cancel", () => {
            this.render();
        });
    }

    postTasting() {
        const tasting = this.form.getTasting();
        tasting.ratings = null;
        tasting.tastingItems = null;
        if (tasting.image) {
            api.uploadImage(tasting.image)
                .then((response) => response.json())
                .then((imageData) => {
                    delete tasting.image;
                    tasting.imagePath = imageData.imagePath;
                    api.put(api.endpoints.tasting, tasting.id, tasting)
                        .then((res) => res.json())
                        .then((resTasting) => {
                            this.tasting = resTasting;
                            this.render();
                        });
                });
        } else {
            api.put(api.endpoints.tasting, tasting.id, tasting)
                .then((res) => res.json())
                .then((resTasting) => {
                    this.tasting = resTasting;
                    this.render();
                });
        }
    }

    getHtml() {
        return `
            <div class="flex flex-col">
                <div class="flex justify-between" id="tasting-buttons">
                </div>
                <div id="tasting-form">
                    <img src=${this.tasting.imageUrl} class="mx-auto rounded-2xl h-96"></img>
                </div>
            </div>
        `;
    }

    render() {
        const container = document.getElementById(this.id);
        container.innerHTML = this.getHtml();
        this.buttons.title = this.tasting.title;
        this.buttons.render();
    }
}
