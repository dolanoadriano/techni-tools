"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class CSSInspector {
    constructor(styleSheets) {
        this.filterStyleRules = (selector) => {
            const { styleSheets } = this;
            const cssStyleSheets = Array.from(styleSheets);
            const filterRules = cssStyleSheets
                .map(({ cssRules }) => Array.from(cssRules))
                .flat()
                .filter((cssRule) => "selectorText" in cssRule)
                .filter(({ selectorText }) => selectorText === selector);
            return filterRules;
        };
        this.filterStyleDeclarations = (selector) => {
            const styleRules = this.filterStyleRules(selector);
            return styleRules === null || styleRules === void 0 ? void 0 : styleRules.map(({ style }) => style);
        };
        this.hasStyleDeclaration = (selector, schema, options) => {
            const { exact, onlySingleRule } = options !== null && options !== void 0 ? options : {};
            const declarations = this.filterStyleDeclarations(selector);
            if (!declarations)
                return false;
            if (!declarations.length)
                return false;
            if (onlySingleRule && declarations.length > 1)
                return false;
            if (typeof schema === "function")
                return declarations.some((declaration) => schema(declaration));
            const schemaEntries = Object.entries(schema);
            const validateDeclaration = (declaration) => {
                if (exact && schemaEntries.length !== declaration.length)
                    return false;
                return schemaEntries.every(([property, schemaValue]) => {
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
                });
            };
            return declarations.some(validateDeclaration);
        };
        this.styleSheets = styleSheets;
    }
}
exports.default = CSSInspector;
//# sourceMappingURL=index.js.map