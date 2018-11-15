'use strict';

let nodemailer = require('nodemailer');

let options = {};

if (process.env.MAIL_SERVICE === 'custom') {
	options = {
		host: process.env.MAIL_HOST,
		port: Number(process.env.MAIL_PORT),
		secure: Boolean(process.env.MAIL_SECURE),
		auth: {
			user: process.env.MAIL_ADDRESS,
			pass: process.env.MAIL_PASSWORD,
		},
	};
} else {
	options = {
		service: process.env.MAIL_SERVICE,
		auth: {
			user: process.env.MAIL_ADDRESS,
			pass: process.env.MAIL_PASSWORD,
		},
	};
}

const from = `Nuit de l'Info <${process.env.MAIL_ADDRESS}>`;

const transport = nodemailer.createTransport(options);

const passwordRecoveryMail = {
	subject: 'Demande de nouveau mot de passe',
	text: [
		'Bonjour,\r\n\r\n',
		'Vous avez demandé une réinitialisation de votre mot de passe.\r\n',
		"Si c'est le cas, cliquez sur le lien suivant : <link>",
		'\r\n\r\n',
		'Sinon, ignorez simplement ce mail.\r\n\r\n',
		'A bientôt pour la Nuit ! :)\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const subscribeMail = {
	subject: "Inscription à la Nuit de l'Info",
	text: [
		'Bonjour,\r\n\r\n',
		"Vous êtes maintenant inscrit sur le site de la Nuit de l'Info de Bordeaux.\r\n",
		'Pour vous connecter, il suffit de rentrer votre adresse e-mail et votre mot de passe',
		" renseigné lors de l'inscription.",
		'\r\n\r\n',
		"Vous pouvez d'ores et déjà vous connecter sur le site pour trouver ou ",
		'créer une équipe.\r\n\r\n',
		'Rendez-vous le 7 Décembre pour la plus belle des nuits ! :)\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const applicationNotificationToTeamMail = {
	subject: 'Nouveau candidat pour votre équipe <team>',
	text: [
		'Bonjour,\r\n\r\n',
		'Une nouvelle candidature a été déposée auprès de votre équipe.\r\n',
		'Pour la consulter, rendez-vous sur le dashboard du site : <link>.\r\n\r\n',
		'Que la Nuit soit avec vous ! :)\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const applicationNotificationToUserMail = {
	subject: "Nouvelle candidature d'une équipe",
	text: [
		'Bonjour,\r\n\r\n',
		'Une nouvelle candidature a été déposée auprès de vous.\r\n',
		'Pour la consulter, rendez-vous sur le dashboard du site : <link>.\r\n\r\n',
		'Que la Nuit soit avec vous ! :)\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const userAcceptsApplicationMail = {
	subject: 'Candidature acceptée par un utilisateur',
	text: [
		'Bonjour,\r\n\r\n',
		'Votre candidature pour <person> a été acceptée.\r\n',
		'Souhaitez-donc la bienvenue à votre nouveau membre !\r\n\r\n',
		'Que la Nuit guide vos pas ! :)\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const userRefusesApplicationMail = {
	subject: 'Candidature rejetée par un utilisateur',
	text: [
		'Bonjour,\r\n\r\n',
		'Votre candidature pour <person> a malheureusement été rejetée.\r\n\r\n',
		'Que la Nuit vous porte conseille ! :/\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const teamAcceptsApplicationMail = {
	subject: "Candidature acceptée par l'équipe <team>",
	text: [
		'Bonjour,\r\n\r\n',
		"Votre candidature pour l'équipe <team> a été acceptée.\r\n",
		'Amusez-vous bien dans votre nouvelle équipe !\r\n\r\n',
		'Et rendez-vous pour cette Nuit de folie ! :)\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const teamRefusesApplicationMail = {
	subject: "Candidature refusée par l'équipe <team>",
	text: [
		'Bonjour,\r\n\r\n',
		"Votre candidature pour l'équipe <team> a été refusée.\r\n",
		"Courage pour votre recherche d'équipe ! :muscle:\r\n\r\n",
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

const passwordChangedMail = {
	subject: 'Mot de passe modifié',
	text: [
		'Bonjour,\r\n\r\n',
		'Votre mot de passe a bien été modifié !\r\n',
		'Plein de bisous pour vous ! :-*\r\n\r\n',
		"Loco, le robot mailer de la Nuit de l'Info",
	],
};

function sendPasswordRecoveryMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: passwordRecoveryMail.subject,
			text: passwordRecoveryMail.text.join('').replace('<link>', params.url),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendSubscribeMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: subscribeMail.subject,
			text: subscribeMail.text.join(''),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendApplicationNotificationToTeamMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: applicationNotificationToTeamMail.subject.replace('<team>', params.teamName),
			text: applicationNotificationToTeamMail.text.join('').replace('<link>', params.url),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendApplicationNotificationToUserMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: applicationNotificationToUserMail.subject,
			text: applicationNotificationToUserMail.text.join('').replace('<link>', params.url),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendUserAcceptsApplicationMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: userAcceptsApplicationMail.subject,
			text: userAcceptsApplicationMail.text
				.join('')
				.replace('<person>', params.user.firstName + ' ' + params.user.lastName),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendUserRefusesApplicationMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: userRefusesApplicationMail.subject,
			text: userRefusesApplicationMail.text
				.join('')
				.replace('<person>', params.user.firstName + ' ' + params.user.lastName),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendTeamAcceptsApplicationMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: teamAcceptsApplicationMail.subject.replace('<team>', params.team.name),
			text: teamAcceptsApplicationMail.text.join('').replace('<team>', params.team.name),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendTeamRefusesApplicationMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: teamRefusesApplicationMail.subject.replace('<team>', params.team.name),
			text: teamRefusesApplicationMail.text.join('').replace('<team>', params.team.name),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

function sendPasswordChangedMail(params, callback) {
	transport.sendMail(
		{
			from: from,
			to: params.to,
			subject: passwordChangedMail.subject,
			text: passwordChangedMail.text.join(''),
		},
		(err) => {
			if (callback) {
				callback(err);
			}
		},
	);
}

module.exports = {
	sendPasswordRecoveryMail: sendPasswordRecoveryMail,
	sendSubscribeMail: sendSubscribeMail,
	sendApplicationNotificationToTeamMail: sendApplicationNotificationToTeamMail,
	sendApplicationNotificationToUserMail: sendApplicationNotificationToUserMail,
	sendUserAcceptsApplicationMail: sendUserAcceptsApplicationMail,
	sendUserRefusesApplicationMail: sendUserRefusesApplicationMail,
	sendTeamAcceptsApplicationMail: sendTeamAcceptsApplicationMail,
	sendTeamRefusesApplicationMail: sendTeamRefusesApplicationMail,
	sendPasswordChangedMail: sendPasswordChangedMail,
};
