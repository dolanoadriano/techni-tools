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
