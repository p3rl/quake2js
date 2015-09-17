import * as log from '../log';

/**
 * A renderer using web gl.
 */
export class Renderer {
  constructor() {
    this.logger = log.getLogger('Renderer');
  }

  initialize(canvas: any) {
    this.logger.info('Initializing rendering context');
    this.gl = canvas.getContext("experimental-webgl");
    this.gl.viewportWidth = canvas.width;
    this.gl.viewportHeight = canvas.height;
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
}
