import {Readable} from 'node:stream';


export async function* readByLine(input_stream: Readable): AsyncGenerator<string> {
  let buffer = null;

  for await (const chunk of input_stream) {
    buffer = (buffer || "") + chunk;
    const split_data = buffer.split("\n");
    buffer = split_data.pop();
    for (const data of split_data) yield data;
  }

  if (buffer !== null) yield buffer;
}
