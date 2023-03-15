const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    message_count: { type: Number}
  

  },

 { timestamps: true,
  versionKey: false}

);

module.exports = mongoose.model("conversation", userSchema);