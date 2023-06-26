import fs from "fs";
import path from "path";

import { componentBuilders } from "../templates/component";
import indexBuilder from "../templates/index";
import { styleBuilders } from "../templates/style";
import typesBuilder from "../templates/types";
import { Config, GenerateOptions } from "../types";
import { getComponentNameFromPath } from "../utils";

export const build = async (
  currentDir: string,
  config: Config,
  options: GenerateOptions
) => {
  const { componentsOutDir, programmingLang, stylingLang } = config;
  const { type, name: _name, propsList, isFaCC, isGeneric } = options;
  const name = getComponentNameFromPath(_name);
  const componentDir = path.join(currentDir, componentsOutDir, name);

  if (fs.existsSync(componentDir)) {
    console.error(`Component '${name}' already exists`);
    throw new Error(`Component '${name}' already exists`);
  }

  const componentBuilder = componentBuilders[type];
  const componentTemplate = componentBuilder({
    name,
    programmingLang,
    stylingLang,
    propsList,
    isFaCC,
    isGeneric,
  });

  const styleBuilder = styleBuilders[stylingLang];
  const styleTemplate = styleBuilder({ name });
  const typesTemplate = typesBuilder({
    type,
    propsList,
    isFaCC,
    isGeneric,
  });
  const indexTemplate = indexBuilder({
    name,
    programmingLang,
    isFaCC,
  });

  const indexPath = path.join(componentDir, `index.${programmingLang}`);
  const componentPath = path.join(
    componentDir,
    `component.${programmingLang}x`
  );
  const typesPath = path.join(componentDir, `types.ts`);
  const stylePath = path.join(componentDir, `style.${stylingLang}`);

  fs.mkdirSync(componentDir);
  programmingLang === "ts" && fs.writeFileSync(typesPath, typesTemplate.trim());
  fs.writeFileSync(stylePath, styleTemplate.trim());
  fs.writeFileSync(componentPath, componentTemplate.trim());
  fs.writeFileSync(indexPath, indexTemplate.trim());
};
