const path = require("path");
const router = require("express").Router();
const { authenticateToken } = require("../auth.js");

module.exports = (pagePath, createPage) => {
    router.get("/:id/:pin", (req, res) => {
        const page = createPage(path.join(pagePath, "tasting-room.html"), {
            id: req.params.id,
            pin: req.params.pin
        });
        res.send(page);
    });

    return router;
}
