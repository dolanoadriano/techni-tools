import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E03] Exercise 6`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should have the 'a' elements pointing to the right URLs", () => {
    const anchorElements = ctx.document.querySelectorAll("a");

    anchorElements.forEach((element) => {
      const computedStyle = ctx.document.defaultView!.getComputedStyle(element);
      expect(computedStyle.getPropertyValue("text-decoration")).to.equal(
        "none"
      );
    });

    const tikTokElement = ctx.document.querySelector("a:nth-child(1)");
    expect(
      tikTokElement?.getAttribute("href")?.includes("tiktok.com")
    ).to.equal(true);

    const instagramElement = ctx.document.querySelector("a:nth-child(2)");
    expect(
      instagramElement?.getAttribute("href")?.includes("instagram.com")
    ).to.equal(true);

    const facebookElement = ctx.document.querySelector("a:nth-child(3)");
    expect(
      facebookElement?.getAttribute("href")?.includes("facebook.com")
    ).to.equal(true);
  });

  it("should have the 'a' elements styled without text decoration", () => {
    const anchorElements = ctx.document.querySelectorAll("a");
    anchorElements.forEach((element) => {
      const computedStyle = ctx.document.defaultView!.getComputedStyle(element);
      expect(computedStyle.getPropertyValue("text-decoration")).to.equal(
        "none"
      );
    });
  });
});
