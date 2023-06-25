import { StylingLang } from "../../types";
import buildCSSStyle from "./css";
import buildSCSStyle from "./scss";

export type BuilderOptions = {
  name: string;
};

export const styleBuilders: {
  [key in StylingLang]: (options: BuilderOptions) => string;
} = {
  css: buildCSSStyle,
  scss: buildSCSStyle,
};
