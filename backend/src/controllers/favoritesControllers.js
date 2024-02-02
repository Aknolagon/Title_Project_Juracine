const tables = require("../tables");

// B
const browse = async (req, res, next) => {
  try {
    const favorites = await tables.favorites.readAll();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

// R
const read = async (req, res, next) => {
  try {
    const favorite = await tables.favorites.read(req.params.user_id);
    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

// E
const edit = async (req, res, next) => {
  try {
    const favorite = req.body;
    const { id } = req.params;
    const [result] = await tables.favorites.update({ ...favorite, id });
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
  const favorites = req.body;
  try {
    const insertId = await tables.favorites.create(favorites);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// D
const destroy = async (req, res, next) => {
  try {
    const [favorites] = await tables.favorites.delete(req.params.id);
    if (favorites.affectedRows === 0) {
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
