import connectDB from "@/backend/Database/middleware/mongoose";
import Moderator from "@/backend/Database/model/Moderator";

const handler = async (req, res) => {

    if (req.method === 'GET') {
        const moderators = await Moderator.find({}).exec();
        res.status(200).json({ moderators });
    } else {
        res.status(400).json({ message: 'Invalid request' });
    }
};

export default connectDB(handler);
