import colors from "ansi-colors";

import { ComponentType } from "../../../../types";

export type Payload = {
  defaultComponentType: ComponentType;
};

const makeComponentTypeQuestion = ({ defaultComponentType }: Payload) => ({
  type: "select" as "select",
  name: "type",
  message: "Select component type:",
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
  initial: defaultComponentType,
});

export default makeComponentTypeQuestion;
