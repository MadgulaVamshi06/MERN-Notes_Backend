const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const { requireSignIn } = require("../middleware/authToken"); // ✅ Only requireSignIn now

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user-auth", requireSignIn, (req, res) => res.status(200).send({ ok: true }));

module.exports = router;
