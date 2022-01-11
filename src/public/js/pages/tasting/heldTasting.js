import api from "../../api.js";

export default class HeldTasting {
    constructor(id, heldTastingId) {
        this.id = id;
        this.container = document.getElementById(id);
        this.heldTastingId = heldTastingId;
    }

    fetchItems(){
        api.get(api.endpoints.heldTastingItem, null, {heldTastingId: this.heldTastingId })
            .then((res) => res.json())
            .then((items) => {
                this.item = items;
            });
    }

    fetchHeldTasting() {
        api.get(api.endpoints.heldTastings, this.heldTastingId)
            .then((res) => res.json())
            .then((heldTasting) => {
                this.heldTasting = heldTasting;
                document.getElementById("title").innerText = heldTasting.title;
                this.fetchItems();
            });
    }

    render() {
        this.fetchHeldTasting();
    }
}
