const http = require("http");
const { Server } = require("socket.io");
const { authorizeSocket: authorize } = require("./auth");
const cookie = require('cookie')
const { Player } = require("./models");


function parseCookie(socket, next){
    if(socket.cookies){
        return next();
    }
    const cookies = socket.handshake.headers.cookie;

    if(!cookies){
        return next();
    }

    socket.cookies = cookie.parse(cookies);
    next();
}

module.exports = (app) => {
    const server = http.createServer(app);

    const io = new Server(server);
    const room = io.of(/^\/[0-9]{8}/); // HeldTasting-pin namespace

    room.use(parseCookie);
    room.use(async (socket, next) => {await authorize(socket, next)});

    room.on("connection", (socket) => {

        room.emit("player connected");

        socket.on("next", () => {
            if(socket.user){
                console.log("Display next wine");
            }
            else {
                console.log("Not allowed");
            }
        });
    });
    
    return server;
};
