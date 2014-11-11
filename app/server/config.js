module.exports = {
	db: {
		rigenerate: true,
		create: function() {
			require('./db/collections/users').create();
		}
	}
};