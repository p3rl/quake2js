import * as bsp from './bsp/bsp-reader';

const baseUrl = 'http://localhost:3000';

/**
* Load bsp map.
* @param name Name of the map to load, ie q2dm1.
*/
export function loadMap(name: string): Promise<Bsp> {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var map = bsp.readFromBuffer(request.response);
          resolve(map);
        } else {
          reject(new Error(request.statusText));
        }
      }
    };

    request.onerror = () => {
      reject(new Error('XMLHttpRequest error: ' + request.statusText));
    }

    request.open('GET', baseUrl + '/maps/q2dm1.bsp', true);
    request.responseType = 'arraybuffer';
    request.send();
  });
}
