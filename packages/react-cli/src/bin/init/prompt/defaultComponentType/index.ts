import colors from "ansi-colors";

import { Config } from "../../../../types";

const createDefaultComponentTypeQuestion = (defaultConfig: Config) => {
  return {
    type: "select",
    name: "defaultComponentType",
    message: "Select default component type:",
    choices: [
      {
        name: "fc",
        message: colors.cyanBright("Functional Component"),
      },
      {
        name: "class",
        message: colors.yellowBright("Class Component"),
      },
    ],
  };
};

export default createDefaultComponentTypeQuestion;
