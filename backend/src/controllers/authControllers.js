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

      const isAdmin = await tables.user_roles.readUserRoles(user.id, "Admin");

      if (isAdmin) {
        const token = await jwt.sign(
          { sub: user.id, isAdmin: true },
          process.env.APP_SECRET,
          {
            expiresIn: "100s",
          }
        );
        res.json({
          token,
          user,
        });
      } else {
        // User doesn't have the "admin" role
        res.status(403).json({ message: "You are not authorized as admin" });
      }
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
