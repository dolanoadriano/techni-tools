import { BuilderOptions } from "..";

export const buildFCComponent = (options: BuilderOptions): string => {
  const {
    name: componentName,
    programmingLang,
    stylingLang,
    propsList,
    isFaCC,
    isGeneric,
  } = options;
  const hasClassNameProps = propsList?.includes("className");
  const hasChildrenProps = propsList?.includes("children");
  const hasStyleProps = propsList?.includes("style");
  const types = [
    `Props`,
    isFaCC && hasChildrenProps ? `ChildrenProps` : undefined,
  ].filter((type) => type !== undefined);

  const imports = [
    `import "./style.${stylingLang}"`,
    programmingLang === "ts"
      ? `import { ${types.join(", ")} } from "./types";`
      : undefined,
  ].filter((type) => type !== undefined);

  const componentType =
    programmingLang === "ts" && !isGeneric ? `: React.FC<Props>` : ``;
  const genericType =
    programmingLang === "ts" && isGeneric ? `<T extends any>` : ``;
  const propsType = programmingLang === "ts" && isGeneric ? `: Props<T>` : ``;
  const returnType =
    programmingLang === "ts" && isGeneric ? `: React.ReactNode` : ``;

  const classNames = [
    componentName,
    hasClassNameProps ? `\${className}` : undefined,
  ].filter((value) => value !== undefined);

  const attributes = [
    `className={\`${classNames.join(" ")}\`}`,
    hasStyleProps ? `style={style}` : undefined,
  ].filter((value) => value !== undefined);

  return `
import React from "react";

${imports.join("\n")}
    
const ${componentName}${componentType} = ${genericType}(props${propsType})${returnType} => {
  const { ${(propsList || []).join(", ")} } = props;
  return (
    <div ${attributes.join(" ")}>
      ${
        hasChildrenProps
          ? isFaCC
            ? `{children && children({})}`
            : `{children}`
          : ``
      }
    </div>
  );
};
    
export default ${componentName};`;
};

export default buildFCComponent;
