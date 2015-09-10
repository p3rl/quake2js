export class BinaryReader {

  constructor(buffer: ArrayBuffer) {
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.position = 0;
  }

  readUint32(): number {
    let value = this.view.getUint32(this.position, true);
	  this.position += 4;
	  return value;
  }

  readUint16(): number {
    let value = this.view.getUint16(this.position, true);
	  this.position += 4;
	  return value;
  }

  readFloat32(): number {
    let value = this.view.getFloat32(this.position, true);
	  this.position += 4;
	  return value;
  }

  readString(length: number): string {
    let array = new Uint8Array(this.buffer, this.position, length);
    let value = '';
    for (var i = 0; i < length; ++i) {
      value += String.fromCharCode(array[i]);
    }
    this.position += length;
    return value;
  }
}
