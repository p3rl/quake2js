import {BspReader} from 'bsp/bsp-reader';
console.log('Starting quake 2');

var request = new XMLHttpRequest();
request.onreadystatechange = () => {
  if (request.readyState == 4 && request.status == 200) {
    var bspReader = new BspReader();
    var map = bspReader.readFromString(request.responseText);
	}
};
request.open('GET', 'http://localhost:3000/maps/q2dm1', true);
request.overrideMimeType('text/plain; charset=x-user-defined');
//request.responseType = 'arraybuffer';
request.setRequestHeader('Content-Type', 'text/plain');
request.send(null);
