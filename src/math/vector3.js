export class Vector3 {

  static new(): Float32Array {
    return new Float32Array(3);
  }

  static create(): Float32Array {
    let v = new Float32Array(3);
    for (let i = 0; i < arguments.length; ++i) {
      v[i] = arguments[i];
    }
    return v;
  }

  static zero(): Float32Array {
    let v = new Float32Array(3);
    v[0] = 0.0;
    v[1] = 0.0;
    v[2] = 0.0;
    return v;
  }

  static x(): Float32Array {
    let v = new Float32Array(3);
    v[0] = 1.0;
    v[1] = 0.0;
    v[2] = 0.0;
    return v;
  }

  static y(): Float32Array {
    let v = new Float32Array(3);
    v[0] = 0.0;
    v[1] = 1.0;
    v[2] = 0.0;
    return v;
  }

  static z(): Float32Array {
    let v = new Float32Array(3);
    v[0] = 0.0;
    v[1] = 0.0;
    v[2] = 1.0;
    return v;
  }

  static add(a: Float32Array, b: Float32Array, out: Float32Array): Float32Array {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }

  static subtract(a: Float32Array, b: Float32Array, out: Float32Array): Float32Array {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }

  static scale(v: Float32Array, s: number, out: Float32Array): Float32Array {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;
    return out;
  }

  static norm(v: Float32Array): number {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  static normalize(v: Float32Array, out: Float32Array): Float32Array {
    let s = 1.0 / norm(v);
    out[0] = s * v[0];
    out[1] = s * v[1];
    out[2] = s * v[2];
    return out;
  }

  static cross(a: Float32Array, b: Float32Array, out: Float32Array): Float32Array {
    let ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }

  static dot(a: Float32Array, b: Float32Array): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  static squaredLength(v: Float32Array): number {
    return dot(v, v);
  }
}
