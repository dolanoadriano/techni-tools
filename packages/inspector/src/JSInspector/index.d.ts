declare class JSFnInspector {
    private readonly fn;
    private readonly fnString;
    constructor(fn: Function);
    readonly isArrowFunction: () => boolean;
    readonly isFunctionDeclaration: () => boolean;
    readonly isFunctionExpression: () => boolean;
    readonly hasOnlyLetOrConst: () => boolean;
    readonly hasVariableInCamelCase: () => boolean;
    readonly hasDefaultParameter: () => boolean;
    readonly hasConditionalOperator: () => boolean;
}
export default JSFnInspector;
