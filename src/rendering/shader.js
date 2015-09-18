export const shaderType = {
  vertex: 0,
  fragment: 1
};

export class Shader {

  constructor(name: string, shader: any, type: shaderType) {
    this.name = name;
    this.shader = shader;
    this.shaderType = type;
  }

  static compile(gl: any, name: string, source: string, type: shaderType): Shader {
    let glShaderType = undefined;
    if (type === shaderType.vertex) {
      glShaderType = gl.VERTEX_SHADER;
    } else if (type === shaderType.fragment) {
      glShaderType = gl.FRAGMENT_SHADER;
    } else {
      throw Error('Unknown shader type: ' + type);
    }

    let shader = gl.createShader(glShaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      throw new Error('Failed to compile shader ' + name + ' :' + gl.getShaderInfoLog(shader));
    }

    return new Shader(name, shader, type);
  }

  static fromScriptElement(gl: any, name: string, scriptId: string, type: shaderType): Shader {
    let scriptElement = document.getElementById(scriptId);
    if (!scriptElement) {
      throw new Error('Unknown script element: ' + scriptId);
    }

    let source = scriptElement.text;
    type = type || getShaderTypeFromScriptElement(scriptElement);
    return Shader.compile(gl, name, source, type);
  }
}

function getShaderTypeFromScriptElement(scriptElement: any): shaderType {
  if (scriptElement.type === 'x-shader/x-vertex') {
    return shaderType.vertex;
  } else if (scriptElement.type === 'x-shader/x-fragment') {
    return shaderType.fragment;
  }
  return undefined;
}
