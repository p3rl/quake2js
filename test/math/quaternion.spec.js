import {Quaternion} from '../../src/math/math.js';

describe('Quaternion', () => {

  it('should initialize components to zero', () => {
    // Arrange & act
    let q = new Quaternion();

    // Assert
    expect(q.x).toEqual(0);
    expect(q.y).toEqual(0);
    expect(q.z).toEqual(0);
    expect(q.w).toEqual(0);
  })

  it('should initialize components', () => {
    // Arrange & act
    let q = new Quaternion(1, 2, 3, 4);

    // Assert
    expect(q.x).toEqual(1);
    expect(q.y).toEqual(2);
    expect(q.z).toEqual(3);
    expect(q.w).toEqual(4);
  })


});
