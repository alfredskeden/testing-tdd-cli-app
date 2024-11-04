import readFileAsync from "../src/readFileAsync";
import fs from "fs/promises";

describe("ReadFileAsync tests", () => {
  test("The text file should be read from the disk", async () => {
    const testFilePath = "/src/files/textfile.txt";
    const fileContent = "TDD, Rocks!";

    jest.spyOn(fs, "readFile").mockResolvedValue(fileContent);

    const content = await readFileAsync(testFilePath);

    expect(content).toBe(fileContent);
    expect(fs.readFile).toHaveBeenCalledWith(testFilePath, "utf-8");
  });
});

describe("ReadFileAsync errors", () => {
  test("that if filePath is Missing should return undefined for content", async () => {
    const testFilePath = undefined;
    const content = await readFileAsync(testFilePath);

    expect(content).toBeUndefined();
  });
});
