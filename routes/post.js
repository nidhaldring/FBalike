
const router = require('express').Router();
const {
    createPost,
    deletePost,
    getPostById
} = require('../controllers/post');
const { checkAuth } = require('../middlewares');


/**
 * @swagger
 * path:
 *  /post/{id}:
 *    get:
 *      summary: get post
 *      tags: [Post]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the post
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "Post was found adn retreived !"
 *        "404":
 *          description: "Post was not found !"
 *
 */
router.get('/:id', checkAuth, getPostById);

/**
 * @swagger
 * path:
 *  /post:
 *    post:
 *      summary: create post
 *      tags: [Post]
 *      security:
 *          - bearerAuth: []
 *      requestBody :
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                                type: string
 *                          body:
 *                              type: string
 *      responses:
 *        "201":
 *          description: "Post has been created"
 *        "400":
 *          description: "Failure"
 *
 */
router.post('/', checkAuth, createPost);

/**
 * @swagger
 * path:
 *  /post/{id}:
 *    delete:
 *      summary: delete post
 *      tags: [Post]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id to be removed
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "Post has been removed !"
 *        "400":
 *          description: "Failure"
 *
 */
// check for permission here and stuff
router.delete('/:id', checkAuth, deletePost);


module.exports = router;