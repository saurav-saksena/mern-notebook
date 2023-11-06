const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");

//get user all notes by  api/notes/fetchallnotes method:GET
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    // if (notes.length !== 0) {
    //   res.send({ success: true, notes });
    // } else {
    //   res.send({ msg: "no available note" });
    // }
    res.send({ notes });
    res.send;
  } catch (error) {
    res.status(500).send({ msg: "something went wrong !" });
  }
});

//add user  notes to mongodb  /api/notes/addnote method:POST
router.post("/addnote", fetchuser, async (req, res) => {
  try {
    let { tag } = req.body;
    if (tag == "") {
      tag = "general";
    }
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
      tag: tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.send({ success: "note added successfully !", savedNote });
  } catch (error) {
    if (error.errors.title) {
      res.status(400).send({ msg: "Please give a title" });
    } else if (error.errors.description) {
      res.status(400).send({ msg: "Please write description" });
    } else {
      res.status(500).send({ msg: "something went wrong !" });
    }
  }
});

// update existing note with valid token

// /api/notes/updatenote/id     Method:PUT
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //new note for updating existing note
  const { title, description, tag } = req.body;

  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find note by id and try to update it !
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ msg: "note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "not allowed !" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send({ success: "note updated successfully !", updatedNote });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong" });
  }
});

// making endpoint to delete existing notes with token authoriazation
// /api/notes/deletenote/:id      method: DELETE
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ msg: "note not found" });
    }

    //give permission to delete if user owns this note, so check it first !
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "not allowed !" });
    }
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.send({ success: "note deleted successfully !", deletedNote });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong !" });
  }
});
module.exports = router;
