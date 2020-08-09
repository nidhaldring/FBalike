
const router = require('express').Router();
const {
    createUser,
    updateMyProfile
} = require('../controllers/user');

const {
    checkAuth
} = require('../middlewares');

router.post('/', createUser); // add checkAuth later to this
router.patch('/', checkAuth, updateMyProfile);

module.exports = router;
