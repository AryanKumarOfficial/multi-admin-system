const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        pepper: {
            type: String,
        },
        name: {
            type: String,
        },
        role: {
            type: String,
            default: "admin",
        },
    },
    { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

module.exports = Admin;