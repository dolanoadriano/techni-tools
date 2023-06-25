import { program } from "commander";

import { build } from "../../core";
import { generateOptionsSchema } from "../../schemas";
import { Config, GenerateOptions } from "../../types";
import { loadConfigOrExit, onlyUnique, toPascalCase } from "../../utils";
import { loadOptionsFromPrompt } from "./prompt";

const loadOptionsFromArgs = (
  config: Config,
  commandOptions: any
): GenerateOptions[] | undefined => {
  const { name: names, ...restCommandOptions } = commandOptions;

  if (!names || !Array.isArray(names)) return undefined;

  const manyUnverifiedOptions = names.filter(onlyUnique).map((name) => ({
    name: toPascalCase(name).trim(),
    ...restCommandOptions,
  }));

  try {
    const manyOptions = manyUnverifiedOptions.map((options) =>
      generateOptionsSchema.parse(options)
    );
    return manyOptions;
  } catch (error) {
    return undefined;
  }
};

const handleAction = async (options: unknown) => {
  const currentDir = process.cwd();
  const config = loadConfigOrExit(currentDir);

  const manyOptions =
    loadOptionsFromArgs(config, options) ||
    (await loadOptionsFromPrompt(config));

  const result = await Promise.allSettled(
    manyOptions.map((options) => build(currentDir, config, options))
  );
};

const createGenCommand = () => {
  const currentDir = process.cwd();
  const config = loadConfigOrExit(currentDir);

  return program
    .command("gen")
    .description("generate component")
    .option(
      `-t, --type <fc|class>`,
      "type of component",
      config.defaultComponentType
    )
    .option(`-n, --name <name...>`, "name of component")
    .option(`-pl --props-list [props...]`, "list of props")
    .option(`--is-FaCC`, "set component to FaCC")
    .option(`--is-generic`, "set component to generic")
    .action(handleAction);
};

export default createGenCommand;
