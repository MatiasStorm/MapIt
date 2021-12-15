const router = require("express").Router();
const fileUpload = require("express-fileupload");
const { upload } = require("../s3");

router.use(fileUpload());

router.post("/", async (req, res) => {
    if (!req.files?.image) {
        return res.status(400).send("No files were uploaded.");
    }
    const { image } = req.files;
    try {
        const imagePath = await upload(image.name, image.data);
        return res.json({ imagePath });
    } catch (err) {
        return res.status(400).send("Failed uploading image");
    }
});

module.exports = router;
