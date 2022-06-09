import { writeMatrix, writeMatrixStream } from "../src/matrix_writer.js";
import { DistanceMatrix } from "../src/matrix.js";
import { TestStream } from "../src/test_utils/writeble_stream.js";


async function* generateMatrices(matrices: DistanceMatrix[]): AsyncGenerator<DistanceMatrix> {
  for (const matrix of matrices) yield matrix;
}

describe("Test matrix writer", () => {
  it("Should write", async () => {
    const matrix = new DistanceMatrix(1, 3, 42);
    const stream = new TestStream();
    await writeMatrix(stream, matrix);
    const expected = [
      "42",
      "42",
      "42",
      "",
    ].join("\n");

    expect(stream.output).toEqual(expected);
  });

  it("Should write with timeout", async () => {
    const matrix = new DistanceMatrix(2, 2, 42);
    const stream = new TestStream(0.2, {highWaterMark: 1});
    await writeMatrix(stream, matrix);
    const expected = [
      "42 42",
      "42 42",
      "",
    ].join("\n");

    expect(stream.output).toEqual(expected);
  });
});


describe("Test matrix generator writer", () => {
  it("Should write", async () => {
    const generator = generateMatrices(
      [
        new DistanceMatrix(2, 2, 42),
        new DistanceMatrix(1, 1, 13),
      ]
    );
    const expected = [
      "42 42",
      "42 42",
      "",
      "13",
      "",
    ].join("\n");
    const stream = new TestStream();
    await writeMatrixStream(stream, generator);
    expect(stream.output).toEqual(expected);
  });
});
