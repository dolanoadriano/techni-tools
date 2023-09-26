#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import Mocha from "mocha";
import path from "path";

import SimpleReporter from "../reporters/SimpleReporter";

program.name("checker");

export type Options = {
  subject?: string;
  season?: string;
  episode?: string;
  exercise?: string;
  test?: string;
};

const getConfigOptions = () => {};

const getConfig = () => {};

const x = (commandOptions: Options) => {
  const configPath = path.join(process.cwd(), "techniskills.json");
  const configRawFile = fs.readFileSync(configPath, "utf-8");
  const configOptions = JSON.parse(configRawFile) ?? {};
};

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

    const mocha = new Mocha({ reporter: SimpleReporter });
    const file = path.join(
      __dirname,
      "..",
      "tests",
      subject,
      season,
      episode,
      exercise,
      "index.test.js"
    );
    mocha.addFile(file);

    mocha.run(function (failures) {
      process.exitCode = failures ? 1 : 0;
    });
  });

program.parse();
