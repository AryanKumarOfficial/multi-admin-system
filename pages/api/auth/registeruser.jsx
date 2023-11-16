import connectDB from "@/backend/middleware/mongoose";
import generatePepper from "@/backend/Utilities/security/Pepper";
import generateSalt from "@/backend/Utilities/security/Salt";
import User from "@/backend/model/User";
const bycrpt = require("bcryptjs");

const handler = async (req, res) => {
  if (req.method === "POST") {
    // extract data from req.body
    const { fname, lname, email, password } = req.body;
    // check if user already exists in db

    const pepper = generatePepper();
    const salt = generateSalt();
    const hashedPassword = await bycrpt.hash(password, salt + pepper);

    res.status(200).json({ data: { fname, lname, email, password } });
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
};

export default connectDB(handler);
