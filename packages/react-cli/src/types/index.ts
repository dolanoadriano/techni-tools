import z from "zod";

import {
  componentTypeSchema,
  configSchema,
  generateOptionsSchema,
  programmingLangSchema,
  stylingLangSchema,
} from "../schemas";

export type ProgrammingLang = z.infer<typeof programmingLangSchema>;

export type StylingLang = z.infer<typeof stylingLangSchema>;

export type ComponentType = z.infer<typeof componentTypeSchema>;

export type Config = z.infer<typeof configSchema>;

export type GenerateOptions = z.infer<typeof generateOptionsSchema>;
