import { BuilderOptions } from "..";

const buildCSStyle = (options: BuilderOptions): string => {
  const { name: componentName } = options;
  return `
.${componentName} {}
`;
};

export default buildCSStyle;
