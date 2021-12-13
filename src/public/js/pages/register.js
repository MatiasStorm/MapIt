import Button from "../components/button.js";
import Input from "../components/input.js";

class UserRegister {
    constructor() {
        const extraClasses = "my-1";
        this.inputs = {
            username: new Input("username", { extraClasses }),
            firstName: new Input("firstName", { extraClasses }),
            lastName: new Input("lastName", { extraClasses }),
            email: new Input("email", { extraClasses }),
            password: new Input("password", { extraClasses }),
        };
        this.user = {};
    }

    renderButtons() {
        (new Button("cancel-button", { extraClasses: "flex-grow" }))
            .render()
            .on("click", () => { window.location = "/"; });
        (new Button("create-button", { extraClasses: "flex-grow" }))
            .render()
            .on("click", () => this.postUser());
    }

    renderInputs() {
        Object.entries(this.inputs).forEach(([key, input]) => {
            input.render();
            input.on("input", () => this.updateUserObject(key, input.getValue()));
            this.user[key] = input.getValue();
        });
    }

    render() {
        this.renderButtons();
        this.renderInputs();
    }

    updateUserObject(key, value) {
        this.user[key] = value;
    }

    postUser() {
        fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(this.user),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

new UserRegister().render();
