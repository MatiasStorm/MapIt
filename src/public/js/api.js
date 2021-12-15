class API {
    constructor(){
        this.baseUrl = "/api";
        this.endpoints = {
            user: "/users",
            tasting: "/tastings",
            rating: "/ratings",
        };
    }

    __executeFetch(endpoint, method, {data, headers} = {}){
        const options = {};
        options.method = method;

        if(data){
            options.body = JSON.stringify(data);
        }
        options.headers = headers || {"Content-Type": "application/json"};
        
        return fetch(endpoint, options);
    }

    post(endpoint, data){
        return this.__executeFetch( this.baseUrl + endpoint, "POST", { data });
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
