import TastingForm from "../../components/tastingForm.js";

class CreateTasting {
    constructor() {
        this.form = new TastingForm("tasting-form");
    }

    render() {
        this.form.render();
    }
}

new CreateTasting().render();
