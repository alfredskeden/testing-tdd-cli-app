import searchContent from "../src/searchContent";
import readFileAsync from "../src/readFileAsync";
import fs from "fs/promises";
import { execSync } from "child_process";

describe("Core features", () => {
  test("Should return each line containing the query", () => {
    const query = "TDD";
    const content = "TDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toStrictEqual([[1, "TDD, Rocks"]]);
  });

  test("Should return each line containing the query with multiple matches (Not in requirement)", () => {
    const query = "TDD";
    const content = "TDD, Rocks\nTDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toStrictEqual([
      [1, "TDD, Rocks"],
      [2, "TDD, Rocks"],
    ]);
  });

  test("Should return no line when there is no match for the query", () => {
    const query = "pizza";
    const content = "TDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toEqual([[0, ""]]);
  });

  test("The query should be case-insensitive", () => {
    const query = "tdd";
    const content = "TDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toEqual([[1, "TDD, Rocks"]]);
  });

  test.each([
    { content: "TDD, Rocks\nPizza is not", query: "TDD", expectedResult: [[1, "TDD, Rocks"]] },
    { content: "Pizza is not\nTDD, Rocks", query: "TDD", expectedResult: [[2, "TDD, Rocks"]] },
  ])("The line number should be provided with the search result", ({ content, query, expectedResult }) => {
    const result = searchContent(query, content);

    expect(result).toStrictEqual(expectedResult);
  });

  test("The text file should be read from the disk", async () => {
    const testFilePath = "/src/files/textfile.txt";
    const fileContent = "TDD, Rocks!";

    jest.spyOn(fs, "readFile").mockResolvedValue(fileContent);

    const content = await readFileAsync(testFilePath);

    expect(content).toEqual(fileContent);
    expect(fs.readFile).toHaveBeenCalledWith(testFilePath, "utf-8");
  });
});

describe("Error handling", () => {
  test("The app should fail gracefully when not enough CLI arguments are provided", () => {
    try {
      execSync("node dist/index.js search", { stdio: "pipe" });
    } catch (error: any) {
      expect(error.stderr.toString()).toContain("error: missing required argument 'query'");
    }
  });

  test("The app should fail gracefully when fileUrl CLI argument are not provided", () => {
    try {
      execSync("node dist/index.js search TDD", { stdio: "pipe" });
    } catch (error: any) {
      // Check that the error message is as expected
      expect(error.stderr.toString()).toContain("error: missing required argument 'fileUrl'");
    }
  });

  test("The app should fail gracefully when the file does not exist", () => {
    try {
      execSync("node dist/index.js search TDD src/files/this-file-does-not-exist.txt", { stdio: "pipe" });
    } catch (error: any) {
      expect(error.stderr.toString()).toContain("Error: File does not exist");
    }
  });
});
