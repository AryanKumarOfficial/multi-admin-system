import ConnectDB from '@/backend/Database/middleware/mongoose';
import User from '@/backend/Database/model/User';

const handler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ user });
}

export default ConnectDB(handler);