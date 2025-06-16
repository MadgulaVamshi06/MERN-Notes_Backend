const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const { requireSignIn } = require("../middleware/authToken");

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

// to check if user is authenticated
router.get("/user-auth", requireSignIn, (req, res) => res.status(200).send({ ok: true }));

module.exports = router;
