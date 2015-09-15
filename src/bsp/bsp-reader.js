import {BinaryReader} from '../io/binary-reader';

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

interface BspPlane {
    normal: BspVertex; // A, B, C components of the plane equation
    distance: number; // (float32) D component of the plane equation
    type: number; // (uint32) ?
}

interface BspFace {
  planeIndex: number; // (uint16) index of the plane the face is parallel to
  planeSide: number; // (uint16) set if the normal is parallel to the plane normal
  firstEdgeIndex: number; // (uint32) index of the first edge (in the face edge array)
  edgeCount: number; // (uint16) number of consecutive edges (in the face edge array)
  textureInfoIndex: number; // (uint16) index of the texture info structure
  lightmapStyles: number; // uint8[4] styles (bit flags) for the lightmaps
  lightmapOffset: number; // uint32 offset of the lightmap (in bytes) in the lightmap lump
}

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
    let magic = reader.readString(4);
    if (magic !== 'IBSP') {
      throw new Error('Unknown magic number');
    }

    let version = reader.readUint32();
    if (version !== 38) {
      throw new Error('Unsupported bsp version');
    }

    let lumps = readLumps(reader);
    return {
      magic: magic,
      version: version,
      lumps: lumps
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

function readVertex(reader: BinaryReader): BspVertex {
  return {
    x: reader.readFloat32(),
    y: reader.readFloat32(),
    z: reader.readFloat32()
  };
}

function readVertices(reader: BinaryReader, lump: BspLump): BspVertex[] {
  try {
    let numVertices = lump.length / 12;
    let vertices = [];
    reader.seek(lump.offset);
    for (let i = 0; i < numVertices; ++i) {
      vertices.push(readVertex(reader));
    }
    return vertices;
  } catch (e) {
    throw new Error('Failed to read vertices, error=' + e);
  }
}

function readEdges(reader: BinaryReader, lump: BspLump): BspEdge[] {
  try {
    let numEdges = lump.length / 4;
    let edges = [];
    reader.seek(lump.offset);
    for (let i = 0; i < numEdges; ++i) {
      edges.push({
        v1: reader.readUint16(),
        v2: reader.readUint16()
      });
    }
    return edges;
  } catch (e) {
    throw new Error('Failed to read vertices, error=' + e);
  }
}

function readFaces(reader: BinaryReader, lump: BspLump): Array<BspFace> {
  try {
    let numFaces = lump.length / 20;
    let faces = [];
    reader.seek(lump.offset);
    for (let i = 0; i < numFaces; ++i) {
      faces.push({
        planeIndex: reader.readUint16(),
        planeSide: reader.readUint16(),
        firstEdgeIndex: reader.readUint32(),
        edgeCount: reader.readUint16(),
        textureInfoIndex: reader.readUint16(),
        lightmapStyles: reader.readUint32(),
        lightmapOffset: reader.readUint32()
      });
    }
    return faces;
  } catch (e) {
    throw new Error('Failed to read faces, error=' + e);
  }
}

function readPlanes(reader: BinaryReader, lump: BspLump): Array<BspPlane> {
  try {
    let numPlanes = lump.length / 20;
    let planes = [];
    reader.seek(lump.offset);
    for (let i = 0; i < numPlanes; ++i) {
      planes.push({
        normal: readVertex(reader),
        distance: reader.readFloat32(),
        type: reader.readUint32()
      });
    }
    return planes;
  } catch (e) {
    throw new Error('Failed to read faces, error=' + e);
  }
}

export function readFromBuffer(buffer: ArrayBuffer): Bsp {
  if (!buffer) {
    throw new Error('Invalid buffer');
  }

  let reader = new BinaryReader(buffer);
  let header = readHeader(reader);
  let planes = readPlanes(reader, header.lumps[1]);
  let vertices = readVertices(reader, header.lumps[2]);
  let edges = readEdges(reader, header.lumps[11]);
  let faces = readFaces(reader, header.lumps[6]);

  return {
    header: header,
    vertices: vertices,
    edges: edges,
    faces: faces,
    planes: planes
  };
}
