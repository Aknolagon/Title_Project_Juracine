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

      {
        const token = await jwt.sign(
          {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
          },
          process.env.APP_SECRET,
          {
            expiresIn: "3600s",
          }
        );
        res.json({
          token,
          user,
        });
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
