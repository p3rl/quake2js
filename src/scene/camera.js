import {Vector3, Matrix4, toRadians} from '../math/math';

export class Camera {

  constructor(name: string) {
    this.name = name;
    this.position = new Vector3(0, 0, 50);
    this.target = Vector3.zero();
    this.up = new Vector3(0, 1, 0);

    this.frustum =  {
      fov: 0,
      width: 0,
      height: 0,
      near: 0,
      far: 0
    };

    this.rotations = {
      yaw: 0,
      pitch: 0,
      roll: 0
    };

    this.transformations = {
      view: Matrix4.identity(),
      projection: Matrix4.identity()
    };
  }

  setView(fov: number, width: number, height: number, near: number, far: number): void {
    this.frustum.fov = fov;
    this.frustum.width = width;
    this.frustum.height = height;
    this.frustum.near = near;
    this.frustum.far = far;
    Matrix4.perspective(toRadians(fov), width / height, near, far, this.transformations.projection);
  }

  lookAt(target: Vector3, position: Vector3, up: Vector3): void {
    this.transformations.view.lookAt(target, position, up);
  }

  getViewMatrix(): Matrix4 {
    return this.transformations.view;
  }

  getPerspectiveMatrix(): Matrix4 {
    return this.transformations.perspective;
  }
}
