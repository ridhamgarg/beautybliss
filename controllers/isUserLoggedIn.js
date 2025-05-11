const jwt = require("jsonwebtoken");
const isUserLoggedIn = (req) => {
  const token = req.cookies?.token;
  if (!token) {
    return false;
  }
  try {
    const decode = jwt.verify(token, "beautybliss");
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = isUserLoggedIn;
