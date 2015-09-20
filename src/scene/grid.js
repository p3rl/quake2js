import {Lines} from './lines';

export class Grid {

  constructor(size: number, resolution: number) {
    this.lines = new Lines((size * 4) / resolution);
    let count = size * 2;

    let from = { x: -size, y: 0, z: -size };
    let to = { x: size, y: 0, z: -size };

    for (let i = 0; i < count; ++i) {
      this.lines.set(i, from, to);
      from.z += resolution;
      to.z += resolution;
    }

    from = { x: -size, y: 0, z: -size };
    to = { x: -size, y: 0, z: size };

    for (let i = 0; i < count; ++i) {
      this.lines.set(i, from, to);
      from.x += resolution;
      to.x += resolution;
    }
  }

  getBuffer(): Float32Array {
    return this.lines.buffer;
  }
}
