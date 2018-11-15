'use strict';

let express = require('express'),
	config = require('./config/config'),
	mongoose = require('./config/mongoose');

let app = express();

require('./config/express')(app, config);

app.listen(8080, function() {
	console.log('Server listening on port 8080 !');
});
