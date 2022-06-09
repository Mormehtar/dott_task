import {Readable} from "node:stream";
import {BlackWhitePixelMatrix} from "../src/matrix.js";
import {readInput, UnexpectedEOF, WrongTestsNumber} from "../src/input_reader.js";


const check_stream = async (input: string[]): Promise<BlackWhitePixelMatrix[]> => {
  const input_stream = Readable.from(input);
  const chunks: BlackWhitePixelMatrix[] = [];
  for await (const chunk of readInput(input_stream)) {
    chunks.push(chunk);
  }
  return chunks;
}


describe("Test input reader", () => {
  it("Should read trivial", async () => {
    await expect(check_stream(["0"])).resolves.toEqual([]);
  });
  it("Should read basic matrix", async () => {
    const data = await check_stream([["1", "1 1", "1"].join("\n")]);
    expect(data).toHaveLength(1);
    expect(data[0].getElement(0, 0)).toBe(true);
  });
  it("Should read multiple matrices", async () => {
    const data = [
      "2",
      "1 1",
      "1",
      "",
      "2 1",
      "01",
    ].join("\n");
    const result = await check_stream([data]);
    expect(result).toHaveLength(2);
    expect(result[0].getElement(0, 0)).toBe(true);
    expect(result[1].getElement(0, 0)).toBe(false);
  });
  it("Should throw on not tests count", async () => {
    const data = check_stream([]);
    await expect(data).rejects.toThrow(UnexpectedEOF);
  });
  it("Should throw in malformed first line", async () => {
    const data = check_stream([["1 1", "1 1", "1"].join("\n")]);
    await expect(data).rejects.toThrow(WrongTestsNumber);
  });
  it("Should throw in non number first line", async () => {
    const data = check_stream([["abc", "1 1", "1"].join("\n")]);
    await expect(data).rejects.toThrow(WrongTestsNumber);
  });
  it("Should throw if there is one matrix for two tests", async () => {
    const data = check_stream([["2", "1 1", "1"].join("\n")]);
    await expect(data).rejects.toThrow(WrongTestsNumber);
  });
  it("Should throw if there are two matrices for one test", async () => {
    const data = check_stream([["1", "1 1", "1", "", "1 1", "1"].join("\n")]);
    await expect(data).rejects.toThrow(WrongTestsNumber);
  });
});
