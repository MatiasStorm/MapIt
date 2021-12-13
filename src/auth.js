const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    authCookie = req.cookies.auth;
    const token = authCookie?.split(" ")[1];
    if (token === undefined) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};
