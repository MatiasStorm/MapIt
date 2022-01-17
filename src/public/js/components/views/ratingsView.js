export default class RatingsView {
    constructor(id) {
        this.container = document.getElementById(id);
    }

    setTasting(tasting) {
        this.tasting = tasting;
        return this;
    }

    render() {
        if (!this.tasting) {
            return;
        }
        this.container.innerHTML = "RATINGS";
    }
}
