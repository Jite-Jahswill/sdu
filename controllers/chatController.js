const { Op } = require("sequelize");
const Message = require("../models/Message");

const upload = require("../middleware/uploadMiddleware");

// Combined send message + upload file
exports.sendMessageWithUpload = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const {
        senderId,
        receiverId,
        groupId,
        content,
        pollOptions,
        replyToMessageId,
        audioUrl,
        imageUrl,
      } = req.body;

      // Build message object
      const messageData = {
        senderId,
        receiverId,
        groupId,
        content,
        pollOptions: pollOptions ? JSON.parse(pollOptions) : undefined,
        replyToMessageId,
        audioUrl,
        imageUrl,
      };

      // If a file was uploaded, set fileUrl to uploaded file path
      if (req.file) {
        messageData.fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
      }

      const message = await Message.create(messageData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// Get messages for a user or a group
exports.getMessages = async (req, res) => {
  try {
    const { userId, groupId } = req.query;
    let where = {};

    if (userId) {
      where = {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      };
    } else if (groupId) {
      where = { groupId };
    }

    const messages = await Message.findAll({
      where,
      order: [["createdAt", "ASC"]],
    });

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// React to a message
exports.reactToMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId, reaction } = req.body;

    const message = await Message.findByPk(messageId);
    if (!message)
      return res
        .status(404)
        .json({ success: false, error: "Message not found" });

    const reactions = message.reactions || {};

    // Add userId to the reaction array or create a new reaction array
    if (!reactions[reaction]) {
      reactions[reaction] = [];
    }

    if (!reactions[reaction].includes(userId)) {
      reactions[reaction].push(userId);
    }

    message.reactions = reactions;
    await message.save();

    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Poll voting logic
exports.votePoll = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId, selectedOption } = req.body;

    const message = await Message.findByPk(messageId);
    if (!message)
      return res
        .status(404)
        .json({ success: false, error: "Poll message not found" });

    if (!message.pollOptions)
      return res
        .status(400)
        .json({ success: false, error: "This message is not a poll" });

    const votes = message.votes || {};

    // Prevent user from voting multiple times on the same poll
    if (Object.values(votes).includes(userId)) {
      return res
        .status(400)
        .json({ success: false, error: "User has already voted" });
    }

    if (!message.pollOptions.includes(selectedOption)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid poll option" });
    }

    votes[selectedOption] = votes[selectedOption] || [];
    votes[selectedOption].push(userId);

    message.votes = votes;
    await message.save();

    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
