import * as axios from 'axios';
import {BspReader} from 'bsp/bsp-reader';
console.log('Starting quake 2');

axios.get('http://localhost:3000/maps/base1.bsp')
  .then(response => {
    let bspString = response.data;
    let reader = new BspReader();
    let bsp = reader.readFromString(bspString);

    console.log('magic: ', bsp.header.magic);
    console.log('version: ', bsp.header.version);
    for (let i = 0; i < 19; ++i) {
      console.log('Lump ' + i);
      console.log('  Offset: ' + bsp.header.lumps[i].offset);
      console.log('  Length: ' + bsp.header.lumps[i].length);
    }
  })
  .catch(error => {
    console.log('An error occurred while parsing bsp map: ' + error);
  });
