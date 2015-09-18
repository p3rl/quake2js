import * as assetMgr from './asset-mgr';
import * as log from './log';
import {Renderer} from './rendering/renderer';
import {ShaderMgr} from './rendering/shadermgr';
import {StopWatch} from './stopwatch';

log.useDefaultConfiguration();
let logger = log.getLogger('Main');

let canvas = document.getElementById('canvas');
let context = canvas.getContext('experimental-webgl');
let shaderMgr = new ShaderMgr(context);
shaderMgr.loadShaderFromScriptElement('default-fs', 'shader-fs');
shaderMgr.loadShaderFromScriptElement('default-vs', 'shader-vs');
console.log('Loading shader');

/*
let renderer = new Renderer(context, canvas);


let stopWatch = new StopWatch();
stopWatch.start();
let render = () => {
  let delta = stopWatch.getDelta();
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}

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
