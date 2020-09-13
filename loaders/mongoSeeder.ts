import process from 'process';
import { connectToDB } from './index';
const { User } = require('../models');

connectToDB().then(async () => {
    await User.deleteMany();
    await User.create(require('../data/users.json'));
    console.log('users has been created !');
    process.exit();
});
