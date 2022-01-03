import api from "/js/api.js";

export default class RatingView {
    constructor(id, heldTastingId, options = {}){
        this.id = id;
        this.container = document.getElementById(this.id);
        this.heldTastingId = heldTastingId;
        this.options = options;
    }

    fetchRatings(){
        api.get(api.endpoints.heldTastingRating, null, { heldTastingId: this.heldTastingId })
            .then(res => res.json())
            .then( ratings => {
                this.ratings = ratings;
            });
    }

    getHtml(){

    }
}
