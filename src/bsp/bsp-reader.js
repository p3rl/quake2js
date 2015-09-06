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
  return {
    magic: reader.readUint32(),
    version: reader.readUint32(),
    lumps: readLumps(reader)
  };
}

function readLumps(reader: BinaryReader): BspLump[] {
  let numLumps = 19;
  let lumps = BspLump[numLumps];
  for (let i = 0; i < numLumps; ++i) {
    numLumps[i] = {
      offset: reader.readUint32(),
      length: reader.readUint32()
    };
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
