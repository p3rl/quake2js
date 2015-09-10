export class BinaryReader {

  constructor(data: string) {
    this.buffer = data;
    this.position = 0;
    this.bf_byteBuff = new ArrayBuffer(4);
    this.bf_wba = new Int8Array(this.bf_byteBuff);
    this.bf_wuba = new Uint8Array(this.bf_byteBuff);
    this.bf_wsa = new Int16Array(this.bf_byteBuff);
    this.bf_wusa = new Uint16Array(this.bf_byteBuff);
    this.bf_wia = new Int32Array(this.bf_byteBuff);
    this.bf_wuia = new Uint32Array(this.bf_byteBuff);
    this.bf_wfa = new Float32Array(this.bf_byteBuff);
  }

  readUint32(): number {
    let off = this.position;
	  let buf = this.buffer;
	  this.bf_wba[0] = buf.charCodeAt(off) & 0xff;
	  this.bf_wba[1] = buf.charCodeAt(off+1) & 0xff;
	  this.bf_wba[2] = buf.charCodeAt(off+2) & 0xff;
	  this.bf_wba[3] = buf.charCodeAt(off+3) & 0xff;
	  this.position += 4;
	  return this.bf_wuia[0];
  }

  readUint16(): number {
    let off = this.position;
  	let buf = this.buffer;
  	this.bf_wba[0] = buf.charCodeAt(off) & 0xff;
  	this.bf_wba[1] = buf.charCodeAt(off+1) & 0xff;
  	this.position += 2;
  	return this.bf_wusa[0];
  }

  readFloat32(): number {
    let off = this.position;
  	let buf = this.buffer;
  	this.bf_wba[0] = buf.charCodeAt(off) & 0xff;
  	this.bf_wba[1] = buf.charCodeAt(off+1) & 0xff;
  	this.bf_wba[2] = buf.charCodeAt(off+2) & 0xff;
  	this.bf_wba[3] = buf.charCodeAt(off+3) & 0xff;
  	this.position += 4;
  	return this.bf_wfa[0];
  }

  readString(length: number): string {
    let str = this.buffer.substr(this.position, length).replace(/\0+$/,'');
	  this.position += length;
	  return str;
  }
}
