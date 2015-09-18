import * as log from '../log';
import {Shader} from './shader';
import {ShaderProgram} from './shaderprogram';

/**
 * Responsible for managing vertex, fragment shaders and programs.
 */
export class ShaderMgr {

  constructor(gl: any) {
    this.logger = log.getLogger('ShaderMgr');
    this.gl = gl;
    this.shaders = [];
    this.programs = [];
  }

  loadShaderFromScriptElement(name: string, scriptId: string, type: Shader.shaderType): void {
    this.logger.info(`Trying to load shader from script element '${scriptId}'`);
    let shader = Shader.fromScriptElement(this.gl, name, scriptId, type);
    this.shaders.push(shader);
    this.logger.info(`Successfully loaded shader '${name}' from script element '${scriptId}'`);
  }

  createProgram(name: string, vertexShader: string, fragmentShader: string): void {
    this.logger.info(`Trying to create shader program '${name}' from vertex shader '${vertexShader.name}' and fragment shader '${fragmentShader.name}'`);
    let vs = this.getShader(vertexShader);
    if (!vs) {
      throw new Error('Shader ' + vertexShader + ' has not been loaded');
    }

    let fs = this.getShader(vertexShader);
    if (!fs) {
      throw new Error('Shader ' + fragmentShader + ' has not been loaded');
    }

    let shaderProgram = ShaderProgram.create(this.gl, name, vs, fs);
    this.programs.push(shaderProgram);
    this.logger.info('Successfully create shader program ' + name);
  }

  getShader(name: string): Shader {
    for (let shader of this.shaders) {
      if (shader.name === name) {
        return shader;
      }
    }
    return null;
  }
}
