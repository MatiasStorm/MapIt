const router = require("express").Router();
const fileUpload = require("express-fileupload");
const { upload } = require("../s3");

router.use(fileUpload());

router.post("/", async (req, res) => {
    if(!req.files?.image){
        return res.status(400).send("No files were uploaded.");
    }
    const image = req.files.image;
    try {
        const imagePath = await upload(image.name, image.data);
        res.json({imagePath});
    }
    catch(err){
        res.status(400).send("Failed uploading image");
    }
})

module.exports = router;
