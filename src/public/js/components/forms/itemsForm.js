import Button from "../button.js";

export default class ItemsForm {
    constructor(id, items) {
        this.id = id;
        this.items = items;
        this.itemInputs = [];
        this.addButtonId = `${id}-add-button`;
        this.addButton = new Button(this.addButtonId, { text: "Add", size: "sm" });
        this.items.forEach((i) => this.addItem(i));
    }

    addItem(item) {
        const itemInput = document.createElement("div");
        itemInput.classList = "my-1 flex flex-col flex-grow";
        itemInput.innerHTML = `
            <label class="flex flex-col">
                <b>
                    Title:
                </b>
                <input data-type="title" class="rounded border border-gray-300 p-3" value="${item?.title || ""}" type="text">
            </label>
            <label class="flex flex-col">
                <b>
                    Description:
                </b>
                <textarea data-type="description" class="rounded border border-gray-300 p-3" cols="30" rows="10">
                    ${item?.description || ""}
                </textarea>
            </label>
            <label class="flex flex-col">
                <b>
                    Image:
                </b>
                <input 
                    class="rounded border border-gray-300 p-3" 
                    data-type="image" 
                    ${item?.imagePath ? `data-path="${item.imagePath}"` : ""} 
                    type="file">
            </label>
        `;
        this.itemInputs.push(itemInput);
    }

    getItems() {
        return this.itemInputs.map((r, i) => {
            const item = {
                title: r.querySelector("[data-type='title']").value,
                description: r.querySelector("[data-type='description']").value,
                position: i + 1,
            };
            const imageInput = r.querySelector("[data-type='image']");
            if (!imageInput.files[0] && imageInput.getAttribute("data-path")?.length > 0) {
                item.imagePath = imageInput.getAttribute("data-path");
            } else {
                [item.image] = imageInput.files;
            }
            return item;
        });
    }

    getHtml() {
        return `
            <div class="flex justify-between mt-2">
                <button id="${this.addButtonId}"></button>
            </div>
            <div class="flex flex-col space-y-10" id="item-inputs">

            </div>
        `;
    }

    render() {
        const container = document.getElementById(this.id);
        container.innerHTML = this.getHtml();
        document.getElementById("item-inputs").replaceChildren(...this.itemInputs);
        this.addButton.render().on("click", () => {
            this.addItem();
            this.render();
        });
    }
}
