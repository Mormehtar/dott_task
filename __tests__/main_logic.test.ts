import {findAllDistances} from "../src/main_logic.js";
import {Readable} from "node:stream";
import { TestStream } from "../src/test_utils/writeble_stream.js";


const checkStream = async (input: string[]): Promise<string> => {
  const outputStream = new TestStream();
  await findAllDistances(Readable.from(input), outputStream);
  return outputStream.output;
}


describe("Test integration", () => {
  it("Should transform input to output", async () => {
    const input = [
      "2",
      "1 1",
      "1",
      "",
      "2, 2",
      "00",
      "10",
    ].join("\n");

    const expected = [
      "0",
      "",
      "1 2",
      "0 1",
      "",
    ].join("\n")

    await expect(checkStream([input])).resolves.toEqual(expected);
  });
});
