const express = require('express');
const morgan = require('morgan');
const { handleErrors } = require('../middlewares');
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

async function runApp() {
    const app = express();

    // set up middlewares
    app.use(express.json());
    app.use(morgan('dev'));

    // set up routes
    app.use('/api/users/followers', require('../routes/follower'));
    app.use('/api/users', require('../routes/user'));
    app.use('/api/auth', require('../routes/auth'));
    app.use('/api/posts', require('../routes/post'));

    // set up swagger-ui
    const swaggerDoc = jsDoc(config.swagger);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    app.all('*', (req, res) => res.status(404).end('not found !'));
    // handle all errors here
    app.use(handleErrors);

    await connectToDB();
    
    return app.listen(config.app.port, () => {
        console.log(`Up and running on ${config.app.port} !`);
    });
}


module.exports = {
    runApp
};
