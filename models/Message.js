const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define(
  "Message",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: true, // nullable for group messages
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pollOptions: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL only; for others, use JSON
      allowNull: true,
    },
    votes: {
      type: DataTypes.JSONB, // JSON object of option: [userIds]
      allowNull: true,
      defaultValue: {},
    },
    replyToMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reactions: {
      type: DataTypes.JSONB, // JSON object like { "👍": [userId1, userId2], "❤️": [userId3] }
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    timestamps: true,
    tableName: "messages",
  }
);

module.exports = Message;
