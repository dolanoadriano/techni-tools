#!/usr/bin/env node
import { exec } from "child_process";

console.log("Techni Postman");
const server = exec("npm run preview", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

console.log("Open postman: http://localhost:4173");

server.on("exit", (code) => {
  console.log(`Child exited with code ${code}`);
});
