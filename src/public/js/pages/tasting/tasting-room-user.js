import api from "../../api.js";
import Button from "/js/components/button.js";
import PlayerList from "../../components/tasting-room/playerList.js";
import Item from "../../components/tasting-room/item.js";
import RatingView from "../../components/tasting-room/ratingView.js";

export default class TastingRoomUser {
    constructor(id, heldTastingId, pin) {
        if (!io) {
            throw new Error("'io' is not defined, you have to import socket.io!");
        }
        this.started = false;
        this.heldTastingId = heldTastingId;
        this.pin = pin;
        this.heldTasting = {};
        this.container = document.getElementById(id);

        this.socket = io(`/${this.pin}`);

        this.nextItemButton = new Button("next-item-button", { size: "lg" });
        this.playerList = new PlayerList("player-list", heldTastingId, this.socket);

        this.item = new Item("item");
        this.ratingView = new RatingView("ratings", this.heldTastingId, this.socket);

        this.bindSocket();
    }

    bindSocket() {
        this.socket.on("player connected", () => this.playerList.fetchPlayers());

        this.socket.on("next", (item) => {
            this.item.setItem(item).render();
            this.ratingView.setViewMode(RatingView.modes.rate);
        });

        this.socket.on("end", () => {
            window.location.reload();
        });
    }

    fetchHeldTasting() {
        api.get(api.endpoints.heldTastings, this.heldTastingId)
            .then((res) => res.json())
            .then((heldTasting) => {
                this.heldTasting = heldTasting;
                document.getElementById("title").innerText = heldTasting.title;
                if (this.heldTasting.heldTastingItems?.length > 0) {
                    this.item.setItem(this.heldTasting.heldTastingItems[0]).render();
                    this.nextItemButton.setText("Next");
                    this.started = true;
                }
                else{
                    this.ratingView.setViewMode(RatingView.modes.hide);
                }
            });
    }

    render() {
        this.fetchHeldTasting();
        this.ratingView.fetchRatings();
        this.nextItemButton.render().on("click", () => {
            if (!this.started) {
                this.started = true;
                this.nextItemButton.setText("Next");
            }
            this.socket.emit("next", { id: this.heldTastingId });
        });
    }
}
