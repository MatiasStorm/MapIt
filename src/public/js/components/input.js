export default class Input {
    constructor(id, options) {
        this.id = id;
        this.options = options;
    }

    on(type, listener) {
        this.input.addEventListener(type, listener);
    }

    getValue() {
        switch (this.options?.type) {
        case "file":
            return this.input.files[0];
        default:
            return this.input.value;
        }
    }

    getClassName() {
        return `rounded border border-gray-300 p-3 ${this.options?.extraClasses}` || "";
    }

    render() {
        this.input = document.getElementById(this.id);
        if (this.input === null) {
            throw new Error(`No input with id: ${this.id}`);
        }
        this.input.className = this.getClassName();
    }
}
