import api from "../../api.js";
import Button from "../../components/button.js";

export default class ViewTasting {
    constructor(tastingId) {
        this.tastingId = tastingId;
        this.launchTastingButton = new Button("launch-button", { size: "lg" });
        this.title = document.getElementById("title");
        this.tasting = {};
    }

    fetchTasting(){
        api.get(api.endpoints.tasting + "/" + this.tastingId)
            .then(response => response.json())
            .then(tasting => {
                this.tasting = tasting;
                this.title.innerText = tasting.title;
            })
    }

    render() {
        this.fetchTasting();
        this.launchTastingButton.render();
        // this.launchTastingButton.on("click", () => window.location = "/user/create-tasting");
    }
}

