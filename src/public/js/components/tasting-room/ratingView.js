import api from "../../api.js";
import Button from "../button.js";

export default class RatingView {
    static modes = {
        view: "view",
        rate: "rate",
        hide: "hide",
    };

    constructor(id, heldTastingId, socket, mode = RatingView.modes.view, options = {}) {
        this.id = id;
        this.container = document.getElementById(this.id);
        this.heldTastingId = heldTastingId;
        this.options = options;
        this.mode = mode;
        this.socket = socket;
        this.saveButtonId = "save-button";
        this.saveButton = new Button(this.saveButtonId, { text: "Rate", size: "lg" });

        this.bindSocket();
    }

    setHeldTastingItemId(id) {
        this.heldTastingItemId = id;
    }

    bindSocket() {
        this.socket.on("rate", (ratings) => {
            this.ratings = ratings;
            this.render();
        });
    }

    fetchRatings() {
        api.get(api.endpoints.heldTastingRating, null, { heldTastingId: this.heldTastingId })
            .then((res) => res.json())
            .then((ratings) => {
                this.ratings = ratings;
                if (this.mode !== RatingView.modes.hide) {
                    this.render();
                }
            });
    }

    setViewMode(mode) {
        this.mode = mode;
    }

    getRateHtml() {
        let html = "";
        this.ratings.forEach((rating) => {
            html += `
                    <label for="${rating.id}" class="mr-5">
                        <b class="text-2xl text-white">
                            ${rating.title}:
                        </b>
                    </label>
                    <div class="flex flex-grow w-auto items-center">
                        <b class="text-white">
                            Min.
                        </b>
                        <input id="rating-input-${rating.id}" type="range"
                            min="0"
                            max="10"
                            class="cursor-pointer w-full mx-2"
                        >
                        <b class="text-white">
                            Max.
                        </b>
                    </div>
            `;
        });
        return `
            <div class="flex flex-col flex-grow w-full mb-5">
                ${html}
            </div>
            <button id="${this.saveButtonId}">
                
            </button>
        `;
    }

    postRatings() {
        const data = [];
        for (const rating of this.ratings) {
            const value = parseInt(document.getElementById(`rating-input-${rating.id}`).value);
            data.push({
                value,
                heldTastingRatingId: rating.id,
                heldTastingItemId: this.heldTastingItemId,
            });
        }
        api.post(api.endpoints.playerRating, data)
            .then((res) => {
                if (res.status < 300) {
                    this.mode = RatingView.modes.view;
                    this.render();
                    this.socket.emit("rate", this.heldTastingId);
                }
            });
    }

    getViewHtml() {
        let html = "";
        for (const rating of this.ratings) {
            html += `
                <div class="flex flex-grow w-full mb-5">
                    <label for="${rating.id}" class="mr-5">
                        <b class="text-2xl text-white">
                            ${rating.title} (${rating.average || ""}):
                        </b>
                    </label>
                    <div class="flex flex-grow w-auto items-center">
                        <b class="text-white">
                            Min.
                        </b>
                        <input 
                            id="rating-input-${rating.id}" 
                            disabled 
                            value="${rating.average || 0}"
                            type="range"
                            min="0"
                            max="10"
                            step="0.01"
                            class="cursor-pointer w-full mx-2"
                        >
                        <b class="text-white">
                            Max.
                        </b>
                    </div>
                </div>
            `;
        }
        return html;
    }

    render() {
        if (!this.ratings) {
            return;
        }
        this.container.className = "flex flex-col justify-between p-5 ";
        switch (this.mode) {
        case RatingView.modes.rate:
            this.container.innerHTML = this.getRateHtml();
            this.saveButton.render().on("click", () => {
                this.postRatings();
            });
            break;
        case RatingView.modes.view:
            this.container.innerHTML = this.getViewHtml();
            break;
        case RatingView.modes.hide:
        default:
            this.container.hidden = true;
            break;
        }
    }
}
