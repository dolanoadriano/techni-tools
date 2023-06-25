import z from "zod";

export const programmingLangSchema = z.union([
  z.literal("ts"),
  z.literal("js"),
]);

export const stylingLangSchema = z.union([z.literal("css"), z.literal("scss")]);

export const componentTypeSchema = z.union([
  z.literal("fc"),
  z.literal("class"),
]);

export const configSchema = z.object({
  componentsOutDir: z.string(),
  programmingLang: programmingLangSchema,
  stylingLang: stylingLangSchema,
  defaultComponentType: componentTypeSchema,
});

export const generateOptionsSchema = z.object({
  type: componentTypeSchema,
  name: z.string(),
  propsList: z.array(z.string()).optional(),
  isFaCC: z.boolean().optional(),
  isGeneric: z.boolean().optional(),
});
