import express from 'express';
import morgan from 'morgan';
import { handleErrors } from '../middlewares';
import config from '../config';
import mongoose from 'mongoose';
import jsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

async function connectToDB(): Promise<true> {
    const dbUrl = config.db.url;
    return new Promise((resolve, reject) => {
        mongoose.connect(
            dbUrl,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('connected to mongo ! ');
                    resolve(true);
                }
            }
        );
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

export { runApp, connectToDB };
