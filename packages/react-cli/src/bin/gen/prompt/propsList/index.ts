import colors from "ansi-colors";

const makePropsListQuestion = () => ({
  type: "multiselect",
  name: "propsList",
  message: "Select props:",
  choices: [
    {
      name: "children",
      message: colors.yellowBright("children"),
    },
    {
      name: "className",
      message: colors.greenBright("className"),
    },
    {
      name: "style",
      message: colors.blueBright("style"),
    },
  ],
});

export default makePropsListQuestion;
