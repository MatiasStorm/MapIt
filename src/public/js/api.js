class API {
    constructor() {
        this.baseUrl = "/api";
        this.endpoints = {
            user: "users",
            tasting: "tastings",
            rating: "ratings",
            heldTastings: "heldTastings",
            heldTastingRating: "heldTastingRatings",
            player: "players",
            playerRating: "playerRatings",
        };
    }

    _executeFetch(endpoint, method, { data, headers } = {}) {
        const options = {};
        options.method = method;

        if (data) {
            options.body = JSON.stringify(data);
        }
        options.headers = headers || { "Content-Type": "application/json" };

        return fetch(endpoint, options);
    }

    post(endpoint, data) {
        const url = `${this.baseUrl}/${endpoint}`;
        return this._executeFetch(url, "POST", { data });
    }

    get(endpoint, id = null, queryParams = {}) {
        let url = `${this.baseUrl}/${endpoint}/${id || ""}?`;
        console.log(queryParams, url);
        Object.entries(queryParams).forEach(([k, v]) => {
            if (k && v) {
                url += `${k}=${v}&`;
            }
        });
        return this._executeFetch(url, "GET");
    }

    uploadImage(image) {
        const data = new FormData();
        data.append("image", image);
        const endpoint = `${this.baseUrl}/image`;
        return fetch(endpoint, {
            method: "POST",
            body: data,
        });
    }
}

const api = new API();

export default api;
