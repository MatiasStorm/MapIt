const fs = require("fs");
const path = require("path");

class Templater {
    constructor({
        componentPath,
    }) {
        this.componentPath = componentPath;
        this.components = {};
    }

    getComponent(name) {
        if (this.components[name]) {
            return this.components[name];
        }
        const filePath = path.join(this.componentPath, `${name.replaceAll(".", "/")}.html`);
        let component = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
        component = component.split("??");
        this.components[name] = component.length === 1 ? {
            start: component[0],
        } : {
            start: component[0],
            end: component[1],
        };
        return this.components[name];
    }

    compile(filePath, vars = { }) {
        let template = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
        const ast = this.parse(template);
        ast.forEach((c) => {
            const component = this.getComponent(c.name);
            if (c.type === "start" || c.type === "inclusive") {
                template = template.replace(c.match, component.start);
            } else if (c.type === "end") {
                template = template.replace(c.match, component.end);
            }
        });

        const variables = { ...vars };
        variables.title = variables.title || "Tastr";

        if (variables.title !== "Tastr") {
            variables.title = `Tastr - ${variables.title}`;
        }

        return Object.keys(variables).reduce((prev, varName) => prev.replaceAll(`{{${varName}}}`, variables[varName]), template);
    }

    parse(template) {
        const componentRegex = /%%(.*?)%%/g;
        let result = componentRegex.exec(template);
        const ast = [];
        let componentName;
        let match;
        let type;

        while (result) {
            [match, componentName] = result;
            if (componentName.endsWith("/")) {
                componentName = componentName.replace("/", "");
                type = "inclusive";
            } else if (componentName.startsWith("/")) {
                componentName = componentName.replace("/", "");
                type = "end";
            } else {
                type = "start";
            }

            ast.push({
                name: componentName,
                startIndex: result.index,
                endIndex: result.index + match.length,
                type,
                match,
            });
            result = componentRegex.exec(template);
        }

        return ast;
    }
}

module.exports = (options) => new Templater(options);
