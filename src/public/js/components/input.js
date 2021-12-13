export default class Input {
    constructor(id) {
        this.id = id;
    }

    on(type, listener) {
        this.input.addEventListener(type, listener)
    }

    getValue() {
        return this.input.value;
    }

    render(){
        this.input = document.getElementById(this.id);
        if (this.input === null){
            throw new Error("No input with id: " + this.id);
        }
    }
}
