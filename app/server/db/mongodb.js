var config = require('../config');

var mongodb = require('mongodb'),
	dbServer = new mongodb.Server(process.env.OPENSHIFT_MONGODB_DB_HOST, parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT)),
	db = new mongodb.Db(process.env.OPENSHIFT_APP_NAME, dbServer, {auto_reconnect: true, safe:false}),
	dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME,
	dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;


module.exports.db = db;

module.exports.BSON = mongodb.BSONPure;

module.exports.connect = function(cb) {
	db.open(function(err, db) {
		if(err){ throw err }
		if(!err) {
			db.authenticate(dbUser, dbPass, {authdb: "admin"},  function(err, res) {
				if(err){ throw err }
				console.log("Connected to the database");
				
				// initialize DB if required (settings in "server/config.js")
				!!config.db.rigenerate && config.db.create();
				
				// execute callback, if present
				!!cb && cb();
			})
		}
	});
};