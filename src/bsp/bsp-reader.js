import {BinaryReader} from 'io/binary-reader';

// Index	Name                    Description
// 0	    Entities                MAP entity text buffer
// 1	    Planes                  Plane array
// 2	    Vertices                Vertex array
// 3	    Visibility              Compressed PVS data and directory for all clusters
// 4	    Nodes                   Internal node array for the BSP tree
// 5	    Texture Information     Face texture application array
// 6	    Faces                   Face array
// 7	    Lightmaps               Lightmaps
// 8	    Leaves                  Internal leaf array of the BSP tree
// 9	    Leaf Face Table         Index lookup table for referencing the face array from a leaf
// 10	    Leaf Brush Table        ?
// 11	    Edges                   Edge array
// 12	    Face Edge Table         Index lookup table for referencing the edge array from a face
// 13	    Models                  ?
// 14	    Brushes                 ?
// 15	    Brush Sides             ?
// 16	    Pop                     ?
// 17	    Areas                   ?
// 18	    Area Portals            ?

interface BspEdge {
  v1: number; // uint16
  v2: number; // uint16
}

interface BspVertex {
  x: number; // float32
  y: number; // float32
  z: number; // float32
}

interface BspLump {
  offset: number; // uint32
  length: number; // uint32
}

interface BspHeader {
  magic: string; // 4 characters
  version: number; // uint32
  lumps: BspLump[];
}

interface Bsp {
  header: BspHeader;
  vertices: BspVertex[];
}

function readHeader(reader: BinaryReader): BspHeader {
  try {
    return {
      magic: reader.readString(4),
      version: reader.readUint32(),
      lumps: readLumps(reader)
    };
  } catch (e) {
    throw new Error('Failed to read header, error=' + e);
  }
}

function readLumps(reader: BinaryReader): BspLump[] {
  try {
    const numLumps = 19;
    let lumps = new Array();
    for (let i = 0; i < numLumps; ++i) {
      lumps.push({
        offset: reader.readUint32(),
        length: reader.readUint32()
      });
    }
    return lumps;
  } catch (e) {
    throw new Error('Failed to read header lumps infomration, error=' + e);
  }
}

function readVertices(reader: BinaryReader, lump: BspLump): BspVertex[] {
  try {
    const numVertices = lump.length / 12;
    let vertices = new Array();
    reader.position = lump.offset;
    for (let i = 0; i < numVertices; ++i) {
      vertices.push([
        reader.readFloat32(),
        reader.readFloat32(),
        reader.readFloat32()
      ]);
    }
    return vertices;
  } catch (e) {
    throw new Error('Failed to read vertices, error=' + e);
  }
}

function readEdges(reader: BinaryReader, lump: BspLump): BspVertex[] {
  try {
    const numEdges = lump.length / 4;
    let edges = new Array();
    reader.position = lump.offset;
    for (let i = 0; i < numEdges; ++i) {
      edges.push([reader.readUint16(), reader.readUint16()]);
    }
    return edges;
  } catch (e) {
    throw new Error('Failed to read vertices, error=' + e);
  }
}

export function readFromBuffer(buffer: ArrayBuffer): Bsp {
  if (!buffer) {
    throw new Error('Invalid buffer');
  }

  let reader = new BinaryReader(buffer);
  let header = readHeader(reader);
  let vertices = readVertices(reader, header.lumps[2]);
  let edges = readEdges(reader, header.lumps[11]);

  return {
    header: header,
    vertices: vertices,
    edges: edges
  };
}
