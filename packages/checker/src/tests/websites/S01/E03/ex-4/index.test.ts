import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E03] Exercise 4`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should have the 'main-text' element styled correctly", () => {
    const mainText = ctx.document.querySelector("#main-text");
    const computedStyle = ctx.document.defaultView!.getComputedStyle(mainText!);

    expect(computedStyle.getPropertyValue("font-size")).to.equal("100px");
    expect(computedStyle.getPropertyValue("font-weight")).to.equal("bold");
    expect(computedStyle.getPropertyValue("letter-spacing")).to.equal("7px");
  });

  it("should have the 'star-1' and 'star-5' elements styled correctly", () => {
    ["star-1", "star-5"].forEach((id) => {
      const starElement = ctx.document.querySelector(`#${id}`);
      const computedStyle = ctx.document.defaultView!.getComputedStyle(
        starElement!
      );

      expect(computedStyle.getPropertyValue("font-size")).to.equal("40px");
    });
  });

  it("should have the 'star-2' and 'star-4' elements styled correctly", () => {
    ["star-2", "star-4"].forEach((id) => {
      const starElement = ctx.document.querySelector(`#${id}`);
      const computedStyle = ctx.document.defaultView!.getComputedStyle(
        starElement!
      );

      expect(computedStyle.getPropertyValue("font-size")).to.equal("60px");
    });
  });

  it("should have the 'star-3' element styled correctly", () => {
    const star3Element = ctx.document.querySelector("#star-3");
    const computedStyle = ctx.document.defaultView!.getComputedStyle(
      star3Element!
    );

    expect(computedStyle.getPropertyValue("font-size")).to.equal("80px");
  });

  it("should have the 'stars' and 'main-text' elements with the correct text shadow", () => {
    ["stars", "main-text"].forEach((id) => {
      const element = ctx.document.querySelector(`#${id}`);
      const computedStyle = ctx.document.defaultView!.getComputedStyle(
        element!
      );
      const expectedShadowValues = ["-6px 0 red", "6px 0 cyan"];
      const shadowValue = computedStyle.getPropertyValue("text-shadow").trim();

      expect(
        expectedShadowValues.every((expectedShadowValue) =>
          shadowValue.includes(expectedShadowValue)
        )
      ).to.equal(true);
    });
  });
});
