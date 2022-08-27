const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')



router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    // console.log(req.body);

    // Pull new tip and title from request body
    const { text, title } = req.body;
    
    if (text && title) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        console.log(newNote);

        res.json(newNote);
    } else {
        res.json('Error in adding tip');
    }
})

router.delete('/:id', (req, res) => {
    res.json('received delete request')
    readFromFile('./db/db.json').then(data => {
        const isSameID = (element) => element.id == req.params.id;
        let changingDB = JSON.parse(data);
        const deleteIndex = changingDB.findIndex(isSameID);
        changingDB.splice(deleteIndex, 1);
        writeToFile('./db/db.json', changingDB);
    });

})




module.exports = router;