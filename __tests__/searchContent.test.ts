import searchContent from "../src/searchContent";

describe("searchContent", () => {
  test("Should return each line containing the query", () => {
    const query = "TDD";
    const content = "TDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toStrictEqual([{ line: 1, lineContent: "TDD, Rocks" }]);
  });

  test("Should return each line containing the query with multiple matches (Not in requirement)", () => {
    const query = "TDD";
    const content = "TDD, Rocks\nTDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toStrictEqual([
      { line: 1, lineContent: "TDD, Rocks" },
      { line: 2, lineContent: "TDD, Rocks" },
    ]);
  });

  test("Should return no line when there is no match for the query", () => {
    const query = "pizza";
    const content = "TDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toEqual([]);
  });

  test("The query should be case-insensitive", () => {
    const query = "tdd";
    const content = "TDD, Rocks";

    const result = searchContent(query, content);

    expect(result).toEqual([{ line: 1, lineContent: "TDD, Rocks" }]);
  });

  test.each([
    { content: "TDD, Rocks\nPizza is not", query: "TDD", expectedResult: [{ line: 1, lineContent: "TDD, Rocks" }] },
    { content: "Pizza is not\nTDD, Rocks", query: "TDD", expectedResult: [{ line: 2, lineContent: "TDD, Rocks" }] },
  ])("The line number should be provided with the search result", ({ content, query, expectedResult }) => {
    const result = searchContent(query, content);

    expect(result).toStrictEqual(expectedResult);
  });
});

describe("searchContent errors", () => {
  test("", () => {});
});
