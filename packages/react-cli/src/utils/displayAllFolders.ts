import fs from "fs";
import pathModule from "path";

export function getNestedLevel(basePath: string, currentPath: string): number {
  const relativePath = pathModule.relative(basePath, currentPath);
  const separator = pathModule.sep;
  const nestedLevel = relativePath.split(separator).length - 1;
  return nestedLevel;
}

function getAllFoldersRecursive(
  path: string,
  maxLvl: number,
  level: number = 0
): string[] {
  if (level > maxLvl) {
    return []; // Przerwanie rekurencji, jeśli osiągnięto maksymalny poziom
  }

  const files = fs.readdirSync(path);
  const folders: string[] = [];

  files.forEach((file) => {
    const currentPath = pathModule.join(path, file);
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
      folders.push(currentPath); // Dodanie ścieżki folderu do tablicy

      // Rekurencyjne wywołanie funkcji dla podfolderu zwiększając poziom o 1
      const subfolders = getAllFoldersRecursive(currentPath, maxLvl, level + 1);
      folders.push(...subfolders); // Dodanie podfolderów do tablicy
    }
  });

  return folders;
}

export const displayAllFolders = (basePath: string, maxLvl: number) => {
  const paths = getAllFoldersRecursive(basePath, maxLvl);
  return paths.map((path) => {
    const relativePath = pathModule.relative(basePath, path);
    return relativePath === "" ? "." : `${relativePath}`; // Zamiana pustej ścieżki na "."
  });
};
