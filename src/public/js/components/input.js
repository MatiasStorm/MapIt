export default class Input {
    constructor(id) {
        this.input = document.getElementById("username");
    }

    on(type, callback) {
        switch (type) {
        case "input":
            this.input.oninput = callback;
        case "change":
            this.input.onchange = callback;
        }
    }

    getValue() {
        return this.input.value;
    }
}
