const router = require("express").Router();
const { authenticate } = require("../auth");
const { where, col, Association } = require("sequelize");
const {
    Tasting,
    HeldTasting,
    HeldTastingRating,
    HeldTastingItem,
    Rating,
    TastingItem,
} = require("../models");

function generatePin() {
    const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const length = 6;
    let pin = "";
    for (i = 0; i < length; i++) {
        pin += values[Math.floor(Math.random() * (values.length - 1))];
    }
    return pin;
}

router.get("/:id", async (req, res) => { 
    const heldTasting = await HeldTasting.findByPk(req.params.id, {
        include: 
            {
                model: HeldTastingItem,
                on: {
                    id: where(col("heldTasting.id"), "=", col("heldTastingItems.heldTastingId")),
                    position: where(col("heldTasting.currentItemPosition"), "=", col("heldTastingItems.position"))
                },
            }
    });
    res.json(heldTasting);
});

router.post("/", authenticate, async (req, res) => {
    const userId = req.user.id;
    const { tastingId } = req.body;

    const tasting = await Tasting.findOne({
        where: {
            id: tastingId,
        },
        include: [
            TastingItem,
            Rating,
        ],
    });

    const pin = generatePin();

    const heldTasting = await HeldTasting.create({
        title: tasting.title,
        userId,
        pin,
        imagePath: tasting.imagePath,
    });

    for (const item of tasting.tastingItems) {
        await HeldTastingItem.create({
            title: item.title,
            imagePath: item.imagePath,
            userId,
            description: item.description,
            position: item.position,
            heldTastingId: heldTasting.id,
        });
    }

    for (const rating of tasting.ratings) {
        await HeldTastingRating.create({
            title: rating.title,
            position: rating.position,
            heldTastingId: heldTasting.id,
            userId,
        });
    }

    return res.redirect(`/tasting/${heldTasting.id}/${heldTasting.pin}`);
});

module.exports = router;
