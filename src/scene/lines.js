export class Lines {

  constructor(count: number) {
    this.count = count;
    this.vertexSize = 3;
    this.bufferSize = 2 * this.vertexSize * count;
    this.buffer = new Float32Array(this.bufferSize);
  }

  set(index: number, from: any, to: any): void {
    this.buffer[index * this.elementSize] = from.x;
    this.buffer[index * this.elementSize + 1] = from.y;
    this.buffer[index * this.elementSize + 2] = from.z;
    this.buffer[index * this.elementSize + 3] = to.x;
    this.buffer[index * this.elementSize + 4] = to.y;
    this.buffer[index * this.elementSize + 5] = to.z;
  }
}
