const { mongoose } = require("mongoose");

const blacklistTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Automatically delete the document after 24 hours (86400 seconds)
  },
});

const blacklistTokenModel = mongoose.model(
  "blacklistToken",
  blacklistTokenSchema
);

module.exports = blacklistTokenModel;
