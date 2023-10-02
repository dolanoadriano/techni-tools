import { expect } from "chai";
import fs from "fs";
import { before, describe } from "mocha";
import path from "path";

/*
    1. Stwórz plik utils.js
    2. Wewnątrz pliku utils.js stwórz funkcję o nazwie "countAvg", 
       która w argumencie przyjmuje tablicę liczb, a następnie zwraca średnią artymetyczną liczb z tablicy.
       Suma powinna zostać policzyona przy uzyciu wbudowanej metody .reduce().
    3. Wyeksportuj tą funkcję za pomocą "name export".
    4. Stwórz plik index.js
    5. Zaimportuj funkcję countAvg i wywołaj ją podając w argumencie 5 elementową tablicę dowolnych liczb.
        Wynik zapisz do zmiennej "avg" i wyświetl wartość za pomocą console.log.

*/

describe(`[PAI][S01][E03] Exercise 2`, () => {
  let projectRoot: string;

  before(() => {
    // Zakładam, że ścieżka jest relatywna do bieżącego katalogu testowego. Dostosuj w razie potrzeby.
    projectRoot = path.resolve(process.cwd(), "..");
  });

  it("should have a utils.js file", () => {
    const utilsPath = path.join(projectRoot, "utils.js");
    expect(fs.existsSync(utilsPath)).to.be.true;
  });

  it("should have 'countAvg' function in utils.js and use .reduce() method", () => {
    const utilsPath = path.join(projectRoot, "utils.js");
    const utilsContent = fs.readFileSync(utilsPath, "utf-8");

    const functionRegex =
      /export\s+function\s+countAvg\(\w+\)\s*\{\s*.*\.reduce\(/;
    expect(utilsContent).to.match(functionRegex);
  });

  it("should have an index.js file", () => {
    const indexPath = path.join(projectRoot, "index.js");
    expect(fs.existsSync(indexPath)).to.be.true;
  });

  it("should import 'countAvg' function in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");

    const importRegex =
      /import\s+\{\s*countAvg\s*\}\s+from\s+['"]\.\/utils['"]/;
    expect(indexContent).to.match(importRegex);
  });

  it("should call 'countAvg' function with 5 numbers array in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");

    const callFunctionRegex =
      /const\s+avg\s+=\s+countAvg\(\[.*?,.*?,.*?,.*?,.*?\]\)/;
    expect(indexContent).to.match(callFunctionRegex);
  });

  it("should use 'console.log' to display 'avg' in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");

    const logRegex = /console\.log\(avg\)/;
    expect(indexContent).to.match(logRegex);
  });
});
