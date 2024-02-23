const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    if (decoded.isAdmin) {
      return next();
    }
    return res.status(403).json({ message: "Unauthorized - Not an admin" });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = isAdmin;
