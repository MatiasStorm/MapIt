const path = require("path");
const router = require("express").Router();
const {HeldTasting} = require("../models");
const { authorize } = require("../auth");
const { Op } = require("sequelize");

module.exports = (pagePath, createPage) => {
    router.get("/:id/:pin", authorize, (req, res) => {
        let isOwner = false;
        if(req.user){
            isOwner = HeldTasting.findOne({
                where: {
                    [Op.and] : [
                        { id: req.params.id },
                        { userId: req.user.id }
                    ]
                }
            }) !== null;
        }
        const page = createPage(path.join(pagePath, "tasting-room.html"), {
            id: req.params.id,
            pin: req.params.pin,
            isOwner
        });
        res.send(page);
    });

    return router;
};
