const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getTokenFrom = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  console.log("DECODED TOKEN: ", decodedToken);
  const dbUser = await User.findById(decodedToken.id);
  console.log("dbUser: ", dbUser);
  request.user = dbUser;

  next();
};

module.exports = { getTokenFrom, userExtractor };
