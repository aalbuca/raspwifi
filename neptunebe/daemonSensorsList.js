var shell = require('shelljs');
var dbconn = require('./dbconnection');

function pub()
{
    const regex = /((?:[0-9]{1,3}\.){3}[0-9]{1,3}).*([0-9A-Fa-f:]{17})/g;
    var result;
    var sensors = [];
    var arp = shell.exec('arp -eni wlp2s0', {silent: true}).stdout;


    var db = dbconn.dbconnection();

    let sql = `SELECT mac FROM sensor WHERE mac = ? LIMIT 1`;
    let prep = db.prepare('INSERT INTO sensor(mac,ip,name,alias) VALUES(?,?,?,?)');
    //var stmt = db.prepare(prep);

    db.serialize( () => {
        while ((result = regex.exec(arp)) !== null)
        {
            var sensor = {'ip': '', 'mac' : '', 'name' : ''};
            sensor["ip"] = result[1];
            sensor["mac"] = result[2];
            sensor["name"] = 'SR-' + result[2].split(':').join('').toUpperCase().substring(6);
            sensors.push(sensor);		
        }

        sensors.forEach( (item) => {
            db.get(sql, item.mac, function (err, row){
                if (err) console.error(err.message);
                console.log(row);
                if (row == undefined){
                        console.log(row);
                        prep.run([item.mac, item.ip, item.name, item.name], function(err){
                            if (err) console.log(err);
                        });
                }
                return;
            });
        });
    }, ()=>{ 
        prep.finalize();
        db.close();

    });
}


setInterval(pub, 5000);