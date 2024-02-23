const tables = require("../tables");

// B
const browse = async (req, res, next) => {
  try {
    const profiles = await tables.profiles.readAll();
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};

// R
const read = async (req, res, next) => {
  try {
    const profile = await tables.profiles.read(req.params.user_id);
    if (profile == null) {
      res.sendStatus(404);
    } else {
      res.json(profile);
    }
  } catch (err) {
    next(err);
  }
};

// E
const edit = async (req, res, next) => {
  try {
    const profile = req.body;
    const { id } = req.params;
    const [result] = await tables.profiles.update({ ...profile, id });
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
  const profiles = req.body;
  try {
    const insertId = await tables.profiles.create(profiles);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// D
const destroy = async (req, res, next) => {
  try {
    const [profiles] = await tables.profiles.delete(req.params.id);
    if (profiles.affectedRows === 0) {
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
