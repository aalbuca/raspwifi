var shell = require('shelljs');
 

var arp = shell.exec('arp -eni uap0', {silent: true}).stdout;

//const regex = /((?:[0-9]{1,3}\.){3}[0-9]{1,3}).*(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))/g;
const regex = /((?:[0-9]{1,3}\.){3}[0-9]{1,3}).*([0-9A-Fa-f:]{17})/g;

var result;

while ((result = regex.exec(arp)) !== null)
{
	console.log(result[1]);
	console.log(result[2]);
	console.log('SR-' + result[2].split(':').join('').toUpperCase().substring(6));
}

