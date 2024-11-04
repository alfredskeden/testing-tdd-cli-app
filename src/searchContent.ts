type TContent = {
  line?: number;
  lineContent: string;
};

const searchContent = (query?: string, content?: string) => {
  const foundContent: TContent[] = [];

  if (!query) {
    foundContent.push({ lineContent: "Query is missing" });
    return foundContent;
  }
  if (!content) {
    foundContent.push({ lineContent: "Content is missing" });
    return foundContent;
  }

  content.split("\n").map((cont, index) => {
    if (cont.toLowerCase().includes(query.toLowerCase())) {
      foundContent.push({ line: index + 1, lineContent: cont });
    }
  });

  if (!foundContent.length) {
    foundContent.push({ lineContent: "No lines found" });
  }

  return foundContent;
};

export default searchContent;
