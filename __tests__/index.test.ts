import { execSync } from "child_process";

describe("Error handling", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
  });

  test("The app should fail gracefully when not enough CLI arguments are provided", () => {
    try {
      execSync("node dist/index.js search", { stdio: "pipe" });
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test("The app should fail gracefully when fileUrl CLI argument are not provided", () => {
    try {
      execSync("node dist/index.js search TDD", { stdio: "pipe" });
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test("The app should fail gracefully when the file does not exist", () => {
    try {
      execSync("node dist/index.js search TDD src/files/this-file-does-not-exist.txt", { stdio: "pipe" });
    } catch (error) {
      expect(console.error).toHaveBeenCalled();
      expect(error).not.toBeUndefined();
    }
  });
});
