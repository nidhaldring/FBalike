
const router = require('express').Router();
const {
    createUser,
    updateMyProfile
} = require('../controllers/user');

const {
    checkAuth
} = require('../middlewares');

router.post('/', checkAuth, createUser);
router.patch('/', checkAuth, updateMyProfile);

module.exports = router;
