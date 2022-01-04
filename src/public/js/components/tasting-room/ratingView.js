import api from "/js/api.js";

export default class RatingView {
    static modes = {
        view: "view",
        rate: "rate",
        hide: "hide",
    };

    constructor(id, heldTastingId, mode, options = {}) {
        this.id = id;
        this.container = document.getElementById(this.id);
        this.heldTastingId = heldTastingId;
        this.options = options;
        this.mode = mode || RatingView.modes.view;
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
        if (this.mode !== mode) {
            // rerender
        }
        this.mode = mode;
    }

    getRateHtml() {

    }

    getViewHtml() {
        return "Viewing";
    }

    render() {
        if (!this.ratings) {
            return;
        }
        switch (this.mode) {
        case RatingView.modes.hide:
            this.container.hidden = true;
            break;
        case RatingView.modes.rate:
            this.container.innerHTML = this.getRateHtml();
            break;
        case RatingView.modes.view:
            this.container.innerHTML = this.getViewHtml();
            break;
        }
    }
}
