import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";

import CSSInspector from "./CSSInspector";
import HTMLInspector from "./HTMLInspector";

export { default as CSSInspector } from "./CSSInspector";
export { default as HTMLInspector } from "./HTMLInspector";
export { default as JSInspector } from "./JSInspector";

export type HTMLTestContext = {
  htmlContent: string;
  dom: JSDOM;
  document: Document;
  htmlInspector: HTMLInspector;
  cssInspector: CSSInspector;
};

export const extractFontsFromGoogleFontsUrl = (
  url: string | undefined | null
): string[] | undefined => {
  if (!url) return undefined;
  if (!url.startsWith("https://fonts.googleapis.com/css2?")) return undefined;

  const fontPattern = /family=([^&:]+)/g;

  return Array.from(url.matchAll(fontPattern)).map((match) =>
    decodeURIComponent(match[1].replace(/\+/g, " "))
  );
};

export const setupHTMLTestContext = (path: string): HTMLTestContext => {
  const htmlContent = fs.readFileSync(path, "utf-8");
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const htmlInspector = new HTMLInspector(dom.window);
  const cssInspector = new CSSInspector(document.styleSheets);

  return { htmlContent, dom, document, htmlInspector, cssInspector };
};
