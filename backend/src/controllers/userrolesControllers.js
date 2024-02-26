const tables = require("../tables");

// Browse all users roles
const browse = async (req, res, next) => {
  try {
    const userRoles = await tables.user_roles.readAllUserRoles();
    res.json(userRoles);
  } catch (err) {
    next(err);
  }
};

// Read user roles
const read = async (req, res, next) => {
  try {
    const favorite = await tables.user_roles.readUserRoles(req.params.user_id);
    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

// Edit user roles
const edit = async (req, res, next) => {
  try {
    const { newRoleId, roleId, userId } = req.body;
    const [result] = await tables.user_roles.updateUserRoles({
      newRoleId,
      roleId,
      userId,
    });
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

// Add user roles
const add = async (req, res, next) => {
  const userRoles = req.body;
  try {
    const insertId = await tables.user_roles.createUserRoles(userRoles);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Delete user roles
const destroy = async (req, res, next) => {
  try {
    const { roleId, userId } = req.body;
    const [userRoles] = await tables.user_roles.deleteUserRoles({
      userId,
      roleId,
    });
    if (userRoles.affectedRows === 0) {
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
