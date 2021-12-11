export default class Button {
    constructor(id) {
        this.button = document.getElementById(id);
        if (this.button === null){
            throw new Error("No button with id: " + id);
        }
    }

    on(type, callback) {
        switch (type) {
        case "click":
            this.button.onclick = callback;
            break;
        }
    }
}
