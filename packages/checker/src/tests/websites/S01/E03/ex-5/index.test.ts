import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E03] Exercise 5`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should have the 'red' element text aligned to 'right'", () => {
    const redElement = ctx.document.querySelector("#red");
    const computedStyle = ctx.document.defaultView!.getComputedStyle(
      redElement!
    );

    expect(computedStyle.getPropertyValue("text-align")).to.equal("right");
  });

  it("should have the 'green' element text aligned to 'center'", () => {
    const greenElement = ctx.document.querySelector("#green");
    const computedStyle = ctx.document.defaultView!.getComputedStyle(
      greenElement!
    );

    expect(computedStyle.getPropertyValue("text-align")).to.equal("center");
  });

  it("should have the 'blue' element text aligned to 'left'", () => {
    const blueElement = ctx.document.querySelector("#blue");
    const computedStyle = ctx.document.defaultView!.getComputedStyle(
      blueElement!
    );

    expect(computedStyle.getPropertyValue("text-align")).to.equal("left");
  });
});
