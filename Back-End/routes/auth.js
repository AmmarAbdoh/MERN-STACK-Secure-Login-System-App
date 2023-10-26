const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const { login, register, dashboard } = require("../controllers/auth");

router.get("/dashboard", authenticateUser, dashboard);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
