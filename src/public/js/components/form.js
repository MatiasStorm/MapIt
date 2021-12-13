import Input from "./input.js";

class Form {
    constructor(id, inputIds, options) {
        this.form = document.getElementById(id);
        this.inputs = inputIds.map((inputId) => new Input(inputId));
    }

    validate() {

    }
}
