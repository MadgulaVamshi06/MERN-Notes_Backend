const noteModel = require("../models/noteModel");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await new noteModel({ title, content, user: req.user._id }).save();
    res.status(201).send({ success: true, message: "Note created", note });
  } catch (error) {
    res.status(500).send({ success: false, message: "Note creation failed", error });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({ user: req.user._id });
    res.status(200).send({ success: true, notes });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to fetch notes", error });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await noteModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Note deleted", note });
  } catch (error) {
    res.status(500).send({ success: false, message: "Deletion failed", error });
  }
};

module.exports = { createNote, getNotes, deleteNote };
