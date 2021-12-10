export default class Button {
    constructor(id) {
        this.button = document.getElementById(id);
    }

    on(type, callback) {
        switch (type) {
        case "click":
            this.button.onclick = callback;
            break;
        }
    }
}
