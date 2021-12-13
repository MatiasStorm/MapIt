import Button from "../components/button.js";
import Input from "../components/input.js";

class Login {
    constructor() {
        this.inputs = {
            username: new Input("username"),
            password: new Input("password"),
        };
        this.login = {};
    }

    renderButtons(){
        (new Button("cancel-button", {extraClasses: "flex-grow"}))
            .render()
            .on("click", () => { window.location = "/"; });
        (new Button("login-button", {extraClasses: "flex-grow"}))
            .render()
            .on("click", () => this.postLogin());
    }

    renderInputs(){
        Object.entries(this.inputs).forEach(([ key, input ]) => {
            input.render();
            this.login[key] = input.getValue();
            input.on("input", () => this.updateLogin(key, input.getValue()))
        });
    }

    render() {
        this.renderButtons();
        this.renderInputs();
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
        }).then(res => {
            if(res.status === 401 || res.status === 400){
                //invalid user cred
            }
            else if(res.redirected){
                window.location.href = res.url;
            }
        })
    }
}

new Login().render();
