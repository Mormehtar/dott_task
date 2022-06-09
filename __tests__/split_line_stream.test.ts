import { Readable } from "node:stream";
import { readByLine } from "../src/line_reader.js";


const check_stream = async (input: string[]): Promise<string[]> => {
  const input_stream = Readable.from(input);
  const chunks: string[] = [];
  for await (const chunk of readByLine(input_stream)) {
    chunks.push(chunk);
  }
  return chunks;
}

describe("Test split line stream", () => {
  it("Should return string if it passed to", async () => {
    expect(await check_stream(["abc"])).toEqual(["abc"]);
  });

  it("Should return string split by new line", async () => {
    expect(await check_stream(["abc\nabc"])).toEqual(["abc", "abc"]);
  });

  it("Should return string split by new line not looking on chunks", async () => {
    expect(await check_stream(["ab", "c\na", "bc"])).toEqual(["abc", "abc"]);
  });

  it("Should return empty string between two newlines", async () => {
    expect(await check_stream(["\n\n"])).toEqual(["", "", ""]);
  });

  it("Should return empty string between two newlines even if they are split by chunks", async () => {
    expect(await check_stream(["\n", "\n"])).toEqual(["", "", ""]);
  });
});
