import { BlackWhitePixelMatrix } from "../src/matrix.js";
import {findAllWhitePixels, MatrixIsBlackError, transformMatrix} from "../src/matrix_transformer.js";


describe("Test find all white pixels", () => {
  it("Should find one", () => {
    const matrix = new BlackWhitePixelMatrix(2, 2);
    matrix.parseLine("00");
    matrix.parseLine("01");
    expect(findAllWhitePixels(matrix)).toEqual([{x: 1, y: 1}]);
  });

  it("Should throw on black matrix", () => {
    const matrix = new BlackWhitePixelMatrix(2, 2);
    matrix.parseLine("00");
    matrix.parseLine("00");
    expect(() => findAllWhitePixels(matrix)).toThrow(MatrixIsBlackError);
  });

  it("Should find two", () => {
    const matrix = new BlackWhitePixelMatrix(2, 2);
    matrix.parseLine("10");
    matrix.parseLine("01");
    const result = findAllWhitePixels(matrix)
    expect(result).toContainEqual({x: 0, y: 0});
    expect(result).toContainEqual({x: 1, y: 1});
    expect(result).toHaveLength(2);
  });
});

describe("Test build distances", () => {
  it("Should find zero distance", () => {
    const matrix = new BlackWhitePixelMatrix(1, 1);
    matrix.parseLine("1");
    expect(transformMatrix(matrix).toString()).toEqual("0");
  });

  it("Should find correct distances for non trivial case", () => {
    const matrix = new BlackWhitePixelMatrix(4, 4);
    matrix.parseLine("1000");
    matrix.parseLine("0000");
    matrix.parseLine("0000");
    matrix.parseLine("0001");
    const expected = [
      "0 1 2 3",
      "1 2 3 2",
      "2 3 2 1",
      "3 2 1 0",
    ];
    expect(transformMatrix(matrix).toString()).toEqual(expected.join("\n"));
  });
});
