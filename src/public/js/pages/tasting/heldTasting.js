import api from "../../api.js";
import Button from "../../components/button.js";

export default class HeldTasting {
    constructor(id, heldTastingId) {
        this.id = id;
        this.container = document.getElementById(id);
        this.heldTastingId = heldTastingId;
        this.backButton = new Button("back");
    }

    fetchHeldTasting() {
        api.get(api.endpoints.heldTastings, this.heldTastingId, { done: true })
            .then((res) => res.json())
            .then((heldTasting) => {
                this.heldTasting = heldTasting;
                this.render();
            });
    }

    getRatingsHtml(averages) {
        let html = "";
        for (const rating of this.heldTasting.heldTastingRatings) {
            html += `
                <h1 class="text-2xl text-white">
                    ${rating.title}: ${averages[rating.id]}
                </h1>
            `;
        }
        return `
            <div class="flex flex-col">
                ${html}
            </div>
        `;
    }

    getItemsHtml() {
        let html = "";
        for (const item of this.heldTasting.heldTastingItems) {
            html += `
                <div>
                    <h1 class="text-3xl text-center text-white">
                        ${item.title}
                    </h1>
                    <div class="flex">
                        <img class="max-h-96 rounded-2xl p-2" src="${item.imageUrl}" alt="">
                        ${this.getRatingsHtml(item.averages)}
                    </div>
                </div>
            `;
        }
        return html;
    }

    render() {
        this.backButton.render().on("click", () => window.location = "/");
        document.getElementById("title").innerText = this.heldTasting.title;
        this.container.innerHTML = this.getItemsHtml();
    }
}
