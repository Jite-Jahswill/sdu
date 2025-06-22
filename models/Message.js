const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
      defaultValue: null,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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
      type: DataTypes.JSON, // works on MySQL too
      allowNull: true,
    },
    votes: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    reactions: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    replyToMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    tableName: "messages",
  }
);

module.exports = Message;
