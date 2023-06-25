import colors from "ansi-colors";

import { Config } from "../../../../types";

const createProgrammingLangQuestion = (defaultConfig: Config) => {
  return {
    type: "select",
    name: "programmingLang",
    message: "Select programming language:",
    choices: [
      { name: "js", message: colors.yellow("JavaScript") },
      { name: "ts", message: colors.blueBright("TypeScript") },
    ],
    initial: defaultConfig.programmingLang as any,
  };
};

export default createProgrammingLangQuestion;
