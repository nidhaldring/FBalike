
// const { Post, User } = require('../models');
// const chai = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');
// const { runApp } = require('../loaders');
// const { HTTP } = require('../constantes');

// chai.use(chaiHttp);

// let token = null;
// let app = null;
// const user = {
//     username: 'nidhal_rnine',
//     password: '123456789',
//     email: 'nidhal@nidhal.cc'
// };
// const post = {
//     title: 'ok hello',
//     body: 'ok bro'
// };

// describe('Posts API', () => {

//     before(async() => {
//         app = await runApp();
//         await User.deleteMany();
//         await Post.deleteMany();
//     });

//     after(async() => {
//         await User.deleteMany();
//         await Post.deleteMany();
//         await app.close();
//     });

//     beforeEach(async () => {
//         await User.deleteMany();
//         await Post.deleteMany();

//         const dbUser = await User.create(user);
//         await Post.create(post);

//         token = await dbUser.generateJWT();

//     });

//     describe('POST /posts', () => {
        
//         it('Should return 201 when creating a new post', () => {
//             chai.request(app)
//             .post('/api/posts')
//             .set('Authorization', `Bearer ${token}`)
//             .send(post)
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(HTTP.CREATED);
//             });
//         })
//     });

// });