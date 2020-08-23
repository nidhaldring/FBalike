
// const { User } = require('../models');
// const chai = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');
// const { runApp } = require('../loaders');
// const { HTTP } = require('../constantes');

// chai.use(chaiHttp);

// const user = {
//     username: 'nidhal_rnine',
//     password: '123456789',
//     email: 'nidhal@nidhal.cc'
// };

// const newUser = {
//     username: 'nidhal_rnine2',
//     password: '123456789',
//     email: 'notnidhal@nidhal.cc' 
// };
// let app = null;

// describe('Auth API', () => {
    
//     before(async () => {
//         app = await runApp();
//         await User.deleteMany();
//     });

//     after(async () => {
//         await User.deleteMany();
//     });

//     beforeEach(async () => {
//         await User.deleteMany();
//         await User.create(user);
//     });


//     describe('POST /auth/login', () => {
        
//         it('Should return 200 if you login with a valid user ', () => {
//             chai.request(app)
//             .post('/api/auth/login')
//             .send(newUser)
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(HTTP.OK);
//             });
//         })
//     });

// });