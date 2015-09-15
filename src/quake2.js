import * as assetMgr from './asset-mgr';

assetMgr.loadMap('q2dm1')
        .then(map => {
          console.log('Map magic: ' + map.header.magic);
          console.log('Map version: ' + map.header.version);
        })
        .catch(error => {
          console.log(error);
        });
