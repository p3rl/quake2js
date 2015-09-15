import {readFromBuffer} from '../../src/bsp/bsp-reader';

describe('bsp-reader', () => {

	it('should throw error if header has invalid magic number', () => {
		// Arrange
		let buffer = new ArrayBuffer(4);

		// Act & assert
		expect(() => readFromBuffer(buffer)).toThrowError();
	});

	it('should throw error if header has version not equal to 38', () => {
		// Arrange
		let magic = 'IBSP';
		let buffer = new ArrayBuffer(8);
		let view = new Uint8Array(buffer);
		for (let i = 0; i < magic.length; ++i) {
			view[i] = magic.charCodeAt(i);
		}
		view = new DataView(buffer);
		view.setUint32(4, 34, true);

		// Act & assert
		expect(() => readFromBuffer(buffer)).toThrowError();
	});
});
