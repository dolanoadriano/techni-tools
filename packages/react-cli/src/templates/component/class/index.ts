import { BuilderOptions } from "..";

export const buildClassComponent = (options: BuilderOptions): string => {
  const {
    name: componentName,
    programmingLang,
    propsList,
    stylingLang,
    isFaCC,
    isGeneric,
  } = options;
  const hasClassNameProps = propsList?.includes("className");
  const hasChildrenProps = propsList?.includes("children");
  const hasStyleProps = propsList?.includes("style");
  const isTSLang = programmingLang === "ts";
  const types = [`Props`, isFaCC ? `ChildrenProps` : undefined].filter(
    (type) => type !== undefined
  );
  const typesImport =
    programmingLang === "ts"
      ? `\nimport { ${types.join(", ")} } from "./types";`
      : ``;

  const genericParam = isGeneric ? `<T>` : ``;

  const componentType =
    programmingLang === "ts" ? `<Props${genericParam}, State>` : ``;

  return `import React from "react";

import "./style.${stylingLang}";${typesImport}
    
class ${componentName}${genericParam} extends React.Component${componentType} {
  constructor(props${isTSLang ? `: Props${genericParam}` : ``}) {
    super(props);
    this.state = {};
  }
    
  ${isTSLang ? `public ` : ``}componentDidMount()${isTSLang ? `: void` : ``} {}
    
  ${isTSLang ? `public ` : ``}componentDidUpdate(
    ${
      isTSLang
        ? `prevProps: Readonly<Props${genericParam}>, 
    prevState: Readonly<State>`
        : `prevProps, prevState`
    }
  )${isTSLang ? `: void` : ``} {
    const { props, state } = this;  
  }

  ${isTSLang ? `public ` : ``}componentWillUnmount()${
    isTSLang ? `: void` : ``
  } {}

  ${isTSLang ? `public ` : ``}render = ()${
    isTSLang ? `: React.ReactNode` : ``
  } => {
    const { props, state } = this;
    const { ${(propsList || []).join(", ")} } = props;
    const { } = state;

    return <div className={\`${componentName} ${
    hasClassNameProps ? `\${className}` : ``
  }\`}${hasStyleProps ? ` style={style}` : ``}>${
    hasChildrenProps
      ? isFaCC
        ? `{children && children({})}`
        : `{children}`
      : ``
  }</div>;
  }
}
    
export default ${componentName};`;
};
