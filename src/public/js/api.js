class API {
    constructor(){
        this.baseUrl = "/api";
        this.endpoints = {
            user: "/users",
            tasting: "/tastings",
            rating: "/ratings",
        };
    }

    __executeFetch(endpoint, data, method, headers){
        return fetch(endpoint, {
            method,
            body: JSON.stringify(data),
            headers: headers || {
                "Content-Type": "application/json"
            }
        });
    }

    post(endpoint, data){
        return this.__executeFetch(this.baseUrl + endpoint, data, "POST");
    }

    get(endpoint){
        return this.__executeFetch(this.baseUrl + endpoint, "GET");
    }

    uploadImage(image){
        const data = new FormData();
        data.append("image", image);
        const endpoint = this.baseUrl + "/image";
        return fetch(endpoint, {
            method: "POST",
            body: data,
        });
    }
}

const api = new API();

export default api;
