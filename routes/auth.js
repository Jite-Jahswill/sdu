const express = require("express");
const router = express.Router();
const { register, login, getMe, updateUser, deleteUser } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jite Jahswill
 *               email:
 *                 type: string
 *                 example: jite@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (e.g., email already exists)
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jite@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/update:
 *   put:
 *     summary: Update current user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Name
 *               email:
 *                 type: string
 *                 example: newemail@example.com
 *               password:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/delete:
 *   delete:
 *     summary: Delete current user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Unauthorized
 */
router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getMe);
router.put("/update", authenticateToken, updateUser);
router.delete("/delete", authenticateToken, deleteUser);

module.exports = router;
