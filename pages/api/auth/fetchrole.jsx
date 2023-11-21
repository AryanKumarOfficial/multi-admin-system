import connectDB from "@/backend/Database/middleware/mongoose";
import Moderator from "@/backend/Database/model/Moderator";
import { NextResponse } from "next/server";

const fetchRole = async (req, res) => {
  const response = NextResponse.next();
  try {
    if (req.method === "POST") {
      const userExists = await Moderator.findOne({
        email: req?.body?.email,
      }).select({ password: 0, salt: 0, pepper: 0 });
      if (userExists) {
        response.cookies.set({
          name: "role",
          value: userExists.role,
          path: "/",
        });
        let crole = response.cookies.get("role");
        return res
          .status(200)
          .json({ role: userExists.role, user: userExists, crole });
      }
      return res.status(200).json({ role: "client", user: null });
    } else {
      return res.status(400).json({ error: "Method not allowed", user: null });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export default connectDB(fetchRole);
