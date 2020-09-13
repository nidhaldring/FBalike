import { Router } from 'express';
import { createUser, updateMyProfile } from '../controllers/user';
import { checkAuth } from '../middlewares';

const router = Router();

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

export default router;