const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
    obj = {
        a:"Nancy",
        num:20
    }
    res.json(obj);
})
module.exports = router;