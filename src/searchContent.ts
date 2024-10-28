const searchContent = (query: string, content: string) => {
  const foundContent: [number, string][] = [];

  content.split("\n").map((cont, index) => {
    if (cont.toLowerCase().includes(query.toLowerCase())) {
      foundContent.push([index + 1, cont]);
    }
  });

  return !foundContent.length ? [[0, ""]] : foundContent;
};

export default searchContent;
