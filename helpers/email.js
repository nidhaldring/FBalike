const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const appRoot = require('app-root-path');
const config = require('../config');

// ejs render file async 
const render = (filename, data) => {
    const filePath = path.join(appRoot.toString(), '/templates/emails', filename); 
    return new Promise((resolve, reject) => {
        ejs.renderFile(filePath, data, (err, string) => {
            if (err) {
                reject(err);
            } else {
                resolve(string);
            }
        });
    });
}

/* mails utils */

let transporter = null;

async function sendMail(mail) {
    if (!transporter) {
        transporter = nodemailer.createTransport(config.mail.transporter);
    }
    return transporter.sendMail(mail);
}

async function getWelcomeMail({ email, username }) {
    return {
        from: config.mail.from,
        to: email,
        subject: 'WELCOME',
        text: await render('welcome.txt', { username }), 
        html: await render('welcome.html', { username })
    };
}


module.exports = {
    sendMail,
    getWelcomeMail
};