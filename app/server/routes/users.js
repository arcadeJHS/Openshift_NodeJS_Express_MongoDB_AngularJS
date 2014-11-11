var mongodb = require('../db/mongodb');
 

var actions = {
	
	findById: function(req, res) {
		var id = req.params.id;
		console.log('Retrieving user: ' + id);
		mongodb.db.collection('users', function(err, collection) {
			collection.findOne({'_id':new mongodb.BSON.ObjectID(id)}, function(err, item) {
				res.send(item);
			});
		});
	},
 
	findAll: function(req, res) {
		mongodb.db.collection('users', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	},
 
	add: function(req, res) {
		var user = req.body;
		console.log('Adding user: ' + JSON.stringify(user));
		mongodb.db.collection('users', function(err, collection) {
			collection.insert(user, {safe:true}, function(err, result) {
				if (err) {
					res.send({'error':'An error has occurred'});
				} else {
					console.log('Success: ' + JSON.stringify(result[0]));
					res.send(result[0]);
				}
			});
		});
	},
 
	update: function(req, res) {
		var id = req.params.id;
		var user = req.body;
		console.log('Updating user: ' + id);
		console.log(JSON.stringify(user));
		mongodb.db.collection('users', function(err, collection) {
			collection.update({'_id':new mongodb.BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
				if (err) {
					console.log('Error updating user: ' + err);
					res.send({'error':'An error has occurred'});
				} else {
					console.log('' + result + ' document(s) updated');
					res.send(user);
				}
			});
		});
	},
 
	delete: function(req, res) {
		var id = req.params.id;
		console.log('Deleting user: ' + id);
		mongodb.db.collection('users', function(err, collection) {
			collection.remove({'_id':new mongodb.BSON.ObjectID(id)}, {safe:true}, function(err, result) {
				if (err) {
					res.send({'error':'An error has occurred - ' + err});
				} else {
					console.log('' + result + ' document(s) deleted');
					res.send(req.body);
				}
			});
		});
	}
	
};


module.exports = actions;