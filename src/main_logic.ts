import {Readable} from "node:stream";
import {Writable} from "stream";
import {readInput} from "./input_reader.js";
import {transformMatrix} from "./matrix_transformer.js";
import {writeMatrixStream} from "./matrix_writer.js";
import {DistanceMatrix} from "./matrix.js";

const findAllDistances = async (input: Readable, output: Writable): Promise<void> => {
  const matrices = generateMatrices(input);
  await writeMatrixStream(output, matrices);
  output.end();
}

async function* generateMatrices(input: Readable): AsyncGenerator<DistanceMatrix> {
  for await (const pixelMatrix of readInput(input)) {
    yield transformMatrix(pixelMatrix);
  }
}

export {findAllDistances};
