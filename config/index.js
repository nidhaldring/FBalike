
// maybe dvidie this later ?

module.exports = {
    db: {
        url: 'mongodb://localhost/test'
    },
    app: {
        port: '5050',
        secretKey: '!!!!!!!!!!!!!!!!'
    },
    mail: {
        transporter: {
            service: 'Hotmail',
            auth: {
                user: 'nidhaled@hotmail.com',
                pass: 'nh_66@1973465n'
            }
        },
        from: 'nidhaled@hotmail.com'
    },
    swagger: {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'API',
                version: '1.0.0',
                description: 'FBAlike API'
            },
            servers: [
                {
                    url: 'http://localhost:5050/api/'
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            }
        },
        apis: ['./routes/*.js']
    }
};
