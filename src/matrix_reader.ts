import { BlackWhitePixelMatrix } from "./matrix.js";


export class MatrixReaderError extends Error {}
export class WrongDimensions extends MatrixReaderError {}


export const initializeMatrix = (chunk: string): BlackWhitePixelMatrix => {
  const lineValues = chunk.split(" ");
  if (lineValues.length !== 2) {
    throw new WrongDimensions(`Line ${chunk} is not correct line for matrix dimensions`);
  }
  const width = parseInt(lineValues[0]);
  const height = parseInt(lineValues[1]);

  if (isNaN(width) || isNaN(height)) {
    throw new WrongDimensions(`Line ${chunk} is not correct line for matrix dimensions`);
  }
  return new BlackWhitePixelMatrix(width, height);
}

export async function* readMatrices(inputLines: AsyncGenerator<string>): AsyncGenerator<BlackWhitePixelMatrix> {
  let matrix: BlackWhitePixelMatrix = null;
  for await (const data of inputLines) {
    if (data === "" && matrix === null) continue;
    if (matrix === null) {
      matrix = initializeMatrix(data);
    } else {
      if (data === "") {
        matrix.finish();
        yield matrix;
        matrix = null;
      } else {
        matrix.parseLine(data);
      }
    }
  }
  if (matrix !== null) {
    matrix.finish();
    yield matrix;
  }
}
