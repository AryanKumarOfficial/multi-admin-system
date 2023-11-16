const bycrpt = require("bcryptjs");

const generateSalt = () => {
  const saltRounds = 10;
  const salt = bycrpt.genSaltSync(saltRounds);
  return salt;
};

module.exports = generateSalt;
