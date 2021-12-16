const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//create a user using: POST  "/api/auth/"  dosent require auth

router.post('/', [
    body('name', 'Enter a Name Minimum length of 3').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be of 8 characters').isLength({ min: 8 }),
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
     .catch(error => {console.log(error) 
       res.json({error: "Please Enter unique value for email", message:error.message})})
})
module.exports = router;