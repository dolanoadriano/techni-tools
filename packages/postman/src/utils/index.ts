export const uniqueBy =
  <TData extends object>(key: keyof TData) =>
  (value: TData, index: number, array: TData[]) =>
    index === array.findIndex((t) => t[key] === value[key]);

export function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function extractPathVariableKeys(path: string): string[] {
  const variableKeys = path
    .split("/")
    .filter((part) => part.startsWith(":"))
    .map((variable) => variable.slice(1));

  return variableKeys;
}

export function interpolatePathVariables(
  path: string,
  variables: Array<[string, string]>
): string {
  return variables.reduce((currentUrl, [key, value]) => {
    return currentUrl.replace(`:${key}`, value);
  }, path);
}

/**
 * Merges two arrays of objects (`arrayA` and `arrayB`) into one, resolving conflicts based on a key returned by the `callbackFn`.
 * For objects with the same key, properties from the objects in the second array (`arrayB`) overwrite those in the first (`arrayA`).
 *
 * @template TItem Extends object, the type of elements in the arrays to be merged.
 * @template TKey The type of the key used to identify unique objects.
 * @param {TItem[]} arrayA The first array of objects to merge.
 * @param {TItem[]} arrayB The second array of objects to merge.
 * @param {(value: TItem) => TKey} callbackFn A callback function that generates a key for each object based on its value. Used to identify and resolve conflicts between objects.
 * @returns {TItem[]} A new array containing merged objects from `arrayA` and `arrayB`. In case of conflicts, properties from `arrayB` objects take precedence.
 * @example
 *
 * const mergedArray = merge(
 *   [{ id: 1, name: "John" }, { id: 2, name: "Alice" }],
 *   [{ id: 1, age: 18 }, { id: 3, name: "Bob" }],
 *   (element) => element.id
 * );
 * // [{ id: 1, name: "John", age: 18 }, { id: 2, name: "Alice" }, { id: 3, name: "Bob" }]
 */
export function merge<TItem extends object, TKey>(
  arrayA: TItem[],
  arrayB: TItem[],
  callbackFn: (value: TItem) => TKey
) {
  const resultMap = new Map<TKey, TItem>();
  arrayA.forEach((item) => {
    const key = callbackFn(item);
    resultMap.set(key, item);
  });

  arrayB.forEach((item) => {
    const key = callbackFn(item);
    const oldItem = resultMap.get(key);
    resultMap.set(key, { ...oldItem, ...item });
  });

  return Array.from(resultMap.values());
}
