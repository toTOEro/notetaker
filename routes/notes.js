const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');




router.get('/', (req, res) => res.json(db));

router.post('/', (req, res) => {
    console.log(req.body);
    // Pull new tip and title from request body
    const { tip, title } = req.body;

    if (tip && title) {
        const newTip = {
            title,
            tip,
            UID: uuidv4(),
        }

        console.log(newTip);

        res.json(newTip);
    } else {
        res.json('Error in adding tip');
    }
})





module.exports = router;