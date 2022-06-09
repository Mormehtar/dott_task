import { Writable, WritableOptions } from "stream";


export class TestStream extends Writable {
  output: string;
  timeout: number;

  constructor(timeout = 0, opts?: WritableOptions) {
    super(opts);
    this.timeout = timeout;
    this.output = "";
  }
  _write(chunk: string, _: BufferEncoding, callback: (error?: (Error | null)) => void) {
    this.output += chunk;
    if (this.timeout) {
      setTimeout(callback, this.timeout);
    } else {
      callback();
    }
  }
}
