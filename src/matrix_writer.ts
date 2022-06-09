import { Writable } from "stream";
import { once } from "events";
import { DistanceMatrix } from "./matrix.js";


async function writeToStream(output_stream: Writable, str: string): Promise<void> {
  const canWrite = output_stream.write(str);
  if (!canWrite) await once(output_stream, "drain");
}


export async function writeMatrix(output_stream: Writable, matrix: DistanceMatrix): Promise<void> {
  await writeToStream(output_stream, matrix.toString() + "\n");
}


export async function writeMatrixStream(
  output_stream: Writable,
  matrices: AsyncGenerator<DistanceMatrix>,
): Promise<void> {
  let first = true;
  for await (const matrix of matrices) {
    if (!first) await writeToStream(output_stream, "\n");
    await writeMatrix(output_stream, matrix);
    first = false;
  }
}
