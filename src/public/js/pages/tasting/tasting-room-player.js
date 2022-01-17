import api from "../../api.js";
import PlayerList from "../../components/tasting-room/playerList.js";
import Item from "../../components/tasting-room/item.js";
import RatingView from "../../components/tasting-room/ratingView.js";

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

        this.playerList = new PlayerList("player-list", heldTastingId, this.socket);
        this.ratingView = new RatingView("ratings", this.heldTastingId, this.socket, RatingView.modes.rate);
        this.item = new Item("item");

        this.bindSocket();
    }

    bindSocket() {
        this.socket.on("player connected", () => this.playerList.fetchPlayers());

        this.socket.on("next", (item) => {
            this.item.setItem(item).render();
            this.ratingView.setHeldTastingItemId(item.id);
            this.ratingView.setViewMode(RatingView.modes.rate);
        });

        this.socket.on("end", () => {
            window.location.reload();
        });
    }

    fetchPlayer() {
        api.get(api.endpoints.player, null, { whoAmI: true })
            .then(async (res) => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else {
                    this.player = await res.json();
                    document.getElementById("name").innerText = this.player.name;
                }
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
                    this.ratingView.setHeldTastingItemId(this.heldTasting.heldTastingItems[0].id);
                } else {
                    this.ratingView.setViewMode(RatingView.modes.hide);
                }
            });
    }

    render() {
        this.fetchHeldTasting();
        this.ratingView.fetchRatings();
        this.fetchPlayer();
    }
}
