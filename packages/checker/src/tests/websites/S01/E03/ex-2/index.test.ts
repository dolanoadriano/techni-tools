import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E03] Exercise 2`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should have an <h1> element in the <body>", () => {
    const h1Element = ctx.document.querySelector("body > h1");
    expect(h1Element).not.null;
  });

  it("should have an <p> element in the <body>", () => {
    const pElement = ctx.document.querySelector("body > p");
    expect(pElement).not.null;
  });

  it("should have a CSS rule for the 'h1' selector with a font-size of 50px", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      fontSize: "50px",
    });

    expect(isValidDeclaration).to.true;
  });

  it("should have a CSS rule for the 'h1' selector with text-transform set to uppercase", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      textTransform: "uppercase",
    });

    expect(isValidDeclaration).to.true;
  });

  it("should have a CSS rule for the 'h1' selector with a letter-spacing of 5px", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      letterSpacing: "5px",
    });

    expect(isValidDeclaration).to.true;
  });

  it("should have a CSS rule for the 'p' selector with a line-height of 25px", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("p", {
      lineHeight: "25px",
    });

    expect(isValidDeclaration).to.true;
  });
});
