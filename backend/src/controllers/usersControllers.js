const tables = require("../tables");

// B
const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// R
const read = async (req, res, next) => {
  try {
    const user = await tables.users.read(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// E
const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const [result] = await tables.users.update({ id, ...user });

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

// A
const add = async (req, res, next) => {
  const users = req.body;
  try {
    const insertId = await tables.users.create(users);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// D
const destroy = async (req, res, next) => {
  try {
    const [result] = await tables.users.delete(req.params.id);
    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete" });
    next();
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
