import { readFile } from "fs/promises";

const readFileAsync = async (filePath?: string) => {
  if (!filePath) {
    return undefined;
  }

  const fileContent = await readFile(filePath, "utf-8");

  return fileContent;
};

export default readFileAsync;
