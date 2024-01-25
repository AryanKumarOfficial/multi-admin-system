import connectDB from "@/backend/Database/middleware/mongoose";
import Moderator from "@/backend/Database/model/Moderator";

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            const moderator = await Moderator.findByIdAndDelete(id);
            if (!moderator) return res.status(400).json({ success: false, message: "Moderator not found" });
            return res.status(200).json({ success: true, message: "Moderator deleted successfully" });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }
    }
    return res.status(400).json({ success: false, message: "Invalid request" });
};

export default connectDB(handler);