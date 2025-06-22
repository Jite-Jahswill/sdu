const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  reactToMessage,
  votePoll,
} = require("../controllers/chatController");

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Messaging system like WhatsApp
 */

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: integer
 *               receiverId:
 *                 type: integer
 *               groupId:
 *                 type: integer
 *               content:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               audioUrl:
 *                 type: string
 *               pollOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *               replyToMessageId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Message sent
 */

router.post("/send", sendMessageWithUpload);

/**
 * @swagger
 * /api/chat/messages:
 *   get:
 *     summary: Get messages for a user or group
 *     tags: [Chat]
 *     parameters:
 *       - name: userId
 *         in: query
 *         schema:
 *           type: integer
 *       - name: groupId
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get("/messages", getMessages);

/**
 * @swagger
 * /api/chat/{messageId}/react:
 *   post:
 *     summary: React to a message
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               reaction:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reaction added
 */
router.post("/:messageId/react", reactToMessage);

/**
 * @swagger
 * /api/chat/{messageId}/vote:
 *   post:
 *     summary: Vote on a poll message
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               selectedOption:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vote registered
 */
router.post("/:messageId/vote", votePoll);

module.exports = router;
