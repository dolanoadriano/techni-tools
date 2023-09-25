#!/usr/bin/env node
import { program } from "commander";
import Mocha from "mocha";
import path from "path";

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

    const mocha = new Mocha();
    const file = path.join(
      __dirname,
      "..",
      "tests",
      "websites",
      "S01",
      "E01",
      "ex-1",
      "test.test.js"
    );
    mocha.addFile(file);

    mocha.run(function (failures) {
      process.exitCode = failures ? 1 : 0;
    });
  });

program.parse();
