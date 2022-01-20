export default class Button {
    constructor(id, options) {
        this.options = options;
        this.id = id;
        this.rendered = false;
    }

    on(type, callback) {
        if (!this.rendered) {
            throw new Error(`'${this.id}' button has not been rendered`);
        }
        this.button.addEventListener(type, callback);
    }

    setText(text) {
        this.button.innerText = text;
    }

    getClassName() {
        let classes = "rounded ";

        switch (this.options?.color) {
        case "red":
            classes += " bg-red-700 hover:bg-red-600 text-white ";
            break;
        case "light":
            classes += " bg-gray-100 hover:bg-gray-200 ";
            break;
        case "dark":
        default:
            classes += " bg-gray-800 text-white hover:bg-gray-900 ";
        }

        switch (this.options?.size) {
        case "sm":
            classes += " text-sm p-2 ";
            break;
        case "lg":
            classes += " text-lg p-3 ";
            break;
        case "md":
        default:
            classes += " text-md p-2 ";
            break;
        }

        return `${classes} ${this.options?.extraClasses || ""}`;
    }

    render() {
        this.button = document.getElementById(this.id);
        if (this.button === null) {
            throw new Error(`No button with id: ${this.id}`);
        }
        this.button.type = this.options?.type || "button";
        this.button.className = this.getClassName();
        this.button.innerHTML = this.options?.text || this.button.innerHTML;

        this.rendered = true;
        return this;
    }
}
