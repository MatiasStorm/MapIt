import api from "../../api.js";
import Button from "/js/components/button.js";

export default class TastingRoomPlayer {
    constructor(id, heldTastingId, pin) {
        if (!io) {
            throw new Error("'io' is not defined, you have to import socket.io!");
        }
        this.heldTastingId = heldTastingId;
        this.pin = pin;
        this.container = document.getElementById(id);
        this.heldTasting = {};
        this.socket = io(`/${this.pin}`);
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
    }
}
