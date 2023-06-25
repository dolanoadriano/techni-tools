import fs from "fs";
import path from "path";

import { Config } from "../../../../types";

const createComponentsOutDirQuestion = (config: Config) => {
  return {
    type: "input",
    name: "componentsOutDir",
    message: "Enter out dir for components:",
    validate: (value) => {
      const valuePath = path.join(process.cwd(), value);
      const isExist = fs.existsSync(valuePath);
      if (!isExist) return "Out dir does not exists.";
      return true;
    },
    initial: "./src/components",
  };
};

export default createComponentsOutDirQuestion;
