const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    console.log("AUTHENTICATING");
    const authCookie = req.cookies.auth;
    console.log(authCookie);
    const token = authCookie?.split(" ")[1];
    if (token === undefined) {
        return res.redirect(301, "/login");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

function signToken(user){
    const data = {
        username: user.username,
        id: user.id,
    };
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    return "baerer " + accessToken;
}

module.exports = {
    authenticateToken,
    signToken
};
