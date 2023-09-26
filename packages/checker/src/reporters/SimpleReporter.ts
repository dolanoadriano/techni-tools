import { Runner, reporters } from "mocha";

const { Base } = reporters;
const { color } = Base;

class SimpleReporter extends Base {
  constructor(runner: Runner) {
    super(runner);
    let passes = 0;
    let failures = 0;

    runner.on("pass", (test) => {
      passes++;
      console.log(color("bright pass", `✓ ${test.fullTitle()}: passed`));
    });

    runner.on("fail", (test, err) => {
      failures++;
      console.log(
        color("fail", `✖ ${test.fullTitle()}: failed - ${err.message}`)
      );
    });

    runner.on("end", () => {
      console.log("Result");
      console.log(color("green", `Passed: ${passes}`));
      console.log(color("fail", `Failed: ${failures}`));
    });
  }
}

export default SimpleReporter;
