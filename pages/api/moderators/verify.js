import connectDB from "@/backend/Database/middleware/mongoose";
import Moderator from "@/backend/Database/model/Moderator";

const handler = async (req, res) => {
    if (req.method === 'PUT') {
        const { id } = req.body;
        try {
            const moderator = await Moderator.findById(id);
            if (!moderator) return res.status(400).json({ success: false, message: "Moderator not found" });
            const updatedModerator = await Moderator.findByIdAndUpdate(id, {
                verified: true,
                role: "moderator",
            }, { new: true });
            return res.status(200).json({ success: true, message: "Moderator verified successfully", moderator: updatedModerator });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }
    }
    return res.status(400).json({ success: false, message: "Invalid request" });
};

export default connectDB(handler);