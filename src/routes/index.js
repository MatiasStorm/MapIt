const path = require("path");
const fs = require("fs");
const router = require("express").Router();

const pagePath = path.join(__dirname, "../templates/pages");
const componentPath = path.join(__dirname, "../templates/components");

const head = fs.readFileSync(`${componentPath}/head.html`);
const tail = fs.readFileSync(`${componentPath}/tail.html`);

function createPage(filePath, options = { title: "Tastr" }) {
    const values = { ...options };
    let page = `
        ${head}
        ${fs.readFileSync(filePath)}
        ${tail}
    `;

    if (options.title !== "Tastr") {
        values.title = `Tastr - ${options.title}`;
    }

    Object.keys(values).forEach((key) => {
        page = page.replaceAll(`{{${key}}}`, values[key]);
    });
    return page;
}

router.get("/", (req, res) => {
    res.send(createPage(`${pagePath}/index.html`));
});

router.use("/user", require("./user")(pagePath, createPage));

module.exports = router;
