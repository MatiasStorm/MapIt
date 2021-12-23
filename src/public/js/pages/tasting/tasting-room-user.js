import api from "../../api.js";
import Button from "/js/components/button.js";
import PlayerList from "../../components/tasting-room/playerList.js";
import Item from "../../components/tasting-room/item.js";

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

        this.nextItemButton = new Button("next-item-button", {size: "lg"});
        this.playerList = new PlayerList("player-list", heldTastingId, this.socket);

        this.item = new Item("item");

        this.socket.on("next", (item) => {
            this.item.setItem(item).render();
        });
    }

    fetchHeldTasting() {
        api.get(api.endpoints.heldTastings, this.heldTastingId)
            .then((res) => res.json())
            .then((heldTasting) => {
                this.heldTasting = heldTasting;
                document.getElementById("title").innerText = heldTasting.title;
            });
    }

    render() {
        this.fetchHeldTasting();
        this.nextItemButton.render().on("click", () => {
            if(!this.started){
                this.started = true;
                this.nextItemButton.setText("Next");
            }
            this.socket.emit("next", {id: this.heldTastingId});
        });
        this.playerList.render();
    }
}
