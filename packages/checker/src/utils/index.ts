import path from "path";

export const getProjectPath = () => {
  if (process.env.NODE_ENV === "development")
    return path.join(process.cwd(), "tmp");
  return path.resolve(process.cwd(), "..");
};
