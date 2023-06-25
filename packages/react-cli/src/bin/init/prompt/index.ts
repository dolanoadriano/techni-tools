import { prompt } from "enquirer";

import { Config } from "../../../types";
import { techniToolsText } from "../../../utils";
import createComponentsOutDirQuestion from "./componentsOutDir";
import createDefaultComponentTypeQuestion from "./defaultComponentType";
import createProgrammingLangQuestion from "./programmingLang";
import createStylingLangQuestion from "./stylingLang";

const loadInitPrompt = async (defaultConfig: Config) => {
  console.log(techniToolsText);
  const options = await prompt<Config>([
    createProgrammingLangQuestion(defaultConfig),
    createStylingLangQuestion(defaultConfig),
    createDefaultComponentTypeQuestion(defaultConfig),
    createComponentsOutDirQuestion(defaultConfig),
  ]);

  return options;
};

export default loadInitPrompt;
