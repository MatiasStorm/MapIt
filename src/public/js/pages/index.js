import Button from "../components/button.js";
import Input from "../components/input.js";
import api from "../api.js";

export default class Index {
    constructor() {
        this.enterButton = new Button("enter-button");
        const extraClasses = "my-1";
        this.inputs = {
            pin: new Input("pin", { extraClasses }),
            name: new Input("name", { extraClasses }),
        };

        this.player = {};
    }

    updatePlayer(key, value) {
        this.player[key] = value;
    }

    render() {
        Object.entries(this.inputs).forEach(([key, input]) => {
            input.render();
            input.on("input", () => this.updatePlayer(key, input.getValue()));
            this.player[key] = input.getValue();
        });
        this.enterButton.render().on("click", () => {
            api.post(api.endpoints.player, this.player)
                .then((res) => {
                    if (res.status === 400) {
                        // Invalid pin or name
                    } else if (res.redirected) {
                        window.location.href = res.url;
                    }
                });
        });
    }
}
