#!/usr/bin/env node
import { program } from "commander";
import Mocha from "mocha";
import path from "path";

program.name("checker");

program
  .option("-sb --subject <id>")
  .option("-se --season <id>")
  .option("-ep --episode <id>")
  .option("-ex --exercise <id>")
  .option("-t --test <id>")
  .action(async (options) => {
    const { subject, season, episode, exercise, test } = options;
    if (!subject) {
      console.error("-sb undefined");
      process.exit(-1);
    }
    if (!season) {
      console.error("-se undefined");
      process.exit(-1);
    }
    if (!episode) {
      console.error("-ep undefined");
      process.exit(-1);
    }
    if (!exercise) {
      console.error("-ex undefined");
      process.exit(-1);
    }

    const mocha = new Mocha();
    const file = path.join(
      __dirname,
      "..",
      "tests",
      subject,
      season,
      episode,
      exercise,
      "exercise.test.js"
    );
    mocha.addFile(file);

    mocha.run(function (failures) {
      process.exitCode = failures ? 1 : 0;
    });
  });

program.parse();
