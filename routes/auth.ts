
import { Router } from 'express';
import { login, register } from '../controllers/auth';

const router = Router();


/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: login user
 *      tags: [Auth]
 *      security: []
 *      requestBody :
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *        "200":
 *          description: "Used has been logged in !"
 *        "401":
 *          description: "Failed login"
 *
 */
router.post('/login', login);


/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      summary: register user
 *      tags: [Auth]
 *      security: []
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
 *          description: "Used has been registed"
 *        "401":
 *          description: "Error"
 *
 */
router.post('/register', register)


export default router;
