import { execSync } from "child_process";

describe("Index tests", () => {});

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
