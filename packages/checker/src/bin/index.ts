import { program } from "commander";
import { Config } from "jest";
import { run } from "jest-cli";

program.name("checker");

program
  .option("-p --project <id>")
  .option("-t --test <id>")
  .action(async (options) => {
    const { project, test } = options;
    if (!project) throw new Error("-p undefined");
    if (!test) throw new Error("-t undefined");
    await run([`--testPathPattern=${project}`, `-t=${test}`]);
  });

program.parse();
