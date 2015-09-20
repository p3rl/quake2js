import {Vector3} from './vector3.js';
import {Quaternion} from './quaternion.js';
import {Matrix4} from './matrix4.js';

export {Vector3};
export {Quaternion};
export {Matrix4};
export const PiOver180 = Math.PI / 180;
export const Epsilon = 0.000001;

export function toRadians(degrees: number): number {
  return degrees * PiOver180;
}
