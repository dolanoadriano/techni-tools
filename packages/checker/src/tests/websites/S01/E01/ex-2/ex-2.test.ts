import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";

const exerciseNumber = 1;

describe(`[S01][E01] Exercise 2`, () => {
  let dom: JSDOM;
  let document: Document;

  beforeAll(() => {
    const htmlContent = fs.readFileSync(
      path.resolve(
        __dirname,
        "..",
        "..",
        "exercises",
        `exercise-${exerciseNumber}`,
        "index.html"
      ),
      "utf-8"
    );
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  it("[C] should have an <h1> element in the <body>", () => {
    const h1Element = document.querySelector("body > h1");
    expect(h1Element).not.toBeNull();
  });

  it("[D] should have an <h1> element in the <body>", () => {
    const h1Element = document.querySelector("body > h1");
    expect(h1Element).not.toBeNull();
  });
});
