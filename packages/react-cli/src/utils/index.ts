import colors from "ansi-colors";
import fs from "fs";
import path from "path";

import { configSchema } from "../schemas";
import { Config } from "../types";

export const techniToolsText = colors.magentaBright(`
▀█▀ ██▀ ▄▀▀ █▄█ █▄ █ █    ▀█▀ ▄▀▄ ▄▀▄ █   ▄▀▀
 █  █▄▄ ▀▄▄ █ █ █ ▀█ █ ▀▀  █  ▀▄▀ ▀▄▀ █▄▄ ▄██
`);

export const toPascalCase = (text: string): string => {
  text = text.trim();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  text = text.replace(/[\s_-]+(\w)/g, (match, letter) => letter.toUpperCase());
  return text;
};

export function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

export const autocomplete = (
  input: string,
  choices: string[]
): { name: string; message: string }[] => {
  const a = choices.filter((choice) =>
    choice.toLowerCase().startsWith(input.toLowerCase())
  );
  const b = choices
    .filter((choice) => !choice.toLowerCase().startsWith(input.toLowerCase()))
    .filter((choice) => choice.toLowerCase().includes(input.toLowerCase()));
  return [...a, ...b].map((v) => ({ name: v, message: v }));
};

export function hasTsConfig(currentPath: string): boolean {
  const tsConfigPath = path.join(currentPath, "tsconfig.json");
  return fs.existsSync(tsConfigPath);
}

export function hasPackageJson(currentPath: string): boolean {
  const packageJsonPath = path.join(currentPath, "package.json");
  return fs.existsSync(packageJsonPath);
}

export function hasSassDependency(currentPath: string): boolean {
  const packageJsonPath = "package.json";

  // Sprawdź czy istnieje plik package.json
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  try {
    // Wczytaj zawartość pliku package.json
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");

    // Sprawdź czy paczka "sass" jest dodana w sekcji "dependencies"
    const packageJson = JSON.parse(packageJsonContent);
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    return (
      dependencies.hasOwnProperty("sass") ||
      devDependencies.hasOwnProperty("sass")
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const loadConfig = (currentDir: string): Config | undefined => {
  try {
    const configPath = path.join(
      currentDir,
      "techni-tools.react-cli.config.json"
    );
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return config;
  } catch (error) {
    return undefined;
  }
};

export const loadConfigOrExit = (currentDir: string): Config => {
  const config = loadConfig(currentDir);
  if (!config) {
    console.error(
      "The configuration file does not exists. \nRun command: 'techni-tools rc init'"
    );
    process.exit(1);
  }

  return config;
};

export const getConfigPath = (cwd?: string) => {
  const currentDir = cwd || process.cwd();
  const configFileName = "techni-tools.react-cli.config.json";
  const configPath = path.join(currentDir, configFileName);
  return configPath;
};

export const getIsConfigFileExists = (cwd?: string): boolean => {
  const configPath = getConfigPath(cwd);
  return fs.existsSync(configPath);
};

export const createConfigFile = (config: Config, cwd?: string) => {
  const configPath = getConfigPath(cwd);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};

export const createDefaultConfig = (cwd?: string): Config => {
  const componentsOutDir = fs.existsSync("./src/components")
    ? "./src/components"
    : fs.existsSync("./src")
    ? "./src"
    : ".";

  const config: Config = {
    programmingLang: hasTsConfig(cwd || process.cwd()) ? "ts" : "js",
    stylingLang:
      hasPackageJson(cwd || process.cwd()) &&
      hasSassDependency(cwd || process.cwd())
        ? "scss"
        : "css",
    defaultComponentType: "fc",
    componentsOutDir,
  };
  return config;
};

export const parseConfig = (data: unknown): Config | undefined => {
  try {
    return configSchema.parse(data);
  } catch (error) {
    return undefined;
  }
};
