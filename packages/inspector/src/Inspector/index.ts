import cssom from "cssom";
import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";

import CSSInspector from "../CSSInspector";
import HTMLInspector from "../HTMLInspector";

const loadHTML = (paths: [...string[], `${string}.html`]) => {
  const htmlContent = fs.readFileSync(
    path.resolve(__dirname, ...paths),
    "utf-8"
  );
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const htmlInspector = new HTMLInspector(dom.window);
  const cssInspector = new CSSInspector(document.styleSheets);

  return { htmlContent, dom, document, htmlInspector, cssInspector };
};

const loadCSS = (paths: [...string[], `${string}.css`]) => {
  const cssContent = fs.readFileSync(
    path.resolve(__dirname, ...paths),
    "utf-8"
  );
  const x = cssom.parse(cssContent);
  x.cssRules.map((x) => x);
};

loadHTML(["..", "index.html"]);
