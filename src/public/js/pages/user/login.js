import Button from "../../components/button.js";
import Input from "../../components/input.js";

class Login {
    constructor() {
        this.inputs = {
            username: new Input("username"),
            password: new Input("password"),
        };
        this.login = {};
    }

    run() {
        (new Button("cancel-button")).on("click", () => { window.location = "/"; });
        (new Button("login-button")).on("click", () => this.postLogin());
        Object.entries(this.inputs).forEach(([ key, input ]) => {
            this.login[key] = input.getValue();
            input.on("input", () => this.updateLogin(key, input.getValue()))
        });
    }

    updateLogin(key, value){
        this.login[key] = value;
    }

    postLogin(){
        fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(this.login),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

window.onload = () => {
    const login = new Login();
    login.run();
};
