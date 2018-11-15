const bodyParser = require('body-parser'),
	compression = require('compression'),
	passport = require('passport'),
	passportConfiguration = require('./passsport');

module.exports = function(app, config) {
	app.use(
		bodyParser.urlencoded({
			extended: false,
		}),
	);
	app.use(bodyParser.json());

	app.use(compression());

	app.use(passport.initialize());

	app.use(function(req, res, next) {
		req.isLogged = () => passportConfiguration.isLogged(req);

		passport.authenticate('jwt-custom', function(err, user) {
			if (err) {
				next();
			}

			if (user) {
				req.user = user;
			}

			next();
		})(req, res, next);
	});

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type');

		next();
	});

	app.use(function(req, res, next) {
		if (req.originalUrl.indexOf('%') !== -1) {
			res.status(400).send('Bad request');
		} else {
			next();
		}
	});

	require('./routes')(app, config);
};
