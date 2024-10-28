import { Command } from "commander";
import readFileAsync from "./readFileAsync";
import searchContent from "./searchContent";

const program = new Command();

program
  .version("0.1.1")
  .description("Query Search CLI App")
  .command("search <query> <fileUrl>")
  .description("A command-line application that searches for a user-provided query within a specified text file")
  .action(async (query, fileUrl) => {
    try {
      const content = await readFileAsync(fileUrl);

      const test = searchContent(query, content);

      test.forEach((line) => {
        console.log(`${line[0]}: ${line[1]}`);
      });
    } catch (error) {
      console.log(error);
    }
  });

program.parse(process.argv);
