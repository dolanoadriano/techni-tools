class JSFnInspector {
  private readonly fn: Function;
  private readonly fnString: string;

  public constructor(fn: Function) {
    this.fn = fn;
    if (typeof fn !== "function") throw new Error("This is not function");
    this.fnString = fn.toString();
  }

  public readonly isArrowFunction = (): boolean => {
    const { fnString } = this;
    return /^(\([^\)]*\))?\s*([^\s]*?)\s*=>/.test(fnString);
  };

  public readonly isFunctionDeclaration = (): boolean => {
    const { fnString } = this;
    return /^function\s/.test(fnString);
  };

  public readonly isFunctionExpression = (): boolean => {
    const { fnString } = this;
    return /^function\s*\(/.test(fnString);
  };

  public readonly hasOnlyLetOrConst = (): boolean => {
    const { fnString } = this;
    const varRegex = /\bvar\b/;
    return !varRegex.test(fnString);
  };

  public readonly hasVariableInCamelCase = (): boolean => {
    const { fnString } = this;
    const regExp =
      /function\s*[a-zA-Z0-9_]*\s*\(([a-zA-Z][a-zA-Z0-9]*)?(\s*[a-zA-Z][a-zA-Z0-9]*\s*(,\s*[a-zA-Z][a-zA-Z0-9]*)*)*\)\s*\{/;
    const regExpArrow =
      /\(\s*([a-zA-Z][a-zA-Z0-9]*)?(\s*[a-zA-Z][a-zA-Z0-9]*\s*(,\s*[a-zA-Z][a-zA-Z0-9]*)*)*\)\s*=>/;

    return regExp.test(fnString) || regExpArrow.test(fnString);
  };

  public readonly hasDefaultParameter = (): boolean => {
    const { fnString } = this;
    const pattern = /\w+\s*=\s*[^,)]+/;
    return pattern.test(fnString);
  };

  public readonly hasConditionalOperator = (): boolean => {
    const { fnString } = this;
    const pattern = /\?[^:]*:/;
    return pattern.test(fnString.toString());
  };
}

export default JSFnInspector;
