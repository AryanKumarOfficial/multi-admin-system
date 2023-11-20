import connectDB from "@/backend/Database/middleware/mongoose";
import { getProviders } from "next-auth/react";

const handler = async (req, res) => {
  const provider = await getProviders();
  res.status(200).json({ message: "Hello world", provider });
};
export default connectDB(handler);
