const express = require('express');
const cookieParser = require('cookie-parser');
const { logAllRequests, handleErrors } = require('../middlewares');
const config = require('../config');
const mongoose = require('mongoose');

async function connectToDB() {
    const dbUrl = config.db.url;
    return new Promise((resolve, reject) => {
        mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('connected to mongo ! ');
                resolve(true);
            }
        });
    });
}

function loadApp() {
    const app = express();

    // set up middlewares
    app.use(express.json());
    app.use(cookieParser());
    app.use(logAllRequests);

    // set up routes
    app.use('/api/user', require('../routes/user'));
    app.use('/api/auth', require('../routes/auth'));

    app.all('*', (req, res) => res.end('ok !'));
    // handle all errors here
    app.use(handleErrors);

    return app;
}


module.exports = {
    loadApp,
    connectToDB
};
