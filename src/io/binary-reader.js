function advance(reader: BinaryReader, bytes: number): void {
  reader.position += bytes;
  reader.bytesRead += bytes;
}

export class BinaryReader {

  constructor(buffer: ArrayBuffer) {
    this.bytesRead = 0;
    this.bufferLength = buffer.byteLength;
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.position = 0;
  }

  seek(offset: number): void {
    this.position = offset;
  }

  readUint32(): number {
    let value = this.view.getUint32(this.position, true);
	  advance(this, 4);
	  return value;
  }

  readUint16(): number {
    let value = this.view.getUint16(this.position, true);
	  return value;
	  advance(this, 2);
  }

  readFloat32(): number {
    let value = this.view.getFloat32(this.position, true);
	  advance(this, 4);
	  return value;
  }

  readString(length: number): string {
    let array = new Uint8Array(this.buffer, this.position, length);
    let value = '';
    for (var i = 0; i < length; ++i) {
      value += String.fromCharCode(array[i]);
    }
    advance(this, length);
    return value;
  }
}
