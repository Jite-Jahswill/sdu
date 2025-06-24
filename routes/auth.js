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
 *               gender:
 *                 type: string
 *                 example: Male
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
 *         description: User registered
 *       400:
 *         description: Bad request
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
 *               gender:                     # ← aligned with others
 *                 type: string
 *                 example: Male
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

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: jite@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent if email exists
 *       400:
 *         description: Bad request (invalid email)
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password using token from email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: resetTokenHere123456
 *               newPassword:
 *                 type: string
 *                 example: myNewSecurePassword123
 *     responses:
 *       200:
 *         description: Password has been reset successfully
 *       400:
 *         description: Invalid or expired token, or bad request
 */



// Routes
router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.get("/me", authenticateToken, getMe);
router.put("/update", authenticateToken, upload.single("profilePicture"), updateUser);
router.delete("/delete", authenticateToken, deleteUser);

module.exports = router;
