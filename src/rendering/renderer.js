import * as log from '../log';

/**
 * A renderer using web gl.
 */
export class Renderer {
  constructor(gl: any, canvas: any) {
    this.logger = log.getLogger('Renderer');
    this.gl = gl;
    this.canvas = canvas;
  }

  render(scene: Scene, camera: Camera): void {

  }
}
