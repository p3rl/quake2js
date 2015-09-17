import * as assetMgr from './asset-mgr';
import * as log from './log';
import {Renderer} from './renderer/renderer';
import {Timer} from './timer';

log.useDefaultConfiguration();
let logger = log.getLogger('Main');

let renderer = new Renderer();
renderer.initialize(document.getElementById('canvas'));

let stopWatch = new StopWatch();
stopWatch.start();
let render = () => {
  let delta = stopWatch.getDelta();
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}



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
