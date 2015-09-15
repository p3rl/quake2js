export class BinaryReader {

  constructor(buffer: ArrayBuffer) {
    if (buffer === null || buffer === undefined || buffer.byteLength === 0) {
      throw new TypeError('Invalid buffer');
    }
    this.bytesRead = 0;
    this.bufferLength = buffer.byteLength;
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.position = 0;
  }

  seek(offset: number): void {
    if (offset >= this.bufferLength) {
      throw new Error('Position out of bounds');
    }
    this.position = offset;
  }

  advance(bytes: number): void {
    this.position += bytes;
    this.bytesRead += bytes;
  }

  bytesLeft(): void {
    return this.bufferLength - this.bytesRead;
  }

  readUint32(): number {
    let value = this.view.getUint32(this.position, true);
    this.advance(4);
    return value;
  }

  readUint16(): number {
    let value = this.view.getUint16(this.position, true);
    this.advance(2);
    return value;
  }

  readFloat32(): number {
    let value = this.view.getFloat32(this.position, true);
    this.advance(4);
    return value;
  }

  readString(length: number): string {
    let array = new Uint8Array(this.buffer, this.position, length);
    let value = '';
    for (let i = 0; i < length; ++i) {
      value += String.fromCharCode(array[i]);
    }
    this.advance(length);
    return value;
  }
}
