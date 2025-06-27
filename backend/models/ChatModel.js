const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    members: Array,
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
