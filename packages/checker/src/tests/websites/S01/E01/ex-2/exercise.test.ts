import {
  CSSInspector,
  HTMLInspector,
  setupHTMLTestContext,
} from "@techni-tools/inspector";

const exerciseNumber = 2;

describe(`Exercise ${exerciseNumber}`, () => {
  let document: Document;
  let cssInspector: CSSInspector;

  /*beforeAll(() => {
    const result = loadHTML([
      "..",
      "..",
      "exercises",
      `exercise-${exerciseNumber}`,
      "index.html",
    ]);
    document = result.document;
    cssInspector = result.cssInspector;
  });

  it("XXX should have an <h1> element in the <body>", () => {
    const h1Element = document.querySelector("body > h1");
    expect(h1Element).not.toBeNull();
  });

  it("should have an <p> element in the <body>", () => {
    const pElement = document.querySelector("body > p");
    expect(pElement).not.toBeNull();
  });

  it("should have a CSS rule for the 'h1' selector with a font-size of 50px", () => {
    expect(
      cssInspector.hasStyleDeclaration("h1", {
        fontSize: (value) => value === "50px",
      })
    ).toBe(true);
  });

  it("should have a CSS rule for the 'h1' selector with text-transform set to uppercase", () => {
    const h1Rule = findCssRuleBySelector("h1");
    expect(h1Rule?.style.getPropertyValue("text-transform")).toBe("uppercase");
  });

  it("should have a CSS rule for the 'h1' selector with a letter-spacing of 5px", () => {
    const h1Rule = findCssRuleBySelector("h1");
    expect(h1Rule?.style.getPropertyValue("letter-spacing")).toBe("5px");
  });

  it("should have a CSS rule for the 'p' selector with a line-height of 25px", () => {
    const pRule = findCssRuleBySelector("p");
    expect(pRule?.style.getPropertyValue("line-height")).toBe("25px");
  });*/
});
