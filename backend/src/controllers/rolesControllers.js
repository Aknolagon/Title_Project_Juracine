const tables = require("../tables");

// B
const browse = async (req, res, next) => {
  try {
    const roles = await tables.roles.readAll();
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

// R
const read = async (req, res, next) => {
  try {
    const role = await tables.roles.read(req.params.id);
    if (role == null) {
      res.sendStatus(404);
    } else {
      res.json(role);
    }
  } catch (err) {
    next(err);
  }
};

// E
const edit = async (req, res, next) => {
  try {
    const role = req.body;
    const { id } = req.params;
    const [result] = await tables.roles.update({ ...role, id });
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500);
    next(err);
  }
};

// A
const add = async (req, res, next) => {
  const roles = req.body;
  try {
    const insertId = await tables.roles.create(roles);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// D
const destroy = async (req, res, next) => {
  try {
    const [roles] = await tables.roles.delete(req.params.id);
    if (roles.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ message: "Error with server" });
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
