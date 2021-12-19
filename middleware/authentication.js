const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  console.log(token);
  try {
    const payload = isTokenValid({ token });
    console.log(payload);
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authenticationn Invalid");
  }
};

module.exports = {
  authenticateUser,
};
