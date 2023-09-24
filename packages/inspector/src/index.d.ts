import { JSDOM } from "jsdom";
import CSSInspector from "./CSSInspector";
import HTMLInspector from "./HTMLInspector";
export { default as CSSInspector } from "./CSSInspector";
export { default as HTMLInspector } from "./HTMLInspector";
export { default as JSInspector } from "./JSInspector";
export declare const extractFontsFromGoogleFontsUrl: (url: string | undefined | null) => string[] | undefined;
export declare const loadHTML: (paths: [...string[], `${string}.html`]) => {
    htmlContent: any;
    dom: JSDOM;
    document: Document;
    htmlInspector: HTMLInspector;
    cssInspector: CSSInspector;
};
