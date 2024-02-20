const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.users.readByEmailWithPassword(req.body.email);
    if (user == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );
    if (verified) {
      delete user.hashed_password;
      const token = await jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "100s",
      });
      res.json({
        token,
        user,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    localStorage.removeItem("user");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    res.status(500).json({ message: "Error with the logout" });
  }
  next();
};

module.exports = {
  login,
  logout,
};
