import { Router } from 'express';
import { addFollower, deleteFollower } from '../controllers/follower';
import { checkAuth } from '../middlewares';

const router = Router();

/**
 * @swagger
 * path:
 *  /users/followers/{id}:
 *    post:
 *      summary: follow user
 *      tags: [Follower]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id to be followed
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "Follower has been added !"
 *        "400":
 *          description: "Failure"
 *
 */
router.post('/:id', checkAuth, addFollower);

/**
 * @swagger
 * path:
 *  /users/followers/{id}:
 *    delete:
 *      summary: unfollow user
 *      tags: [Follower]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id to be unfollowed
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "Follower has been removed !"
 *        "400":
 *          description: "Failure"
 *
 */
router.delete('/:id', checkAuth, deleteFollower);

export default router;