import { expect } from "chai";
import fs from "fs";
import { describe } from "mocha";
import path from "path";

import { getProjectPath } from "../../../../../utils";

const projectPath = getProjectPath();

/*
    1. Stwórz plik utils.js
    2. Wewnątrz pliku utils.js stwórz funkcję o nazwie "countAvg", 
       która w argumencie przyjmuje tablicę liczb, a następnie zwraca średnią artymetyczną liczb z tablicy.
       Suma powinna zostać policzyona przy uzyciu wbudowanej metody .reduce().
    3. Wyeksportuj tą funkcję za pomocą "name export".
    4. Stwórz plik index.js
    5. Zaimportuj funkcję countAvg i wywołaj ją podając w argumencie 5 elementową tablicę dowolnych liczb.
        Wynik zapisz do stałej "avg" i wyświetl wartość za pomocą console.log.

*/
describe(`[PAI][S01][E03] Exercise 2`, () => {
  it("should have a utils.js file", () => {
    const filePath = path.join(projectPath, "utils.js");
    expect(fs.existsSync(filePath)).to.be.true;
  });

  it("should have 'countAvg' function in utils.js", () => {
    const utilsContent = fs.readFileSync(
      path.join(projectPath, "utils.js"),
      "utf-8"
    );

    const arrowFunctionRegex = /const\s+countAvg\s*=\s*\([^)]*\)\s*=>/;
    const functionDeclarationRegex = /function\s+countAvg\([^)]*\)/;
    const functionExpressionRegex = /countAvg\s*=\s*function\([^)]*\)/;

    const hasArrowFunction = arrowFunctionRegex.test(utilsContent);
    const hasFunctionDeclaration = functionDeclarationRegex.test(utilsContent);
    const hasFunctionExpression = functionExpressionRegex.test(utilsContent);

    expect(hasArrowFunction || hasFunctionDeclaration || hasFunctionExpression)
      .to.be.true;
  });

  it("should use .reduce() method in 'countAvg' function", () => {
    const utilsContent = fs.readFileSync(
      path.join(projectPath, "utils.js"),
      "utf-8"
    );
    const reduceRegex = /\.reduce\(/;
    expect(utilsContent).to.match(reduceRegex);
  });

  it("should have a index.js file", () => {
    const filePath = path.join(projectPath, "index.js");
    expect(fs.existsSync(filePath)).to.be.true;
  });

  it("should have a named export 'countAvg' in utils.js", () => {
    const utilsContent = fs.readFileSync(
      path.join(projectPath, "utils.js"),
      "utf-8"
    );
    const exportRegex = /export\s+function\s+countAvg\(/;
    expect(utilsContent).to.match(exportRegex);
  });

  it("should import 'countAvg' function in index.js", () => {
    const indexContent = fs.readFileSync(
      path.join(projectPath, "index.js"),
      "utf-8"
    );
    const importRegex =
      /import\s+\{\s*countAvg\s*\}\s+from\s+['"]\.\/utils['"]/;
    expect(indexContent).to.match(importRegex);
  });

  it("should call 'countAvg' with an array of 5 numbers in index.js", () => {
    const indexContent = fs.readFileSync(
      path.join(projectPath, "index.js"),
      "utf-8"
    );
    const callRegex = /countAvg\(\s*\[.*\]\s*\)/;
    expect(indexContent).to.match(callRegex);
  });

  it("should assign the result of 'countAvg' to a variable 'avg' in index.js", () => {
    const indexContent = fs.readFileSync(
      path.join(projectPath, "index.js"),
      "utf-8"
    );
    const assignRegex = /const\s+avg\s+=\s+countAvg/;
    expect(indexContent).to.match(assignRegex);
  });

  it("should log the 'avg' variable to the console in index.js", async () => {
    const indexContent = fs.readFileSync(
      path.join(projectPath, "index.js"),
      "utf-8"
    );
    const logRegex = /console\.log\s*\(\s*avg\s*\)/;
    expect(indexContent).to.match(logRegex);
  });
});
