import { prompt } from "enquirer";

import { Config, GenerateOptions } from "../../../types";
import makeComponentNameQuestion from "./componentName";
import makeComponentTypeQuestion from "./componentType";
import makeIsFaCCQuestion from "./isFaCC";
import makeIsGenericQuestion from "./isGeneric";
import makePropsListQuestion from "./propsList";

export const loadOptionsFromPrompt = async (
  config: Config
): Promise<GenerateOptions[]> => {
  const { defaultComponentType } = config;
  const options = await prompt<GenerateOptions>([
    makeComponentTypeQuestion({ defaultComponentType }),
    makeComponentNameQuestion(),
    makePropsListQuestion(),
    makeIsFaCCQuestion(),
    makeIsGenericQuestion(),
  ]);

  return [options];
};
