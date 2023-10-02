import { HTMLTestContext, setupHTMLTestContext } from "@techni-tools/inspector";
import { expect } from "chai";
import fs from "fs";
import { before, describe } from "mocha";
import path from "path";

/*
    1. Stwórz własny pakiet za pomocą polecenia 'npm init'.
    2. Zmodyfikuj package.json tak, aby włączyć składnię 'import/export'.
    3. Zainstaluj pakiet o nazwie 'cowsay' za pomocą polecenia 'npm install <package>'.
    4. Stwórz plik index.js.
    5. Zaimportuj moduł cowsay.
    6. Wyświetl dowolny tekst za pomocą metody '.say()' z modułu 'cowsay'.
*/
describe(`[PAI][S01][E02] Exercise 1`, () => {
  let projectRoot: string;

  before(() => {
    projectRoot = path.resolve(process.cwd(), "..");
  });

  it("should have a package.json file", () => {
    const packagePath = path.join(projectRoot, "package.json");
    expect(fs.existsSync(packagePath)).to.be.true;
  });

  it("should have 'type' set to 'module' in package.json", () => {
    const packageJson = require(path.join(projectRoot, "package.json"));
    expect(packageJson.type).to.equal("module");
  });

  it("should have 'cowsay' in dependencies", () => {
    const packageJson = require(path.join(projectRoot, "package.json"));
    expect(packageJson.dependencies).to.have.property("cowsay");
  });

  it("should have an index.js file", () => {
    const indexPath = path.join(projectRoot, "index.js");
    expect(fs.existsSync(indexPath)).to.be.true;
  });

  it("should import 'cowsay' and use .say() method in index.js", () => {
    const indexPath = path.join(projectRoot, "index.js");
    const indexContent = fs.readFileSync(indexPath, "utf-8");

    expect(indexContent).to.include("import cowsay from 'cowsay'");
    expect(indexContent).to.match(/cowsay\.say\(\{ text: .+\}\)/);
  });
});
