import api from "../../api.js";
import Button from "../../components/button.js";
import RatingsView from "../../components/views/ratingsView.js";

export default class ViewTasting {
    constructor(tastingId) {
        this.tastingId = tastingId;
        this.launchTastingButton = new Button("launch-button", { size: "lg" });
        this.title = document.getElementById("title");
        this.tasting = {};
        this.ratingView = new RatingsView("ratings");
    }

    fetchTasting() {
        api.get(`${api.endpoints.tasting}/${this.tastingId}`)
            .then((response) => response.json())
            .then((tasting) => {
                this.tasting = tasting;
                this.title.innerText = tasting.title;
                this.ratingView.setTasting(tasting).render();
            });
    }

    render() {
        this.fetchTasting();
        this.launchTastingButton.render().on("click", () => {
            api.post(api.endpoints.heldTastings, {
                tastingId: this.tastingId,
            }).then((response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    // Display error
                }
            });
        });
    }
}
