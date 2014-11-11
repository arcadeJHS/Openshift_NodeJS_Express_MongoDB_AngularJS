var mongodb = require('../mongodb');


var users = [
	{
		firstName: "Jack",
		lastName: "Bouregard",
		dateOfBirth: "1837-02-29",
		country: "Texas, USA",
		picture: "/img/jb.png",
		user: "jackB",
		password: "1234567890"
	}
];


module.exports.create = function() {
	console.log("### USERS: populating... ###");


	// create and populate collection only if does not exist
	mongodb.db.collection('users', {strict:true}, function(err, collection) {
		// drop existing collection
		if (!err) { mongodb.db.collection('users').drop(); }

		// create and populate collection
		mongodb.db.collection('users', function(err, collection) {
			collection.insert(users, {safe:true}, function(err, result) {
				if (err) { console.log("INSERT ERROR: " + err); }
			});
		});
	});


	console.log("### USERS: populating complete. ###");
};