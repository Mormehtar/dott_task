import {Readable} from 'node:stream';
import {BlackWhitePixelMatrix} from "./matrix.js";
import {readMatrices} from "./matrix_reader.js";
import {readByLine} from "./line_reader.js";


export class ReadError extends Error {}
export class UnexpectedEOF extends ReadError {}
export class WrongTestsNumber extends ReadError {}


async function* readInput(input_stream: Readable): AsyncGenerator<BlackWhitePixelMatrix> {
  const lineByLineGenerator = readByLine(input_stream);

  const iterationResult = await lineByLineGenerator.next();
  if (iterationResult.value !== "0" && iterationResult.done) throw new UnexpectedEOF();

  const firstLine: string = iterationResult.value;
  if (firstLine.split(" ").length != 1) throw new WrongTestsNumber(firstLine);

  const numberOfTests = parseInt(firstLine);
  if (isNaN(numberOfTests)) throw new WrongTestsNumber(firstLine);

  let testsCount = 0;

  const matricesReader = readMatrices(lineByLineGenerator);

  for await (const matrix of matricesReader) {
    testsCount += 1;
    if (testsCount > numberOfTests) {
      throw new WrongTestsNumber(`Got more tests then expected! Expected ${numberOfTests}`);
    }
    yield matrix;
  }
  if (testsCount !== numberOfTests) {
    throw new WrongTestsNumber(`Got less tests then expected! Expected ${numberOfTests}`);
  }
}

export {readInput};
