import Button from "../../components/button.js";

class MyTastings {
    constructor() {
        this.createTastingButton = new Button("create-new-tasting-button", { size: "sm" });
    }

    render() {
        this.createTastingButton.render();
        this.createTastingButton.on("click", () => window.location = "/user/create-tasting");
    }
}

new MyTastings().render();
