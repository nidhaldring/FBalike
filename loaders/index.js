const express = require('express');
const { logAllRequests, handleErrors } = require('../middlewares');
const config = require('../config');
const mongoose = require('mongoose');
const jsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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
    app.use(logAllRequests);

    // set up routes
    app.use('/api/user', require('../routes/user'));
    app.use('/api/auth', require('../routes/auth'));

    // set up swagger-ui
    const swaggerDoc = jsDoc(config.swagger);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    app.all('*', (req, res) => res.status(404).end('not found !'));
    // handle all errors here
    app.use(handleErrors);

    return app;
}


module.exports = {
    loadApp,
    connectToDB
};
