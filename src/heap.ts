type HeapCell<BaseCell> = {
  key: number,
  value: BaseCell
}


export class Heap<BaseCell> {
  data: HeapCell<BaseCell>[];

  constructor() {
    this.data = [];
  }

  _getParent = (index: number): number => Math.floor((index - 1) / 2);
  _getLeftChild = (index: number): number => 2 * index + 1;
  _getRightChild = (index: number): number => 2 * index + 2;

  _moveUp = (index: number): number => {
    let parentIndex = this._getParent(index);
    while (index > 0 && this.data[index].key < this.data[parentIndex].key) {
      this._swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this._getParent(index);
    }
    return index;
  }
  _moveDown = (index: number): void => {
    for (;;) {
      let smallestChild = index;
      const leftChild = this._getLeftChild(index);
      const rightChild = this._getRightChild(index);

      if (leftChild < this.data.length && this.data[smallestChild].key > this.data[leftChild].key) {
        smallestChild = leftChild;
      }
      if (rightChild < this.data.length && this.data[smallestChild].key > this.data[rightChild].key) {
        smallestChild = rightChild;
      }
      if (smallestChild == index) break;

      this._swap(index, smallestChild);
      index = smallestChild;
    }
  }
  _swap = (index1: number, index2: number) => {
    const tmp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = tmp;
  }

  push = (key: number, value: BaseCell): void => {
    this.data.push({key, value});
    if (this.data.length === 1) return;
    this._swap(0, this.data.length - 1);
    const index = this._moveUp(this.data.length - 1);
    this._moveDown(index);
  }
  pop = (): BaseCell => {
    this._swap(0, this.data.length - 1);
    const result = this.data.pop();
    this._moveDown(0);
    return result.value;
  }

  isEmpty = (): boolean => this.data.length === 0;
}
