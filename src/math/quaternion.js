function alloc() {
  return new Float32Array(4);
}

export class Quaternion {
  constructor(x: number, y: number, z: number, w: number) {
    this.components = alloc();
    this.components[0] = x || 0;
    this.components[1] = y || 0;
    this.components[2] = z || 0;
    this.components[3] = w || 0;
  }

  get x(): number {
    return this.components[0];
  }

  get y(): number {
    return this.components[1];
  }

  get z(): number {
    return this.components[2];
  }

  get w(): number {
    return this.components[3];
  }

  toString(): string {
    return `x: ${this.components[0]}, y: ${this.components[1]}, z: ${this.components[2]}, w: ${this.components[3]}`;
  }
}
