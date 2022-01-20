const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const authCookie = req.cookies.auth;
    const token = authCookie?.split(" ")[1];
    if (token === undefined) {
        return res.redirect(301, "/login");
    }
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

async function authorizeSocket(socket, next) {
    const authCookie = socket.cookies?.auth;
    const token = authCookie?.split(" ")[1];
    if (token === undefined) {
        return next();
    }
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            next();
        }
        socket.user = user;
        next();
    });
}

function authorize(req, res, next) {
    const authCookie = req.cookies.auth;
    const token = authCookie?.split(" ")[1];
    if (token === undefined) {
        return next();
    }
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            next();
        }
        req.user = user;
        next();
    });
}

function signToken(user) {
    const data = {
        username: user.username,
        id: user.id,
    };
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    return `Bearer ${accessToken}`;
}

module.exports = {
    authenticate,
    authorize,
    authorizeSocket,
    signToken,
};
