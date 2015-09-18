import {Vector3} from '../../src/math/math.js';

describe('Vector3', () => {

  it('should create an array of three elements', () => {
    // Arrange & act
    let v = new Vector3();

    // Assert
    expect(v.components.length).toEqual(3);
  });

  it('should add two vectors correctly', () => {
    // Arrange
    let a = new Vector3(1.0, 2.0, 3.0);
    let b = new Vector3(2.0, 4.0, 6.0);

    // Act
    let c = a.add(b);

    // Assert
    expect(c.x).toEqual(3.0);
    expect(c.y).toEqual(6.0);
    expect(c.z).toEqual(9.0);
  });

  it('should subtract two vectors correctly', () => {
    // Arrange
    let a = new Vector3(1.0, 2.0, 3.0);
    let b = new Vector3(2.0, 4.0, 6.0);

    // Act
    let c = a.subtract(b);

    // Assert
    expect(c.x).toEqual(-1.0);
    expect(c.y).toEqual(-2.0);
    expect(c.z).toEqual(-3.0);
  });

  it('should scale vector by scalar', () => {
    // Arrange
    let a = new Vector3(1.0, 2.0, 3.0);

    // Act
    let b = a.scale(2.0);

    // Assert
    expect(b.x).toEqual(2.0);
    expect(b.y).toEqual(4.0);
    expect(b.z).toEqual(6.0);
  });

  it('should compute length', () => {
    // Arrange
    let a = new Vector3(1.0, 0.0, 0);

    // Act
    let s = a.length();

    // Assert
    expect(s).toEqual(1);
  });

  it('should compute cross product', () => {
    // Arrange
    let a = new Vector3(1.0, 0.0, 0.0);
    let b = new Vector3(0.0, 1.0, 0.0);

    // Act
    let c = a.cross(b);

    // Assert
    expect(c.x).toEqual(0.0);
    expect(c.y).toEqual(0.0);
    expect(c.z).toEqual(1.0);
  });
});
