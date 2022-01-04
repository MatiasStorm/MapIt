const path = require("path");
const router = require("express").Router();
const { Op } = require("sequelize");
const { HeldTasting } = require("../models");
const { authorize } = require("../auth");

module.exports = (pagePath, createPage) => {
    router.get("/:id/:pin", authorize, (req, res) => {
        let isOwner = false;
        if (req.user) {
            isOwner = HeldTasting.findOne({
                where: {
                    [Op.and]: [
                        { id: req.params.id },
                        { userId: req.user.id },
                    ],
                },
            }) !== null;
        }
        let file;
        if (isOwner) {
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
