const mongoose = require("mongoose");

const moderatorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 2,
    max: 50,
    default: "Jhon",
  },
  lastName: {
    type: String,
    min: 2,
    max: 50,
    default: "Doe",
  },
  email: {
    type: String,
    min: 5,
    max: 50,
    unique: true,
  },
  image: {
    type: String,
    default: "/avtar.png",
  },
  password: {
    type: String,
    min: 6,
    max: 50,
  },
  salt: {
    type: String,
  },
  pepper: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  auth: {
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  lastLogout: {
    type: Date,
    default: null,
  },
  lastFailedLogin: {
    type: Date,
    default: null,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lastPasswordChange: {
    type: Date,
    default: null,
  },
  lastPasswordReset: {
    type: Date,
    default: null,
  },
  lastPasswordAttempt: {
    type: Date,
    default: null,
  },
  lastPasswordAttemptSuccess: {
    type: Date,
    default: null,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const Moderator =
  mongoose.models.Moderator || mongoose.model("Moderator", moderatorSchema);

module.exports = Moderator;
