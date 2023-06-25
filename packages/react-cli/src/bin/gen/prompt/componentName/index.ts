import componentNames from "../../../../data/component-names.json";
import { autocomplete, toPascalCase } from "../../../../utils";

const makeComponentNameQuestion = () => ({
  type: "autocomplete",
  name: "name",
  message: "Enter component name:",
  validate: (value) => {
    if (value.length < 1) {
      return "The component name must have at least one character.";
    }
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value)) {
      return "Invalid name";
    }
    return true;
  },
  choices: [...componentNames],
  limit: 16,
  suggest: (value, choices) => {
    if (!value) return [...choices];
    return [
      {
        name: toPascalCase(value).trim(),
        message: toPascalCase(value).trim(),
      },
      ...autocomplete(value, [...componentNames]),
    ];
  },
  format: (value) => toPascalCase(value).trim(),
  result: (value) => toPascalCase(value).trim(),
});

export default makeComponentNameQuestion;
