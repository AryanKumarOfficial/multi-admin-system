import connectDB from "@/backend/middleware/mongoose";
import generatePepper from "@/backend/Utilities/security/Pepper";
import generateSalt from "@/backend/Utilities/security/Salt";
import User from "@/backend/model/User";
import Hashed from "@/backend/Utilities/security/Hashed";
const bycrpt = require("bcryptjs");

const handler = async (req, res) => {
  if (req.method === "POST") {
    // extract data from req.body
    const { fname, lname, email, password } = req.body;
    // check if user already exists in db
    const isUserRegistered = await User.findOne({ email });
    if (isUserRegistered) {
      return res.status(200).json({ msg: "User already exists" });
    } else {
      const secret = await Hashed(password);
      // create new user
      const newUser = new User({
        firstName: fname,
        lastName: lname,
        email: email,
        password: secret?.hashedPassword || null,
        salt: secret?.salt || null,
        pepper: secret?.pepper || null,
      });
      // save user to db
      await newUser.save();

      return res
        .status(200)
        .json({ msg: "User created successfully", newUser });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
};

export default connectDB(handler);
