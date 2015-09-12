import {BinaryReader} from '../../src/io/binary-reader';

describe('binary-reader', () => {

  it('should throw when initialized with invalid buffer', () => {
    var create = () => {
      new BinaryReader(null);
    };
    expect(create).toThrowError('Invalid buffer');
  });

  it('should throw when initialized with empty buffer', () => {
    var create = () => {
      new BinaryReader(new ArrayBuffer());
    }
    expect(create).toThrowError('Invalid buffer');
  });

  it('should read unsinged integer correctly and change position and bytes read', () => {
    // Arrange
		const expectedValue = 42;
		const expectedBytesRead = 4;
		const expectedPosition = 4;
		const expectedBytesLeft = 0;
		let buffer = new ArrayBuffer(4);
		let reader = new BinaryReader(buffer);
    let view = new DataView(buffer, 0);
    view.setUint32(0, expectedValue, true);

    // Act
    let val = reader.readUint32();

		// Assert
    expect(val).toBe(expectedValue);
		expect(reader.position).toEqual(expectedPosition);
		expect(reader.bytesRead).toEqual(expectedBytesRead);
		expect(reader.bytesLeft()).toEqual(expectedBytesLeft);
  });

	it('should read unsinged word correctly and change position and bytes read', () => {
    // Arrange
		const expectedValue = 12;
		const expectedBytesRead = 2;
		const expectedPosition = 2;
		const expectedBytesLeft = 2;
		let buffer = new ArrayBuffer(4);
		let reader = new BinaryReader(buffer);
    let view = new DataView(buffer, 0);
    view.setUint16(0, expectedValue, true);

    // Act
    let val = reader.readUint16();

		// Assert
    expect(val).toBe(expectedValue);
		expect(reader.position).toEqual(expectedPosition);
		expect(reader.bytesRead).toEqual(expectedBytesRead);
		expect(reader.bytesLeft()).toEqual(expectedBytesLeft);
  });

	it('should read float 32 correctly and change position and bytes read', () => {
    // Arrange
		const expectedValue = 42.12;
		const expectedBytesRead = 4;
		const expectedPosition = 4;
		const expectedBytesLeft = 8;
		let buffer = new ArrayBuffer(12);
		let reader = new BinaryReader(buffer);
    let view = new DataView(buffer, 0);
    view.setFloat32(0, expectedValue, true);

    // Act
    let val = reader.readFloat32();

		// Assert
    expect(val).toBeCloseTo(expectedValue, 2);
		expect(reader.position).toEqual(expectedPosition);
		expect(reader.bytesRead).toEqual(expectedBytesRead);
		expect(reader.bytesLeft()).toEqual(expectedBytesLeft);
  });

	it('should read string correctly and change position and bytes read', () =>{
		// Arrange
		const expectedBytesRead = 4;
		const expectedPosition = 4;
		const expectedBytesLeft = 0;
		const expectedString = "IBSP"
		let buffer = new ArrayBuffer(4);
		let view = new Uint8Array(buffer);
		for (let i = 0; i < expectedString.length; ++i) {
			view[i] = expectedString.charCodeAt(i);
		}
		let reader = new BinaryReader(buffer);

		// Act
		let val = reader.readString(4);

		// Assert
		expect(val).toMatch(expectedString);
		expect(reader.position).toEqual(expectedPosition);
		expect(reader.bytesRead).toEqual(expectedBytesRead);
		expect(reader.bytesLeft()).toEqual(expectedBytesLeft);
	});

	it ('should seek to valid position', () => {
		// Arrange
		let buffer = new ArrayBuffer(4);
		let reader = new BinaryReader(buffer);

		// Act
		reader.seek(2);

		// Assert
		expect(reader.position).toEqual(2);
	});

	it ('should throw when seeking to valid position outside buffer', () => {
		// Arrange
		let buffer = new ArrayBuffer(4);
		let reader = new BinaryReader(buffer);
		let seek = () => {
			reader.seek(5);
		};

		// Act & assert
		expect(seek).toThrowError('Position out of bounds');
	});
});
