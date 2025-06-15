const express = require("express");
const { createNote, getNotes, deleteNote } = require("../controllers/noteController");
const { requireSignIn } = require("../middleware/authToken");

const router = express.Router();

router.post("/create", requireSignIn, createNote);
router.get("/user-notes", requireSignIn, getNotes);
router.delete("/:id", requireSignIn, deleteNote);

module.exports = router;