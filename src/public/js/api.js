class API {
    constructor() {
        this.baseUrl = "/api";
        this.endpoints = {
            user: "users",
            tasting: "tastings",
            rating: "ratings",
            heldTastings: "heldTastings",
            heldTastingItem: "heldTastingItems",
            heldTastingRating: "heldTastingRatings",
            player: "players",
            playerRating: "playerRatings",
        };
    }

    executeFetch(endpoint, method, { data, headers } = {}) {
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
        return this.executeFetch(url, "POST", { data });
    }

    get(endpoint, id = null, queryParams = {}) {
        let url = `${this.baseUrl}/${endpoint}/${id || ""}?`;
        Object.entries(queryParams).forEach(([k, v]) => {
            if (k && v) {
                url += `${k}=${v}&`;
            }
        });
        return this.executeFetch(url, "GET");
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
