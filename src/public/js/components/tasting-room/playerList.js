import api from "/js/api.js";

export default class PlayerList{
    constructor(id, heldTastingId){
        this.container = document.getElementById(id);
        this.heldTastingId = heldTastingId;
        this.players = [];
    }

    fetchPlayers(){
        api.get(api.endpoints.player, null, {heldTastingId: this.heldTastingId} )
            .then(res => res.json())
            .then( players => {
                this.players = players;
                this.container.innerHTML = this.getHtml();
            });
    }

    getHtml(){
        let html = "";
        this.players.forEach(p => {
            html += `
                <ul>
                    <li>
                        ${p.name}
                    </li>
                </ul>
            `;
        });
        return html;
    }
}
