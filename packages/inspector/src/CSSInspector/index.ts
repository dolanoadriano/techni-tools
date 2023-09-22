import { kebabize } from "../utils";
import { StyleDeclarationSchema } from "./types";

class CSSInspector {
  private readonly styleSheets: Document["styleSheets"];

  public constructor(styleSheets: Document["styleSheets"]) {
    this.styleSheets = styleSheets;
  }

  public readonly filterStyleRules = (
    selector: CSSStyleRule["selectorText"]
  ): CSSStyleRule[] => {
    const { styleSheets } = this;
    const cssStyleSheets = Array.from(styleSheets);
    const filterRules = cssStyleSheets
      .map(({ cssRules }) => Array.from(cssRules))
      .flat()
      .filter((cssRule): cssRule is CSSStyleRule => "selectorText" in cssRule)
      .filter(({ selectorText }) => selectorText === selector);

    return filterRules;
  };

  public readonly filterStyleDeclarations = (
    selector: CSSStyleRule["selectorText"]
  ): CSSStyleDeclaration[] => {
    const styleRules = this.filterStyleRules(selector);
    return styleRules?.map(({ style }) => style);
  };

  public readonly hasStyleDeclaration = (
    selector: CSSStyleRule["selectorText"],
    schema:
      | StyleDeclarationSchema
      | ((declaration: CSSStyleDeclaration) => boolean),
    options?: { exact?: boolean; onlySingleRule?: boolean }
  ) => {
    const { exact, onlySingleRule } = options ?? {};
    const declarations = this.filterStyleDeclarations(selector);
    if (!declarations) return false;
    if (!declarations.length) return false;
    if (onlySingleRule && declarations.length > 1) return false;
    if (typeof schema === "function")
      return declarations.some((declaration) => schema(declaration));

    const schemaEntries = Object.entries(schema);

    const validateDeclaration = (declaration: CSSStyleDeclaration): boolean => {
      if (exact && schemaEntries.length !== declaration.length) return false;

      return schemaEntries.every(([property, schemaValue]) => {
        const value = declaration.getPropertyValue(kebabize(property));
        if (typeof schemaValue === "string") return value === schemaValue;
        if (typeof schemaValue === "boolean")
          return schemaValue ? value !== "" : value === "";
        if (schemaValue instanceof RegExp) return schemaValue.test(value);
        if (typeof schemaValue === "function") return schemaValue(value);
        return false;
      });
    };

    return declarations.some(validateDeclaration);
  };
}

export default CSSInspector;
