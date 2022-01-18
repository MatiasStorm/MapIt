import Button from "../button.js";

export default class RatingForm {
    constructor(id, ratings) {
        this.id = id;
        this.ratings = ratings;
        this.ratingInputs = [];
        this.addButton = new Button("add-button", { text: "Add", size: "sm" });
        this.ratings.forEach((r, i) => this.addRating(r.title));
    }

    addRating(value = "") {
        const ratingInput = document.createElement("label");
        ratingInput.classList = "my-1";
        ratingInput.innerHTML = `
            Name:
            <input class="rounded border border-gray-300 p-3" value="${value}" type="text">
        `;
        this.ratingInputs.push(ratingInput);
    }

    getRatings() {
        return this.ratingInputs.map((r, i) => ({
            title: r.querySelector("input").value,
            position: i + 1,
        }));
    }

    getHtml() {
        return `
            <div class="flex justify-between mt-2">
                <button id="add-button"></button>
            </div>
            <div class="flex flex-col" id="rating-inputs">
                
            </div>
        `;
    }

    render() {
        const container = document.getElementById(this.id);
        container.innerHTML = this.getHtml();
        document.getElementById("rating-inputs").replaceChildren(...this.ratingInputs);
        this.addButton.render().on("click", () => {
            this.addRating();
            this.render();
        });
    }
}
