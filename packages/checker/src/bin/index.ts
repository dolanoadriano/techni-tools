#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import Mocha from "mocha";
import path from "path";
import { z } from "zod";

import SimpleReporter from "../reporters/SimpleReporter";

program.name("checker");

export const OptionsSchema = z.object({
  subject: z.string().regex(/^[a-zA-Z0-9-]+$/),
  season: z.string().regex(/^S[0-9]{2}$/),
  episode: z.string().regex(/^E[0-9]{2}$/),
  exercise: z.string().regex(/^ex-\d+$/),
  test: z.string().optional(),
});

export type Options = z.infer<typeof OptionsSchema>;

const getOptionsFromConfig = (): Partial<Options> | undefined => {
  try {
    const configPath = path.join(process.cwd(), "techniskills.json");
    const configRawFile = fs.readFileSync(configPath, "utf-8");
    const configOptions = JSON.parse(configRawFile) ?? {};
    return configOptions;
  } catch (error) {
    return undefined;
  }
};

const getOptions = (commandOptions: Partial<Options>): Options => {
  try {
    const configOptions = getOptionsFromConfig();

    const _options = {
      subject: commandOptions.subject ?? configOptions?.subject,
      season: commandOptions.season ?? configOptions?.season,
      episode: commandOptions.episode ?? configOptions?.episode,
      exercise: commandOptions.exercise ?? configOptions?.exercise,
      test: commandOptions.test,
    };

    const options = OptionsSchema.parse(_options);

    return options;
  } catch (error) {
    console.log("Missing arguments.");
    process.exit(1);
  }
};

program
  .option("-sb --subject <id>")
  .option("-se --season <id>")
  .option("-ep --episode <id>")
  .option("-ex --exercise <id>")
  .option("-t --test <id>")
  .action(async (commandOptions) => {
    const { subject, season, episode, exercise } = getOptions(commandOptions);

    const mocha = new Mocha({
      reporter:
        process.env.NODE_ENV === "development" ? undefined : SimpleReporter,
    });
    const file = path.join(
      __dirname,
      "..",
      "tests",
      subject,
      season,
      episode,
      exercise,
      process.env.NODE_ENV === "development" ? "index.test.ts" : "index.test.js"
    );
    mocha.addFile(file);

    mocha.run(function (failures) {
      process.exitCode = failures ? 1 : 0;
    });
  });

program.parse();
