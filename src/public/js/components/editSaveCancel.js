import Button from "./button.js";

export default class EditSaveCancel {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.editId = `${this.id}-edit`;
        this.saveId = `${this.id}-save`;
        this.cancelId = `${this.id}-cancel`;
        this.editButton = new Button(this.editId, { text: "Edit" });
        this.saveButton = new Button(this.saveId, { text: "Save" });
        this.cancelButton = new Button(this.cancelId, { text: "Cancel" });
        this.callbacks = {
            edit: [],
            cancel: [],
            save: [],
        };
        this.editing = false;
    }

    on(type, callback) {
        if (Object.keys(this.callbacks).includes(type)) {
            this.callbacks[type].push(callback);
        }
        return this;
    }

    click(type) {
        this.callbacks[type].forEach((c) => c());
        if (type === "edit") {
            this.editing = true;
        }
        if (type === "cancel" || type === "save") {
            this.editing = false;
        }
        this.render();
    }

    getHtml() {
        return `
            <h1 class="text-4xl">
                <b>
                    ${this.title}
                </b>
            </h1>
            ${!this.editing ? `
                <button id="${this.editId}">
                    
                </button>
            ` : ` 
                <span>
                    <button id="${this.cancelId}">
                        
                    </button>
                    <button id="${this.saveId}">
                        
                    </button>
                </span>
            `}
        `;
    }

    render() {
        const container = document.getElementById(this.id);
        container.innerHTML = this.getHtml();
        if (this.editing) {
            this.saveButton.render().on("click", () => this.click("save"));
            this.cancelButton.render().on("click", () => this.click("cancel"));
        } else {
            this.editButton.render().on("click", () => this.click("edit"));
        }
    }
}
