import {Vector3} from '../../src/math/math.js';

describe('Vector3', () => {

  it('should create an array of three elements', () => {
    // Arrange & act
    let v = Vector3.create();

    // Assert
    expect(v.length).toEqual(3);
  });

  it('should create zero vector', () => {
    // Arrange & act
    let v = Vector3.zero();

    // Assert
    expect(v.length).toEqual(3);
    expect(v[0]).toEqual(0.0);
    expect(v[1]).toEqual(0.0);
    expect(v[2]).toEqual(0.0);
  });

  it('should create x vector', () => {
    // Arrange & act
    let v = Vector3.x();

    // Assert
    expect(v.length).toEqual(3);
    expect(v[0]).toEqual(1.0);
    expect(v[1]).toEqual(0.0);
    expect(v[2]).toEqual(0.0);
  });

  it('should create y vector', () => {
    // Arrange & act
    let v = Vector3.y();

    // Assert
    expect(v.length).toEqual(3);
    expect(v[0]).toEqual(0.0);
    expect(v[1]).toEqual(1.0);
    expect(v[2]).toEqual(0.0);
  });

  it('should create z vector', () => {
    // Arrange & act
    let v = Vector3.z();

    // Assert
    expect(v.length).toEqual(3);
    expect(v[0]).toEqual(0.0);
    expect(v[1]).toEqual(0.0);
    expect(v[2]).toEqual(1.0);
  });

  it('should add two vectors correctly', () => {
    // Arrange
    let a = Vector3.create(1.0, 2.0, 3.0);
    let b = Vector3.create(2.0, 4.0, 6.0);

    // Act
    let c = Vector3.add(a, b, Vector3.new());

    // Assert
    expect(c.length).toEqual(3);
    expect(c[0]).toEqual(3.0);
    expect(c[1]).toEqual(6.0);
    expect(c[2]).toEqual(9.0);
  });

  it('should subtract two vectors correctly', () => {
    // Arrange
    let a = Vector3.create(1.0, 2.0, 3.0);
    let b = Vector3.create(2.0, 4.0, 6.0);

    // Act
    let c = Vector3.new();
    Vector3.subtract(a, b, c);

    // Assert
    expect(c.length).toEqual(3);
    expect(c[0]).toEqual(-1.0);
    expect(c[1]).toEqual(-2.0);
    expect(c[2]).toEqual(-3.0);
  });

  it('should scale vector by scalar', () => {
    // Arrange
    let a = Vector3.create(1.0, 2.0, 3.0);

    // Act
    let b = Vector3.scale(a, 2.0, Vector3.new());

    // Assert
    expect(b[0]).toEqual(2.0);
    expect(b[1]).toEqual(4.0);
    expect(b[2]).toEqual(6.0);
  });

  it('should compute length', () => {
    // Arrange
    let a = Vector3.create(1.0, 0.0, 0);

    // Act
    let s = Vector3.norm(a);

    // Assert
    expect(s).toEqual(1);
  });

  it('should compute cross product', () => {
    // Arrange
    let a = Vector3.create(1.0, 0.0, 0.0);
    let b = Vector3.create(0.0, 1.0, 0.0);

    // Act
    let c = Vector3.cross(a, b, Vector3.new());

    // Assert
    expect(c[0]).toEqual(0.0);
    expect(c[1]).toEqual(0.0);
    expect(c[2]).toEqual(1.0);
  });
});
