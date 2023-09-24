"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadHTML = exports.extractFontsFromGoogleFontsUrl = exports.JSInspector = exports.HTMLInspector = exports.CSSInspector = void 0;
const fs_1 = require("fs");
const jsdom_1 = require("jsdom");
const path_1 = require("path");
const CSSInspector_1 = require("./CSSInspector");
const HTMLInspector_1 = require("./HTMLInspector");
var CSSInspector_2 = require("./CSSInspector");
Object.defineProperty(exports, "CSSInspector", { enumerable: true, get: function () { return CSSInspector_2.default; } });
var HTMLInspector_2 = require("./HTMLInspector");
Object.defineProperty(exports, "HTMLInspector", { enumerable: true, get: function () { return HTMLInspector_2.default; } });
var JSInspector_1 = require("./JSInspector");
Object.defineProperty(exports, "JSInspector", { enumerable: true, get: function () { return JSInspector_1.default; } });
const extractFontsFromGoogleFontsUrl = (url) => {
    if (!url)
        return undefined;
    if (!url.startsWith("https://fonts.googleapis.com/css2?"))
        return undefined;
    const fontPattern = /family=([^&:]+)/g;
    return Array.from(url.matchAll(fontPattern)).map((match) => decodeURIComponent(match[1].replace(/\+/g, " ")));
};
exports.extractFontsFromGoogleFontsUrl = extractFontsFromGoogleFontsUrl;
const loadHTML = (paths) => {
    const htmlContent = fs_1.default.readFileSync(path_1.default.resolve(__dirname, ...paths), "utf-8");
    const dom = new jsdom_1.JSDOM(htmlContent);
    const document = dom.window.document;
    const htmlInspector = new HTMLInspector_1.default(dom.window);
    const cssInspector = new CSSInspector_1.default(document.styleSheets);
    return { htmlContent, dom, document, htmlInspector, cssInspector };
};
exports.loadHTML = loadHTML;
//# sourceMappingURL=index.js.map