import { Runner, reporters } from "mocha";

const { Base } = reporters;
const { color } = Base;

class SimpleReporter extends Base {
  constructor(runner: Runner) {
    super(runner);
    let passes = 0;
    let failures = 0;

    runner.on("suite", (suite) => {
      console.log(`${suite.title}`);
    });

    runner.on("pass", (test) => {
      passes++;
      console.log(` ${color("bright pass", "✓")} ${test.title}`);
    });

    runner.on("fail", (test, err) => {
      failures++;
      process.env.NODE_ENV === "development" ? console.log(err, "\n") : null;
      console.log(` ${color("fail", "✖")} ${test.title}`);
    });

    runner.on("end", () => {
      console.log();
      console.log(color("green", `Passed: ${passes}`));
      console.log(color("fail", `Failed: ${failures}`));
    });
  }
}

export default SimpleReporter;
