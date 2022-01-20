import RatingForm from "../forms/ratingForm.js";
import EditSaveCancel from "../editSaveCancel.js";
import api from "../../api.js";

export default class RatingsView {
    constructor(id, tasting) {
        this.container = document.getElementById(id);
        this.form = new RatingForm("ratings-form", tasting.ratings);
        this.tasting = tasting;
        this.buttons = new EditSaveCancel("rating-buttons", "Rating Categories:");
        this.buttons.on("edit", () => {
            this.form.render();
        });
        this.buttons.on("save", () => {
            this.postRating();
        });
        this.buttons.on("cancel", () => {
            this.render();
        });
    }

    postRating() {
        const ratings = this.form.getRatings();
        const data = {
            id: this.tasting.id,
            ratings,
        };
        api.put(api.endpoints.tasting, this.tasting.id, data)
            .then((res) => res.json())
            .then((tasting) => {
                this.tasting = tasting;
                this.render();
            });
    }

    getRatingsHtml() {
        let html = "";
        this.tasting?.ratings?.forEach((r) => {
            html += `
                <span>
                    <b class="text-lg inline-block">
                        ${r.position}.
                    </b>
                    <h1 class="text-lg inline-block">
                        ${r.title}
                    </h1>
                </span>
            `;
        });
        return html;
    }

    getHmtl() {
        return `
            <div class="flex justify-between" id="rating-buttons">
            </div>
            <div id="ratings-form" class="flex flex-col">
                ${this.getRatingsHtml()}
            </div>
        `;
    }

    render() {
        this.container.innerHTML = this.getHmtl();
        this.buttons.render();
    }
}
