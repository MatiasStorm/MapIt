import api from "../../api.js";
import routes from "../../routes.js";
import Button from "../../components/button.js";
import TastingForm from "../../components/tastingForm.js";

class CreateTasting {
    constructor() {
        this.form = new TastingForm("tasting-form");
    }

    renderButtons(){
        new Button("cancel-button", {})
            .render()
            .on("click", () => {
                window.location = "/user/my-tastings";
            });
        new Button("save-button", {})
            .render()
            .on("click", () => {
                this.postTasting();
            });
    }

    render() {
        this.form.render();
        this.renderButtons();
    }

    postTasting(){
        let tasting = this.form.getTasting();
        api.uploadImage(tasting.image)
            .then(response => response.json())
            .then(data => {
                delete tasting.image;
                tasting.imagePath = data.imagePath;
                api.post(api.endpoints.tasting, tasting)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        window.location = routes.user.myTastings;
                });
            });
    }
}

new CreateTasting().render();
