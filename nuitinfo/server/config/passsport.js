const passportJWT = require('passport-jwt');
const Strategy = passportJWT.Strategy,
	ExtractJwt = passportJWT.ExtractJwt;

module.exports = {
	configure: function(passport) {
		passport.use(
			'jwt-custom',
			new Strategy(
				{
					secretOrKey: process.env.JWT_SECRET,
					jwtFromRequest: ExtractJwt.fromAuthHeader(),
				},
				function(payload, done) {
					return done(null, payload);
				},
			),
		);
	},

	isLogged: function(req) {
		return req.user !== undefined && req.user._id !== undefined;
	},

	logout: function(req) {
		req.user = undefined;
	},
};
