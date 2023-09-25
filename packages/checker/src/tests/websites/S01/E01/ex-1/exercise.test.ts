import { loadHTML } from "@techni-tools/inspector";
import { expect } from "chai";
import { JSDOM } from "jsdom";
import { before, describe } from "mocha";
import path from "path";

const exerciseNumber = 1;

describe(`Exercise ${exerciseNumber}`, () => {
  let dom: JSDOM;
  let document: Document;

  before(() => {
    const htmlContent = loadHTML(
      path.resolve(process.cwd(), "..", "index.html") as any
    );
  });

  it("should have an <h1> element in the <body>", () => {
    const h1Element = document.querySelector("body > h1");
    expect(h1Element).not.null;
  });

  it("should have an <span> element in the <body>", () => {
    const spanElement = document.querySelector("body > span");
    expect(spanElement).not.null;
  });

  it("should have a text inside <h1> and <span>", () => {
    const h1Element = document.querySelector("body > h1");
    const spanElement = document.querySelector("body > span");
    expect(h1Element).not.null;
    expect(spanElement).not.null;
    expect(spanElement?.textContent?.trim()).not.be("");
    expect(h1Element?.textContent?.trim()).not.be("");
  });

  it("should have a Google Font link in the <head>", () => {
    const linkElement = document.querySelector(
      `head > link[href^="https://fonts.googleapis.com/css"]`
    );
    expect(linkElement).not.null;
  });

  it("should have an <style> in the <head>", () => {
    const styleElement = document.querySelector(`head > style`);
    expect(styleElement).not.null;
  });

  it("should have a CSS rule for the 'body' selector with a specified 'font-family' property", () => {
    const bodyRule = findCssRuleBySelector("body");
    const linkElement = document.querySelector(
      `head > link[href^="https://fonts.googleapis.com/css"]`
    );
    const href = linkElement?.getAttribute("href");
    const fonts = extractFontsFromGoogleFontsUrl(href);
    expect(
      fonts?.some((font) =>
        bodyRule?.style.getPropertyValue("font-family").includes(font)
      )
    ).be(true);
  });
});
