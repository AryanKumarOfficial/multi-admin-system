const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    salt: {
      type: String,
      required: true,
    },
    pepper: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
