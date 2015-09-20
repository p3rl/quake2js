import {Camera} from './camera';
import {Grid} from './grid';

export {Camera};

export class Scene {

  constructor() {
    this.grid = new Grid(100, 10);
    this.cameras = [];
  }

  createCamera(name: string): Camera {
    let camera = new Camera(name);
    this.cameras.push(camera);
    return camera;
  }

  render(renderer: Renderer): void {

  }
}
