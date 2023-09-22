"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JSFnInspector {
    fn;
    fnString;
    constructor(fn) {
        this.fn = fn;
        if (typeof fn !== "function")
            throw new Error("This is not function");
        this.fnString = fn.toString();
    }
    isArrowFunction = () => {
        const { fnString } = this;
        return /^(\([^\)]*\))?\s*([^\s]*?)\s*=>/.test(fnString);
    };
    isFunctionDeclaration = () => {
        const { fnString } = this;
        return /^function\s/.test(fnString);
    };
    isFunctionExpression = () => {
        const { fnString } = this;
        return /^function\s*\(/.test(fnString);
    };
    hasOnlyLetOrConst = () => {
        const { fnString } = this;
        const varRegex = /\bvar\b/;
        return !varRegex.test(fnString);
    };
    hasVariableInCamelCase = () => {
        const { fnString } = this;
        const regExp = /function\s*[a-zA-Z0-9_]*\s*\(([a-zA-Z][a-zA-Z0-9]*)?(\s*[a-zA-Z][a-zA-Z0-9]*\s*(,\s*[a-zA-Z][a-zA-Z0-9]*)*)*\)\s*\{/;
        const regExpArrow = /\(\s*([a-zA-Z][a-zA-Z0-9]*)?(\s*[a-zA-Z][a-zA-Z0-9]*\s*(,\s*[a-zA-Z][a-zA-Z0-9]*)*)*\)\s*=>/;
        return regExp.test(fnString) || regExpArrow.test(fnString);
    };
    hasDefaultParameter = () => {
        const { fnString } = this;
        const pattern = /\w+\s*=\s*[^,)]+/;
        return pattern.test(fnString);
    };
    hasConditionalOperator = () => {
        const { fnString } = this;
        const pattern = /\?[^:]*:/;
        return pattern.test(fnString.toString());
    };
}
exports.default = JSFnInspector;
