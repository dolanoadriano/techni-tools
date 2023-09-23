import { DOMWindow } from "jsdom";

import { StyleDeclarationSchema } from "../CSSInspector/types";
import { kebabize } from "../utils";

class HTMLInspector {
  private readonly window: DOMWindow;

  public constructor(window: DOMWindow) {
    this.window = window;
  }

  public readonly filterStyleDeclarations = (
    selector: CSSStyleRule["selectorText"]
  ) => {
    const { window } = this;
    const { document } = window;
    const declarations = Array.from(document.querySelectorAll(selector)).map(
      (element) => window.getComputedStyle(element)
    );
    return declarations;
  };

  public readonly hasStyleDeclaration = (
    selector: CSSStyleRule["selectorText"],
    schema:
      | StyleDeclarationSchema
      | ((declaration: CSSStyleDeclaration) => boolean)
  ) => {
    const declarations = this.filterStyleDeclarations(selector);
    const schemaEntries = Object.entries(schema);
    if (typeof schema === "function")
      return declarations.some((declaration) => schema(declaration));

    declarations.every((declaration) =>
      schemaEntries.every(([property, schemaValue]) => {
        const value = declaration.getPropertyValue(kebabize(property));
        if (typeof schemaValue === "string") return value === schemaValue;
        if (typeof schemaValue === "boolean")
          return schemaValue ? value !== "" : value === "";
        if (schemaValue instanceof RegExp) return schemaValue.test(value);
        if (typeof schemaValue === "function") return schemaValue(value);
        return false;
      })
    );
  };
}

export default HTMLInspector;
