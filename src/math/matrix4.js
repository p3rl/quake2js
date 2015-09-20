function alloc() {
  return new Float32Array(16);
}

/**
 * A 4 dimensional matrix.
 */
export class Matrix4 {

  constructor() {
    if (arguments.length === 0) {
      this.components = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]);
    } else if (Array.isArray(arguments[0])) {
      this.components = new Float32Array(arguments[0]);
    } else {
      this.components = arguments[0];
    }

    if (this.components.length !== 16) {
      throw new Error('Invalid number of values passed to matrix');
    }
  }

  get c11(): number {
    return this.components[0];
  }

  set c11(value: number): void {
    this.components[0] = value;
  }

  get c12(): number {
    return this.components[1];
  }

  set c12(value: number): void {
    this.components[1] = value;
  }

  get c13(): number {
    return this.components[2];
  }

  set c13(value: number): void {
    this.components[2] = value;
  }

  get c14(): number {
    return this.components[3];
  }

  set c14(value: number): void {
    this.components[3] = value;
  }

  get c21(): number {
    return this.components[4];
  }

  set c21(value: number): void {
    this.components[4] = value;
  }

  get c22(): number {
    return this.components[5];
  }

  set c22(value: number): void {
    this.components[5] = value;
  }

  get c23(): number {
    return this.components[6];
  }

  set c23(value: number): void {
    this.components[6] = value;
  }

  get c24(): number {
    return this.components[7];
  }

  set c24(value: number): void {
    this.components[7] = value;
  }

  get c31(): number {
    return this.components[8];
  }

  set c31(value: number): void {
    this.components[8] = value;
  }

  get c32(): number {
    return this.components[9];
  }

  set c32(value: number): void {
    this.components[9] = value;
  }

  get c33(): number {
    return this.components[10];
  }

  set c33(value: number): void {
    this.components[10] = value;
  }

  get c34(): number {
    return this.components[11];
  }

  set c34(value: number): void {
    this.components[11] = value;
  }

  get c41(): number {
    return this.components[12];
  }

  set c41(value: number): void {
    this.components[12] = value;
  }

  get c42(): number {
    return this.components[13];
  }

  set c42(value: number): void {
    this.components[13] = value;
  }

  get c43(): number {
    return this.components[14];
  }

  set c43(value: number): void {
    this.components[14] = value;
  }

  get c44(): number {
    return this.components[15];
  }

  set c44(value: number): void {
    this.components[15] = value;
  }

  get(row: number, col: number): number {
    return this.components[row * 4 + col];
  }

  set(row: number, col: number, value: number): void {
    this.components[row * 4 + col] = value;
  }

  add(rhs: Matrix4): Matrix4 {
    return Matrix4.add(this, rhs, new Matrix4(alloc()));
  }

  subtract(rhs: Matrix4): Matrix4 {
    return Matrix4.subtract(this, rhs, new Matrix4(alloc()));
  }

  multiply(rhs: Matrix4): Matrix4 {
    return Matrix4.multiply(this, rhs, new Matrix4(alloc()));
  }

  perspective(fov: number, ratio: number, near: number, far: number) {
    return Matrix4.perspective(fov, ratio, near, far, this);
  }

  lookAt(target: Vector3, position: Vector3, up: Vector3): Matrix4 {
    return Matrix4.lookAt(target, position, up, this);
  }

  static add(a: Matrix4, b: Matrix4, out: Matrix4): Matrix4 {
    for (let i = 0; i < 16; ++i) {
      out.components[i] = a.components[i] + b.components[i];
    }
    return out;
  }

  static subtract(a: Matrix4, b: Matrix4, out: Matrix4): Matrix4 {
    for (let i = 0; i < 16; ++i) {
      out.components[i] = a.components[i] - b.components[i];
    }
    return out;
  }

  static multiply(a: Matrix4, b: Matrix4, out: Matrix4): Matrix4 {
    /*eslint-disable */
    let a11 = a.components[0], a12 = a.components[1], a13 = a.components[2], a14 = a.components[3];
    let a21 = a.components[4], a22 = a.components[5], a23 = a.components[6], a24 = a.components[7];
    let a31 = a.components[8], a32 = a.components[9], a33 = a.components[10], a34 = a.components[11];
    let a41 = a.components[12], a42 = a.components[13], a43 = a.components[14], a44 = a.components[15];

    let b11 = b.components[0], b12 = b.components[1], b13 = b.components[2], b14 = b.components[3];
    let b21 = b.components[4], b22 = b.components[5], b23 = b.components[6], b24 = b.components[7];
    let b31 = b.components[8], b32 = b.components[9], b33 = b.components[10], b34 = b.components[11];
    let b41 = b.components[12], b42 = b.components[13], b43 = b.components[14], b44 = b.components[15];
    /*eslint-enable */

    out.components[0] = a11 * b11 + a12 * b21 + a13 * b31  + a14 * b41;
    out.components[1] = a11 * b12 + a12 * b22 + a13 * b32  + a14 * b42;
    out.components[2] = a11 * b13 + a12 * b23 + a13 * b33  + a14 * b43;
    out.components[3] = a11 * b14 + a12 * b24 + a13 * b34  + a14 * b44;

    out.components[4] = a21 * b11 + a22 * b21 + a23 * b31  + a24 * b41;
    out.components[5] = a21 * b12 + a22 * b22 + a23 * b32  + a24 * b42;
    out.components[6] = a21 * b13 + a22 * b23 + a23 * b33  + a24 * b43;
    out.components[7] = a21 * b14 + a22 * b24 + a23 * b34  + a24 * b44;

    out.components[8] = a31 * b11 + a32 * b21 + a33 * b31  + a34 * b41;
    out.components[9] = a31 * b12 + a32 * b22 + a33 * b32  + a34 * b42;
    out.components[10] = a31 * b13 + a32 * b23 + a33 * b33  + a34 * b43;
    out.components[11] = a31 * b14 + a32 * b24 + a33 * b34  + a34 * b44;

    out.components[12] = a41 * b11 + a42 * b21 + a43 * b31  + a44 * b41;
    out.components[13] = a41 * b12 + a42 * b22 + a43 * b32  + a44 * b42;
    out.components[14] = a41 * b13 + a42 * b23 + a43 * b33  + a44 * b43;
    out.components[15] = a41 * b14 + a42 * b24 + a43 * b34  + a44 * b44;

    return out;
  }

  static zero(): Matrix4 {
    if (arguments.length === 0) {
      return new Matrix4(new Float32Array([
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0]));
    }

    let m = arguments[0];
    m.components[0] = 0;
    m.components[1] = 0;
    m.components[2] = 0;
    m.components[3] = 0;
    m.components[4] = 0;
    m.components[5] = 0;
    m.components[6] = 0;
    m.components[7] = 0;
    m.components[8] = 0;
    m.components[9] = 0;
    m.components[10] = 0;
    m.components[11] = 0;
    m.components[12] = 0;
    m.components[13] = 0;
    m.components[14] = 0;
    m.components[15] = 0;
    return m;
  }

  static identity(): Matrix4 {
    if (arguments.length === 0) {
      return new Matrix4(new Float32Array([
        0, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]));
    }

    let m = arguments[0];
    m.components[0] = 1;
    m.components[1] = 0;
    m.components[2] = 0;
    m.components[3] = 0;
    m.components[4] = 0;
    m.components[5] = 1;
    m.components[6] = 0;
    m.components[7] = 0;
    m.components[8] = 0;
    m.components[9] = 0;
    m.components[10] = 1;
    m.components[11] = 0;
    m.components[12] = 0;
    m.components[13] = 0;
    m.components[14] = 0;
    m.components[15] = 1;
    return m;
  }

  static perspective(fov: number, aspectRatio: number, near: number, far: number, out: Matrix4) {
    let depth = far - near;
    let oneOverDepth = 1 / depth;
    let uh = 1 / Math.tan(0.5 * fov);
    out.components[0] = uh / aspectRatio;
    out.components[5] = uh;
    out.components[10] = far * oneOverDepth;
    out.components[11] = 1;
    out.components[14] = (-far * near) * oneOverDepth;
    out.components[15] = 0;
    return out;
  }

  static lookAt(target: Vector3, position: Vector3, up: Vector3, out: Matrix4): Matrix4 {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = position.components[0],
        eyey = position.components[1],
        eyez = position.components[2],
        upx = up.components[0],
        upy = up.components[1],
        upz = up.components[2],
        centerx = target.components[0],
        centery = target.components[1],
        centerz = target.components[2];

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out.components[0] = x0;
    out.components[1] = y0;
    out.components[2] = z0;
    out.components[3] = 0;
    out.components[4] = x1;
    out.components[5] = y1;
    out.components[6] = z1;
    out.components[7] = 0;
    out.components[8] = x2;
    out.components[9] = y2;
    out.components[10] = z2;
    out.components[11] = 0;
    out.components[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out.components[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out.components[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out.components[15] = 1;

    return out;
  }

  /*
  0,  1,  2,  3,
  4,  5,  6,  7
  8,  9,  10, 11,
  12, 13, 14, 15
   */
}
