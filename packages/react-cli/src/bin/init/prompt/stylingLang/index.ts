import colors from "ansi-colors";

import { Config } from "../../../../types";

const createStylingLangQuestion = (defaultConfig: Config) => {
  return {
    type: "select",
    name: "stylingLang",
    message: "Select styling language:",
    choices: [
      { name: "css", message: colors.blue("CSS") },
      { name: "scss", message: colors.redBright("SCSS") },
    ],
    initial: defaultConfig.stylingLang as any,
  };
};

export default createStylingLangQuestion;
