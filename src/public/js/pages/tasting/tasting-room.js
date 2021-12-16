import api from "../../api.js";

export default class TastingRoom {
    constructor(id, heldTastingId, pin){
        this.heldTastingId = heldTastingId;
        this.pin = pin
        this.container = document.getElementById(id);
        this.heldTasting = {};
    }

    fetchHeldTasting(){
        api.get(api.endpoints.heldTastings, this.heldTastingId)
            .then(res => res.json())
            .then(heldTasting => {
                this.heldTasting = heldTasting;
                document.getElementById("title").innerText = heldTasting.title;
            });
    }

    render(){
        this.fetchHeldTasting();

    }
}
