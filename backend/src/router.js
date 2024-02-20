const express = require("express");

const router = express.Router();

const { hashPassword } = require("./middlewares/auth");

const usersControllers = require("./controllers/usersControllers");
const profilesControllers = require("./controllers/profilesControllers");
const rolesControllers = require("./controllers/rolesControllers");
const userrolesControllers = require("./controllers/userrolesControllers");
const authControllers = require("./controllers/authControllers");

// profiles
router.get("/profiles", profilesControllers.browse);
router.get("/profiles/:user_id", profilesControllers.read);
router.put("/profiles/:id", profilesControllers.edit);
router.post("/profiles", profilesControllers.add);
router.delete("/profiles/:id", profilesControllers.destroy);

// roles
router.get("/roles", rolesControllers.browse);
router.get("/roles/:id", rolesControllers.read);
router.put("/roles/:id", rolesControllers.edit);
router.post("/roles", rolesControllers.add);
router.delete("/roles/:id", rolesControllers.destroy);

// users
router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", usersControllers.edit);
router.post("/users", hashPassword, usersControllers.add);
router.post("/users/login", authControllers.login);
router.delete("/users/:id", usersControllers.destroy);

// userRoles
router.get("/userroles", userrolesControllers.browse);
router.get("/userroles/:id", userrolesControllers.read);
router.put("/userroles/", userrolesControllers.edit);
router.post("/userroles", userrolesControllers.add);
router.delete("/userroles/:id", userrolesControllers.destroy);

module.exports = router;
