const notesService = require("../services/notes.service");

const VALID_CATEGORIES = ["General", "Work", "Personal", "Ideas"];

const getAllNotes = async (req, res, next) => {
  try {
    const { category } = req.query;

    if (category && !VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
        allowedCategories: VALID_CATEGORIES,
      });
    }

    const notes = await notesService.getAllNotes(category);
    return res.status(200).json({
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    return next(error);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const note = await notesService.getNoteById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    return next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: "Title and content are required and must be non-empty strings",
      });
    }

    const note = await notesService.createNote(req.body);
    return res.status(201).json({
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // This endpoint uses PUT, so both required fields must be supplied.
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: "Title and content are required and must be non-empty strings",
      });
    }

    const note = await notesService.updateNote(req.params.id, req.body);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await notesService.deleteNote(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
