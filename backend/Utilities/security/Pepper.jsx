const crtpto = require("crypto");

const generatePepper = () => {
  const pepperBuffer = crtpto.randomBytes(16);
  const pepper = pepperBuffer.toString("hex");
  return pepper;
};

module.exports = generatePepper;
