import api from "/js/api.js";
import Button from "/js/components/button.js"

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
        this.saveButton = new Button(this.saveButtonId, {text: "Gem", size: "lg" });
    }

    fetchRatings() {
        api.get(api.endpoints.heldTastingRating, null, { heldTastingId: this.heldTastingId })
            .then((res) => res.json())
            .then((data) => {
                this.data = data;
                if (this.mode !== RatingView.modes.hide) {
                    this.render();
                }
            });
    }

    setViewMode(mode) {
        if (this.mode !== mode) {
            // rerender
        }
        this.mode = mode;
    }

    getRateHtml() {
        let html = "";
        for(let rating of this.data.ratings){
            html += `
                <div class="flex flex-grow w-full mb-5">
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
                </div>
                <button id="${this.saveButtonId}">
                    
                </button>
            `;
        }
        return html;
    }

    postRatings(){
        let data = [];
        for(let rating of this.data.ratings){
            let value = parseInt(document.getElementById("rating-input-" + rating.id).value);
            data.push({
                value,
                heldTastingRatingId: rating.id
            });
        }
        api.post(api.endpoints.playerRating, data);
    }

    getViewHtml() {
        let html = "";
        for(let rating of this.data.ratings){
            html += `
                <b class="text-2xl">
                    ${rating.title}
                </b>
            `;
        }
        return html;
    }

    render() {
        if (!this.data) {
            return;
        }
        this.container.className = "flex flex-col justify-between p-5 ";
        switch (this.mode) {
            case RatingView.modes.hide:
                this.container.hidden = true;
                break;
            case RatingView.modes.rate:
                this.container.innerHTML = this.getRateHtml();
                this.saveButton.render().on("click", () => {
                    this.postRatings();
                });
                break;
            case RatingView.modes.view:
                this.container.innerHTML = this.getViewHtml();
                break;
        }
    }
}
