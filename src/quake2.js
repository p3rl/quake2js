import * as assetMgr from './asset-mgr';
import * as log from './asset-mgr';

log.useDefaultConfiguration();
let logger = log.getLogger('Main');

assetMgr.loadMap('q2dm1')
        .then(map => {
          logger.info('Map magic: ' + map.header.magic);
          logger.info('Map version: ' + map.header.version);
        })
        .catch(error => {
          logger.error(error);
        });
