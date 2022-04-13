const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware")
const usersController = require("../controllers/users.controller");
const moviesController = require("../controllers/movies.controller")
const authController = require("../controllers/auth.controller");

router.get("/", (req, res, next) => res.status(200).json({ ok: true }))


/* Auth */
router.post("/login", authMiddleware.isNotAuthenticated, authController.login);


/* Users */
router.post("/users", authController.create);
router.get("/users/me", authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get("/users/:id", usersController.getUserById);


/* Movies */
router.post("/movie/new", moviesController.create);
router.get("/movie/:id", moviesController.detail);
router.patch("/movie/:id", moviesController.update);
router.delete("/movie/:id", moviesController.delete)

module.exports = router