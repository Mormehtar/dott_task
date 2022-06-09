import {BlackWhitePixelMatrix, DistanceMatrix} from "./matrix.js";


export class MatrixIsBlackError extends Error {}


export const findWhitePixel = (pixelMatrix: BlackWhitePixelMatrix): {x: number, y: number} => {
  for (let x = 0; x < pixelMatrix.width; ++x) {
    for (let y = 0; y < pixelMatrix.height; ++y) {
      if (pixelMatrix.getElement(x, y)) return {x, y};
    }
  }
  throw new MatrixIsBlackError(pixelMatrix.toString());
}


export const transformMatrix = (pixelMatrix: BlackWhitePixelMatrix): DistanceMatrix => {
  const maxDistance = pixelMatrix.width + pixelMatrix.height;
  const result = new DistanceMatrix(pixelMatrix.width, pixelMatrix.height, maxDistance);
  const firstWhitePixel = findWhitePixel(pixelMatrix);
  recalculateDistanceAtPoint(firstWhitePixel.x, firstWhitePixel.y, 0, result, pixelMatrix);
  return result;
}


const recalculateDistanceAtPoint = (
  x: number,
  y: number,
  valueToSet: number,
  matrix: DistanceMatrix,
  pixelMatrix: BlackWhitePixelMatrix,
): void => {
  const currentValue = matrix.getElement(x, y);
  if (pixelMatrix.getElement(x, y)) valueToSet = 0;
  if (currentValue <= valueToSet) return;
  matrix.setElement(x, y, valueToSet);
  if (x > 0) recalculateDistanceAtPoint(x - 1, y, valueToSet + 1, matrix, pixelMatrix);
  if (y > 0) recalculateDistanceAtPoint(x, y - 1, valueToSet + 1, matrix, pixelMatrix);
  if (x < matrix.width - 1) recalculateDistanceAtPoint(x + 1, y, valueToSet + 1, matrix, pixelMatrix);
  if (y < matrix.height - 1) recalculateDistanceAtPoint(x, y + 1, valueToSet + 1, matrix, pixelMatrix);
}
