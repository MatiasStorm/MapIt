export default class Input {
    constructor(id) {
        this.input = document.getElementById(id);
    }

    on(type, callback) {
        switch (type) {
        case "input":
            this.input.oninput = callback;
            break;
        case "change":
            this.input.onchange = callback;
            break;
        }
    }

    getValue() {
        return this.input.value;
    }
}
