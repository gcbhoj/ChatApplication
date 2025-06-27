const chatModel = require("../models/ChatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    let newId;
    let exists;

    do {
      newId = `${Math.floor(10000 + Math.random() * 90000)}`;
      exists = await chatModel.findById(newId);
    } while (exists);
    console.log("ID Created:", newId);
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      res.status(200).json(chat);
    }
      const newChat = new chatModel({
        _id:newId,
      members: [firstId, secondId],
    });
    const response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createChat, findChat, findUserChats };
