const express = require("express");

const router = express.Router();

// middlewares
const { hashPassword, verifyToken } = require("./middlewares/auth");

// controllers
const usersControllers = require("./controllers/usersControllers");
const profilesControllers = require("./controllers/profilesControllers");
const rolesControllers = require("./controllers/rolesControllers");
const userrolesControllers = require("./controllers/userrolesControllers");
const authControllers = require("./controllers/authControllers");

// auth login, create user, create profile, create role, create userrole
router.post("/users/login", authControllers.login);
router.post("/userroles", userrolesControllers.add);
router.post("/users", hashPassword, usersControllers.add);
router.post("/profiles", profilesControllers.add);

// wall protected with verifyToken
router.use(verifyToken);

// profiles
router.get("/profiles", profilesControllers.browse);
router.get("/profiles/:user_id", profilesControllers.read);
router.put("/profiles/:id", profilesControllers.edit);
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
router.delete("/users/:id", usersControllers.destroy);

// userRoles
router.get("/userroles", userrolesControllers.browse);
router.get("/userroles/:id", userrolesControllers.read);
router.put("/userroles/", userrolesControllers.edit);
router.delete("/userroles", userrolesControllers.destroy);

module.exports = router;
