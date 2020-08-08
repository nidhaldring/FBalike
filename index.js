const express = require('express');
const cookieParser = require('cookie-parser');
const { logAllRequests } = require('./middlewares');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();


async function connectToDB() {
    const dbUrl = config.db.url;
    return new Promise((resolve, reject) => {
        mongoose.connect(dbUrl, { newUrlParser: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('connected to mongo ! ');
                resolve(true);
            }
        });
    });
}

async function runApp() {
    // set up middlewares
    app.use(express.json());
    app.use(cookieParser());
    app.use(logAllRequests);

    // set up routes
    app.use('/api/user', require('./routes/user'));

    app.all('*', (req, res) => res.end('ok !'));
    app.listen(config.app.port, () => console.log(`running on ${config.app.port}`));
}


connectToDB().then(() => runApp())
