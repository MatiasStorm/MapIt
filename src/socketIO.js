const http = require("http");
const { Server } = require("socket.io");
const cookie = require("cookie");
const { Op } = require("sequelize");
const { authorizeSocket: authorize } = require("./auth");
const {
    Player, HeldTasting, HeldTastingItem, HeldTastingRating,
} = require("./models");

function parseCookie(socket, next) {
    if (socket.cookies) {
        return next();
    }
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
        return next();
    }

    socket.cookies = cookie.parse(cookies);
    next();
}

async function getNextTastingItem(id) {
    const heldTasting = await HeldTasting.findByPk(id);
    if (!heldTasting.currentItemPosition) {
        heldTasting.currentItemPosition = 1;
    } else {
        heldTasting.currentItemPosition += 1;
    }

    await heldTasting.save();

    const item = await HeldTastingItem.findOne({
        where: {
            [Op.and]: [
                { position: heldTasting.currentItemPosition },
                { heldTastingId: heldTasting.id },
            ],
        },
    });

    return item;
}

module.exports = (app) => {
    const server = http.createServer(app);

    const io = new Server(server);
    const room = io.of(/^\/[0-9]{6}/); // HeldTasting-pin namespace

    room.use(parseCookie);
    room.use(async (socket, next) => { await authorize(socket, next); });

    room.on("connection", (socket) => {
        console.log("connected");

        room.emit("player connected");

        socket.on("next", async (heldTasting) => {
            if (socket.user) {
                const item = await getNextTastingItem(heldTasting.id);
                if (item) {
                    room.emit("next", item);
                } else {
                    // set heldTasting active to false.
                    room.emit("end");
                }
            } else {
                console.log("Not allowed");
            }
        });
    });

    return server;
};
