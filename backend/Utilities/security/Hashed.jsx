import Salt from "./Salt";
import Pepper from "./Pepper";
const bycrpt = require("bcryptjs");

const Hashed = async (password) => {
  const saltRounds = 10;
  const pepper = Pepper();
  const salt = Salt();
  const combinedPassword = password + salt + pepper;
  const hashedPassword = await bycrpt.hashSync(combinedPassword, saltRounds);
  const secret = { hashedPassword, salt, pepper };
  return secret;
};

export default Hashed;
