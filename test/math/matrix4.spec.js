import {Matrix4} from '../../src/math/math.js';

describe('Matrix4', () => {

  it('new instance with no arguments should create identity matrix', () => {
    // Arrange & act
    let m = new Matrix4();

    // Assert
    expect(m.components.length).toEqual(16);
    expect(m.c11).toEqual(1);
    expect(m.c22).toEqual(1);
    expect(m.c33).toEqual(1);
    expect(m.c44).toEqual(1);

    for (let row = 0; row < 4; ++row) {
      for (let col = 0; col < 4; ++col) {
        if (row !== col) {
          expect(m.get(row, col)).toEqual(0);
        } else {
          expect(m.get(row, col)).toEqual(1);
        }
      }
    }
  });

  it('should initialize components from array', () => {
    // Arrange & act
    let m = new Matrix4([
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1]);

    // Assert
    expect(m.components.length).toEqual(16);
    for (let c of m.components) {
      expect(c).toEqual(1);
    }
  });

  it('should set components from typed float array', () => {
    // Arrange & act
    let array = new Float32Array([
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ]);

    let m = new Matrix4(array);

    // Assert
    expect(m.components.length).toEqual(16);
    expect(m.components).toBe(array);
  });

  describe('multiply', () => {
    it('should multiply two identity matrices to identity', () => {
      // Arrange
      let a = new Matrix4();
      let b = new Matrix4();

      // Act
      let c  = a.multiply(b);

      // Assert
      for (let i = 0; i < 16; i++) {
        if (i === 0 || i === 5 || i === 10 || i === 15) {
          expect(c.components[i]).toEqual(1);
        } else {
          expect(c.components[i]).toEqual(0);
        }
      }
    });

    it('should multiply to zero when right hand size is zero', () => {
      // Arrange
      let a = new Matrix4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
      ])

      let b = Matrix4.zero();

      // Act
      let c = a.multiply(b);

      for (let c of c.components) {
        expect(c).toEqual(0);
      }
    })
  })
});
