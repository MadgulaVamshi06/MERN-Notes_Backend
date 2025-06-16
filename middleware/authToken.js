const JWT = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.TOKEN_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized", error });
  }
};

module.exports = { requireSignIn };
