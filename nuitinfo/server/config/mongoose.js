const mongoose = require('mongoose');

function getMongoURI() {
	let uri = 'mongodb://';

	if (process.env.MONGO_USER && process.env.MONGO_USER !== 'undefined') {
		uri += process.env.MONGO_USER;

		if (process.env.MONGO_PASSWORD && process.env.MONGO_PASSWORD !== 'undefined') {
			uri += ':' + process.env.MONGO_PASSWORD + '@';
		}
	}

	uri += process.env.MONGO_HOST;

	if (process.env.MONGO_PORT) {
		uri += ':' + process.env.MONGO_PORT;
	}

	if (process.env.MONGO_DB) {
		uri += '/' + process.env.MONGO_DB;
	}

	return uri + '?authSource=admin';
}

mongoose.connect(
	getMongoURI(),
	{ useNewUrlParser: true },
	function(error) {
		if (error) {
			console.error('Mongoose error : ', error);
		}
	},
);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;