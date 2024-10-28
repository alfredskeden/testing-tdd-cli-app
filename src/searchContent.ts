type TContent = {
  line: number;
  lineContent: string;
};

const searchContent = (query: string, content: string) => {
  const foundContent: TContent[] = [];

  content.split("\n").map((cont, index) => {
    if (cont.toLowerCase().includes(query.toLowerCase())) {
      foundContent.push({ line: index + 1, lineContent: cont });
    }
  });

  return !foundContent.length ? [] : foundContent;
};

export default searchContent;
