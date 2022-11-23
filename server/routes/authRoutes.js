const express = require("express");
const authController = require("../controllers/authController");
const authRoutes = express.Router();

authRoutes.post("/auth/signup", authController.signup);
authRoutes.post("/auth/login", authController.login);
authRoutes.post("/auth/logout", authController.logout);

module.exports = authRoutes;
