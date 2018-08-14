var shell = require('shelljs');
var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://10.103.0.1');
var arp = shell.exec('arp -eni uap0', {silent: true}).stdout;

//const regex = /((?:[0-9]{1,3}\.){3}[0-9]{1,3}).*(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))/g;
const regex = /((?:[0-9]{1,3}\.){3}[0-9]{1,3}).*([0-9A-Fa-f:]{17})/g;

function pub(data)
{
	var result;
	var sensors = [];

	while ((result = regex.exec(arp)) !== null)
	{
		var sensor = {'ip': '', 'mac' : '', 'name' : ''};
		sensor["ip"] = result[1];
		sensor["mac"] = result[2];
		sensor["name"] = 'SR-' + result[2].split(':').join('').toUpperCase().substring(6);
		sensors.push(sensor);		
	}
	
	console.log(JSON.stringify(sensors))
	client.publish('sensors/data', JSON.stringify(sensors));
	
}

setInterval(pub, 5000, arp);



