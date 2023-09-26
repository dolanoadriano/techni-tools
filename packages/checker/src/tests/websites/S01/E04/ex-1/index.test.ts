import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E04] Exercise 1`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should style the .box class correctly", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration(".box", {
      padding: "40px",
      margin: "5px",
      border: "10px solid rgb(200, 169, 46)",
    });

    expect(isValidDeclaration).to.true;
  });

  const idsWithBorderStyle = [
    ["#john", "solid"],
    ["#alice", "dashed"],
    ["#bob", "dotted"],
    ["#marc", "double"],
    ["#mary", "groove"],
    ["#ahmed", "ridge"],
    ["#sophie", "inset"],
    ["#lily", "outset"],
    ["#mario", "none"],
  ];

  idsWithBorderStyle.forEach(([selector, style]) => {
    it(`should style the ${selector} correctly`, () => {
      const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration(
        selector,
        { borderStyle: style }
      );

      expect(isValidDeclaration).to.true;
    });
  });

  it("should style #john, #alice, #bob with the correct border-color", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration(
      "#john, #alice, #bob",
      { borderColor: "rgb(255, 91, 91)" }
    );

    expect(isValidDeclaration).to.true;
  });

  it("should style #marc, #mary, #ahmed with the correct border-color", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration(
      "#marc, #mary, #ahmed",
      { borderColor: "rgb(119, 95, 236)" }
    );

    expect(isValidDeclaration).to.true;
  });

  it("should style #sophie, #lily, #mario with the correct border-color", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration(
      "#sophie, #lily, #mario",
      { borderColor: "rgb(97, 255, 69)" }
    );

    expect(isValidDeclaration).to.true;
  });
});
