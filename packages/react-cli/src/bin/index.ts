#!/usr/bin/env node
import { program } from "commander";

import { description, name, version } from "../../package.json";
import createGenCommand from "./gen";
import createInitCommand from "./init";

program.name(name).description(description).version(version);

createInitCommand();
createGenCommand();

program.parse();
