import {
  HTMLTestContext,
  extractFontsFromGoogleFontsUrl,
  setupHTMLTestContext,
} from "@techni-tools/inspector";
import { expect } from "chai";
import { before, describe } from "mocha";
import path from "path";

describe(`[SI][S01][E03] Exercise 1`, () => {
  let ctx: HTMLTestContext;

  before(() => {
    ctx = setupHTMLTestContext(path.resolve(process.cwd(), "..", "index.html"));
  });

  it("should have an <h1> element in the <body>", () => {
    const h1Element = ctx.document.querySelector("body > h1");
    expect(h1Element).not.null;
  });

  it("should have an <span> element in the <body>", () => {
    const spanElement = ctx.document.querySelector("body > span");
    expect(spanElement).not.null;
  });

  it("should have a text inside <h1> and <span>", () => {
    const h1Element = ctx.document.querySelector("body > h1");
    const spanElement = ctx.document.querySelector("body > span");
    expect(h1Element).not.null;
    expect(spanElement).not.null;
    expect(spanElement?.textContent?.trim()).not.to.equal("");
    expect(h1Element?.textContent?.trim()).not.to.equal("");
  });

  it("should have a Google Font link in the <head>", () => {
    const linkElement = ctx.document.querySelector(
      `head > link[href^="https://fonts.googleapis.com/css"]`
    );
    expect(linkElement).not.null;
  });

  it("should have an <style> in the <head>", () => {
    const styleElement = ctx.document.querySelector(`head > style`);
    expect(styleElement).not.null;
  });

  it("should have a CSS rule for the 'body' selector with a specified 'font-family' property", () => {
    const linkElement = ctx.document.querySelector(
      `head > link[href^="https://fonts.googleapis.com/css"]`
    );
    const href = linkElement?.getAttribute("href");
    const fonts = extractFontsFromGoogleFontsUrl(href);

    const isFontImportedForBody =
      fonts !== undefined &&
      ctx.cssInspector.hasStyleDeclaration("body", {
        fontFamily: (value) => fonts?.some((font) => value.includes(font)),
      });

    expect(isFontImportedForBody).to.equal(true);
  });
});
