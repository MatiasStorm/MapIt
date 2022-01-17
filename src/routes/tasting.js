const path = require("path");
const router = require("express").Router();
const { Op } = require("sequelize");
const { HeldTasting } = require("../models");
const { authorize } = require("../auth");

module.exports = (pagePath, createPage) => {
    router.get("/:id/:pin", authorize, async (req, res) => {
        const heldTasting = await HeldTasting.findOne({
            where: { id: req.params.id },
        });
        let file;
        if (!heldTasting.isActive) {
            file = "held-tasting.html";
        } else if (heldTasting.userId === req.user?.id) {
            file = "tasting-room-user.html";
        } else {
            file = "tasting-room-player.html";
        }
        const page = createPage(path.join(pagePath, file), {
            id: req.params.id,
            pin: req.params.pin,
        });
        res.send(page);
    });

    return router;
};
