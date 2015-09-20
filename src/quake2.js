import * as assetMgr from './asset-mgr';
import * as log from './log';
import {Renderer} from './rendering/renderer';
import {ShaderMgr} from './rendering/shadermgr';
import {Scene} from './scene/scene';
import {Vector3} from './math/math';
import {StopWatch} from './stopwatch';

log.useDefaultConfiguration();
let logger = log.getLogger('Main');

let canvas = document.getElementById('canvas');
let context = canvas.getContext('experimental-webgl');
let shaderMgr = new ShaderMgr(context);
shaderMgr.loadShaderFromScriptElement('default-fs', 'shader-fs');
shaderMgr.loadShaderFromScriptElement('default-vs', 'shader-vs');
let scene = new Scene();
let camera = scene.createCamera('camera-1');
camera.lookAt(Vector3.zero(), new Vector3(100, 100, 100), new Vector3(0, 1, 0));
let renderer = new Renderer(context, canvas);
let stopWatch = new StopWatch();

stopWatch.start();
let renderFrame = () => {
  let delta = stopWatch.getDelta();
  camera.setView(45.0, canvas.width, canvas.height, 0.1, 100);
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}
renderFrame();

/*



*/

/*
assetMgr.loadMap('q2dm1')
        .then(map => {
          logger.info('Map magic: ' + map.header.magic);
          logger.info('Map version: ' + map.header.version);
        })
        .catch(error => {
          logger.error(error);
        });
*/
