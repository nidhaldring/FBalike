import nodemailer, { Transporter } from 'nodemailer';
import appRoot from 'app-root-path';
import config from '../config';
import path from 'path';
import ejs from 'ejs';
import { MailOptions } from 'nodemailer/lib/json-transport';

function render(filename: string, data: Object): Promise<string> {
    const filePath: string = path.join(
        appRoot.toString(),
        '/templates/emails',
        filename
    );
    return new Promise((resolve, reject) => {
        ejs.renderFile(filePath, data, (err: Error | null, output: string) => {
            if (err) {
                reject(err);
            } else {
                resolve(output);
            }
        });
    });
}

/* mails utils */

let transporter: Transporter;

async function sendMail(mail: MailOptions) {
    if (!transporter) {
        transporter = nodemailer.createTransport(config.mail.transporter);
    }
    return transporter.sendMail(mail);
}

async function getWelcomeMail(
    email: string,
    username: string
): Promise<MailOptions> {
    return {
        from: config.mail.from,
        to: email,
        subject: 'WELCOME',
        text: await render('welcome.txt', { username }),
        html: await render('welcome.html', { username }),
    };
}

export { getWelcomeMail, sendMail };
