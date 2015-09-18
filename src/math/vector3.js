function alloc() {
  return new Float32Array(3);
}

/**
 * A 3d vector with value semantics.
 */
export class Vector3 {

  constructor(x: number, y: number, z: number) {
    this.components = alloc();
    this.components[0] = x || 0;
    this.components[1] = y || 0;
    this.components[2] = z || 0;
  }

  get x(): number {
    return this.components[0];
  }

  set x(s: number): void {
    this.components[0] = s;
  }

  get y(): number {
    return this.components[1];
  }

  set y(s: number): void {
    this.components[1] = s;
  }

  get z(): number {
    return this.components[2];
  }

  set z(s: number): void {
    this.components[2] = s;
  }

  clone(): Vector3 {
    return new Vector3(this.components[0], this.components[1], this.components[2]);
  }

  length(): number {
    return Vector3.norm(this);
  }

  add(rhs: Vector3): Vector3 {
    return Vector3.add(this, rhs, new Vector3());
  }

  subtract(rhs: Vector3): Vector3 {
    return Vector3.subtract(this, rhs, new Vector3());
  }

  scale(s: number): Vector3 {
    return Vector3.scale(this, s, new Vector3());
  }

  cross(rhs: Vector3): Vector3 {
    return Vector3.cross(this, rhs, new Vector3());
  }

  toString(): string {
    return `x: ${this.components[0]}, y: ${this.components[1]}, z: ${this.components[2]}`;
  }

  static add(a: Vector3, b: Vector3, out: Vector3): Vector3 {
    out.components[0] = a.components[0] + b.components[0];
    out.components[1] = a.components[1] + b.components[1];
    out.components[2] = a.components[2] + b.components[2];
    return out;
  }

  static subtract(a: Vector3, b: Vector3, out: Vector3): Vector3 {
    out.components[0] = a.components[0] - b.components[0];
    out.components[1] = a.components[1] - b.components[1];
    out.components[2] = a.components[2] - b.components[2];
    return out;
  }

  static scale(v: Vector3, s: number, out: Vector3): Vector3 {
    out.components[0] = v.components[0] * s;
    out.components[1] = v.components[1] * s;
    out.components[2] = v.components[2] * s;
    return out;
  }

  static norm(v: Vector3): number {
    return Math.sqrt(v.components[0] * v.components[0] +
                     v.components[1] * v.components[1] +
                     v.components[2] * v.components[2]);
  }

  static normalize(v: Vector3, out: Vector3): Vector3 {
    let s = 1.0 / v.length();
    out.components[0] = s * v.components[0];
    out.components[1] = s * v.components[1];
    out.components[2] = s * v.components[2];
    return out;
  }

  static cross(a: Vector3, b: Vector3, out: Vector3): Vector3 {
    let ax = a.components[0], ay = a.components[1], az = a.components[2],
        bx = b.components[0], by = b.components[1], bz = b.components[2];
    out.components[0] = ay * bz - az * by;
    out.components[1] = az * bx - ax * bz;
    out.components[2] = ax * by - ay * bx;
    return out;
  }

  static dot(a: Vector3, b: Vector3): number {
    return a.components[0] * b.components[0] +
           a.components[1] * b.components[1] +
           a.components[2] * b.components[2];
  }

  static squaredLength(v: Vector3): number {
    return dot(v, v);
  }

  static zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }
}
