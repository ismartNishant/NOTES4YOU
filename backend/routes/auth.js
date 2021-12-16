const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//create a user using: POST  "/api/auth/createuser" : no login require auth

router.post('/createuser', [
    body('name', 'Enter a Name Minimum length of 3').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be of 8 characters').isLength({ min: 8 }),
], async (req, res) => {

    // if there is an error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check weather the user with this email exisit already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user)
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({error:"Some error occured"})
    }
})
module.exports = router;