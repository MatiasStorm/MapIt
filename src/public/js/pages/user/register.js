import Button from "../../components/button.js";
import Input from "../../components/input.js";

class UserRegister {
    constructor() {
        this.inputs = {
            username: new Input("username"),
            firstName: new Input("firstName"),
            lastName: new Input("lastName"),
            email: new Input("email"),
            password: new Input("password"),
        };
        this.user = {};
    }

    run() {
        (new Button("cancel-button")).on("click", () => { window.location = "/"; });
        (new Button("create-button")).on("click", () => this.postUser());

        Object.keys(this.inputs).forEach((key) => {
            const input = this.inputs[key];
            input.on("input", () => this.updateUserObject(key, input.getValue()));
            this.user[key] = input.getValue();
        });
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

const userRegister = new UserRegister();
userRegister.run();
