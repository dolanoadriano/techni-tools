const makeIsGenericQuestion = () => ({
  type: "confirm",
  name: "isGeneric",
  message: "Is the componet generic?",
  initial: false,
});

export default makeIsGenericQuestion;
