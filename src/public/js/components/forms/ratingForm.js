import Input from "../input.js";
import Button from "../button.js";

export default class RatingForm {
    constructor(id, tastingId) {
        this.container = document.getElementById(id);
        this.ratings = [];
        this.addButton = new Button("add-button", { text: "Add", size: "sm" });
        this.tastingId = tastingId;
    }

    addRating() {
        const ratingInput = document.createElement("label");
        ratingInput.classList = "my-1";
        ratingInput.innerHTML = `
            <b>
                ${this.ratings.length + 1}.
            </b>
            Name:
            <input class="rounded border border-gray-300 p-3" type="text">
        `;
        this.ratings.push(ratingInput);
        document.getElementById("rating-inputs").appendChild(ratingInput);
    }

    getRatings() {
        return this.ratings.map((r, i) => ({
            title: r.querySelector("input").value,
            position: i,
            tastingId: this.tastingId,
        }));
    }

    getHtml() {
        return `
            <div class="flex justify-between mt-2">
                <h1 class="text-2xl mt-4">
                    <b>
                        Ratings
                    </b>
                </h1>
                <button id="add-button"></button>
            </div>
            <div class="flex flex-col" id="rating-inputs">
                
            </div>
        `;
    }

    render() {
        this.container.innerHTML = this.getHtml();
    }
}
