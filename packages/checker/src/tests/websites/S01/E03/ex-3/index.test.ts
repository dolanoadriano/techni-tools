import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E03] Exercise 3`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should have a CSS rule for the 'h1' selector with a font-family of 'CoreCircus, sans-serif'", () => {
    const expectedFonts = ["CoreCircus", "sans-serif"];

    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      fontFamily: (value) =>
        expectedFonts.every((expectedFont) => value.includes(expectedFont)),
    });

    expect(isValidDeclaration).to.be.true;
  });

  it("should have a CSS rule for the 'h1' selector with a color of '#f98ca4'", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      color: "#f98ca4",
    });

    expect(isValidDeclaration).to.be.true;
  });

  it("should have a CSS rule for the 'h1' selector with text-transform set to uppercase", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      textTransform: "uppercase",
    });

    expect(isValidDeclaration).to.be.true;
  });

  it("should have a CSS rule for the 'h1' selector with a font-size of 70px", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      fontSize: "70px",
    });

    expect(isValidDeclaration).to.be.true;
  });

  it("should have a CSS rule for the 'h1' selector with a line-height of 70px", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      lineHeight: "70px",
    });

    expect(isValidDeclaration).to.be.true;
  });

  it("should have a CSS rule for the 'h1' selector with text aligned to center", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      textAlign: "center",
    });

    expect(isValidDeclaration).to.be.true;
  });

  it("should have a CSS rule for the 'h1' selector with the specified text shadow", () => {
    const expectedShadowValues = [
      "-1px -1px 0 #6e1f58",
      "1px -1px 0 #6e1f58",
      "-1px 1px 0 #6e1f58",
      "1px 1px 0 #6e1f58",
      "1px 0px 0px #65f283",
      "0px 1px 0px #65f283",
      "2px 1px 0px #65f283",
      "1px 2px 0px #65f283",
      "3px 2px 0px #65f283",
      "2px 3px 0px #65f283",
      "4px 3px 0px #65f283",
      "3px 4px 0px #65f283",
      "5px 4px 0px #65f283",
      "3px 5px 0px #6e1f58",
      "6px 5px 0px #6e1f58",
      "-1px 2px 0 black",
      "0 3px 0 #6e1f58",
      "1px 4px 0 #6e1f58",
      "2px 5px 0px #6e1f58",
      "2px -1px 0 #6e1f58",
      "3px 0 0 #6e1f58",
      "4px 1px 0 #6e1f58",
      "5px 2px 0px #6e1f58",
      "6px 3px 0 #6e1f58",
      "7px 4px 0 #6e1f58",
      "10px 10px 4px #dac249",
    ];
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("h1", {
      textShadow: (value) =>
        expectedShadowValues.every((expectedShadowValue) =>
          value.includes(expectedShadowValue)
        ),
    });

    expect(isValidDeclaration).to.be.true;
  });
});
