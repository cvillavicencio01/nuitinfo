'use strict';

/* Rename this file into local.env.js to add the configuration to server */

module.exports = {
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_DB: process.env.MONGO_DB || 'nuitinfo',
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD : process.env.MONGO_PASSWORD,

    MAIL_ADDRESS: process.env.MAIL_ADDRESS || 'email@default.com',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || 'password',
    MAIL_HOST: process.env.MAIL_HOST || 'smtp.default.com',
    MAIL_PORT: process.env.MAIL_PORT || 777,
	MAIL_SECURE: (process.env.hasOwnProperty('MAIL_SECURE') ?
			(process.env.MAIL_SECURE === 1) : false) || false,

    API_URL: process.env.API_URL || 'http://localhost:8080',
    WEBSERVER_URL: process.env.WEBSERVER_URL || 'http://localhost:8080',

    JWT_SECRET: process.env.JWT_SECRET ||
    'bJC2rlw0IW7XcsV5pWrFvcAK86y9JMD4L8JLB75BBmFJ00heK6yXtXMPDglcrZhl',

    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || 10
};