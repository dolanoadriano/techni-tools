import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";

const exerciseNumber = 1;

describe(`[S01][E02] Exercise 2`, () => {
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

  it("[A] should have an <h1> element in the <body>", () => {
    const h1Element = document.querySelector("body > h1");
    expect(h1Element).not.toBeNull();
  });

  it("[B] should have an <h1> element in the <body>", () => {
    const h1Element = document.querySelector("body > h1");
    expect(h1Element).not.toBeNull();
  });
});
