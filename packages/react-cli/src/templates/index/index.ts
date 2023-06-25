import { ProgrammingLang } from "../../types";

const indexBuilder = (options: {
  name: string;
  programmingLang: ProgrammingLang;
  isFaCC?: boolean;
}): string => {
  const { name: componentName, programmingLang, isFaCC } = options;
  const isTSLang = programmingLang === "ts";

  const types = [
    `Props as ${componentName}Props`,
    isFaCC ? `ChildrenProps as ${componentName}Props` : undefined,
  ].filter((type) => type !== undefined);

  return `
import ${componentName} from "./component";
${isTSLang ? `\nexport type { ${types.join(",")} } from "./types";` : ``}
export { default as ${componentName} } from "./component";

export default ${componentName};
  `;
};

export default indexBuilder;
