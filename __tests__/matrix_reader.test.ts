import { readMatrices, WrongDimensions } from "../src/matrix_reader.js";
import { BlackWhitePixelMatrix } from "../src/matrix.js";


async function* getGeneratorFromData(input: string[]): AsyncGenerator<string> {
  for (const line of input) yield line;
}

const checkStream = async (input: string[]): Promise<BlackWhitePixelMatrix[]> => {
  const chunks: BlackWhitePixelMatrix[] = [];
  for await (const chunk of readMatrices(getGeneratorFromData(input))) {
    chunks.push(chunk);
  }
  return chunks;
}


describe("Test Matrix Reader", () => {
  it("Should throw error on malformed dimensions", async () => {
    await expect(checkStream(["1"])).rejects.toThrow(WrongDimensions);
  });

  it("Should throw error on non int dimensions", async () => {
    await expect(checkStream(["abc abc"])).rejects.toThrow(WrongDimensions);
  });

  it("Should read one matrix", async () => {
    const result = await checkStream(["3 3", "001", "010", "100"]);
    expect(result).toHaveLength(1);
    expect(result[0].getElement(0, 0)).toBe(false);
    expect(result[0].getElement(1, 1)).toBe(true);
  });

  it("Should allow redundant empty lines outside of matrices", async () => {
    const result = await checkStream(["", "3 3", "001", "010", "100", "", ""]);
    expect(result).toHaveLength(1);
    expect(result[0].getElement(0, 0)).toBe(false);
    expect(result[0].getElement(1, 1)).toBe(true);
  });

  it("Should read two matices", async () => {
    const result = await checkStream(["1 1", "1", "", "1 1", "0"]);
    expect(result).toHaveLength(2);
    expect(result[0].getElement(0, 0)).toBe(true);
    expect(result[1].getElement(0, 0)).toBe(false);
  });
});
