/**
 * A shader program.
 */
export class ShaderProgram {

  /**
   * Initializes a new instance of a ShaderProgram.
   * @param program OpenGL shader program.
   * @param name The name of the shader program.
   * @param vertexShader Vertex shader.
   * @param fragmentShader Fragment shader.
   */
  constructor(program: any, name: string, vertexShader: Shader, fragmentShader: Shader) {
    this.program = program;
    this.name = name;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
  }

  /**
   * Create a new instace of a shader program.
   * @param  {WebGlRenderingContext} gl The WebGL renderingcontext.
   * @param  {string} name The name of the shader proram.
   * @param  {Shader} vertexShader The vertex shader.
   * @param  {Shader} fragmentShader The fragment shader.
   */
  static create(gl: WebGlRenderingContext, name: string, vertexShader: Shader, fragmentShader: Shader): ShaderProgram {
    let program = gl.createProgram();
    gl.attachShader(vertexShader.shader);
    gl.attachShader(fragmentShader.shader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      throw new Error(`Failed to create program from vertex shader '${vertexShader.name}' and fragment shader '${fragmentShader.name}`);
    }
    return new ShaderProgram(program, name, vertexShader, fragmentShader);
  }
}
