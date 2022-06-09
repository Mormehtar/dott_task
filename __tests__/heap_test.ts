import {Heap} from "../src/heap.js";


describe("Test heap", () => {
  it("Should return empty on empty heap", () => expect(new Heap().isEmpty()).toBe(true));
  it("Should return not empty if there is anything", () => {
    const heap = new Heap<number>();
    heap.push(1, 1);
    expect(heap.isEmpty()).toBe(false);
  });
  it("Should return elements ordered", () => {
    const heap = new Heap<string>();
    heap.push(10, "a");
    heap.push(20, "b");
    heap.push(15, "c");
    heap.push(5, "d");
    heap.push(16, "o");
    expect(heap.pop()).toBe("d");
    expect(heap.pop()).toBe("a");
    expect(heap.pop()).toBe("c");
    expect(heap.pop()).toBe("o");
    expect(heap.pop()).toBe("b");
  });

  it("Should return elements ordered even if updated in process", () => {
    const heap = new Heap<string>();
    heap.push(10, "a");
    heap.push(20, "b");
    heap.push(15, "c");
    heap.push(5, "d");
    expect(heap.pop()).toBe("d");
    expect(heap.pop()).toBe("a");
    heap.push(100, "u");
    heap.push(1, "k");
    heap.push(19, "blah!");
    expect(heap.pop()).toBe("k");
    expect(heap.pop()).toBe("c");
    expect(heap.pop()).toBe("blah!");
  });
});
