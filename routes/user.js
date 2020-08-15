
const router = require('express').Router();
const {
    createUser,
    updateMyProfile
} = require('../controllers/user');

const {
    checkAuth
} = require('../middlewares');

// router.post('/', checkAuth, createUser); // add checkAuth later to this
/**
 * @swagger
 * path:
 *  /user:
 *    patch:
 *      summary: update own user profile
 *      tags: [User]
 *      security:
 *          - bearerAuth: []
 *      requestBody :
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                                type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *        "200":
 *          description: "Profile has been edited"
 *        "401":
 *          description: "Error"
 *
 */
router.patch('/', checkAuth, updateMyProfile);

module.exports = router;
