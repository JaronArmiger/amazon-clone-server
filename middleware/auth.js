const jwt = require("jsonwebtoken");
const { publicKeySecret } = require("../utils/constants");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No auth token. Access denied." });
    }

    const verified = jwt.verify(token, publicKeySecret);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed. Access denied" });
    }

    req.user = verified.id;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = auth;
