import {BinaryReader} from './binary-reader';

interface BspLump {
  offset: number;
  length: number;
}

interface BspHeader {
  magic: number;
  version: number;
  lumps: BspLump[];
}

interface Bsp {
  header: BspHeader;
}

function readHeader(reader: BinaryReader): BspHeader {
  let magic = reader.readUint32();
  let version = reader.readUint32();
  let lumps = readLumps(reader);

  return {
    magic: magic,
    version: version,
    lumps: lumps
  };
}

function readLumps(reader: BinaryReader): BspLump[] {
  const numLumps = 19;
  let lumps = [numLumps];
  for (let i = 0; i < numLumps; ++i) {
    let lumpOffset = reader.readUint32();
    let lumpLength = reader.readUint32();
    lumps[i] = { offset: lumpOffset, length: lumpLength };
  }
  return lumps;
}

export class BspReader {
  constructor() {
  }

  readFromString(bsp: string): Bsp {
    if (!bsp || bsp.length === 0) {
      throw new Error('Invalid bsp string');
    }

    let reader = new BinaryReader(bsp);
    let header = readHeader(reader);
    return {
      header: header
    };
  }
}
