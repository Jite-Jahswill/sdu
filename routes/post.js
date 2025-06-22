/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management (create, read, update, delete)
 */

const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Hello Campus"
 *               body:
 *                 type: string
 *                 example: "This is my first post on the school platform."
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Server error
 */

router.post("/posts", authenticateToken, upload.single("image"), createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 *       500:
 *         description: Server error
 */
router.get("/posts", getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/posts/:id", getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post (only if you are the owner)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.delete("/posts/:id", authenticateToken, deletePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post (only if you are the owner)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               body:
 *                 type: string
 *                 example: "Updated post body"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

router.put("/posts/:id", authenticateToken, upload.single("image"), updatePost);

module.exports = router;
