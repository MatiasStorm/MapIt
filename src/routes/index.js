const path = require("path");
const fs = require("fs");
const router = require("express").Router();

const pagePath = path.join(__dirname, "../pages");


function createPage(filePath, options){
    const page = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>%%DOCUMENT_TITLE%%</title>
            <link rel="stylesheet" href="/css/tailwind.css">
        </head>
            ${fs.readFileSync(filePath)}
        </html>
    `;
    page.replace("%%DOCUMENT_TITLE%%", !options?.title ? "Tastr" : "Tastr - " + options.title);
    return page;
}

router.get("/", (req, res) => {
    res.send(createPage(pagePath + "/index.html"));
})

router.use("/user", require("./user")(pagePath, createPage));


module.exports = router;


