import Button from "/js/components/button.js";
import Input from "/js/components/input.js";
import api from "/js/api.js"

export default class Index {
    constructor(){
        this.enterButton = new Button("enter-button");
        const extraClasses = "my-1";
        this.inputs = {
            pin: new Input("pin", { extraClasses }),
            name: new Input("name", { extraClasses }),
        };

        this.player = {}
    }

    render(){
        Object.entries(this.inputs).forEach(([key, input]) => {
            input.render();
            input.on("input", () => this.updateUserObject(key, input.getValue()));
            this.user[key] = input.getValue();
        });
        this.enterButton.render().on("click", () => {
            api.post(api.endpoints.player, this.player)
                .then(res => {
                    if (res.status === 400) {
                        // Invalid pin or name
                    } else if (res.redirected) {
                        window.location.href = res.url;
                    }
                })
        })
    }
}


