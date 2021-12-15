import api from "../../api.js";
import Button from "../../components/button.js";
import TastingCard from "../../components/tastingCard.js";
import routes from "../../routes.js";

class MyTastings {
    constructor() {
        this.createTastingButton = new Button("create-new-tasting-button", { size: "sm" });
        this.tastingsSection = document.getElementById("my-tastings-section");
        this.tastings = [];
        this.tastingCards = [];
    }

    fetchTastings(){
        api.get(api.endpoints.tasting)
            .then(response => response.json())
            .then(tastings => {
                this.tastings = tastings;
                this.renderTastings();
            })
    }

    renderTastings(){
        this.tastings.forEach(tasting => {
            let cardNode = document.createElement("div");
            cardNode.id = tasting.id;
            this.tastingsSection.appendChild(cardNode);
            const tastingCard = new TastingCard(tasting.id, tasting, {});
            this.tastingCards.push(tastingCard);
            tastingCard.render();
            tastingCard.on("click", () => window.location = routes.user.myTastings + "/" + tasting.id )
        })
    }

    render() {
        this.fetchTastings();
        this.createTastingButton.render();
        this.createTastingButton.on("click", () => window.location = "/user/create-tasting");
    }
}

new MyTastings().render();
