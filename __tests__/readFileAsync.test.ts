import readFileAsync from "../src/readFileAsync";
import fs from "fs/promises";

describe("Index tests", () => {
  test("The text file should be read from the disk", async () => {
    const testFilePath = "/src/files/textfile.txt";
    const fileContent = "TDD, Rocks!";

    jest.spyOn(fs, "readFile").mockResolvedValue(fileContent);

    const content = await readFileAsync(testFilePath);

    expect(content).toBe(fileContent);
    expect(fs.readFile).toHaveBeenCalledWith(testFilePath, "utf-8");
  });
});
