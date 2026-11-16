const Note = require("../models/notes.models");

const getAllNotes = async (category) => {
    const filter = category ? { category } : {};
    return Note.find(filter).sort({ createdAt: -1 });
};

const getNoteById = async (id) => {
    return Note.findById(id);
};

const createNote = async (noteData) => {
    const note = new Note(noteData);
    return note.save();
};

const updateNote = async (id, noteData) => {
    return Note.findByIdAndUpdate(id, noteData, {
        new: true,
        runValidators: true
    });
};

const deleteNote = async (id) => {
    return Note.findByIdAndDelete(id);
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
