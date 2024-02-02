const express = require("express");

const router = express.Router();

// const { hashPassword, verifyToken } = require("./services/auth");

const usersControllers = require("./controllers/usersControllers");
const profilesControllers = require("./controllers/profilesControllers");
const rolesControllers = require("./controllers/rolesControllers");
const favoritesControllers = require("./controllers/favoritesControllers");
// const authControllers = require("./controllers/authControllers");

// favorites
router.get("/favorites", favoritesControllers.browse);
router.get("/favorites/:id", favoritesControllers.read);
router.post("/favorites", favoritesControllers.add);
router.delete("/favorites/:id", favoritesControllers.destroy);

// profiles
router.get("/profiles", profilesControllers.browse);
router.get("/profiles/:user_id", profilesControllers.read);
router.put("/profiles/:id", profilesControllers.edit);
router.post("/profiles", profilesControllers.add);
router.delete("/profiles/:id", profilesControllers.destroy);

// roles
router.get("/roles", rolesControllers.browse);
router.get("/roles/profile/:id", rolesControllers.read);
router.put("/roles/:id", rolesControllers.edit);
router.post("/roles", rolesControllers.add);
router.delete("/roles/:id", rolesControllers.destroy);

// users
router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", usersControllers.edit);
router.post("/users", usersControllers.add);
// router.post("/users/login", authControllers.login);
router.delete("/users/:id", usersControllers.destroy);

module.exports = router;
