import {
  DistanceMatrix,
  BlackWhitePixelMatrix,
  WrongLineLength,
  WrongHeight,
  WrongElementValue
} from "../src/matrix.js";


describe("Test DistanceMatrix", () => {
  it("Should be created with filler", () => {
    const matrix = new DistanceMatrix(1, 1, 42);
    expect(matrix.getElement(0, 0)).toBe(42);
  });
});


describe("Test BlackWhitePixelMatrix", () => {
  it("Should create correctly", () => expect(new BlackWhitePixelMatrix(1, 1)).toBeTruthy());

  it("Should raise on wrong length of input", () => {
    const matrix = new BlackWhitePixelMatrix(1, 1);
    expect(() => matrix.parseLine("101")).toThrow(WrongLineLength);
  });

  it("Should raise on wrong matrix height", () => {
    const matrix = new BlackWhitePixelMatrix(1, 1);
    expect(() => matrix.finish()).toThrow(WrongHeight);
  });

  it("Should finish matrix correctly if dimensions are right", () => {
    const matrix = new BlackWhitePixelMatrix(0, 0);
    expect(() => matrix.finish()).not.toThrow(WrongHeight);
  });

  it("Should raise on wrong line data", () => {
    const matrix = new BlackWhitePixelMatrix(3, 1);
    expect(() => matrix.parseLine("123")).toThrow(WrongElementValue);
  });

  it("Should parse correctly", () => {
    const matrix = new BlackWhitePixelMatrix(3, 1);
    matrix.parseLine("101");
    expect(matrix.getElement(0, 0)).toBe(true);
    expect(matrix.getElement(1, 0)).toBe(false);
  });

  it("Should set element correctly", () => {
    const matrix = new BlackWhitePixelMatrix(3, 1);
    matrix.parseLine("101");
    matrix.setElement(2, 0, false);
    expect(matrix.getElement(2, 0)).toBe(false);
  });
});
