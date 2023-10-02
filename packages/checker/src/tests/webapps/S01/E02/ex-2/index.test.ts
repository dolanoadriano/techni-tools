import { expect } from "chai";
import fs from "fs";
import { describe } from "mocha";
import path from "path";
import rewire from "rewire";

const projectRoot = path.resolve(process.cwd(), "..");

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
    const filePath = path.join(projectRoot, "utils.js");
    expect(fs.existsSync(filePath)).to.be.true;
  });

  it("should have 'countAvg' function in utils.js", () => {
    const utilsModule = rewire<{}>(path.join(projectRoot, "utils.js"));
    const countAvg = utilsModule.__get__("countAvg");
    expect(countAvg).to.be.a("function");
  });

  it("should return correct average using countAvg function", () => {
    const utilsModule = rewire<{}>(path.join(projectRoot, "utils.js"));

    const countAvg = utilsModule.__get__("countAvg");
    const result = countAvg([10, 20, 30, 40, 50]);

    expect(result).to.equal(30);
  });

  it("should use .reduce() method in 'countAvg' function", () => {
    const utilsPath = path.join(projectRoot, "utils.js");
    const utilsContent = fs.readFileSync(utilsPath, "utf-8");
    const reduceRegex = /\.reduce\(/;
    expect(utilsContent).to.match(reduceRegex);
  });

  it("should have a named export 'countAvg' in utils.js", () => {
    const utilsContent = fs.readFileSync(
      path.join(projectRoot, "utils.js"),
      "utf-8"
    );
    const exportRegex = /export\s+\{.*countAvg.*\}/;
    expect(utilsContent).to.match(exportRegex);
  });

  it("should import 'countAvg' function in index.js", () => {
    const indexModule = rewire<{}>(path.join(projectRoot, "index.js"));
    const countAvgFromIndex = indexModule.__get__("countAvg");
    expect(countAvgFromIndex).to.be.a("function");
  });

  it("should call 'countAvg' with an array of 5 numbers in index.js", () => {
    const indexModule = rewire<{}>(path.join(projectRoot, "index.js"));
    const avg = indexModule.__get__("avg");
    expect(avg).to.be.a("number");
  });

  it("should check the import statement of 'countAvg' function in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    const importRegex =
      /import\s+\{\s*countAvg\s*\}\s+from\s+['"]\.\/utils['"]/;
    expect(indexContent).to.match(importRegex);
  });

  it("should check if 'countAvg' function is called in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    const callRegex = /countAvg\(\s*[^)]+\s*\)/;
    expect(indexContent).to.match(callRegex);
  });

  it("should check if the result of 'countAvg' is assigned to 'avg' constans in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    const assignmentRegex = /const\s+avg\s+=\s+countAvg/;
    expect(indexContent).to.match(assignmentRegex);
  });

  it("should check if 'avg' is logged to the console in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    const logRegex = /console\.log\s*\(\s*avg\s*\)/;
    expect(indexContent).to.match(logRegex);
  });
});
