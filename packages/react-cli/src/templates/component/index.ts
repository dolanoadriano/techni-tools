import { GenerateOptions, ProgrammingLang, StylingLang } from "../../types";
import { buildClassComponent } from "./class";
import buildFCComponent from "./fc";

export type BuilderOptions = {
  name: string;
  programmingLang: ProgrammingLang;
  stylingLang: StylingLang;
  propsList?: string[];
  isFaCC?: boolean;
  isGeneric?: boolean;
};

export const componentBuilders: {
  [key in GenerateOptions["type"]]: (options: BuilderOptions) => string;
} = {
  fc: buildFCComponent,
  class: buildClassComponent,
};
