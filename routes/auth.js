const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  register,
  login,
  getMe,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - username
 *               - email
 *               - password
 *               - matricNumber
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Jite
 *               lastname:
 *                 type: string
 *                 example: Jahswill
 *               username:
 *                 type: string
 *                 example: jitejahswill
 *               email:
 *                 type: string
 *                 example: jite@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *               matricNumber:
 *                 type: string
 *                 example: SE123456
 *               state:
 *                 type: string
 *                 example: Delta
 *               country:
 *                 type: string
 *                 example: Nigeria
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (e.g., email or username already exists)
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: NewFirstName
 *               lastname:
 *                 type: string
 *                 example: NewLastName
 *               username:
 *                 type: string
 *                 example: newusername
 *               email:
 *                 type: string
 *                 example: newemail@example.com
 *               password:
 *                 type: string
 *                 example: newPassword123
 *               matricNumber:
 *                 type: string
 *                 example: SE234567
 *               state:
 *                 type: string
 *                 example: Lagos
 *               country:
 *                 type: string
 *                 example: Nigeria
 *               profilePicture:
 *                 type: string
 *                 format: binary
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


// Routes
router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.get("/me", authenticateToken, getMe);
router.put("/update", authenticateToken, upload.single("profilePicture"), updateUser);
router.delete("/delete", authenticateToken, deleteUser);

module.exports = router;
