var express = require('express');
var router = express.Router();
var shell = require('shelljs');
var mqtt = require('mqtt');
var dbconn = require('../dbconnection');

//var client = mqtt.connect('mqtt://10.103.0.1');

router.get('/', function(req, res, next) 
{
  var db = dbconn.dbconnection();

  let sql = `SELECT mac,
                    ip,
                    name,
                    alias,
                    type
             FROM sensor`;

  db.serialize( () => {

    db.all(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      db.close();
      res.status(200).send(rows);
      });
  });



});

module.exports = router;
