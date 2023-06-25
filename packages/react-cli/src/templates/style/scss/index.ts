import { BuilderOptions } from "..";

const buildSCSStyle = (options: BuilderOptions): string => {
  const { name: componentName } = options;
  return `
.${componentName} {}
`;
};

export default buildSCSStyle;
