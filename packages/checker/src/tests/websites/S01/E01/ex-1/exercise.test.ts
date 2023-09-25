import { expect } from "chai";
import fs from "fs";
import { JSDOM } from "jsdom";
import { before, describe } from "mocha";
import path from "path";

const exerciseNumber = 1;

describe(`Exercise ${exerciseNumber}`, () => {
  let dom: JSDOM;
  let document: Document;

  before(() => {
    const htmlContent = fs.readFileSync(
      path.resolve(process.cwd(), "..", "index.html"),
      "utf-8"
    );
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  it("should have an <h1> element in the <body>", () => {
    const h1Element = document.querySelector("body > h1");
    expect(h1Element).not.null;
  });
});
