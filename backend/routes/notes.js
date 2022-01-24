const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require("../middleware/fetchUser");
const Note = require('../models/Note');


//ROUTE 1----->: Get all the notes using Get: "/api/auth/getuser" : login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error occured" })
    }

})

//ROUTE 2----->:Adding a new note using POST: "/api/auth/addnote" : login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a title Minimum length of 3').isLength({ min: 3 }),
    body('description', 'Description must be of 8 characters').isLength({ min: 8 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if there is an error return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error occured" })
    }

})
module.exports = router;