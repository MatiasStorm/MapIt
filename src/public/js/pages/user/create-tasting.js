import api from "../../api.js";
import routes from "../../routes.js";
import Button from "../../components/button.js";
import TastingForm from "../../components/forms/tastingForm.js";

class CreateTasting {
    constructor() {
        this.form = new TastingForm("tasting-form");
    }

    renderButtons() {
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

    postTasting() {
        const tasting = this.form.getTasting();
        api.uploadImage(tasting.image)
            .then((response) => response.json())
            .then((imageData) => {
                delete tasting.image;
                tasting.imagePath = imageData.imagePath;
                api.post(api.endpoints.tasting, tasting)
                    .then((res) => {
                        if (res.status < 400) {
                            window.location = routes.user.myTastings;
                        } else {
                            console.log(res.body());
                        }
                    });
            });
    }
}

new CreateTasting().render();
