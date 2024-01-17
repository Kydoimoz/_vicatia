import mongoose, { models, Schema } from "mongoose";
const messageSchema = new mongoose.Schema({
    user: String,
    content: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });
  const Message = (models && models.Messages) ? models.Messages : mongoose.model("Messages", messageSchema);

module.exports = Message;