#!/usr/bin/env node
import { program } from "commander";
import { Config } from "jest";
import { run } from "jest-cli";

program.name("checker");

program
  .option("-p --project <id>")
  .option("-t --test <id>")
  .action(async (options) => {
    const { project, test } = options;
    if (!project) {
      console.error("-p undefined");
      process.exit(-1);
    }
    if (!test) {
      console.error("-t undefined");
      process.exit(-1);
    }
    await run([
      `--testPathPattern=${project}`,
      `-t=${test}`,
      `--testPathIgnorePatterns=node_modules/(?!\@techni-tools/checker)`,
    ]);
  });

program.parse();
