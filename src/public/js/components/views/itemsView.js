import EditSaveCancel from "../editSaveCancel.js";
import ItemsForm from "../forms/itemsForm.js";
import api from "../../api.js";

export default class ItemsView {
    constructor(id, tasting) {
        this.id = id;
        this.tasting = tasting;
        this.form = new ItemsForm("items-form", tasting.tastingItems);

        this.buttons = new EditSaveCancel("item-buttons", "Items:");
        this.buttons.on("edit", () => {
            this.form.render();
        });
        this.buttons.on("save", () => {
            this.postItems();
        });
        this.buttons.on("cancel", () => {
            this.render();
        });
    }

    async postItems() {
        const items = this.form.getItems();
        for (const item of items.filter((i) => i.image !== undefined)) {
            const imageData = await api.uploadImage(item.image).then((res) => res.json());
            item.imagePath = imageData.imagePath;
            delete item.image;
        }
        const data = {
            id: this.tasting.id,
            tastingItems: items,
        };
        api.put(api.endpoints.tasting, this.tasting.id, data)
            .then((res) => res.json())
            .then((tasting) => {
                this.tasting = tasting;
                this.render();
            });
    }

    getItemsHtml() {
        let html = "";
        this.tasting?.tastingItems?.forEach((i) => {
            html += `
                <span>
                    <h1 class="text-2xl">
                        <b>
                            ${i.title}
                        </b>
                    </h1>
                    <p>
                        ${i.description || ""}
                    </p>
                    <img src="${i.imageUrl}" alt="" class="mx-auto h-96 rounded">
                </span>
            `;
        });
        return html;
    }

    getHmtl() {
        return `
            <div class="flex justify-between" id="item-buttons">
            </div>
            <div id="items-form" class="flex flex-col">
                ${this.getItemsHtml()}
            </div>
        `;
    }

    render() {
        const container = document.getElementById(this.id);
        container.innerHTML = this.getHmtl();
        this.buttons.render();
    }
}
