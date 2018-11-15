'use strict';

let express = require('express'),
    config = require('../config/config'),
    mongoose = require('mongoose');

let app = express();


require('../config/express')(app, config);

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

    return uri;
}

mongoose.connect(getMongoURI());

let db = mongoose.connection;
db.on('error', (err) => {
    console.error('Mongoose error : ', err);
});

db.once('open', function () {
    console.log('Database connected on', process.env.MONGO_DB);
});

require('../entities/user/user.controller');
require('../entities/team/team.controller');
require('../entities/application/application.controller');
require('../entities/institution/institution.controller');

mongoose.model('User')
    .find({'isSystemAccount': {$ne: true}})
    .select('firstName lastName email team school')
    .populate('team school.institution')
    .exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        console.log('site;ecole;annee;prenom;nom;equipe;estLeader');

        for (let user of users) {
            if (!user.team) {
                continue;
            }

            console.log('Bordeaux;' +
                user.school.institution.name + ';' +
                user.school.studyYear + ';' +
                user.firstName + ';' +
                user.lastName + ';' +
                user.email + ';' +
                user.team.name.replace(';', '') + ';' +
                (user._id.equals(user.team.members.leader) ? 'leader' : '0')
            );
        }

        mongoose.connection.close();
    });