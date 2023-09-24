"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class HTMLInspector {
    constructor(window) {
        this.filterStyleDeclarations = (selector) => {
            const { window } = this;
            const { document } = window;
            const declarations = Array.from(document.querySelectorAll(selector)).map((element) => window.getComputedStyle(element));
            return declarations;
        };
        this.hasStyleDeclaration = (selector, schema) => {
            const declarations = this.filterStyleDeclarations(selector);
            const schemaEntries = Object.entries(schema);
            if (typeof schema === "function")
                return declarations.some((declaration) => schema(declaration));
            declarations.every((declaration) => schemaEntries.every(([property, schemaValue]) => {
                const value = declaration.getPropertyValue((0, utils_1.kebabize)(property));
                if (typeof schemaValue === "string")
                    return value === schemaValue;
                if (typeof schemaValue === "boolean")
                    return schemaValue ? value !== "" : value === "";
                if (schemaValue instanceof RegExp)
                    return schemaValue.test(value);
                if (typeof schemaValue === "function")
                    return schemaValue(value);
                return false;
            }));
        };
        this.window = window;
    }
}
exports.default = HTMLInspector;
//# sourceMappingURL=index.js.map