import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E04] Exercise 2`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should style the #parent element correctly", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration("#parent", {
      border: "5px solid rgb(255, 35, 145)",
      width: "200px",
      height: "200px",
    });

    expect(isValidDeclaration).to.true;
  });

  it("should style the .child element correctly", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration(".child", {
      border: "5px solid rgb(20, 194, 238)",
      width: "100%",
      height: "100%",
      padding: "20%",
    });

    expect(isValidDeclaration).to.true;
  });

  it(".child element should use box-sizing: border-box", () => {
    const isValidDeclaration = ctx.cssInspector.hasStyleDeclaration(".child", {
      boxSizing: "border-box",
    });

    expect(isValidDeclaration).to.true;
  });
});
