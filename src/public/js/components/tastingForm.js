class TastingForm {
    constructor(id, tasting){
        this.id = id;
    }

    getHtml(){
        let html = `
            <input type="text">
            

        `
        return html;
    }

    render(){
        this.container = document.getElementById(id);
        this.container.innerHTML = this.getHtml();
    }
}
