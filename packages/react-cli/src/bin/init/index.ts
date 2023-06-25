import { program } from "commander";

import {
  createConfigFile,
  createDefaultConfig,
  getIsConfigFileExists,
  parseConfig,
} from "../../utils";
import loadInitPrompt from "./prompt";

const handleAction = async (options: any) => {
  if (getIsConfigFileExists()) {
    console.error("Configuration file already exists");
    process.exit(1);
  }
  const defaultConfig = createDefaultConfig(process.cwd());
  const commandResult = options.yes ? { ...defaultConfig } : { ...options };
  const config =
    parseConfig(commandResult) || (await loadInitPrompt(defaultConfig));
  createConfigFile(config);
};

const createInitCommand = () => {
  return program
    .command("init", { isDefault: true })
    .description("initialization config file")
    .option(`-y --yes`)
    .option(`-plng --programing-language <js|ts>`, "programming language")
    .option(`-slng --styling-language <css|scss>`, "styling language")
    .option(
      `-dct --default-component-type <fc|class>`,
      "default component type"
    )
    .option(`-cod --components-out-dir <string>`, "components out dir")
    .action(handleAction);
};

export default createInitCommand;
