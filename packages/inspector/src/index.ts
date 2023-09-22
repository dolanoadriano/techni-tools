export { default as CSSInspector } from "./CSSInspector";
export { default as HTMLInspector } from "./HTMLInspector";
export { default as JSInspector } from "./JSInspector";

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
