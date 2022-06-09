import {BlackWhitePixelMatrix, DistanceMatrix} from "./matrix.js";
import {Heap} from "./heap.js";


export class MatrixIsBlackError extends Error {}


export const findAllWhitePixels = (pixelMatrix: BlackWhitePixelMatrix): {x: number, y: number}[] => {
  const result: {x: number, y: number}[] = [];
  for (let x = 0; x < pixelMatrix.width; ++x) {
    for (let y = 0; y < pixelMatrix.height; ++y) {
      if (pixelMatrix.getElement(x, y)) result.push({x, y});
    }
  }
  if (result.length === 0) throw new MatrixIsBlackError(pixelMatrix.toString());
  return result;
}

export const transformMatrix = (pixelMatrix: BlackWhitePixelMatrix): DistanceMatrix => {
  const maxDistance = pixelMatrix.width + pixelMatrix.height;
  const result = new DistanceMatrix(pixelMatrix.width, pixelMatrix.height, maxDistance);
  const queue = new Heap<{x: number, y: number, value: number}>();
  for (const coordinates of findAllWhitePixels(pixelMatrix)) {
    queue.push(0, {value: 0, ...coordinates});
  }

  while (!queue.isEmpty()) {
    const minimalElement = queue.pop();
    if (minimalElement.x < 0 || minimalElement.x >= result.width) continue;
    if (minimalElement.y < 0 || minimalElement.y >= result.height) continue;

    const currentValue = result.getElement(minimalElement.x, minimalElement.y);
    if (minimalElement.value < currentValue) {
      result.setElement(minimalElement.x, minimalElement.y, minimalElement.value);
      const newValue = minimalElement.value + 1;
      queue.push(newValue, {x: minimalElement.x - 1, y: minimalElement.y, value: newValue});
      queue.push(newValue, {x: minimalElement.x, y: minimalElement.y - 1, value: newValue});
      queue.push(newValue, {x: minimalElement.x + 1, y: minimalElement.y, value: newValue});
      queue.push(newValue, {x: minimalElement.x, y: minimalElement.y + 1, value: newValue});
    }
  }
  return result;
}
