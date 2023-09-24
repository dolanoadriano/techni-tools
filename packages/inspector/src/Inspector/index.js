"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cssom_1 = require("cssom");
const fs_1 = require("fs");
const jsdom_1 = require("jsdom");
const path_1 = require("path");
const CSSInspector_1 = require("../CSSInspector");
const HTMLInspector_1 = require("../HTMLInspector");
const loadHTML = (paths) => {
    const htmlContent = fs_1.default.readFileSync(path_1.default.resolve(__dirname, ...paths), "utf-8");
    const dom = new jsdom_1.JSDOM(htmlContent);
    const document = dom.window.document;
    const htmlInspector = new HTMLInspector_1.default(dom.window);
    const cssInspector = new CSSInspector_1.default(document.styleSheets);
    return { htmlContent, dom, document, htmlInspector, cssInspector };
};
const loadCSS = (paths) => {
    const cssContent = fs_1.default.readFileSync(path_1.default.resolve(__dirname, ...paths), "utf-8");
    const x = cssom_1.default.parse(cssContent);
    x.cssRules.map((x) => x);
};
loadHTML(["..", "index.html"]);
//# sourceMappingURL=index.js.map