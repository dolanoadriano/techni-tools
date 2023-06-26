import { ComponentType } from "../../types";

const typesBuilder = (options: {
  type: ComponentType;
  propsList?: string[];
  isFaCC?: boolean;
  isGeneric?: boolean;
}): string => {
  const { type: componentType, propsList, isFaCC, isGeneric } = options;
  const childrenPropsType = isFaCC
    ? `children?: (props: ChildrenProps) => React.ReactNode;`
    : `children?: React.ReactNode;`;

  const ownProps = [
    propsList?.includes("children") ? childrenPropsType : undefined,
    propsList?.includes("className") ? `className?: string;` : undefined,
    propsList?.includes("style") ? `style?: React.CSSProperties;` : undefined,
  ].filter((value) => value !== undefined);

  const childrenType =
    isFaCC && propsList?.includes("children")
      ? `export type ChildrenProps = {}`
      : ``;
  const stateType = componentType === "fc" ? `` : `export type State = {};`;

  const genericParam = isGeneric ? `<T>` : ``;

  return `
  ${
    propsList?.includes("style") || propsList?.includes("children")
      ? `import React from "react"`
      : ``
  }

${childrenType}

export type OwnProps${genericParam} = {${
    ownProps.length ? `\n  ${ownProps.join("\n  ")}\n` : ``
  }};
    
export type Props${genericParam} = OwnProps${genericParam};
    
${stateType}
`;
};

export default typesBuilder;
