const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    query_text: { type: String },
    ans: { type: Schema.Types.Mixed, default: {} },
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("message", userSchema);
