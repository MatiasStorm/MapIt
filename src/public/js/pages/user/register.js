import Input from "../../components/input";

class UserRegister {
    constructor() {
        document.getElementById("cancel-button").onclick = () => window.location = "/";
        document.getElementById("create-button").onclick = () => createUser();

        this.inputs = {
            username: new Input("username"),
            firstName: new Input("firstName"),
            lastName: new Input("lastName"),
            email: new Input("email"),
            password: new Input("password"),
        };
        this.user = {};

        Object.keys(inputs).forEach((key) => {
            const input = inputs[key];
            input.on("input", () => updateUserObject(key, input.getValue()));
            user[key] = input.getValue();
        });
    }

    updateUserObject(key, value) {
        this.user[key] = value;
    }

    postUser() {
        fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    main() {

    }
}

new UserRegister();
