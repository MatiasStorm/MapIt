import api from "/js/api.js";

export default class PlayerList{
    constructor(id, heldTastingId, socket, options){
        this.container = document.getElementById(id);
        this.heldTastingId = heldTastingId;
        socket.on("player connected", () => this.fetchPlayers());
        this.players = [];
    }

    fetchPlayers(){
        api.get("players", null, {heldTastingId: this.heldTastingId} )
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


    render(){
    }
}
