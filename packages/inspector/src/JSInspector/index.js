"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JSFnInspector {
    constructor(fn) {
        this.isArrowFunction = () => {
            const { fnString } = this;
            return /^(\([^\)]*\))?\s*([^\s]*?)\s*=>/.test(fnString);
        };
        this.isFunctionDeclaration = () => {
            const { fnString } = this;
            return /^function\s/.test(fnString);
        };
        this.isFunctionExpression = () => {
            const { fnString } = this;
            return /^function\s*\(/.test(fnString);
        };
        this.hasOnlyLetOrConst = () => {
            const { fnString } = this;
            const varRegex = /\bvar\b/;
            return !varRegex.test(fnString);
        };
        this.hasVariableInCamelCase = () => {
            const { fnString } = this;
            const regExp = /function\s*[a-zA-Z0-9_]*\s*\(([a-zA-Z][a-zA-Z0-9]*)?(\s*[a-zA-Z][a-zA-Z0-9]*\s*(,\s*[a-zA-Z][a-zA-Z0-9]*)*)*\)\s*\{/;
            const regExpArrow = /\(\s*([a-zA-Z][a-zA-Z0-9]*)?(\s*[a-zA-Z][a-zA-Z0-9]*\s*(,\s*[a-zA-Z][a-zA-Z0-9]*)*)*\)\s*=>/;
            return regExp.test(fnString) || regExpArrow.test(fnString);
        };
        this.hasDefaultParameter = () => {
            const { fnString } = this;
            const pattern = /\w+\s*=\s*[^,)]+/;
            return pattern.test(fnString);
        };
        this.hasConditionalOperator = () => {
            const { fnString } = this;
            const pattern = /\?[^:]*:/;
            return pattern.test(fnString.toString());
        };
        this.fn = fn;
        if (typeof fn !== "function")
            throw new Error("This is not function");
        this.fnString = fn.toString();
    }
}
exports.default = JSFnInspector;
//# sourceMappingURL=index.js.map