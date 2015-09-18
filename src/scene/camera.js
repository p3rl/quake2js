import {Vector3, Quaternion} from '../math/math';

export class Camera {

  constructor(position: Vector3, target: Vector3, up: Vector3) {
    this.position = position || new Vector3(0, 0 ,50);
    this.target = target || Vector3.zero();
    this.up = up || new Vector3(0, 1, 0);
  }
}
