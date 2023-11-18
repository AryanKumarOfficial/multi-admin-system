const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
      provider: {
        type: String,
        enum: ["google", "facebook", "github", "credentials"],
        default: "credentials",
      },
      providerId: {
        type: String,
        default: null,
      },
      accessToken: {
        type: String,
        default: null,
      },
      refreshToken: {
        type: String,
        default: null,
      },
      accessTokenExpires: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
