import connectDB from "@/backend/Database/middleware/mongoose";
import Moderator from "@/backend/Database/model/Moderator";
import Hashed from "@/backend/Utilities/security/Hashed";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // extract data from req.body
    const { fname, lname, email, password } = req.body;
    console.log(req.body);
    // check if user already exists in db
    const isUserRegistered = await Moderator.findOne({ email });

    if (isUserRegistered) {
      return res.status(200).json({ msg: "Request already sent!", ok: false });
    } else {
      // generating hashed password
      const secret = await Hashed(password);

      // create new user
      const request = new Moderator({
        firstName: fname,
        lastName: lname,
        email: email,
        password: secret?.hashedPassword || null,
        salt: secret?.salt || null,
        pepper: secret?.pepper || null,
      });

      // save user to db
      await request.save();

      return res.status(200).json({
        msg: "Request Sent.checkout your email for our response!",
        request,
        ok: true,
      });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
};

export default connectDB(handler);
