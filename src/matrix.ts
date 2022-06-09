export class MatrixError extends Error {}

export class WrongLineLength extends MatrixError {}
export class WrongHeight extends MatrixError {}
export class WrongElementValue extends MatrixError {}


class Matrix<CellType> {
  width: number;
  height: number;
  data: CellType[][];

  constructor(x: number, y: number) {
    this.width = x;
    this.height = y;
    this.data = [];
  }

  getElement = (x: number, y: number): CellType => this.data[y][x];
  setElement = (x: number, y: number, value: CellType): void => { this.data[y][x] = value; }

  toString = (): string => {
    const result: string[] = [];
    for (let i = 0; i < this.height; ++i) {
      result.push(this.data[i].map((data) => data.toString()).join(" "));
    }
    return result.join("\n");
  }
}


export class BlackWhitePixelMatrix extends Matrix<boolean> {
  finished: boolean;

  constructor(x: number, y: number) {
    super(x, y);
    this.finished = false;
  }

  parseLine = (line: string): void => {
    if (line.length !== this.width) {
      throw new WrongLineLength(`Line ${line} has unexpected length!`);
    }
    const matrix_line = line.split("").map(
      (char): boolean => {
        if (char == "0") return false;
        if (char == "1") return true;
        throw new WrongElementValue(`${char} is not valid. It should be 0 or 1`);
      }
    )
    this.data.push(matrix_line);
  }

  finish = (): void => {
    if (this.data.length != this.height) {
      throw new WrongHeight(`Matrix has wrong height. ${this.data.length} got but ${this.height} expected!`);
    }
    this.finished = true
  }
}


export class DistanceMatrix extends Matrix<number> {
  constructor(x: number, y: number, fill: number) {
    super(x, y);
    for (let i = 0; i < this.height; ++i) this.data.push(Array(this.width).fill(fill));
  }
}
