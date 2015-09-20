import * as log from '../log';
import * as math from '../math/math';

/**
 * A renderer using web gl.
 */
export class Renderer {
  constructor(gl: any, canvas: any) {
    this.logger = log.getLogger('Renderer');
    this.gl = gl;
    this.canvas = canvas;
    this.gl.enable(gl.DEPTH_TEST);
  }

  render(scene: Scene, camera: Camera): void {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.viewportWidth = this.canvas.width;
    this.gl.viewportHeight = this.canvas.height;

    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    let view = camera.getViewMatrix();
    let projection = camera.getProjectionMatrix();
    scene.render(this, view, projection);
  }
}
