export default class Input {
    constructor(id) {
        this.input = document.getElementById(id);
        if (this.input === null){
            throw new Error("No input with id: " + id);
        }
    }

    on(type, listener) {
        this.input.addEventListener(type, listener)
    }

    getValue() {
        return this.input.value;
    }
}
